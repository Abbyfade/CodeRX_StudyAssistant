import os
import json
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

def generate_exam_questions(input_text, domain, question_type):
    # Set the API key for the Groq client
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    # question_type = "Multiple choice questions"

    options = (
        {"A": "<option_A>", "B": "<option_B>", "C": "<option_C>", "D": "<option_D>"}
        if question_type == "mcq" else
        {"T": "True", "F": "False"}
    )

    correct_answer = (
        "<correct_option>" if question_type == "mcq" else "True or False"  # Use the appropriate format for True/False
    )
    
    # Define the prompt with placeholders for input_text, domain, and question_type
    prompt = (
        f"You are an expert exam question creator in the field of {domain}, specializing in crafting questions for students. "
        f"Your task is to generate {question_type} questions based on the provided text. "
        f"Generate as many questions as possible in the following JSON format:\n"
        f'{{"1": {{"question": "<question_text_1>", "options": {options}, "correct_answer": {correct_answer}}}}}\n'
        f'Put all the questions generated in a single json separated by a comma. make sure that each question generated will have the number as the key and the other values as the value just as provided above.'
        f"Do not add any other text to your response. "
        f"Generate as many questions as possible. "
        f"The questions should exhaust all key facts and cover all important concepts presented in the text. "
        f"Include {question_type} scenarios that reflect real-world applications of the concepts. "
        f"The {question_type} should assess higher-order thinking skills, critical reasoning abilities relevant to the subject matter and the student's understanding of the subject matter.\n\n"
        f"Text: {input_text}"
    )
    # Create a chat completion request to generate questions
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        model="llama-3.1-70b-versatile",  # Ensure the model name is valid
        temperature=1,
    )
    
    # Extract the generated questions from the response as a string
    generated_questions_str = chat_completion.choices[0].message.content

    # Convert the string to JSON
    try:
        generated_questions_json = json.loads(generated_questions_str)
    except json.JSONDecodeError:
        raise ValueError("Failed to parse the generated questions into JSON")

    # Return the parsed JSON
    return generated_questions_json
