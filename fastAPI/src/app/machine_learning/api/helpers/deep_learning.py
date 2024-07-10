import tensorflow as tf
def get_recommendation(customer_id, df_order, all_predictions, df_product):
    print(" \n---------- Top 5 Bought StockCodes -----------\n")
    
    print(df_order[df_order['CustomerID']==customer_id][['CustomerID','StockCode','Quantity']].nlargest(5,'Quantity'))

    top_5_bought = df_order[df_order['CustomerID']==customer_id][['CustomerID','StockCode','Quantity']].nlargest(5,'Quantity')

    print('\n-------Product Name of bought StockCodes ------\n')

    print(df_product[df_product.StockCode.isin(top_5_bought.StockCode)]['Product Name'])


    print("\n --------- Top 5 Recommendations ------------ \n")

    print(all_predictions[all_predictions['CustomerID']==customer_id].nlargest(5,'probability'))

    recommend = all_predictions[all_predictions['CustomerID']==customer_id].nlargest(5,'probability')

    print('\n-------Product Name of Recommendations ------\n')

    print(df_product[df_product.StockCode.isin(recommend.StockCode)]['Product Name'])
    
    
class NCFWrapper:
  def __init__(self, model):
    self.model = model

