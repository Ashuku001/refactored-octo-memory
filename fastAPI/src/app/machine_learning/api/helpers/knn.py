# fetch similar users using the model
import random
from pandas import DataFrame


def similar_users_knn(model, purchase_df, query_index):
 
    similar_users_knn = []
    distances, indices = model.kneighbors(purchase_df.loc[query_index, :].values.reshape(1, -1), n_neighbors=5)
    
    for i in range(0, len(distances.flatten())):
        if i == 0:
            print("Recommendation for {0}:\n".format(purchase_df.index[query_index]))
        else:
            print('{0}: {1}, with distance of {2}:'.format(i, purchase_df.index[indices.flatten()[i]], distances.flatten()[i]))
            
            similar_users_knn.append(purchase_df.index[indices.flatten()[i]])
    return similar_users_knn

# getting similar users recommendations
def knn_recommendation(similar_users_knn, df: DataFrame):
    # obtaining all the itesm bought by similar users
    knn_recommendation = []
    for j in similar_users_knn:
        item_list = df[df["customerId"] == j]["productId"].to_list() # items bought by each user similar to the one we wish to recommend to
        for i in item_list:
            product = {
                "name": df[df["productId"] == i]["name"].iloc[0],
                "productId": df[df["productId"] == i]["productId"].iloc[0].astype('str'),
                "price": df[df["productId"] == i]["unitPrice"].iloc[0],
                # "category": df[df["productId"] == i]["category"].iloc[0],
                "brand": df[df["productId"] == i]["brand"].iloc[0]
            }
            knn_recommendation.append(product)
    
    sample = 10 if len(knn_recommendation) >= 10 else len(knn_recommendation)
    ten_random_recommendations  = random.sample(knn_recommendation, sample)
    return ten_random_recommendations