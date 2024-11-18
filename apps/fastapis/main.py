from fastapi import FastAPI, Query
from db.supabase import supabase
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
  name: str
  email: str
  password: str

# @app.get("/")
# async def root():
#   data = supabase.table("users").select("*").execute()
#   return {"data": data.data}

@app.get("/users/{user_id}")
async def get_user(user_id: str):
  data = supabase.table("users").select("*").eq("id", user_id).execute()
  return {"data": data.data}

# @app.get("/users/me")
# async def read_user_me():
#     return {"user_id": "the current user"}


# @app.get("/users/{user_id}")
# async def read_user(user_id: str):
#     return {"user_id": user_id}


@app.get("/list-of-users/")
async def read_item(skip: int = 0, limit: int = 10):
    data = supabase.table("users").select("*").execute()
    return data.data[skip : skip + limit]

@app.post("/create-users/")
async def create_user(user: User):
    data = supabase.table("users").insert({"name": user.name, "email": user.email, "password": user.password}).execute()
    return {"data": data.data}

@app.post("/login/")
async def login(email: str, password: str):
    data = supabase.table("users").select("*").eq("email", email).execute()
    return {"data": data.data}