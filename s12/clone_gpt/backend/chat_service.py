# chat_service_simple.py - Version sans dépendances problématiques
import openai
from typing import List, Dict
import os
from dotenv import load_dotenv, find_dotenv
from models import Message, ChatRequest

class SimpleChatService:
    def __init__(self):
        # Vérifier que la clé API est disponible
        
        
        # Configuration directe d'OpenAI
        self.client = openai.AsyncOpenAI(
            api_key=os.getenv("OPENAI_API_KEY")
        )
        
        self.system_prompt = """Tu es un assistant IA serviable et intelligent. 
        Réponds de manière claire, précise et utile. 
        Si tu ne sais pas quelque chose, dis-le honnêtement.
        Adapte ton niveau de langage à l'utilisateur."""
    
    def format_messages(self, history: List[Message], new_message: str) -> List[Dict]:
        """Convertit l'historique en format OpenAI"""
        messages = [{"role": "system", "content": self.system_prompt}]
        
        # Ajouter l'historique
        for msg in history:
            messages.append({
                "role": msg.role,
                "content": msg.content
            })
        
        # Ajouter le nouveau message
        messages.append({
            "role": "user", 
            "content": new_message
        })
        
        return messages
    
    async def generate_response(self, request: ChatRequest) -> dict:
        """Génère une réponse directement avec OpenAI"""
        try:
            messages = self.format_messages(request.conversation_history, request.message)
            
            # Appel direct à OpenAI
            response = await self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                temperature=request.temperature,
                max_tokens=request.max_tokens
            )
            
            return {
                "response": response.choices[0].message.content,
                "tokens_used": response.usage.total_tokens,
                "success": True
            }
            
        except Exception as e:
            return {
                "response": f"Erreur: {str(e)}",
                "tokens_used": 0,
                "success": False
            }

# Instance globale
chat_service = SimpleChatService()