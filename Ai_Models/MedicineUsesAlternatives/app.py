import os
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Load CSV file
file_path = r"medicines_50.csv"
df = pd.read_csv(file_path)

@app.route("/")
def home():
    return {"message": "Welcome to the Medicine API!"}

@app.route("/search", methods=["GET"])
def search_medicine():
    """Search for medicines based on Medicine Name, Ingredients, Side Effects, or Usage"""
    query = request.args.get("query", "").strip().lower()

    if not query:
        return jsonify({"error": "Please provide a search query."}), 400

    # Check in all relevant fields
    results = df[
        (df["Medicine Name"].str.lower().str.contains(query, na=False)) |
        (df["Active Ingredients"].str.lower().str.contains(query, na=False)) |
        (df["Usage"].str.lower().str.contains(query, na=False)) |
        (df["Side Effects"].str.lower().str.contains(query, na=False))
    ]

    if results.empty:
        return jsonify({"error": "No matching results found."}), 404

    # Convert results to list of dictionaries
    response = results.to_dict(orient="records")
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)