# tests/test_agents.py
import pytest
from ai_agent_crew.agents.market_researcher import MarketResearcherAgent
from crewai import Agent

def test_market_researcher_agent_initialization():
    """Teste l'initialisation de l'agent MarketResearcherAgent."""
    agent = MarketResearcherAgent(verbose=True)
    crewai_agent = agent.get_agent()
    
    assert isinstance(crewai_agent, Agent)
    assert crewai_agent.role == "Expert en Stratégie de Marché"
    assert len(agent._get_tools()) == 3  # SerperDevTool, PDFSearchTool, ScrapeWebsiteTool