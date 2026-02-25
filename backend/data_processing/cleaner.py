import pandas as pd
import re

def clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    """
    Cleans a pandas DataFrame by standardizing column names, dropping empty rows,
    and handling common missing values.
    """
    # Create a copy to avoid SettingWithCopyWarning
    cleaned_df = df.copy()
    
    # Standardize column names
    cleaned_df.columns = [clean_column_name(c) for c in cleaned_df.columns]
    
    # Drop rows where all elements are missing
    cleaned_df.dropna(how='all', inplace=True)
    
    # Fill remaining NaNs with 0 for numeric columns (naive approach)
    numeric_cols = cleaned_df.select_dtypes(include=['float64', 'int64']).columns
    cleaned_df[numeric_cols] = cleaned_df[numeric_cols].fillna(0)
    
    return cleaned_df

def clean_column_name(col_name: str) -> str:
    """
    Normalizes a column name to lowercase, alphanumeric characters, and underscores.
    e.g., "Net Income ($)" -> "net_income"
    """
    if not isinstance(col_name, str):
        return str(col_name)
    
    # Remove special characters and replace spaces with underscores
    cleaned = re.sub(r'[^a-zA-Z0-9\s]', '', col_name)
    cleaned = re.sub(r'\s+', '_', cleaned.strip())
    
    return cleaned.lower()
