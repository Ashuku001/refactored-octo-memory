from piccolo.engine.postgres import PostgresEngine
from dotenv import load_dotenv
from piccolo.conf.apps import AppRegistry
import os

load_dotenv()

DB = PostgresEngine(
    config={
        "database": os.environ.get("PG_DB"),
        "user": os.environ.get("PG_USERNAME"),
        "password": os.environ.get("PG_PASSWORD"),
        "host": os.environ.get("PG_HOST"),
        "port": os.environ.get("PG_PORT"),
    }
)

APP_REGISTRY = AppRegistry(
    apps=[ "piccolo_admin.piccolo_app", 
          "app.store_insights.piccolo_app", 
          "app.machine_learning.piccolo_app",
          "app.blog.piccolo_app"
        ]
)
 