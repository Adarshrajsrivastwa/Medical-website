
import streamlit as st
import pandas as pd
from datetime import datetime

# Load Data
@st.cache_data
def load_data():
    return pd.read_csv(r"C:\Users\HP\OneDrive\Desktop\uses_alternatives\model3\ANN-ML-MODEL\medicines_50.csv")

df = load_data()

# Title
st.title("💊 Medicine Guidelines & Alternatives")

# Medicine Search
medicine_name = st.text_input("Enter Medicine Name :", "").strip()

if medicine_name:
    # Search Medicine
    medicine_info = df[df["Medicine Name"].str.lower() == medicine_name.lower()]


    if not medicine_info.empty:
        # Show Medicine Details
        
        st.subheader("Medicine Information")
        # medicine usage 
        medicineusage = medicine_info.iloc[0]["Usage"]
        st.subheader("🔄 Medicine Usege")
        st.write(f"*Usage :* {medicine_info.iloc[0]['Usage']}")
        
        # expiry dates
        expirydate=medicine_info.iloc[0]["Expiry Date"]
        st.subheader("🔄 Expiry Date")
        st.write(f"Side effects of Medicine : *{expirydate}*.")
        
        
        
        # Active ingredients
        ActiveIngredients=medicine_info.iloc[0]["Active Ingredients"]
        st.subheader("🔄 Active Ingredients")
        st.write(f"Side effects of Medicine : *{ActiveIngredients}*.")
        # Expiry Date Checkstrea
        expiry_date = datetime.strptime(medicine_info.iloc[0]['Expiry Date'], "%Y-%m-%d")
        today = datetime.today()

        if expiry_date < today:
            st.error("⚠ This medicine has EXPIRED. Do not use it!")
        
        #Side Effects
        sideeffects=medicine_info.iloc[0]["Side Effects"]
        st.subheader("🔄 Side Effects")
        st.write(f"Side effects of Medicine : *{sideeffects}*.")
        
        # Alternative Medicine
        alternative = medicine_info.iloc[0]["Alternatives"]
        st.subheader("🔄 Alternative Medicine")
        st.write(f"If unavailable, you can use *{alternative}*.")

    else:
        st.warning("Medicine not found. Please check the spelling.")