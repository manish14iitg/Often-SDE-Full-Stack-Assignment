from app.models import Itinerary
from sqlalchemy.orm import Session
from typing import List

def recommend_itineraries(nights: int, db: Session) -> List[Itinerary]:
    # Example: return top 5 itineraries with given nights, sorted by rating
    return db.query(Itinerary)\
             .filter(Itinerary.nights == nights)\
             .order_by(Itinerary.rating.desc())\
             .limit(5)\
             .all()