from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./travel.db"  # For local testing. Change this for PostgreSQL if needed.

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}  # Required only for SQLite
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
