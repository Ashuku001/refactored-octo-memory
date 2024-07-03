from contextlib import asynccontextmanager
import typing as t 

from starlette.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from piccolo_api.crud.serializers import create_pydantic_model
from piccolo_api.fastapi.endpoints import FastAPIWrapper
from piccolo_api.crud.endpoints import PiccoloCRUD
from piccolo.engine import engine_finder 
 
####################
from app.symbolic_computations.combination import router as combination_router
from app.store_insights.api.stores import router as store_router
from app.store_insights.api.sales import router as sales_router
from app.machine_learning.api.memory_based.content_filtering import router as content_filter_router
from app.machine_learning.api.memory_based.collaborative_filtering import router as collaborative_filter_router
from app.machine_learning.api.model_based.knn import router as knn_router
from app.machine_learning.api.model_based.nmf_svd_knn_coClustering import router as nmf_router
from app.machine_learning.api.hybrid.hybrid import router as hybrid_router
from app.machine_learning.api.unsupervised_model.clustering import router as clustering_router
from app.machine_learning.api.supervised_model.classification import router as classification_router
############################
from services.graphql_service.resolver import graphql_app


############# configure app
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the ML model
    try:
        engine = engine_finder()
        await engine.start_connection_pool()
    except Exception:
        print("Unable to connect to the database")
    yield
    # Clean up the ML models and release the resources
    try:
        engine = engine_finder()
        await engine.close_connection_pool()
    except Exception:
        print("Unable to connect to the database")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://cesNextClient:3000", "https://hello-customer.onrender.com"],
    allow_credentials=True, # allowed to send cookies 
    allow_methods=["*"],
    allow_headers=["*"],
    max_age=-1,  # Only for the sake of the example. Remove this in your own project.
)

###############################################
app.include_router(combination_router, prefix="/combinations", tags=["combinations"])
app.include_router(store_router, prefix="/store", tags=["Store Insights"])
app.include_router(sales_router, prefix="/store/sales", tags=["Store Sales"])
app.include_router(content_filter_router, prefix="/memory/content", tags=["memory filter"], )
app.include_router(collaborative_filter_router, prefix="/memory/collaborative", tags=["memory filter"])
app.include_router(knn_router, prefix="/model/collaborative", tags=["model filter"])
app.include_router(nmf_router, prefix="/model/collaborative", tags=["model filter"])
app.include_router(hybrid_router, prefix="/model/hybrid", tags=["model hybrid"])
app.include_router(clustering_router, prefix="/unsupervised_model/clustering", tags=["unsupervised model"])
app.include_router(classification_router, prefix="/supervised_model/classification", tags=["unsupervised model"])

app.include_router(graphql_app, prefix="/graphql", tags=["graphql"]) 


# FastAPIWrapper(
#     "/sales",
#     app,
#     PiccoloCRUD(
#         table=Sale,
#         read_only=True,
#         exclude_secrets=True,
#         max_joins=1
#     )
# )
# FastAPIWrapper(
#     "/sales-details",
#     app,
#     PiccoloCRUD(
#         table=SaleDetail,
#         read_only=True,
#         exclude_secrets=True,
#         max_joins=1
#     )
# )