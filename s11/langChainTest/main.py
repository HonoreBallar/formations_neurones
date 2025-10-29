import os
from langchain.prompts import PromptTemplate
from langchain_openai import OpenAI
from langchain.chains import LLMChain
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

prompt = PromptTemplate(
    template="Tu es un comédien expert. Génère une blague sur le sujet suivant : {sujet}.",
    input_variables=["sujet"],
)

llm = OpenAI(api_key=OPENAI_API_KEY, temperature=0.7)

chain = LLMChain(llm=llm, prompt=prompt)

joke_topic = {"sujet": "les moutons"}
response = chain.run(joke_topic)

print(response)