from __future__ import annotations

import argparse
import sqlite3
from pathlib import Path
from typing import Any


DEFAULT_DB_PATH = Path(__file__).resolve().parents[1] / "data" / "vocab.db"
DEFAULT_TABLE = "vocab_items"


def print_section(title: str) -> None:
    print()
    print("=" * 80)
    print(title)
    print("=" * 80)


def connect(db_path: Path) -> sqlite3.Connection:
    if not db_path.exists():
        raise FileNotFoundError(f"Database file not found: {db_path}")

    connection = sqlite3.connect(db_path)
    connection.row_factory = sqlite3.Row
    return connection


def get_tables(connection: sqlite3.Connection) -> list[str]:
    rows = connection.execute(
        """
        SELECT name
        FROM sqlite_master
        WHERE type = 'table'
        ORDER BY name
        """
    ).fetchall()
    return [row["name"] for row in rows]


def print_tables(connection: sqlite3.Connection) -> list[str]:
    tables = get_tables(connection)
    print_section("Tables")

    if not tables:
        print("No tables found.")
        return tables

    for table in tables:
        count = connection.execute(f'SELECT COUNT(*) AS total FROM "{table}"').fetchone()
        print(f"- {table}: {count['total']} rows")

    return tables


def print_schema(connection: sqlite3.Connection, table: str) -> None:
    print_section(f"Schema: {table}")

    rows = connection.execute(f'PRAGMA table_info("{table}")').fetchall()
    if not rows:
        print(f"Table not found: {table}")
        return

    print(f"{'Column':<20} {'Type':<16} {'Required':<10} {'Default':<20} {'PK'}")
    print("-" * 80)

    for row in rows:
        required = "yes" if row["notnull"] else "no"
        default = "" if row["dflt_value"] is None else str(row["dflt_value"])
        primary_key = "yes" if row["pk"] else "no"
        print(
            f"{row['name']:<20} {row['type']:<16} "
            f"{required:<10} {default:<20} {primary_key}"
        )


def get_columns(connection: sqlite3.Connection, table: str) -> list[str]:
    rows = connection.execute(f'PRAGMA table_info("{table}")').fetchall()
    return [row["name"] for row in rows]


def format_value(value: Any, max_width: int = 40) -> str:
    if value is None:
        return "NULL"

    text = str(value).replace("\n", " ")
    if len(text) > max_width:
        return text[: max_width - 3] + "..."

    return text


def print_rows(connection: sqlite3.Connection, table: str, limit: int) -> None:
    print_section(f"Data: {table}")

    columns = get_columns(connection, table)
    if not columns:
        print(f"Table not found: {table}")
        return

    order_column = "id" if "id" in columns else "rowid"
    rows = connection.execute(
        f'SELECT * FROM "{table}" ORDER BY {order_column} DESC LIMIT ?',
        (limit,),
    ).fetchall()

    if not rows:
        print("No rows found.")
        return

    columns = rows[0].keys()
    widths = {
        column: min(
            max(len(column), *(len(format_value(row[column])) for row in rows)),
            40,
        )
        for column in columns
    }

    header = " | ".join(f"{column:<{widths[column]}}" for column in columns)
    divider = "-+-".join("-" * widths[column] for column in columns)
    print(header)
    print(divider)

    for row in rows:
        print(
            " | ".join(
                f"{format_value(row[column]):<{widths[column]}}" for column in columns
            )
        )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Show SQLite database tables, schema, and sample rows."
    )
    parser.add_argument(
        "--db",
        default=str(DEFAULT_DB_PATH),
        help=f"Path to SQLite database. Default: {DEFAULT_DB_PATH}",
    )
    parser.add_argument(
        "--table",
        default=DEFAULT_TABLE,
        help=f"Table to inspect. Default: {DEFAULT_TABLE}",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=20,
        help="Maximum rows to show. Default: 20",
    )
    parser.add_argument(
        "--all-tables",
        action="store_true",
        help="Show schema and data for every table.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    db_path = Path(args.db).resolve()

    with connect(db_path) as connection:
        print(f"Database: {db_path}")
        tables = print_tables(connection)

        selected_tables = tables if args.all_tables else [args.table]
        for table in selected_tables:
            print_schema(connection, table)
            print_rows(connection, table, args.limit)


if __name__ == "__main__":
    main()
