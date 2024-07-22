from fastapi import HTTPException
from pandas import DataFrame
from sklearn.metrics.pairwise import cosine_similarity, manhattan_distances, euclidean_distances

def find_euclidean_distances(sim_matrix, df: DataFrame, index, n=10):
    # Getting score and index
    result = list(enumerate(sim_matrix[index]))
    
    # Sorting the score and taking to p 10 products
    sorted_result = sorted(result, key=lambda x: x[1], reverse=True)[1:n+40]
    
    similar_products = [
        {
            "value": {
                "name": df.iloc[x[0]]["name"],
                "productId": df.iloc[x[0]]["productId"].astype('str'),
                "price": df.iloc[x[0]]["price"],
                "category": df.iloc[x[0]]["category"],
                "brand": df.iloc[x[0]]["brand"],
            },
            "description": df.iloc[x[0]]["description"],
            "score": round(x[1], 2)
        } 
        for x in sorted_result]
    
    # The key to check for uniqueness
    key = 'description'
    # Set to keep track of unique values for the specified key
    unique_values = set()
    # List to keep unique dictionaries
    unique_dicts = []

    for d in similar_products:
        value = d.get(key)
        if value not in unique_values:
            unique_values.add(value)
            unique_dicts.append(d)
    
    return unique_dicts[:n+1]


def find_cosine_similarity(cosine_sim_matrix, df: DataFrame, index, n=10):
    # Calculate cosine similarity between each vectors
    result = list(enumerate(cosine_sim_matrix[index]))
    # sorting the score i.e., i.e., higherst coefficient
    sorted_result = sorted(result, key=lambda x: x[1], reverse=True)[1:n+40]
    
    similar_products = [
        {
            "value": {
                "name": df.iloc[x[0]]["name"],
                "productId": df.iloc[x[0]]["productId"].astype('str'),
                "price": df.iloc[x[0]]["price"],
                "category": df.iloc[x[0]]["category"],
                "brand": df.iloc[x[0]]["brand"],
            },
            "description": df.iloc[x[0]]["description"],
            "score": round(x[1], 2)
        } 
        for x in sorted_result]
    
    # The key to check for uniqueness
    key = 'description'
    # Set to keep track of unique values for the specified key
    unique_values = set()
    # List to keep unique dictionaries
    unique_dicts = []

    for d in similar_products:
        value = d.get(key)
        if value not in unique_values:
            unique_values.add(value)
            unique_dicts.append(d)
    
    return unique_dicts[:n+1]

def find_manhattan_distance(sim_matrix, df: DataFrame, index, n=10):
    # Getting Score and Index
    result = list(enumerate(sim_matrix[index]))
    
    sorted_result = sorted(result, key=lambda x: x[1], reverse=True)[1:n+40]
    
    similar_products = [
        {
            "value": {
                "name": df.iloc[x[0]]["name"],
                "productId": df.iloc[x[0]]["productId"].astype('str'),
                "price": df.iloc[x[0]]["price"],
                "category": df.iloc[x[0]]["category"],
                "brand": df.iloc[x[0]]["brand"],
            },
            "description": df.iloc[x[0]]["description"],
            "score": round(x[1], 2)
        } 
        for x in sorted_result]
    
    # The key to check for uniqueness
    key = 'description'
    # Set to keep track of unique values for the specified key
    unique_values = set()
    # List to keep unique dictionaries
    unique_dicts = []

    for d in similar_products:
        value = d.get(key)
        if value not in unique_values:
            unique_values.add(value)
            unique_dicts.append(d)
    
    return unique_dicts[:n+1]

def get_recommendation_tfidf(productId, df: DataFrame, similarity, tfidf_matrix, desc_list, n=10, ):
    row = df.loc[df["productId"] == productId]
    if len(row.index) <= 0:
        return
    index = list(row.index)[0]
    
    
    if similarity == "cosine":
        sim_matrix = cosine_similarity(tfidf_matrix,)
        products = find_cosine_similarity(sim_matrix, df, index)
    elif similarity == "manhattan":
        sim_matrix = manhattan_distances(tfidf_matrix)
        products = find_manhattan_distance(sim_matrix, df, index)
    elif similarity == "euclidean":
        sim_matrix = euclidean_distances(tfidf_matrix)
        products = find_euclidean_distances(sim_matrix, df, index)
    else:
        raise HTTPException(status_code=400, detail="Unsurpotted similarity measure")
    temp = {
        "target": {
            "name": row["name"].iloc[0],
            "id": row["productId"].iloc[0].astype("str"),
            "price": row["price"].iloc[0],
            "category": row["category"].iloc[0],
            "description": row["description"].iloc[0],
            "brand": row["brand"].iloc[0],
        },
        "similar_products": products[1:],
    }
    return temp