from fastapi import FastAPI, HTTPException, Depends, Security
from fastapi.security import HTTPBearer
from auth import hash_password, verify_password, create_access_token, decode_access_token
from config import supabase

app = FastAPI()
auth_scheme = HTTPBearer()

@app.post("/signup")
def signup(email: str, password: str):
    """
    Manually register a new user.
    """
    hashed_password = hash_password(password)
    try:
        newUser = supabase.table("users").insert({"email": email, "password": hashed_password}).execute()
        return {"message": "User created successfully", "user": newUser}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/login")
def login(email: str, password: str):
    try:
        # Query the user by email
        response = supabase.table("users").select("*").eq("email", email).maybe_single().execute()

        user = response.data  # Get the user data from response
        if not user:  # Check if user exists
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