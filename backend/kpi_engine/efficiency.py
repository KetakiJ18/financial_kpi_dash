def calculate_asset_turnover(revenue: float, average_total_assets: float) -> float:
    if average_total_assets == 0:
        return 0.0
    return revenue / average_total_assets
