import os
import torch
from huggingface_hub import login
from PIL import Image
from transformers import AutoModelForCausalLM

# 1. AUTHENTICATION --------------------------
os.environ["HF_TOKEN"] = "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"  # YOUR REAL TOKEN
login(token=os.environ["HF_TOKEN"])

# 2. ENVIRONMENT SETUP -----------------------
os.environ['PATH'] = r'C:\Program Files\GTK3-Runtime Win64\bin;' + os.environ['PATH']
os.environ["USE_FLASH_ATTN"] = "0"
os.environ["TRANSFORMERS_ATTN_IMPLEMENTATION"] = "eager"
torch.set_default_dtype(torch.float32)

# 3. MODEL LOADING ---------------------------
model = AutoModelForCausalLM.from_pretrained(
    "starvector/starvector-1b-im2svg",
    token=os.environ["HF_TOKEN"],  # CRITICAL
    torch_dtype=torch.float32,
    trust_remote_code=True,
    attn_implementation="eager"
)

# 4. IMAGE PROCESSING ------------------------
processor = model.model.processor
image = Image.open("test.png").convert("RGB").resize((224, 224))
image_tensor = processor(image, return_tensors="pt")['pixel_values'].float()

# 5. SVG GENERATION --------------------------
with torch.no_grad():
    raw_svg = model.generate_im2svg({"image": image_tensor}, max_length=2000)

print("SVG Output:")
print(raw_svg[0])
