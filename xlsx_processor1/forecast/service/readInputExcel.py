import pandas as pd
# input_path = r'VerticalReport_Planning_oct_week_4.xlsx'

sheets = None
return_QA_df = None

def readInputExcel(input_path):
    global sheets, return_QA_df
    sheets = pd.read_excel(input_path, engine='openpyxl')
    return_QA_df = pd.read_excel(r"C:\Users\emman\OneDrive\Desktop\final_excel_deploy\xlsx_processor1\forecast\service\Macys returns 2025.xlsx", engine='openpyxl')
    print("Sheets:", sheets.head())
    print("Return QA DataFrame:", return_QA_df.head())
    print("Sheets in the Excel file:")
    for sheet_name in sheets.keys():
        print(sheet_name)
    print("Successfully read the input Excel file.")