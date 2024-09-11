from groq import Groq
import os

def generate_exam_questions(input_text, domain):
    # Set the API key for the Groq client
    
    client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
    question_type = "Multiple choice questions"
    # Define the prompt with placeholders for input_text, domain, and question_type
    prompt = (
        f"You are an expert exam question creator in the field of {domain}, specializing in crafting questions for students. "
        f"Your task is to generate {question_type} questions based on the provided text. "
        f"Generate as many questions as possible in the following JSON format:\n"
        f"{{\n"
        f"    \"1\": {{\n"
        f"        \"question\": \"<question_text>\",\n"
        f"        \"options\": {{\n"
        f"            \"A\": \"<option_A>\",\n"
        f"            \"B\": \"<option_B>\",\n"
        f"            \"C\": \"<option_C>\",\n"
        f"            \"D\": \"<option_D>\"\n"
        f"        }},\n"
        f"        \"correct_answer\": \"<correct_option>\"\n"
        f"    }}\n"
        f"}}\n\n"
        f"Generate as much questions as possible. "
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
        model="llama-3.1-70b-versatile",  # Specify the model you want to use
        response_format={"type": "json_object"},
        temperature=1,
        # max_tokens=5500
    )
    
    # Extract the generated questions from the response
    generated_questions = chat_completion.choices[0].message.content

    # Return the generated questions
    return generated_questions