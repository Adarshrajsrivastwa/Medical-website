from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import google.generativeai as genai
from flask_cors import CORS
# Load environment variables
load_dotenv()

# Configure API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize Flask app
app = Flask(__name__)
CORS(app)
# Function to load the Gemini model
model = genai.GenerativeModel("gemini-pro")

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

if __name__ == '__main__':
    app.run(debug=True)
