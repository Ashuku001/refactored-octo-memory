from piccolo.apps.migrations.auto.migration_manager import MigrationManager
from piccolo.columns.base import OnDelete
from piccolo.columns.base import OnUpdate
from piccolo.columns.column_types import ForeignKey
from piccolo.columns.column_types import Serial
from piccolo.columns.column_types import Varchar
from piccolo.columns.indexes import IndexMethod
from piccolo.table import Table


class Product(Table, tablename="Products", schema=None):
    id = Serial(
        null=False,
        primary_key=True,
        unique=False,
        index=False,
        index_method=IndexMethod.btree,
        choices=None,
        db_column_name="id",
        secret=False,
    )


class Store(Table, tablename="Stores", schema=None):
    id = Serial(
        null=False,
        primary_key=True,
        unique=False,
        index=False,
        index_method=IndexMethod.btree,
        choices=None,
        db_column_name="id",
        secret=False,
    )


ID = "2024-07-20T00:21:03:471651"
VERSION = "1.7.0"
DESCRIPTION = ""


async def forwards():
    manager = MigrationManager(
        migration_id=ID, app_name="machine_learning", description=DESCRIPTION
    )

    manager.add_table(
        class_name="Image", tablename="Images", schema=None, columns=None
    )

    manager.add_column(
        table_class_name="Image",
        tablename="Images",
        column_name="url",
        db_column_name="url",
        column_class_name="Varchar",
        column_class=Varchar,
        params={
            "length": 255,
            "default": "",
            "null": False,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
        schema=None,
    )

    manager.add_column(
        table_class_name="Image",
        tablename="Images",
        column_name="productId",
        db_column_name="productId",
        column_class_name="ForeignKey",
        column_class=ForeignKey,
        params={
            "references": Product,
            "on_delete": OnDelete.cascade,
            "on_update": OnUpdate.cascade,
            "target_column": None,
            "null": True,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
        schema=None,
    )

    manager.add_column(
        table_class_name="Image",
        tablename="Images",
        column_name="storeId",
        db_column_name="storeId",
        column_class_name="ForeignKey",
        column_class=ForeignKey,
        params={
            "references": Store,
            "on_delete": OnDelete.cascade,
            "on_update": OnUpdate.cascade,
            "target_column": None,
            "null": True,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
        schema=None,
    )

    manager.alter_column(
        table_class_name="Category",
        tablename="Categories",
        column_name="storeId",
        db_column_name="storeId",
        params={"unique": False},
        old_params={"unique": True},
        column_class=ForeignKey,
        old_column_class=ForeignKey,
        schema=None,
    )

    manager.alter_column(
        table_class_name="Customer",
        tablename="Customers",
        column_name="merchantId",
        db_column_name="merchantId",
        params={"unique": False},
        old_params={"unique": True},
        column_class=ForeignKey,
        old_column_class=ForeignKey,
        schema=None,
    )

    manager.alter_column(
        table_class_name="Merchant",
        tablename="Merchants",
        column_name="email",
        db_column_name="email",
        params={"unique": True},
        old_params={"unique": False},
        column_class=Varchar,
        old_column_class=Varchar,
        schema=None,
    )

    manager.alter_column(
        table_class_name="Merchant",
        tablename="Merchants",
        column_name="whatsapp_phone_number",
        db_column_name="whatsapp_phone_number",
        params={"unique": True},
        old_params={"unique": False},
        column_class=Varchar,
        old_column_class=Varchar,
        schema=None,
    )

    manager.alter_column(
        table_class_name="Product",
        tablename="Products",
        column_name="categoryId",
        db_column_name="categoryId",
        params={"unique": False},
        old_params={"unique": True},
        column_class=ForeignKey,
        old_column_class=ForeignKey,
        schema=None,
    )

    manager.alter_column(
        table_class_name="Product",
        tablename="Products",
        column_name="storeId",
        db_column_name="storeId",
        params={"unique": False},
        old_params={"unique": True},
        column_class=ForeignKey,
        old_column_class=ForeignKey,
        schema=None,
    )

    manager.alter_column(
        table_class_name="Sale",
        tablename="Sales",
        column_name="customerId",
        db_column_name="customerId",
        params={"unique": False},
        old_params={"unique": True},
        column_class=ForeignKey,
        old_column_class=ForeignKey,
        schema=None,
    )

    manager.alter_column(
        table_class_name="Sale",
        tablename="Sales",
        column_name="storeId",
        db_column_name="storeId",
        params={"unique": False},
        old_params={"unique": True},
        column_class=ForeignKey,
        old_column_class=ForeignKey,
        schema=None,
    )

    manager.alter_column(
        table_class_name="SaleDetail",
        tablename="SaleDetails",
        column_name="salesId",
        db_column_name="salesId",
        params={"unique": False},
        old_params={"unique": True},
        column_class=ForeignKey,
        old_column_class=ForeignKey,
        schema=None,
    )

    manager.alter_column(
        table_class_name="SaleDetail",
        tablename="SaleDetails",
        column_name="productId",
        db_column_name="productId",
        params={"unique": False},
        old_params={"unique": True},
        column_class=ForeignKey,
        old_column_class=ForeignKey,
        schema=None,
    )

    manager.alter_column(
        table_class_name="Store",
        tablename="Stores",
        column_name="merchantId",
        db_column_name="merchantId",
        params={"unique": False},
        old_params={"unique": True},
        column_class=ForeignKey,
        old_column_class=ForeignKey,
        schema=None,
    )

    return manager
