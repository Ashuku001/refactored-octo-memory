from lightfm import LightFM
import numpy as np
from scipy.sparse import coo_matrix
import pandas as pd
import time 
from lightfm.evaluation import auc_score


def unique_users(data, column):
    return np.sort(data[column].unique())

def unique_items(data, column):
    item_list = data[column].unique()
    return item_list

# list of unique values given three freature names from a DF
def features_to_add(customer, column1, column2, column3):
    customer1 = customer[column1]
    customer2 = customer[column2]
    customer3 = customer[column3]
    
    return pd.concat([customer1, customer2, customer3], ignore_index=True).unique()

def mapping(user_list, item_list, feature_unique_list):
    # create empty output dits
    user_to_index_mapping = {}
    index_to_user_mapping = {}
    # Create id mappings to convert user_id
    for user_index, user_id in enumerate(user_list):
        user_to_index_mapping[user_id] = user_index
        index_to_user_mapping[user_index] = user_id
    
    item_to_index_mapping = {}
    index_to_item_mapping = {}
    # Create id mappings to convert item_id
    for item_index, item_id in enumerate(item_list):
        item_to_index_mapping[item_id] = item_index
        index_to_item_mapping[item_index] = item_id
        
    feature_to_index_mapping = {}
    index_to_feature_mapping = {}
    # Create id mappings to convert feature_id
    for feature_index, feature_id in enumerate(feature_unique_list):
        feature_to_index_mapping[feature_id] = feature_index
        index_to_feature_mapping[feature_index] = feature_id
    
    return user_to_index_mapping, index_to_user_mapping, \
        item_to_index_mapping, index_to_item_mapping, \
            feature_to_index_mapping, index_to_feature_mapping,
            
def interactions(data, row, col, value, row_map, col_map):
    # convert the row with its given mappings
    row = data[row].apply(lambda x: row_map[x]).values
    
    # convert the col with its given mappints
    col = data[col].apply(lambda x: col_map[x]).values
    value = data[value].values
    
    # returning the interactio matrix
    return coo_matrix((value, (row, col)), shape=(len(row_map), len(col_map)))

# Merge train and test
def train_test_merge(training_data, testing_data):
    # Initialising train dict
    train_dict = {}
    for row, col, data in zip(training_data.row, training_data.col, training_data.data):
        train_dict[(row, col)] = data
    
    # replacing with the test set
    for row, col, data in zip(testing_data.row, testing_data.col, testing_data.data):
        train_dict[(row, col)] = max(data, train_dict.get((row, col), 0))
        
    # Converting to the row
    row_list = []
    col_list = []
    data_list = []
    for row, col in train_dict:
        row_list.append(row)
        col_list.append(col)
        data_list.append(train_dict[(row, col)])
        
    # Converting to np.array
    row_list = np.array(row_list)
    col_list = np.array(col_list)
    data_list = np.array(data_list)
    
    # returnign the matrix output
    return coo_matrix((data_list, (row_list, col_list)), shape = (training_data.shape[0], training_data.shape[1]))


