# 🌏 Travel Itinerary Management System – Full-Stack SDE Intern Assignment

## 📋 Problem Statement

You're tasked with creating a system for managing **travel itineraries** with the following core features:

1. **Database design** using SQLAlchemy to support:
   - Day-wise hotels, activities, and transfers
   - Relationships among these entities
2. **REST API** with FastAPI for:
   - Creating new itineraries
   - Viewing existing ones
3. **MCP Server** (recommendation engine) that:
   - Returns recommended itineraries based on a given number of nights

---

![image](https://github.com/user-attachments/assets/8a2e26e7-b48c-419f-94ee-317cd48a36c6)
![image](https://github.com/user-attachments/assets/ab1d6e99-57e7-4719-8dd7-bfe8d54ba68e)
![image](https://github.com/user-attachments/assets/d6a183fb-85c9-419e-81aa-15a8ae7d93aa)
![image](https://github.com/user-attachments/assets/54430444-00e2-4525-8474-9d1fb2ecb448)



## 🧱 Tech Stack

| Layer        | Technology          |
|--------------|---------------------|
| Backend API  | FastAPI             |
| ORM & DB     | SQLAlchemy + SQLite |
| Frontend     | React               |
| HTTP Client  | Axios               |
| Dev Tools    | VS Code, Git        |

---

## 🗂️ Folder Structure

![image](https://github.com/user-attachments/assets/922c65ef-b175-44cf-bd54-3def33795537)


---

## 🛠️ How to Run

Clone the repository OR Download the ZIP file.

### Backend

```bash
cd app
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

pip install -r requirements.txt
```
```bash
# Run the FastAPI app
uvicorn app.main:app --reload

```

```bash
To seed the database with Phuket and Krabi data:

python app/seed.py

```


FastAPI docs available at:
```bash
📄 http://localhost:8000/docs
```

Frontend
```bash

cd frontend
npm install
npm start
React app available at:
🌐 http://localhost:3000

```


🧠 MCP Server (Recommendation API)
Endpoint:
GET /mcp/recommendations?nights=3

Response:
Returns a list of itineraries with matching duration and top rating limits to 5.

📌 Features Summary
✅ SQLAlchemy models with real relations: Itinerary, DayPlan, Hotel, Activity, Transfer

✅ Seed data for Phuket and Krabi trips

✅ REST APIs to create and view itineraries

✅ MCP server for smart itinerary suggestions by duration

✅ React frontend to interact with all backend features

👤 Author
Full-stack SDE Assignment
Developed by: Manish Kumar
