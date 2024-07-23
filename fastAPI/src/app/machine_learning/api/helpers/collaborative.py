import random
from pandas import DataFrame
from sklearn.metrics.pairwise import cosine_similarity

def similar_users(customerId, user_similarities: DataFrame, k):
    # separating df rows for the entered user id
    user: DataFrame = user_similarities[user_similarities.index == customerId]
    
    # a df of all other users
    other_users: DataFrame = user_similarities[user_similarities.index != customerId]
    
    # calc cosine similarity between user and each other user
    similarities = cosine_similarity(user,other_users)[0].tolist()
    
    # create list of indices of these users
    indices = other_users.index.tolist()
    
    # create key/values pairs of user index and their similarity
    index_similarity = dict(zip(indices, similarities))
    
    # sort by similarity
    index_similarity_sorted = sorted(index_similarity.items(),reverse=True)
    
    sample = k if k < len(index_similarity_sorted) else len(index_similarity_sorted)
    # grab k users off the top
    top_users_similarities = index_similarity_sorted[:sample]
    users = [u[0] for u in top_users_similarities] # returns the index of top 5 similar users
    
    return users

def simu_recommendation(simu: list, df: DataFrame, sample):
    #obtaining all the items bought by similar users
    simu_rec = []
    for j in simu:
        products: DataFrame = df[df["customerId"]==j]
        for index, row in products.iterrows():
            simu_rec.append({
                    "name": row["name"],
                    "productId": row["productId"],
                    "price": row["unitPrice"],
                    "description": row["description"],
                    # "category": row["category"],
                    "brand": row["brand"]
            })
            
    # storing 10 random recommendations in a list
    s = sample if len(simu_rec) >= sample else len(simu_rec)
    ten_recs = random.sample(simu_rec, s)
    
    #returning 10 random recommendations
    return ten_recs

def similar_items(item_id, item_similarity_data: DataFrame, k):
    # separating data rows of the selected item
    item_similarity = item_similarity_data[item_similarity_data.index == item_id]
    
    # a data of all other items
    other_items_similarities = item_similarity_data[item_similarity_data.index != item_id]
    # calculate cosine similarity between selected item with other items
    similarities = cosine_similarity(item_similarity,other_items_similarities)[0].tolist()
    
    # create list of indices of these items
    item_indices = other_items_similarities.index.tolist()
    
    # create key/values pairs of item index and their similarity
    index_similarity_pair = dict(zip(item_indices, similarities))
    # sort by similarity
    sorted_index_similarity_pair = sorted(index_similarity_pair.items())
    
    sample = k if k < len(sorted_index_similarity_pair) else len(sorted_index_similarity_pair)
    # grab k items from the top
    top_k_item_similarities = sorted_index_similarity_pair[:sample]
    similar_items = [u[0] for u in top_k_item_similarities]
    
    return similar_items

def simi_recommendation(customerId, item_similarities: DataFrame, df: DataFrame, k, sample):
    simular_items_recommendation_list = []
    
    # items bought by this user
    item_list_ids = df[df["customerId"]==customerId]['productId'].to_list()
    #$ for each item bought by user get similar items
    for item_id in item_list_ids:
        simi = similar_items(item_id, item_similarities, k)
        simular_items_recommendation_list.append(simi)# add the items to the list
    
    #this gives us multi-dimensional list
    # we need to flatten it
    flat_list = []
    for sublist in simular_items_recommendation_list:
        for item in sublist:
            flat_list.append(item)
    final_recommendations_list = list(dict.fromkeys(flat_list))
    
    # storing 10 random recommendations in a list
    s = sample if len(final_recommendations_list) >= sample else len(final_recommendations_list)
    ten_random_rec = random.sample(final_recommendations_list, s)
    
    prod_rec = []
    for id in ten_random_rec:
        product = {
                    "name": df[df["productId"] == id]["name"].iloc[0],
                    "productId": df[df["productId"] == id]["productId"].iloc[0].astype("str"),
                    "price": df[df["productId"] == id]["unitPrice"].iloc[0],
                    # "category": df[df["productId"] == id]["category"].iloc[0],
                    "brand": df[df["productId"] == id]["brand"].iloc[0]
            }
        prod_rec.append(product)
    #returning 10 random recommendations
    return prod_rec