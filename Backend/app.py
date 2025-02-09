from fastapi import FastAPI, File, UploadFile
import numpy as np
from keras.models import load_model
from PIL import Image, ImageOps
import io
import uvicorn
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://document-classification-8as0.onrender.com"],  # Adjust to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

assert os.path.exists("./modal/keras_model.h5"), "Model file not found!"
assert os.path.exists("./modal/labels.txt"), "Labels file not found!"

model_path = os.path.join(os.path.dirname(__file__), "modal/keras_model.h5")

if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file not found at {model_path}")

model = load_model(model_path, compile=False)


# Load the labels
with open("modal/labels.txt", "r") as file:
    class_names = [line.strip() for line in file.readlines()]

@app.get("/")
async def root():
    return {"message": "Backend started successfully", "status": "running", "routes": ["/predict/"]}

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # Read the uploaded file once
        file_content = await file.read()
        image = Image.open(io.BytesIO(file_content)).convert("RGB")

        # Resize and preprocess the image
        size = (224, 224)
        image = ImageOps.fit(image, size, Image.LANCZOS)  # Compatible with old Pillow versions
        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1

        # Prepare data for prediction
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        data[0] = normalized_image_array

        # Make prediction
        prediction = model.predict(data)
        index = np.argmax(prediction)
        class_name = class_names[index]
        confidence_score = float(prediction[0][index])

        return {"class": class_name, "confidence": confidence_score}

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    print("Backend started successfully. Running on http://0.0.0.0:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
