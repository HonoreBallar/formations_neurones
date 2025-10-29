# tests/test_routes.py
from fastapi.testclient import TestClient
from ai_agent_crew.main import app

client = TestClient(app)

def test_simulate_prospecting():
    response = client.post("/prospect/simulate", json={
        "product": "Solution IA pour PME",
        "target_count": 1,
        "current_year": "2025"
    })
    assert response.status_code == 200
    assert "prospect_info" in response.json()
    assert "report" in response.json()