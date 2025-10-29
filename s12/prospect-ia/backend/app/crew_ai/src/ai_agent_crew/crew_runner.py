from ai_agent_crew.crew import AiAgentCrew

class CrewAIService:
    def __init__(self, config: dict):
        self.config = config
        self.crew_instance = AiAgentCrew()
        self.crew_instance.build(config)

    def run_once(self) -> str:
        return self.crew_instance.crew().kickoff(inputs=self.config)

    def train(self, n_iterations: int, filename: str):
        return self.crew_instance.crew().train(n_iterations=n_iterations, filename=filename, inputs=self.config)

    # Tu peux ajouter replay(), test(), etc. ici
