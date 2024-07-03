from piccolo.engine.postgres import PostgresEngine

from piccolo.conf.apps import AppRegistry


DB = PostgresEngine(
    config={
        "database": "crm",
        "user": "postgres",
        "password": "admin",
        "host": "localhost",
        "port": 5432,
    }
)

APP_REGISTRY = AppRegistry(
    apps=[ "piccolo_admin.piccolo_app", 
          "app.store_insights.piccolo_app", 
          "app.machine_learning.piccolo_app",
          "app.blog.piccolo_app"
        ]
)
 