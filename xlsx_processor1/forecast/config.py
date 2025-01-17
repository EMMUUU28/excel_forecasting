from datetime import datetime, timedelta

def get_previous_retail_week():
    """
    Get the previous week's month, year of the previous month, 
    last year's occurrence of that month, last month before the previous month in numeric format,
    and determine SP (Spring) or FA (Fall) based on the previous month.
    """
    # Use the current date as input
    current_date = datetime.now()
    print(f"Current date: {current_date}")

    # Find the current week's Sunday
    current_sunday = current_date - timedelta(days=current_date.weekday() + 1)

    # Calculate the previous week's Sunday
    previous_week_sunday = current_sunday - timedelta(days=7)

    # Determine the previous week number
    previous_week_number = (previous_week_sunday.day - 1) // 7 + 1

    # Get the month and year of the previous week
    previous_month = previous_week_sunday.strftime('%b').upper()
    year_of_previous_month = previous_week_sunday.year

    # Determine last year's occurrence of the same month
    last_year_of_previous_month = year_of_previous_month - 1

    # Determine the last month before the previous month
    last_month_of_previous_month_date = previous_week_sunday.replace(day=1) - timedelta(days=1)
    last_month_of_previous_month_numeric = last_month_of_previous_month_date.month

    # Determine SP (Spring) or FA (Fall/Winter) based on the previous month
    spring_months = ['FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL']
    fall_months = ['AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN']

    season = "SP" if previous_month in spring_months else "FA"

    return previous_month, previous_week_number, year_of_previous_month, last_year_of_previous_month, last_month_of_previous_month_numeric, season

# Call the function and print the results
previous_month, previous_week, year_of_previous_month, last_year_of_previous_month, last_month_of_previous_month_numeric, season = get_previous_retail_week()




data = [
    ["", "TY", year_of_previous_month, "LY", last_year_of_previous_month, "Season", season, "Current Year", "Month", previous_month, "", "Week", previous_week, "", "MAY-SEP", "", "", "Last Completed Month", last_month_of_previous_month_numeric, "", "Use EOM Actual?", "YTD"],
    ["", "Count of Items", "", 8215, "", "", "", "Last SP / FA Months", "Month", "Jul", "", "Jan", 12, "Sorted by:", "Dept Grouping >Class ID", "", "", ""],
    ["", "", "", "", "", "", "", "# of Wks in Mth", 4, 5, 4, 4, 5, 4, 4, 5, 4, 4, 5, 4],
    ["", "BRIDAL", "739&267&263", "", "Avg Sales 1st & last Mth", 8, 11, "Month #", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "", "", ""]
]
# Define your dropdown options (38 items)
dropdown_options = [
    "BT", "Citrine", "Cross", "CZ", "Dia", "Ear", "EMER", "Garnet", "Gem",
    "GEM EAR", "Gold Chain", "GOLD EAR", "Amy", "Anklet", "Aqua", "Bridal",
    "Heart", "Heavy Gold Chain", "Jade", "KIDS", "Locket", "Mens Gold Bracelet",
    "Mens Misc", "Mens Silver chain", "Mom", "MOP", "Neck", "Onyx", "Opal",
    "Pearl", "Peridot", "Religious", "Ring", "Ruby", "Saph", "Womens Silver Chain",
    "Wrist", "Grand Total"
]
ALL_VALUES = [
    "PID/BLU/MKST", "Current FC Index", "(TY/LY) STD Sales Index/12M FC", "STD Trend / 12M FC",
    "Item Status/Forecasting Method/Safe", "Current Str Cnt/Last Str Cnt/Last Updated",
    "Store Model/Com Model/TTL Model", "MA Proj/Proj Ball/Holiday Bd FC",
    "MCY/OH/OH in Transit/MTD Ships/LW Ships", "Planned WOS/WOP/Wkly Avg Sale/Last 4 Wks Ships",
    "Actual WOS/WOP/Real OOS Loc", "Excess Proj Qty & $ / Recall Wks of Poj & Qty",
    "Proj Qty & $ to Release / Note", "Vendor/Min order", "RL TTL/Net Proj/ORD Unalloc/+/− to Model",
    "MA Bin/FLDC/WIP QTY/REPLN HOLD DATE", "WIP Demand", "MD Status/Store & Mcom Repl",
    "TTL Last Repl/Age/Mths Active", "Last Cost/Owned/TKT Ret/GM/Actual GM", "Metal Lock/MFG Policy",
    "KPI DATA", "Last KPI Door count", "Diff to Current Door",
    "Out of Stock Locations", "Suspended Location count",
    "Click to View online", "DEPT #", "Sub Class", "Masterstyle", "PID Desc",
    "COM 1st Live/Live Site/V2C/WebID/STD Rtn", "Web ID Description",
    "Last Reviewed Date/Code/Qty to Enter", "Current Review Comments"
]
H_VALUES = [
    'ROLLING 12M FC', 'Index', 'FC by Index', 'FC by Trend', 'Recommended FC', 'Planned FC',
    'Planned Shipments', 'Planned EOH (Cal)', 'Gross Projection (Nav)', 'Macys Proj Receipts',
    'Planned Sell thru %', f"TOTAL {year_of_previous_month}",'Total Sales Units', 'Store Sales Units', 'Com Sales Units',
    'COM % to TTL (Sales)', 'TOTAL EOM OH', 'Store EOM OH', 'COM EOM OH',
    'COM % to TTL (EOH)', 'Omni Sales $', 'COM Sales $', 'Omni AUR/% Diff Own',
    'Omni Sell Thru %', 'Store SellThru %', 'Omni Turn', 'Store turn',
    'TY Store Sales U vs LY', 'TY COM sales U vs LY', 'TY Store EOH vs LY',
    'Omni OO Units', 'COM OO Units', 'Omni Receipts',f"TOTAL {last_year_of_previous_month}",
    "Total Sales Units",
    "Store Sales Units",
    "Com Sales Units",
    "COM % to TTL (Sales)",
    "TOTAL EOM OH",
    "Store EOM OH",
    "COM EOM OH",
    "COM % to TTL (EOH)",
    "Omni Receipts",
    "Omni Sell Thru %",
    "Store SellThru %",
    "Omni Turn",
    "Store Turn",
    "Omni Sales $",
    "COM Sales $",
    "Omni AUR/% Diff Own"
]
MONTHLY_VALUES = ['FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT',
                  'NOV', 'DEC', 'JAN', 'ANNUAL', 'SPRING', 'FALL']

month_data = [
    ["All", ""],
    ["Feb", 1],
    ["Mar", 2],
    ["Apr", 3],
    ["May", 4],
    ["Jun", 5],
    ["Jul", 6],
    ["Aug", 7],
    ["Sep", 8],
    ["Oct", 9],
    ["Nov", 10],
    ["Dec", 11],
    ["Jan", 12],
]
forecast_method_options = ["FC by Index", "FC by Trend", "Average", "Current Year", "Last Year"]


season_option = ["FA", "SP"]
month_option = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"]
year_option = ["Current MTH", "YTD", "SPRING", "FALL", "LY FALL"]

