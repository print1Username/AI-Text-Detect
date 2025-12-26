from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import pytesseract
import requests
import io

app = FastAPI()

# Allow Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev stage
    allow_methods=["*"],
    allow_headers=["*"],
)

def ocr_image(image: Image.Image) -> str:
    return pytesseract.image_to_string(image)

@app.post("/ocr/image")
async def ocr_upload_image(file: UploadFile = File(...)):
    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content))
        text = ocr_image(image)
        return { "text": text }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/ocr/link")
async def ocr_from_link(link: str):
    try:
        response = requests.get(link)
        image = Image.open(io.BytesIO(response.content))
        text = ocr_image(image)
        return { "text": text }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
