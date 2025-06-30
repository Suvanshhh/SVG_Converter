# SVG Converter Backend with StarVector

This project provides a backend service for converting images to SVG format using the StarVector-1B model from Hugging Face. It is designed to run locally or on cloud platforms like Google Colab, with a React frontend for user interaction.

## Features
- Image to SVG conversion using StarVector-1B
- Local backend setup with Python, PyTorch, and Transformers
- Support for running on Google Colab with GPU
- React frontend integration via API

## Requirements
- Python 3.8+
- PyTorch
- Transformers
- Pillow
- Other dependencies as per `requirements.txt`

## Setup Instructions
1. Clone the repository.
2. Create and activate a Python virtual environment.
3. Install dependencies using pip.
4. Prepare a 224x224 RGB PNG image for testing.
5. Run the backend locally or on Google Colab.

## Usage
- **Local:** Run `main.py` to convert a test image to SVG.
- **Colab:** Use the provided notebook to run the backend with GPU support.
- **React frontend:** Connect to the backend API exposed via ngrok.

## Common Issues
- **Token authentication errors:** Ensure you have a valid Hugging Face token with read permissions.
- **Model access:** Request access to gated models on Hugging Face.
- **Tensor size mismatches:** Always resize input images to 224x224.
- **FlashAttention errors on Windows:** Disable flash attention via environment variables.
- **GitHub push blocked due to secrets:** Remove tokens from code and use environment variables.

## Environment Variables
- `HF_TOKEN`: Hugging Face access token.
- `USE_FLASH_ATTN=0`: Disable FlashAttention for compatibility.
- `TRANSFORMERS_ATTN_IMPLEMENTATION=eager`: Force CPU-compatible attention.
