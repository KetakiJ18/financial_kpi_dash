# Placeholder for LangChain workflow
from dotenv import load_dotenv

load_dotenv()
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
import os


class InsightGenerationAgent:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        self.llm = ChatOpenAI(temperature=0.2, model_name="gpt-4.1-mini", openai_api_key=api_key)

    def generate_insights(self, kpi_results: str):
        prompt = PromptTemplate(
            input_variables=["kpi_results"],
            template="You are a Chief Financial Officer summarizing financial performance. Provide an executive summary of these key performance indicators:\n{kpi_results}"
        )
        chain = prompt | self.llm
        return chain.invoke({"kpi_results": kpi_results})
