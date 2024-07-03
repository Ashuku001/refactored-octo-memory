from io import BytesIO, StringIO
from fastapi.responses import StreamingResponse
from matplotlib import pyplot as plt
import numpy as np
import seaborn as sns
import pandas as pd
from scipy.cluster.hierarchy import dendrogram
from sklearn.cluster import  KMeans
from sklearn.feature_extraction.text import TfidfVectorizer, ENGLISH_STOP_WORDS
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfTransformer

def explore_data(df_customer):
    filtered_image = BytesIO()
    plt.figure(figsize=(10, 6))
    plt.title("Ages Frequency")
    sns.violinplot(y=df_customer["age"])
    plt.savefig(filtered_image, format="png")
    # plt.show()
    filtered_image.seek(0)

    filtered_image_2 = BytesIO()
    plt.figure(figsize=(10, 6))
    genders = df_customer.gender.value_counts()
    sns.barplot(x=genders.index, y=genders.values)
    plt.savefig(filtered_image_2, format="png")
    filtered_image_2.seek(0)

    return filtered_image, filtered_image_2

def age_distribution(df_customer):
    # age buckets against number of customers 
    age18_25 = df_customer.age[(df_customer.age <= 25) & (df_customer.age >= 18)]
    age26_35 = df_customer.age[(df_customer.age <= 35) & (df_customer.age >= 26)]
    age36_45 = df_customer.age[(df_customer.age <= 45) & (df_customer.age >= 36)]
    age46_55 = df_customer.age[(df_customer.age <= 55) & (df_customer.age >= 46)]
    age55above = df_customer.age[ df_customer.age >= 56]
    
    filtered_image = BytesIO()
    
    x=["18-25", "26-35", "36-45", "46-55", "55+"]
    y=[len(age18_25.values),
    len(age26_35.values),
    len(age36_45.values),
    len(age46_55.values),
    len(age55above.values),]
    plt.figure(figsize=(15, 6))
    sns.barplot(x=x, y=y, palette="rocket")
    plt.title("Number of Customer and Ages")
    plt.xlabel("age")
    plt.ylabel("Number of Customer")
    
    plt.savefig(filtered_image, format="png") 
    filtered_image.seek(0)
    
    return filtered_image

def elbow_method(df_customer):
    if df_customer.iloc[:, 6:].isnull().values.any():
        print("Data contains NaN values. Please clean your data.")
    else:
        wcss = []
        for k in range(1, 15):
            kmeans = KMeans(n_clusters=k, init="k-means++")
            kmeans.fit(df_customer.iloc[:, 5:])
            wcss.append(kmeans.inertia_)
        
        filtered_image = BytesIO()
        plt.figure(figsize=(12, 6))
        plt.grid()
        plt.plot(range(1, 15), wcss, linewidth=2, color="red", marker="8")
        plt.xlabel("K Value")
        plt.xticks(np.arange(1, 15, 1))
        plt.ylabel("WCSS")
        print("Income_encoder", df_customer["income_segment"].unique())
        plt.savefig(filtered_image, format="png") 
        filtered_image.seek(0)
        
        return filtered_image

def dendogram_method(model, **kwargs):
    # create linkage matrix and then plot the dendrogram
    # create the counts of samples under each node
    counts = np.zeros(model.children_.shape[0])
    n_samples = len(model.labels_)
    
    for i, merge in enumerate(model.children_):
        current_count = 0
        for child_idx in merge:
            if child_idx < n_samples:
                current_count += 1 # leaf node
            else:
                current_count += counts[child_idx - n_samples]
        counts[i] = current_count
    
    linkage_matrix = np.column_stack(
        [model.children_, model.distances_, counts]
    ).astype(float)
    
    # plot the corresponding dendrogram
    dendrogram(linkage_matrix, **kwargs)
    
