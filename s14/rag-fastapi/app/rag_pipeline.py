from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
from app.vector_store import build_vector_store
from app.document_loader import load_and_split_documents

def get_rag_chain():
    docs = load_and_split_documents()
    vector_store = build_vector_store(docs)
    retriever = vector_store.as_retriever()
    llm = OpenAI(temperature=0)
    return RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
