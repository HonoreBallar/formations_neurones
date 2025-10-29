from fastapi import FastAPI, Request
from pydantic import BaseModel
from .rag_pipeline import get_rag_chain

app = FastAPI()
rag_chain = get_rag_chain()

class Query(BaseModel):
    question: str

@app.post("/ask")
def ask_question(query: Query):
    answer = rag_chain.run(query.question)
    return {"answer": answer}
