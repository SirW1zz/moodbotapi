MoodBot API is a FastAPI-based backend providing three main NLP endpoints: 
analyze mood, detect crisis, and summarize text, all powered by Hugging Face models. 
Each endpoint accepts JSON POST requests with a text input and returns structured JSON responses with the analysis or summary. 
The backend securely loads the Hugging Face API token via environment variables and enables CORS to allow frontend access. 
The code is modular, clean, and well-commented for easy understanding and extension. 
This setup supports both local deployment with tools like Ngrok for public access and online deployment on cloud platforms with environment variable configuration for security. 
Sample inputs and outputs are included in the documentation to assist testing and integration.
