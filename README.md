MoodBot API Platform

🔍 Objective:
To build a clean, modular, and deployable web application that analyzes user mood, detects crisis intent, and summarizes emotional content using NLP models and APIs.

🚀 Key Features & Endpoints:

1. /analyze_mood – Uses a Hugging Face emotion classification model to map user input to simplified emotional categories (happy, sad, angry, etc.).


2. /detect_crisis – Leverages zero-shot classification to identify if text suggests a crisis, joke, or normal state.


3. /summarize – Summarizes long input texts using an abstractive summarization model.



🧠 Tech Stack Breakdown:

Frontend (Vercel):

Built with React + Tailwind CSS
Features a minimal, dark-themed UI
Provides tabs for switching between mood, crisis, and summary modes
Supports speech-to-text with Web Speech API
Displays live JSON-formatted responses


Backend (Render):

Built using FastAPI
Each route handles a POST request with text input and returns structured JSON output
Integrates Hugging Face Transformers API securely via .env
CORS enabled for frontend-backend communication
Clean, exception-handled logic per route


🔐 Security & Deployment:

Environment variables securely managed on Render.
CORS configured to allow frontend access.
Deployed using Vercel (frontend) and Render (backend) for public accessibility.


📂 Structure Overview:

/frontend: React app, UI logic, fetches from API

/backend: FastAPI app with endpoints

.env: Secured Hugging Face token (excluded via .gitignore)

README.md: Detailed documentation of all features and logic


✅ Submission-Ready:

Fully modular and production-deployable

JSON-only input/output APIs

All endpoints publicly accessible and tested


🔗 Project built under time constraints for a challenge, with focus on real-world deployment and practical API design for mental health analysis.