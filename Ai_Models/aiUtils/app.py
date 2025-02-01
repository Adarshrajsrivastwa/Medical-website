from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import google.generativeai as genai
from flask_cors import CORS
import pandas as pd
# Load environment variables
load_dotenv()

# Configure API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize Flask app
app = Flask(__name__)
CORS(app)
# Function to load the Gemini model
model = genai.GenerativeModel("gemini-pro")
# Load CSV file
file_path = r"medicines_50.csv"
df = pd.read_csv(file_path)

def get_response(question):
    response = model.generate_content(question)
    bot_response = response.text
    
    # Replace "Gemini" with "Ankit"
    bot_response = bot_response.replace("Gemini", "Medi Service")
    bot_response = bot_response.replace("Google", "Ankit")

    return bot_response


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get("message")
    
    if not user_input:
        return jsonify({"error": "No message provided"}), 400
    
    response = get_response(user_input)
    return jsonify({"response": response})

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

if __name__ == '__main__':
    app.run(debug=True)
