from flask import Flask, request, jsonify, render_template
import os
import google.generativeai as genai

app = Flask(__name__)

# Configure API key
os.environ["GENERATIVE_AI_API_KEY"] = "AIzaSyBBTYcBb6ZtsFPZEvNTQ7gVqTv7w5MyF_8"
genai.configure(api_key=os.environ["GENERATIVE_AI_API_KEY"])

@app.route('/')
def home():
    return render_template('page2.html')

@app.route('/query', methods=['POST'])
def query():
    try:
        data = request.get_json()
        print(data)
        # Check if prompt is provided
        # if 'query' not in request.form:
        #     return jsonify({'error': 'No query in form data'}), 400
        if 'query' not in data:
            return jsonify({'error': 'No query in JSON data'}), 400

        # Extract query from form data
        # query_text = request.form['query']
        query_text = data['query']

        # Define the prompt for Gemini
        template_prompt = f"""You are a highly intelligent and professional email writer designed to understand user intent related to email text generation. The user provides you with the description of his email and you need to generate the subject, catchy promotion line and somewhat brief but persuasive description pitching the product the user has mentioned in his query.

        Make sure that description is (max 60 words),promo is (max 15 words) and subject(max 5 words)
        The user's query is: {query_text}

        Respond in 3 lines, like this:
        "subject": "[subject of the email]",
        "promo": "[catchy one sentence/phrase promotional line]",
        "description": "[A description of the product, make it sound like a salesman promoting and describing his product in a professional way]"

        """

        # Initialize the Gemini model
        model = genai.GenerativeModel(model_name="gemini-1.5-flash")

        # Generate content from the prompt
        response = model.generate_content(template_prompt)
        response_text = response.text

        print("Raw response from Gemini:", response_text)  # Print the raw response

        # Extract Subject, Promo, and Description from the response
        subject_start = response_text.find('"subject"') + len('"subject"')
        subject_end = response_text.find('"promo"')
        promo_start = response_text.find('"promo"') + len('"promo"')
        promo_end = response_text.find('"description"')
        description_start = response_text.find('"description"') + len('"description"')

        subject = response_text[subject_start:subject_end].strip().strip(':').strip().strip(',').strip()
        promo = response_text[promo_start:promo_end].strip().strip(':').strip().strip(',').strip()
        description = response_text[description_start:].strip().strip(':').strip().strip(',').strip()

        # Return generated subject, promo, and description
        return jsonify({'subject': subject, 'promo': promo, 'description': description}), 200

    except Exception as e:
        print(f"Error processing Gemini's response: {e}")
        return jsonify({'error': 'Failed to process Gemini response.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
