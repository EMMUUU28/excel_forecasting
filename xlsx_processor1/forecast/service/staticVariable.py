from datetime import datetime, timedelta
from calendar import monthrange
import pandas 
# from .utils import *
from .getretailinfo import *
CURRENT_DATE = datetime(2025,5,8)

month_week_dict = {
"FEB": feb_weeks,
"MAR": mar_weeks,
"APR": apr_weeks,
"MAY": may_weeks,
"JUN": jun_weeks,
"JUL": jul_weeks,
"AUG": aug_weeks,
"SEP": sep_weeks,
"OCT": oct_weeks,
"NOV": nov_weeks,
"DEC": dec_weeks,
"JAN": jan_weeks
}
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

VDF_item = [
    "M5616A7PL1WCH",
    "M5616A7PL1PNCH",
    "PA1065P5MDBC0",
    "PA4234P3A7AG0",
    "PA7376P3A7AZ1",
    "SM7452A8FPL3",
    "RH70792PF3W-E",
    "PJ6298P0ZZYE0",
    "RH7079FPF3PNE-M",
    "PA7589P6ZZAZ0",
    "87-H41P",
    "87-G93P",
    "TRP2394Y18",
    "L2469DS1PT.4",
    "TRB048783Y725",
    "TRB073147T775",
    "TRE073035Y",
    "TRE075696Y",
    "TRN068317Y6",
    "TRN068317Y7",
    "TRN070561Y75",
    "40-L23L",
    "FYC078786Y6",
    "40-L22L",
    "40-L29L",
    "40-L21L",
    "40-L18L",
    "TRN068317Y8",
    "CJ1244Z1ZZSG0",
    "DA1504ZZQ9SE0",
    "DA1504ZZQ9SG0",
    "DA1504ZZQ9SI0",
    "DA1504ZZQ9SK0",
    "DA4680ZZA9SG0",
    "DA5133ZZA8YI2",
    "DA5467ZZ19YG0",
    "FRC039354Y75",
    "TRC013552Y75",
    "TRC072852Y85",
    "TRC072860Y75",
    "TRN029005B6",
    "TRN029005B7",
    "TRN029005B8",
    "TRN029005B9",
    "TRN064686Y6",
    "TRN064686Y7",
    "TRN064686Y8",
    "TRN064686Y9",
    "TRN065059B6",
    "TRN065059B7",
    "TRN065059B8",
    "TRN065059B9",
    "TRN069744Y6",
    "TRN069744Y75",
    "TRN069744Y9",
    "83-441",
    "L2470DS1PT.0",
    "TRB067031Y75",
    "TRE079588Y",
    "31-G84",
    "36-T95SKI-MCY",
    "60-F08",
    "260.8R.20",
    "260.8RW.16",
    "260.8RW.18MCY",
    "260.8RW.20",
    "643.030W.18",
    "643.030W.24",
    "643.045PFH.20",
    "TRC039354Y18",
    "FRE013242Y",
    "FRE063670Y20",
    "1FRE021320Y60",
    "FRE023795Y",
    "38-B06",
    "68-285",
    "CA7442S5A8SZ0",
    "CJ4593H9A7YG0",
    "CJ6275H5ZZYG0",
    "SJX13195CEPCW-E",
    "SM17345FOXWSZ-6E",
    "SM17345FOXWSZ-8E",
    "FRN017149Y6",
    "FRN017149Y7"
]
holidays = [
    {'Holiday': 'valentine_day', 'Month': 'Feb', 'Day': 14, 'Week': 2},
    {'Holiday': 'women_day', 'Month': 'Mar', 'Day': 8, 'Week': 2},
    {'Holiday': 'father_day', 'Month': 'Jun', 'Day': 16, 'Week': 3},
    {'Holiday': 'men_day', 'Month': 'Nov', 'Day': 19, 'Week': 3}
]

df_holidays = pandas.DataFrame(holidays)
not_forecast_status=['VDF/MTO','VDF/TBD','NGF','DNP','MD','MTC','TEST','WATCH','MAINTAIN','DISC','nan']

STD_PERIOD = ['FEB', 'MAR', 'APR']
CURRENT_MONTH_SALES_PERCENTAGES=100
WEEK_TO_ADD_FOR_HOLIDAY = 6
MONTHS = ['FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT','NOV', 'DEC', 'JAN']
 
SPRING_MONTHS = ['FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL']
 
FALL_MONTHS = ['AUG', 'SEP', 'OCT','NOV', 'DEC', 'JAN']
month_col_map = {
    'FEB': 'I', 'MAR': 'J', 'APR': 'K', 'MAY': 'L', 'JUN': 'M',
    'JUL': 'N', 'AUG': 'O', 'SEP': 'P', 'OCT': 'Q', 'NOV': 'R',
    'DEC': 'S', 'JAN': 'T'
}