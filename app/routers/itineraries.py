from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas, crud
from app.database import SessionLocal

router = APIRouter(prefix="/itineraries", tags=["Itineraries"])

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------------------------
# GET: All itineraries
# -------------------------

@router.get("/", response_model=list[schemas.Itinerary])
def read_itineraries(db: Session = Depends(get_db)):
    return crud.get_itineraries(db)

# -------------------------
# GET: Single itinerary by ID
# -------------------------

@router.get("/{itinerary_id}", response_model=schemas.Itinerary)
def read_itinerary(itinerary_id: int, db: Session = Depends(get_db)):
    itinerary = crud.get_itinerary(db, itinerary_id)
    if not itinerary:
        raise HTTPException(status_code=404, detail="Itinerary not found")
    return itinerary

# -------------------------
# POST: Create new itinerary
# -------------------------

@router.post("/", response_model=schemas.Itinerary)
def create_itinerary(itinerary: schemas.ItineraryCreate, db: Session = Depends(get_db)):
    return crud.create_itinerary(db, itinerary)
