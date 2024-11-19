import os
from supabase import create_client, Client
from dotenv import load_dotenv
load_dotenv()
url = os.getenv('SUPABASE_SUPAFAST_URL')
key = os.getenv('SUPABASE_SUPAFAST_KEY')
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRATION = int(os.getenv("JWT_EXPIRATION", 3600))
supabase:Client = create_client(url, key)

# JWT secret
JWT_SECRET = os.getenv("JWT_SECRET", "secret")
