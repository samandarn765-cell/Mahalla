from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time

app = FastAPI(title="Mahalla AI Chatbot")

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@app.post("/api/ai/chat", response_model=ChatResponse)
async def chat_with_ai(req: ChatRequest):
    user_message = req.message.lower()
    
    # Mock AI logic for "Mahalla Chatbot"
    time.sleep(1) # Simulate network/processing delay
    
    reply = "Kechirasiz, men hali to'liq ishga tushirildim. Sizga qanday yordam bera olaman?"
    
    if "chiroq" in user_message or "svet" in user_message:
        reply = "Ko'cha chiroqlari bo'yicha muammo bo'lsa, ariza qoldirishingiz mumkin. Arizalar bo'limidan 'Ko'cha chiroqlari' toifasini tanlang."
    elif "suv" in user_message:
        reply = "Suv ta'minotida muammo bormi? Tizim holatini 'Ta'minot Boshqaruvi'dan kuzatishingiz mumkin."
    elif "salom" in user_message:
        reply = "Assalomu alaykum! Smart Mahalla sun'iy intellekt yordamchisiga xush kelibsiz. Muammoingizni qisqacha yozing."
    elif "ariza" in user_message or "murojaat" in user_message:
        reply = "Yangi ariza qoldirish uchun '+ Yangi Xabar' tugmasini bosing yoki asossiy sahifadagi kameraga o'xshash tugmani bosing."
        
    return ChatResponse(reply=reply)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
