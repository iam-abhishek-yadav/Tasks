from pydantic import BaseModel
from uuid import UUID

class User(BaseModel):
    name: str
    email: str
    password: str

class Task(BaseModel):
    title: str
    description: str
    status: str
    user_id: UUID
    created_by_user_id: UUID