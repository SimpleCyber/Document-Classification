from fastapi import FastAPI, File, UploadFile, HTTPException
import numpy as np
from keras.models import load_model
from PIL import Image, ImageOps
import io
import uvicorn
import os
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import google.generativeai as genai
from typing import Dict, Any
from dotenv import load_dotenv
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")



# Configure GPU settings
tf.config.set_visible_devices([], "GPU")

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)

# Define paths
MODEL_PATH = os.path.join(os.path.dirname(__file__), "modal/keras_model.h5")
LABELS_PATH = os.path.join(os.path.dirname(__file__), "modal/labels.txt")

# Check if files exist
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
if not os.path.exists(LABELS_PATH):
    raise FileNotFoundError(f"Labels file not found at {LABELS_PATH}")

# Load model
model = load_model(MODEL_PATH, compile=False)

# Load labels
with open(LABELS_PATH, "r") as file:
    class_names = [line.strip() for line in file.readlines()]

async def process_image_data(image: Image.Image, class_name: str, confidence: float) -> Dict[str, Any]:
    """Process image data using Gemini model based on classification type."""
    try:
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")

        prompt = f"We are working on image classification and data extraction. The image is classified as {class_name} with confidence score of {confidence}. Extract the information from the image in this JSON format: text:'the text in from image', describe:'what u see in image very short description'"


        response = model.generate_content([prompt, image])
        return {"response": response.text}
        
    except Exception as e:
        print(f"Error in process_image_data: {str(e)}")
        return {"error": str(e)}

@app.get("/")
async def root():
    """Root endpoint providing API information."""
    return {
        "message": "Backend started successfully",
        "status": "running",
        "routes": ["/predict/"]
    }

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    """Predict image classification and extract relevant data."""
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        # Read and process image
        content = await file.read()
        image = Image.open(io.BytesIO(content)).convert("RGB")
        
        # Resize and normalize image
        image_processed = ImageOps.fit(image, (224, 224), Image.Resampling.LANCZOS)
        image_array = np.asarray(image_processed)
        normalized_array = (image_array.astype(np.float32) / 127.5) - 1
        
        # Prepare for prediction
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        data[0] = normalized_array
        
        # Make prediction
        prediction = model.predict(data)
        index = np.argmax(prediction)
        class_name = class_names[index]
        confidence_score = float(prediction[0][index])
        
        # Get description using Gemini
        description = await process_image_data(image, class_name, confidence_score)
        
        return {
            "class": class_name,
            "confidence": confidence_score,
            "description": description
        }
        
    except Exception as e:
        print(f"Error in predict endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    print(f"Backend started successfully. Running on http://0.0.0.0:{port}")
    uvicorn.run(app, host="0.0.0.0", port=port)