import os
os.environ["USE_FLASH_ATTN"] = "0"  # Disable flash attention

import torch
from PIL import Image
import io
from transformers import AutoModelForCausalLM

MODEL_NAME = "starvector/starvector-1b-im2svg"  # CHANGED to 1B model

def load_model():
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_NAME,
        torch_dtype=torch.float16,
        trust_remote_code=True
    )
    processor = model.model.processor
    
    if torch.cuda.is_available():
        model = model.cuda()
    model.eval()
    
    return model, processor

model, processor = load_model()

def image_to_svg(image_bytes: bytes) -> str:
    image_pil = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image_tensor = processor(image_pil, return_tensors="pt")['pixel_values']
    
    if torch.cuda.is_available():
        image_tensor = image_tensor.cuda()
    
    batch = {"image": image_tensor}
    
    with torch.no_grad():
        raw_svg = model.generate_im2svg(batch, max_length=2000)
    
    return raw_svg
