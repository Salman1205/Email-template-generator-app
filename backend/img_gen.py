import os
import torch
from diffusers import StableDiffusionPipeline
from PIL import Image

# Disable the symlink warning
os.environ['HF_HUB_DISABLE_SYMLINKS_WARNING'] = '1'

pipe = StableDiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-2-1", torch_dtype=torch.float16)
pipe = pipe.to("cuda")

image = pipe(
    prompt="A cat",
    negative_prompt="",
    num_inference_steps=28,
    guidance_scale=7.0,
).images[0]

# Save the image
image.save("output_image.png")