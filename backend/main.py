from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from dotenv import load_dotenv
import os

load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")
HEADERS = {"Authorization": f"Bearer {HF_TOKEN}"}


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://moodbotapi.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def query(model, payload):
    url = f"https://api-inference.huggingface.co/models/{model}"
    res = requests.post(url, headers=HEADERS, json=payload)
    res.raise_for_status()
    return res.json()

class TextInput(BaseModel):
    text: str

emotion_map = {
    "joy": "happy",
    "happiness": "happy",
    "enthusiasm": "happy",
    "surprise": "happy",
    "love": "positive",
    "anger": "angry",
    "sadness": "sad",
    "fear": "scared",
    "disgust": "disgusted"
}

@app.post("/analyze_mood")
def analyze_mood(payload: TextInput):
    try:
        out = query("bhadresh-savani/bert-base-uncased-emotion", {"inputs": payload.text})
        label = max(out[0], key=lambda x: x["score"])["label"].lower()
        simplified = emotion_map.get(label, label)
        return {"emotion": simplified}
    except Exception as e:
        return {"error": str(e)}

@app.post("/detect_crisis")
def detect_crisis(payload: TextInput):
    try:
        data = {
            "inputs": payload.text,
            "parameters": {
                "candidate_labels": ["crisis", "normal", "joke"]
            }
        }
        out = query("facebook/bart-large-mnli", data)
        top_label = out.get("labels", [""])[0]
        return {"crisis_detected": top_label == "crisis"}
    except Exception as e:
        return {"error": str(e)}

@app.post("/summarize")
def summarize(payload: TextInput):
    try:
        out = query("facebook/bart-large-cnn", {"inputs": payload.text})
        return {"summary": out[0].get("summary_text", "").strip()}
    except Exception as e:
        return {"error": str(e)}
