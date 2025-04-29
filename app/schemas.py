from typing import List, Optional
from pydantic import BaseModel

# -----------------------
# Nested Models
# -----------------------

class Hotel(BaseModel):
    name: str
    location: str

    class Config:
        orm_mode = True

class Activity(BaseModel):
    name: str
    description: Optional[str] = None

    class Config:
        orm_mode = True

class Transfer(BaseModel):
    from_location: str
    to_location: str
    mode: str

    class Config:
        orm_mode = True

class DayPlan(BaseModel):
    day_number: int
    hotel: Optional[Hotel] = None
    activities: List[Activity] = []
    transfers: List[Transfer] = []

    class Config:
        orm_mode = True

# -----------------------
# Itinerary Models
# -----------------------

class ItineraryCreate(BaseModel):
    name: str
    region: str
    nights: int
    

class Itinerary(BaseModel):
    id: int
    name: str
    region: str
    nights: int
    day_plans: List[DayPlan] = []
    rating: float

    class Config:
        orm_mode = True
