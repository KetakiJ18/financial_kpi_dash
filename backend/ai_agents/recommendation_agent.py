# Placeholder for LangChain workflow
from dotenv import load_dotenv

load_dotenv()
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
import os



class RecommendationAgent:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        self.llm = ChatOpenAI(temperature=0.7, model_name="gpt-4.1-mini", openai_api_key=api_key)

    def generate_recommendations(self, insights: str):
        prompt = PromptTemplate(
            input_variables=["insights"],
            template="You are a financial advisor. Based on these insights, provide 3 actionable business recommendations to improve financial health:\n{insights}"
        )
        chain = prompt | self.llm
        return chain.invoke({"insights": insights})
