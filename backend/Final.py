from flask import Flask, request, jsonify, render_template
import os
import re
import torch
from collections import Counter
from diffusers import StableDiffusionPipeline
import google.generativeai as genai
from PIL import Image
import base64
from io import BytesIO

app = Flask(__name__)

# Configure API key
os.environ["GENERATIVE_AI_API_KEY"] = "AIzaSyBBTYcBb6ZtsFPZEvNTQ7gVqTv7w5MyF_8"
genai.configure(api_key=os.environ["GENERATIVE_AI_API_KEY"])

# Initialize Stable Diffusion pipeline
pipe = StableDiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-2-1", torch_dtype=torch.float16)
pipe = pipe.to("cuda")

@app.route('/')
def home():
    return render_template('page2.html')


@app.route('/query', methods=['POST'])
def query():
    try:
        if 'query' not in request.form:
            return jsonify({'error': 'No query in form data'}), 400

        query_text = request.form['query']
        template_prompt = f"""You are a highly intelligent and professional email writer designed to understand user intent related to email text generation. The user provides you with the description of his email and you need to generate the subject, catchy promotion line and somewhat brief but persuasive description pitching the product the user has mentioned in his query.

        Make sure that description is (max 60 words),promo is (max 15 words) and subject(max 5 words)
        The user's query is: {query_text}

        Respond in 3 lines, like this:
        "subject": "[subject of the email]",
        "promo": "[catchy one sentence/phrase promotional line]",
        "description": "[A description of the product, make it sound like a salesman promoting and describing his product in a professional way]"

        """

        model = genai.GenerativeModel(model_name="gemini-1.5-flash")
        response = model.generate_content(template_prompt)
        response_text = response.text

        subject_start = response_text.find('"subject"') + len('"subject"')
        subject_end = response_text.find('"promo"')
        promo_start = response_text.find('"promo"') + len('"promo"')
        promo_end = response_text.find('"description"')
        description_start = response_text.find('"description"') + len('"description"')

        subject = response_text[subject_start:subject_end].strip().strip(':').strip().strip(',').strip()
        promo = response_text[promo_start:promo_end].strip().strip(':').strip().strip(',').strip()
        description = response_text[description_start:].strip().strip(':').strip().strip(',').strip()

        # Extract keywords from description
        keywords = extract_keywords(description)

        # Generate images based on keywords
        images = generate_images(keywords)

        # Combine email content and images in the response
        email_with_images = integrate_images_in_email(subject, promo, description, images)

        return jsonify({'email': email_with_images}), 200

    except Exception as e:
        print(f"Error processing Gemini's response: {e}")
        return jsonify({'error': 'Failed to process Gemini response.'}), 500

def extract_keywords(text):
    words = re.findall(r'\w+', text.lower())
    common_words = set(["the", "is", "in", "and", "to", "with", "a", "for", "on", "of", "as", "by", "an", "at"])
    filtered_words = [word for word in words if word not in common_words]
    keyword_counts = Counter(filtered_words)
    keywords = [word for word, count in keyword_counts.most_common(5)]
    return keywords

def generate_images(keywords):
    images = []
    for keyword in keywords:
        image = pipe(
            prompt=keyword,
            negative_prompt="",
            num_inference_steps=28,
            guidance_scale=7.0
        ).images[0]
        
        buffered = BytesIO()
        image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        images.append(img_str)
    return images

def integrate_images_in_email(subject, promo, description, images):
    image_tags = ""
    for idx, img_str in enumerate(images):
        image_tag = f'<img src="data:image/png;base64,{img_str}" alt="Generated image {idx}"><br>'
        image_tags += image_tag

    email_with_images = f"""
    <h1>{subject}</h1>
    <h2>{promo}</h2>
    <p>{description}</p>
    {image_tags}
    """
    return email_with_images

if __name__ == '__main__':
    app.run(debug=True)