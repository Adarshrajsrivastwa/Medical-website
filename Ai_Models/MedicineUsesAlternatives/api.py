from fastapi import FastAPI, HTTPException
import pandas as pd
from datetime import datetime

app = FastAPI()

# Load Data
df = pd.read_csv(r"") # copy path of data set in f string

@app.get("/")
def home():
    return {"message": "Welcome to the Medicine API!"}

@app.get("/medicine/{medicine_name}")
def get_medicine_info(medicine_name: str):
    medicine_info = df[df["Medicine Name"].str.lower() == medicine_name.lower()]
    
    if medicine_info.empty:
        raise HTTPException(status_code=404, detail="Medicine not found")
    
    # Extract details
from fastapi import FastAPI, HTTPException
import pandas as pd
from datetime import datetime

app = FastAPI()

# Load Data
df = pd.read_csv(r"") # copy path of data set in f string

@app.get("/")
def home():
    return {"message": "Welcome to the Medicine API!"}

@app.get("/medicine/{medicine_name}")
def get_medicine_info(medicine_name: str):
    medicine_info = df[df["Medicine Name"].str.lower() == medicine_name.lower()]
    
    if medicine_info.empty:
        raise HTTPException(status_code=404, detail="Medicine not found")
    
    # Extract details