def plotting_percentages(df, col, target):
    x, y = col, target
    
    # Temporary dataframe with percentage values
    temp_df = df.groupby(x)[y].value_counts(normalize=True)
    temp_df = temp_df.mul(100).rename("percent").reset_index()
    
    # Sort the column values for plotting
    order_list = list(df[col].unique())
    order_list.sort()
    # Plot the figure
    sns.set_theme(font_scale=1.5)
    g = sns.catplot(x=x, y="percent", hue=y, kind="bar", data=temp_df,
                    height=8, aspect=2, order=order_list, legend_out=False)
    g.ax.set_ylim(0, 100)
    
    # Loop through each bar in the graph and add the percentage value 
    for p in g.ax.patches:
        txt = str(round(float(p.get_height()), 1)) + "%"
        txt_x = p.get_x()
        txt_y = p.get_height()
        g.ax.text(txt_x, txt_y, txt)
    
    filtered_image = BytesIO()
    # Set labels and title
    plt.title(f"{col.title()} By Percent {target.title()}", fontdict={"fontsize": 30})
    plt.xlabel(f"{col.title()}", fontdict={"fontsize": 20})
    plt.ylabel(f"{target.title()} Percentage", fontdict={"fontsize": 20})
    plt.xticks(rotation=75)
    plt.savefig(filtered_image, format='png')
    filtered_image.seek(0)
    return filtered_image



# function to find cosine similarity after convertig discerption column to features using TF-IDF
def cosine_similarity_T(df, query):
    # vec = TfidfVectorizer(analyzer="word", stop_words=ENGLISH_STOP_WORDS)
    vec = TfidfVectorizer(stop_words=list(ENGLISH_STOP_WORDS))
    vec_train = vec.fit_transform(df.description)
    vec_query = vec.transform([query])
    
    within_cosine_similarity = []
    for i in range(len(vec_train.todense())):
        within_cosine_similarity.append(cosine_similarity(vec_train[i, :].toarray(), vec_query.toarray())[0][0])
        
    df["Similarity"] = within_cosine_similarity
    return df



def recommend_product(customer_id, score_df: pd.DataFrame, order_cluster_mapping, df_product: pd.DataFrame, df_order: pd.DataFrame, sample):
    # filter for the particular customer
    cluster_score_df = score_df[score_df.cluster == order_cluster_mapping[order_cluster_mapping.customerId == customer_id]['cluster'].iloc[0]]
    
    # filter top 5 stock codes for recommendation
    top_5_non_bought = cluster_score_df[~cluster_score_df.productId.isin(order_cluster_mapping[order_cluster_mapping.customerId == customer_id]["productId"])].nlargest(5, "score")
    
    print("\n--- top 5 productId - Non bought ----------- \n")
    print(top_5_non_bought)
    print("\n------ Recommmendations Non bought ----------- \n")
    
    # printing product names from product table
    sim_u_recommendations = df_product[df_product.productId.isin(top_5_non_bought.productId)].drop_duplicates(subset=["productId"], keep="first")[: sample + 1]
    print(sim_u_recommendations)
    
    cust_orders = df_order[df_order.customerId == customer_id][["customerId", "productId"]]
    
    top_orders = cust_orders.groupby(["productId"]).count().reset_index()
    top_orders = top_orders.rename(columns = {"customerId": "counts"})
    top_orders["customerId"] = customer_id
    
    top_5_bought = top_orders.nlargest(5, "counts")
    
    print("\n--- top 5 productId - bought ------- \n")
    print(top_5_bought)
    print("\n------ Stock code Product (Bought) - description cluster Mapping-------\n")
    top_clusters = df_product[df_product.productId.isin(top_5_bought.productId.tolist())][["productId", "cluster"]]
    print(top_clusters)
    
    df = df_product[df_product["cluster"] == df_product[df_product.productId == top_clusters.productId.iloc[0]]["cluster"].iloc[0]]
    query = df_product[df_product.productId == top_clusters.productId.iloc[0]]["description"].iloc[0]
    
    print("\nquery\n")
    # print(query)
    
    temp = cosine_similarity_T(df, query)
    sim_i_recommendations= temp.nlargest(3, "Similarity").drop_duplicates(subset=["productId"], keep="first")[: sample + 1]
    print('\n>>>sim_i_recommendations', sim_i_recommendations)
    return sim_u_recommendations, sim_i_recommendations