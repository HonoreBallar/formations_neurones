from crewai_runner.crew_runner import CrewAIService

def run_prospecting(config: dict) -> dict:
    crew = CrewAIService(config)
    markdown_result = crew.run_once()
    return parse_markdown_to_dict(markdown_result)
