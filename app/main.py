from fastapi import FastAPI
from app.database import engine
from app import models
from app.routers import itineraries, mcp
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
# Allow frontend (e.g., Vite on port 5173) to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
models.Base.metadata.create_all(bind=engine)


app.include_router(itineraries.router)
app.include_router(mcp.router)
@app.get("/")
def read_root():
    return {"message": "Travel itinerary backend is running!"}
