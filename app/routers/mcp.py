from fastapi import APIRouter, Query, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Itinerary as ItineraryModel
from app.schemas import Itinerary as ItinerarySchema
from typing import List
from app.utils.recommendation_engine import recommend_itineraries

router = APIRouter(prefix="/mcp", tags=["MCP"])

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------------------------
# GET: Recommended itineraries by number of nights
# -------------------------

@router.get("/recommendations", response_model=List[ItinerarySchema])
def get_recommendations(nights: int = Query(..., gt=0), db: Session = Depends(get_db)):
    return recommend_itineraries(nights, db)