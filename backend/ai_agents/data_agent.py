# Placeholder for LangChain workflow
from dotenv import load_dotenv

load_dotenv()
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os


class DataUnderstandingAgent:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        self.llm = ChatOpenAI(temperature=0, model_name="gpt-4.1-mini", openai_api_key=api_key)

    def analyze_data(self, data_summary: str):
        prompt = PromptTemplate(
            input_variables=["data_summary"],
            template="You are an expert financial data analyst. Review this summary of financial data and provide key observations:\n{data_summary}"
        )
        chain = prompt | self.llm
        return chain.invoke({"data_summary": data_summary})
