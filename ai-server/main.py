import os
from typing import List, Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
load_dotenv()

app = FastAPI(title="Mahalla AI Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CANDIDATE_MODELS = [
    'gemini-3.6-flash',
    'gemini-3.7-flash',
    'gemini-2.5-flash',
    'gemini-2.5-pro',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
]

SYSTEM_INSTRUCTION = (
    "Sen 'Smart Mahalla' elektron platformasining rasmiy va aqlli sun'iy intellekt yordamchisisan. Isming - Mahalla AI.\n"
    "Vazifang: Foydalanuvchilarning barcha turdagi savollariga (mahalla tizimi, fuqarolar yig'ini, davlat va kommunal xizmatlar, elektr, suv, gaz, yo'l, obodonlashtirish, shuningdek boshqa har qanday umumiy, ta'lim, huquqiy, texnik va kundalik savollarga) aniq, tushunarli, to'liq, muloyim va foydali javob berish.\n"
    "Foydalanuvchi qaysi tilda yozsa (o'zbek, rus, ingliz), o'sha tilda javob ber.\n"
    "Agar mahalla muammolari bo'lsa, platformadagi 'Ariza yuborish' yoki 'Murojaatlar' bo'limi orqali ariza qoldirishni taklif qil.\n"
    "Har qanday savolga aniq va mazmunli javob ber."
)

# Configure genai once at startup
api_key = os.getenv("GEMINI_API_KEY")
if api_key and api_key != "your_api_key_here":
    genai.configure(api_key=api_key)
    print("[INFO] Gemini API configured")
else:
    print("[WARN] GEMINI_API_KEY not set or is placeholder")

# Cache working model name
_working_model_name = None

def generate_reply(user_message: str, history: list = None) -> str:
    """Try candidate models in order, return first successful reply."""
    global _working_model_name
    
    # If we know a working model, try it first
    models_to_try = []
    if _working_model_name and _working_model_name in CANDIDATE_MODELS:
        models_to_try.append(_working_model_name)
    models_to_try += [m for m in CANDIDATE_MODELS if m != _working_model_name]
    
    last_error = None
    for model_name in models_to_try:
        try:
            model = genai.GenerativeModel(
                model_name=model_name,
                system_instruction=SYSTEM_INSTRUCTION,
                generation_config=genai.types.GenerationConfig(
                    max_output_tokens=2048,
                    temperature=0.7,
                )
            )
            
            if history and len(history) > 1:
                contents = []
                for h in history[:-1]:
                    role = "user" if h.sender == "user" else "model"
                    contents.append({"role": role, "parts": [h.text]})
                contents.append({"role": "user", "parts": [user_message]})
                response = model.generate_content(contents)
            else:
                response = model.generate_content(user_message)
            
            reply_text = response.text if response and response.text else ""
            if reply_text:
                _working_model_name = model_name
                print(f"[INFO] Reply generated using {model_name}")
                return reply_text
            else:
                last_error = f"{model_name}: empty response"
                continue
        except Exception as e:
            last_error = f"{model_name}: {e}"
            print(f"[WARN] Model {model_name} failed: {e}")
            continue
    
    return f"Kechirasiz, barcha AI modellari hozirda mavjud emas. Xatolik: {last_error}"


class ChatMessage(BaseModel):
    sender: str
    text: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = None

class ChatResponse(BaseModel):
    reply: str

@app.get("/")
async def root():
    return {"status": "ok", "message": "Mahalla AI Server is running"}

@app.post("/api/ai/chat", response_model=ChatResponse)
async def chat_with_ai(req: ChatRequest):
    user_message = req.message.strip()
    if not user_message:
        return ChatResponse(reply="Iltimos, xabaringizni yozing.")
    
    if not api_key or api_key == "your_api_key_here":
        return ChatResponse(reply="API kaliti o'rnatilmagan. Iltimos .env faylini tekshiring.")
    
    reply = generate_reply(user_message, req.history)
    return ChatResponse(reply=reply)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
