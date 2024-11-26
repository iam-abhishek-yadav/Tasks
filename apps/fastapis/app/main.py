from fastapi import FastAPI, HTTPException, Depends, Security
from fastapi.security import HTTPBearer
from auth import hash_password, verify_password, create_access_token, decode_access_token
from config import supabase
from models import Task

app = FastAPI()
auth_scheme = HTTPBearer()

@app.post("/signup")
def signup(username: str, email: str, password: str):
    hashed_password = hash_password(password)
    try:
        payload = {"username": username, "email": email, "password": hashed_password}
        response = supabase.table("users").insert(payload).execute()
        if(response):
            return {"message": "User created successfully", "data": response}
        else:
            raise HTTPException(status_code=400, detail="User creation failed")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/login")
def login(email: str, password: str):
    try:
        response = supabase.table("users").select("*").eq("email", email).maybe_single().execute()

        user = response.data  
        if not user:  
            raise HTTPException(status_code=401, detail="Invalid email or password")

        if not verify_password(password, user["password"]):  # Verify the password
            raise HTTPException(status_code=401, detail="Invalid email or password")
    
        data = {"user_id": user["id"], "email": user["email"]}
        access_token = create_access_token(data)
        return {"access_token": access_token}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error logging in: {str(e)}")

@app.get("/protected")
def protected_route(credentials: HTTPBearer = Security(auth_scheme)):
    try:
        token = credentials.credentials
        user_data = decode_access_token(token)  # Decode and verify the token
        return {"message": f"Hello, {user_data['email']}!"}
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Unauthorized: {str(e)}")


@app.get("/")
async def root(credentials: HTTPBearer = Security(auth_scheme)):
    data = supabase.table("users").select("*").execute()
    return {"data": data.data}



@app.post("/add-task")
async def add_task(
    task: Task,
    credentials: HTTPBearer = Security(auth_scheme),
):
    try:
        # Decode the token to get user data
        token = credentials.credentials
        user_data = decode_access_token(token)
        print("Decoded User Data:", user_data)

        # Validate that the user in the token matches `created_by_user_id`
        if str(task.created_by_user_id) != str(user_data["user_id"]):
            raise HTTPException(status_code=403, detail="Forbidden: Invalid user")

        # Prepare the task data
        task_data = task.dict()
        task_data.update({
            "created_by_user_id": user_data["user_id"],
            "user_id": user_data["user_id"]
        })
        print("Prepared Task Data:", task_data)

        # Insert the task into the "task" table
        response = supabase.table("task").insert(task_data).execute()

       
        return {"message": "Task added successfully", "data": response.data}
    except HTTPException as e:
        # Re-raise known HTTPExceptions
        raise e
    except Exception as e:
        # Catch and raise unexpected errors
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
