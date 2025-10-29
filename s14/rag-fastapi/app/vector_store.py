from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings

def build_vector_store(docs):
    embeddings = OpenAIEmbeddings()
    return FAISS.from_documents(docs, embeddings)
