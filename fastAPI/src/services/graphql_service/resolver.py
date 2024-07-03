from typing import List
import strawberry
from .controller import Queries
from .schema import StoreType
from strawberry.fastapi import GraphQLRouter

@strawberry.type
class Query:
    stores: List[StoreType] = strawberry.field(resolver=Queries.get_all_products)

schema = strawberry.Schema(query=Query)  # new
graphql_app = GraphQLRouter(schema)  # new