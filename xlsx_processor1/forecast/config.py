from datetime import datetime, timedelta
from calendar import monthrange

def get_previous_retail_week():
    """
    Get the previous week's month, year of the previous month,
    last year's occurrence of that month, last month before the previous month in numeric format,
    determine SP (Spring) or FA (Fall) based on the previous month,
    and calculate the number of retail weeks for each month individually.
    """
    # Use the current date as input
    current_date = datetime.now()
    # current_date = datetime(2025, 1, 23)

    # Find the current week's Sunday
    current_sunday = current_date - timedelta(days=current_date.weekday() + 1)

    # Calculate the previous week's Sunday
    previous_week_sunday = current_sunday - timedelta(days=7)

    # Determine the previous week number in the retail month
    previous_week_number = (previous_week_sunday.day - 1) // 7 + 1

    # Get the month and retail year of the previous week
    current_month = previous_week_sunday.strftime('%b')

    # Determine the retail year logic:
    # Retail year starts from February of the previous year and ends in January of the current year
    if previous_week_sunday.month >= 2:
        retail_year_of_previous_month = previous_week_sunday.year
    else:
        retail_year_of_previous_month = previous_week_sunday.year - 1

    # Last year's retail occurrence of the same month
    last_retail_year_of_previous_month = retail_year_of_previous_month - 1

    print(retail_year_of_previous_month,last_retail_year_of_previous_month)
    # Determine the last month before the previous month
    last_month_of_previous_month_date = previous_week_sunday.replace(day=1) - timedelta(days=1)
    last_month = last_month_of_previous_month_date.strftime('%b').upper()

    # Custom mapping for months
    month_mapping = {
        'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4,
        'JUN': 5, 'JUL': 6, 'AUG': 7, 'SEP': 8,
        'OCT': 9, 'NOV': 10, 'DEC': 11, 'JAN': 12
    }
    last_month_of_previous_month_numeric = month_mapping[last_month]

    # Determine SP (Spring) or FA (Fall/Winter) based on the previous month
    spring_months = ['FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL']
    fall_months = ['AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN']

    season = "SP" if current_month in spring_months else "FA"

    # Calculate the number of retail weeks for each month of the current year
    current_year = retail_year_of_previous_month
    # Individual variables for retail weeks of each month


    def get_retail_weeks(year, month):
        """
        Calculate the number of retail weeks in a given month.
        Retail weeks follow the Sunday-to-Saturday structure,
        and all days in a week belong to the month in which the week starts.
    
        Args:
            year (int): The year of the month.
            month (int): The month (1 for January, 12 for December).

        Returns:
            int: Number of retail weeks in the month.
        """
        # Get the first day and last day of the month
        first_day = datetime(year, month, 1)
        last_day = datetime(year, month, monthrange(year, month)[1])

        # Find the first Sunday of the month
        first_sunday = first_day + timedelta(days=(6 - first_day.weekday()) % 7)

        # Find the last Saturday of the month
        last_saturday = last_day - timedelta(days=last_day.weekday() + 1)

        # Count retail weeks
        current_week_start = first_sunday
        week_count = 0

        while current_week_start <= last_saturday:
            week_count += 1
            current_week_start += timedelta(days=7)  # Move to the next Sunday

        # Check if the final week starts in the current month (partial week rule)
        if current_week_start <= last_day:
            week_count += 1

        return week_count

    feb_weeks = get_retail_weeks(current_year,2)
    mar_weeks = get_retail_weeks(current_year,3)
    apr_weeks = get_retail_weeks(current_year,4)
    may_weeks = get_retail_weeks(current_year,5)
    jun_weeks = get_retail_weeks(current_year,6)
    jul_weeks = get_retail_weeks(current_year,7)
    aug_weeks = get_retail_weeks(current_year,8)
    sep_weeks = get_retail_weeks(current_year,9)
    oct_weeks = get_retail_weeks(current_year,10)
    nov_weeks = get_retail_weeks(current_year,11)
    dec_weeks = get_retail_weeks(current_year,12)
    jan_weeks = get_retail_weeks(current_year + 1, 1)
    month_dict = {
    "Feb": 1,
    "Mar": 2,
    "Apr": 3,
    "May": 4,
    "Jun": 5,
    "Jul": 6,
    "Aug": 7,
    "Sep": 8,
    "Oct": 9,
    "Nov": 10,
    "Dec": 11,
    "Jan": 12
}  # January belongs to the next year
    current_month_number = month_dict.get(current_month, "Month not found")
    if current_month in [ "Oct","Nov" "Dec","Jan"]:
        rolling_method="Current MTH"
    else:
        rolling_method="YTD"
    return current_month,current_month_number,rolling_method, previous_week_number, retail_year_of_previous_month,last_retail_year_of_previous_month, last_month_of_previous_month_numeric,season, feb_weeks, mar_weeks, apr_weeks, may_weeks,jun_weeks, jul_weeks, aug_weeks, sep_weeks, oct_weeks,nov_weeks, dec_weeks, jan_weeks
    # return current_month, previous_week_number, year_of_previous_month, last_year_of_previous_month, last_month_of_previous_month_numeric, season

    # Call the function and print the results
current_month,current_month_number,rolling_method, previous_week_number, year_of_previous_month,last_year_of_previous_month, last_month_of_previous_month_numeric,season, feb_weeks, mar_weeks, apr_weeks, may_weeks,jun_weeks, jul_weeks, aug_weeks, sep_weeks, oct_weeks,nov_weeks, dec_weeks, jan_weeks = get_previous_retail_week()


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
        'Omni OO Units', 'COM OO Units', 'Omni Receipts',    f"TOTAL {last_year_of_previous_month}",
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

