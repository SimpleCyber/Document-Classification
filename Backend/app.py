from fastapi import FastAPI, File, UploadFile
import numpy as np
from keras.models import load_model
from PIL import Image, ImageOps
import io
import os
import uvicorn

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



assert os.path.exists("modal/keras_Model.h5"), "Model file not found!"
assert os.path.exists("modal/labels.txt"), "Labels file not found!"

@app.get("/")
async def root():
    return {"message": "Backend started successfully", "status": "running", "routes": ["/predict/"]}

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # Read the uploaded image file
        image = Image.open(io.BytesIO(await file.read())).convert("RGB")
        
        # Resize and preprocess the image
        size = (224, 224)
        image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)
        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1
        
        # Prepare data for prediction
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        data[0] = normalized_image_array
        
        # Make prediction
        prediction = model.predict(data)
        index = np.argmax(prediction)
        class_name = class_names[index].strip()
        confidence_score = float(prediction[0][index])
        
        return {"class": class_name, "confidence": confidence_score}
    
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    print("Backend started successfully. Running on http://0.0.0.0:8000")
    print("Available routes:")
    print("1. GET  /  -> Check server status")
    print("2. POST /predict/ -> Upload image for classification")
    uvicorn.run(app, host="0.0.0.0", port=8000)