def select_model(
    user_to_product_interaction_train,
    product_to_feature_interaction,
    user_to_product_interaction_test,
):
    print("Selecting model>>>>>>>>>>>>>>>>>?")
    algorithms = {
        "warp": {
            "time_tr": "",
            "time_auc": "",
            "auc": "",
        },
        "logisting": {
            "time_tr": "",
            "time_auc": "",
            "auc": "",
        },
        "bpr": {
            "time_auc": "",
            "time_tr": "",
            "auc": "",
        },
    }
    
    # initialising model with warp loss function
    model_with_features = LightFM(loss = "warp")
    # fitting the model with hybrid collaborative filtering + content based (product + features)
    start = time.time()
    print('training warp')
    #===================
    model_with_features.fit_partial(user_to_product_interaction_train,
            user_features=None, 
            item_features=product_to_feature_interaction, 
            sample_weight=None, 
            epochs=1, 
            num_threads=4,
            verbose=False)
    #===================
    end = time.time()
    algorithms["warp"]["time_tr"] = format(end - start, 2)
    print("time taken = {0:.{1}f} seconds".format(end - start, 2))
    # Calculate the area under the curve (AUC) score for validation
    start = time.time()
    # =================
    # Getting the AUC score using built in function
    auc_with_features = auc_score(model = model_with_features,
                                test_interactions = user_to_product_interaction_test,
                                train_interactions=user_to_product_interaction_train,
                                item_features=product_to_feature_interaction,
                                num_threads = 4, check_intersections=False
                                )

    end = time.time()
    algorithms["warp"]["time_auc"] = format(end - start, 2)
    print(f"Time taken = {format(end - start, 2)}")
    algorithms["warp"]["auc"] = format(auc_with_features.mean(), 2)
    print(f"Average AUC without adding item-feature interaction = {format(auc_with_features.mean(), 2)}")
    
    # initialising model with warp loss function
    model_with_features = LightFM(loss = "bpr")

    # fitting the model with hybrid collaborative filtering + content based (product + features)
    start = time.time()
    #===================


    model_with_features.fit_partial(user_to_product_interaction_train,
            user_features=None, 
            item_features=product_to_feature_interaction, 
            sample_weight=None, 
            epochs=1, 
            num_threads=4,
            verbose=False)

    #===================
    end = time.time()
    algorithms["bpr"]["time_tr"] = format(end - start, 2)
    print("time taken = {0:.{1}f} seconds".format(end - start, 2))
    
    start = time.time()
    #===================
    auc_with_features = auc_score(model = model_with_features, 
                            test_interactions = user_to_product_interaction_test,
                            train_interactions = user_to_product_interaction_train, 
                            item_features = product_to_feature_interaction,
                            num_threads = 4, check_intersections=False)
    #===================
    end = time.time()
    algorithms["bpr"]["time_auc"] = format(end - start, 2)
    print("time taken = {0:.{1}f} seconds".format(end - start, 2))
    algorithms["bpr"]["auc"] = format(auc_with_features.mean(), 2)
    print("average AUC without adding item-feature interaction = {0:.{1}f}".format(auc_with_features.mean(), 2))
    
    model_with_features = LightFM(loss = "logistic")

    # fitting the model with hybrid collaborative filtering + content based (product + features)
    start = time.time()
    #===================


    model_with_features.fit_partial(user_to_product_interaction_train,
            user_features=None, 
            item_features=product_to_feature_interaction, 
            sample_weight=None, 
            epochs=10, 
            num_threads=20,
            verbose=False)

    #===================
    end = time.time()
    algorithms["logistic"]["time_tr"] = format(end - start, 2)
    print("time taken = {0:.{1}f} seconds".format(end - start, 2))
    
    start = time.time()
    #===================
    auc_with_features = auc_score(model = model_with_features, 
                            test_interactions = user_to_product_interaction_test,
                            train_interactions = user_to_product_interaction_train, 
                            item_features = product_to_feature_interaction,
                            num_threads = 4, check_intersections=False)
    #===================
    end = time.time()
    algorithms["logistic"]["time_tr"] = format(end - start, 2)
    print("time taken = {0:.{1}f} seconds".format(end - start, 2))
    algorithms["logistic"]["time_tr"] = format(auc_with_features.mean(), 2)
    print("average AUC without adding item-feature interaction = {0:.{1}f}".format(auc_with_features.mean(), 2))
    
    best_model_name = max(algorithms, lambda x: algorithms[x]["auc"])
    best_model_info = algorithms[best_model_name]
    
    return best_model_name, best_model_info

# Merge train and test
def train_test_merge(training_data, testing_data):
    # Initialising train dict
    train_dict = {}
    for row, col, data in zip(training_data.row, training_data.col, training_data.data):
        train_dict[(row, col)] = data
    
    # replacing with the test set
    for row, col, data in zip(testing_data.row, testing_data.col, testing_data.data):
        train_dict[(row, col)] = max(data, train_dict.get((row, col), 0))
        
    # Converting to the row
    row_list = []
    col_list = []
    data_list = []
    for row, col in train_dict:
        row_list.append(row)
        col_list.append(col)
        data_list.append(train_dict[(row, col)])
        
    # Converting to np.array
    row_list = np.array(row_list)
    col_list = np.array(col_list)
    data_list = np.array(data_list)
    
    # returnign the matrix output
    return coo_matrix((data_list, (row_list, col_list)), shape = (training_data.shape[0], training_data.shape[1]))


def get_recommendations(model, user, items, user_to_product_interaction_matrix, user2index_map, product_to_feature_interaction_matrix):
    # getting the user index
    userindex = user2index_map.get(user, None)
    
    if userindex == None:
        return None
    users = userindex
    
    # gettign products already bought
    known_positives = items[user_to_product_interaction_matrix.tocsr()[userindex].indices]
    print("User index = ", users)
    
    
    # scores from model prediction
    scores = model.predict(user_ids = users, 
                           item_ids = np.arange(user_to_product_interaction_matrix.shape[1]),
                           item_features=product_to_feature_interaction_matrix)
    
    # Getting top items
    top_items = items[np.argsort(-scores)]
    
    # printing out the results
    print("User %s" % user)
    print(" Known positives: ")
    for x in known_positives[:10]:
        print("     %s" % x)
    print("     Recommened: ")
    for x in top_items[:10]:
        print("       %s" % x)