
- User authentication with JWT tokens.
- Role-based access control for routes.


## 🛠️ Features
- User Signup & Login.
- Password hashing and validation.
- JWT-based authentication.
- Protected routes using custom HTTPBearer security.


## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- [Python 3.8+](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/)
- [Supabase CLI (optional)](https://supabase.com/docs/reference/cli/installation)


```bash
cd app/fastapi
```

1. **get in Virtual Environment**:
   ```bash
   source .venv/Script/activate  # On Windows: env\Scripts\activate
   ```

2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set Environment Variables**:
   Create a `.env` file in the project root and add the following:
   ```env
   SUPABASE_SUPAFAST_URL = "https://xsaynpaaqkjpecyyircd.supabase.co"
  SUPABASE_SUPAFAST_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzYXlucGFhcWtqcGVjeXlpcmNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTkyNjgwMiwiZXhwIjoyMDQ3NTAyODAyfQ.P9qNqFCWB0N1qZv-Tc8qAPMz4jO-Asgq_0vIbVFsV24"
  JWT_SECRET="SHASHWAT"
   ```

4. **Start the Development Server**:
   ```bash
   uvicorn main:app --reload    or fastapi run main.py
   ```

   Access the API docs at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)


## 🏗️ Project Structure

```plaintext
.
├── app/
│   ├── auth/                # Authentication logic (JWT, password hashing)
│   ├── routes/              # API routes
│   ├── models/              # Database models
│   ├── schemas/             # Pydantic schemas
│   ├── config.py            # Project configuration
│   └── main.py              # Application entry point
├── tests/                   # Unit and integration tests
├── requirements.txt         # Python dependencies
├── README.md                # Project documentation
├── .env                     # Environment variables
└── Dockerfile               # Docker configuration
```
