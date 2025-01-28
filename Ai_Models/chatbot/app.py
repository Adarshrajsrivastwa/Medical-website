from dotenv import load_dotenv
import streamlit as st
import os
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Function to load the gemini model
model = genai.GenerativeModel("gemini-pro")

def get_response(question):
    response = model.generate_content(question)
    return response.text

# Initialize the Streamlit app
st.set_page_config(page_title="Q&A User Support Chatbot", page_icon="🤖")

# Set a header and display a friendly emoji
st.header(" Chatbot 🤖 Ask Anything")

# Display some introductory text
st.write("Ask me anything about our services or support, and I'll do my best to assist you! 😄")

# Input box for user question
user_input = st.text_input("Ask your question:", key="input")

# Submit button
submit = st.button("Ask the question ✨")

# Button to toggle chat history
show_history = st.checkbox("Show Chat History 🗨️")

# Store and display the chat history
if 'history' not in st.session_state:
    st.session_state.history = []

# When submit is clicked
if submit and user_input:
    # Get response from Gemini model
    response = get_response(user_input)
    
    # Add the current question and response to the history
    st.session_state.history.append(f"You: {user_input}")
    st.session_state.history.append(f"Bot: {response}")
    
    # Display the latest response
    st.subheader("The Response is ✨")
    st.write(response)

# Conditionally display the chat history
if show_history:
    st.subheader("Chat History 🗨️")
    for chat in st.session_state.history:
        st.write(chat)
