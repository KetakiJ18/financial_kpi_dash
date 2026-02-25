# Placeholder for LangChain workflow
from dotenv import load_dotenv

load_dotenv()
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
import os


class KPIInterpretationAgent:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        self.llm = ChatOpenAI(temperature=0.1, model_name="gpt-4.1-mini", openai_api_key=api_key)

    def interpret_kpis(self, raw_kpis: str):
        prompt = PromptTemplate(
            input_variables=["raw_kpis"],
            template="You are a financial risk analyst. Interpret the following raw KPIs and determine financial health status and classify risk levels (Low, Medium, High):\n{raw_kpis}"
        )
        chain = prompt | self.llm
        return chain.invoke({"raw_kpis": raw_kpis})
