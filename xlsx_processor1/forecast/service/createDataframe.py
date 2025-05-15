import pandas as pd
from .readInputExcel import sheets,return_QA_df


# Create DataFrames for each sheet, mimicking the original data structure
# index_df = sheets["Index"].iloc[:41, :16]

index_df_raw = sheets["Index"]  # Equivalent to usecols="A:P", nrows=41
index_df = index_df_raw.iloc[2:43, :16]   # 2 because header=2 => start at 3rd row, and 41 rows total
return_QA_df = return_QA_df.rename(columns={
    'Item #': 'PID',
    'Expected Return Period': 'Expected Return',
    'Total Qty to Return': 'Quantity'
})
# Extract Month from Expected Return Period (convert to datetime first if needed)
def extract_month(value):
    try:
        # Try parsing date if it's in full date format
        value =  pd.to_datetime(value).strftime('%b').upper()
        return str(value)
    except:
        # If already like 'Feb-25' or 'Apr-25'
        return str(value)[:3]

return_QA_df['Month'] = return_QA_df['Expected Return'].apply(extract_month)

# Group by PID and Month, then sum the Quantity
return_QA_df = return_QA_df.groupby(['PID', 'Month'], as_index=False)['Quantity'].sum()
# reset the column names from row 2
index_df.columns = index_df_raw.iloc[1]

# drop the extra header row now
index_df = index_df.reset_index(drop=True)
index_df = index_df.drop(index_df.index[0])
index_df = index_df.reset_index(drop=True)
report_grouping_df = pd.DataFrame(sheets["report grouping"].values[2:], columns=sheets["report grouping"].iloc[1].values)
print(report_grouping_df.head(),'oooooooooo')
planning_df = pd.DataFrame(sheets["Repln Items"].values[2:], columns=sheets["Repln Items"].iloc[1].values)
  # Equivalent to header=2
print(planning_df.head())
TBL_Planning_VerticalReport__3 = pd.DataFrame(sheets["Setup Sales -L3M & Future"].values[9:] , columns=sheets["Setup Sales -L3M & Future"].iloc[8].values ) # Equivalent to header=9
Macys_Recpts=pd.DataFrame(sheets["Macys Recpts"].values[1:] , columns=sheets["Macys Recpts"].iloc[0].values )
print(index_df.head())
All_DATA = sheets["All_DATA"]  # Full data, no header modification
MCOM_Data = sheets["MCOM_Data"]  # Full data, no header modification
#make master sheet# Specify the columns you want to extract
columns_to_extract = [
    'PID', 'Cross ref', 'Sort', 'Dpt ID', 'Dpt Desc', 'Mkst', 'PID Desc',
    'CL ID', 'Class Desc', 'SC ID', 'SC Desc', 'MstrSt ID', 'Masterstyle Desc',
    'TY Last Cost', 'Own Retail', 'AWR 1st Tkt Ret', 'Prod Desc', 'Grouping',
    'Vendor', 'Vendor Name', 'FC Index', 'FLDC','Safe/Non-Safe', 'Item Code'
]

# Extract the specified columns
df_filtered = planning_df[columns_to_extract]

# Create a new 'Gender' column based on the conditions
df_filtered['Gender'] = 'Women'  # Default value
df_filtered.loc[df_filtered['Dpt ID'].isin([768, 771]), 'Gender'] = 'Men'
df_filtered.loc[df_filtered['CL ID'] == 86, 'Gender'] = 'Children'


# List of birthstone names
birthstones = [
    'GARNET', 'AMETHYST', 'AQUAMARINE', 'DIAMOND', 'EMERALD', 'PEARL', 
    'RUBY', 'PERIDOT', 'SAPPHIRE', 'OPAL', 'CITRINE', 'TANZANITE'
]

# Function to check if 'Class Desc' contains any birthstone name
def find_birthstone(class_desc):
    if isinstance(class_desc, str):  # Ensure the value is a string
        for stone in birthstones:
            if stone in class_desc.upper():  # Check if the birthstone is part of the string
                return stone
    return ''  # Return blank if no birthstone is found

# Apply the function to create the 'Birthstone' column
df_filtered['Birthstone'] = df_filtered['Class Desc'].apply(find_birthstone)

# Create the 'BSP_or_not' column based on the 'MstrSt ID' condition
df_filtered['BSP_or_not'] = df_filtered['MstrSt ID'].apply(lambda x: 'BSP' if x in [26481, 74692] else '')


def categorize_product(class_desc):
    if isinstance(class_desc, str):  # Ensure the value is a string
        class_desc = class_desc.upper()
        if 'EARRINGS' in class_desc or 'EARS' in class_desc:
            return 'Earrings'
        elif 'PENDANTS' in class_desc or 'PENDS' in class_desc:
            return 'Pendants'
        elif ' RING' in class_desc:  # Notice the space before "RINGS"
            return 'Rings'
        elif 'BRACELETS' in class_desc:
            return 'Bracelets'
        elif 'CHAIN' in class_desc:
            return 'Necklace'
        elif 'NECKS' in class_desc or 'NECKLACE' in class_desc:
            return 'Necklace'
        elif 'SET' in class_desc:
            return 'Set'
        elif 'BAND' in class_desc:
            return 'BAND'
    return ''  # Return blank if no match found

# Apply the function to create the 'category' column
df_filtered['category'] = df_filtered['Class Desc'].apply(categorize_product)


def update_category_from_prod_desc(row):
    if not row['category']:  # If category is blank
        prod_desc = str(row['Prod Desc']).lower()
        categories_found = []

        # Search for keywords in Prod desc
        if 'earring' in prod_desc or 'stud' in prod_desc:
            categories_found.append('Earrings')
        if ' ring' in prod_desc:
            categories_found.append('Rings')
        if 'pendant' in prod_desc or 'necklace' in prod_desc:
            categories_found.append('Pendants' if 'pendant' in prod_desc else 'Necklace')
        if 'bracelet' in prod_desc:
            categories_found.append('Bracelets')
        if 'band' in prod_desc:
            categories_found.append('Band')
        if 'locket' in prod_desc:
            categories_found.append('Locket')
        # If multiple categories are found, set as 'Set'
        if len(categories_found) > 1:
            return 'Set'
        elif categories_found:
            return categories_found[0]
    return row['category']  # Return the original category if not blank

# Apply the update function
df_filtered['category'] = df_filtered.apply(update_category_from_prod_desc, axis=1)


# Create the 'type' column based on conditions in 'Prod desc'
def determine_type(prod_desc):
    if isinstance(prod_desc, str):  # Ensure the value is a string
        prod_desc = prod_desc.lower()
        if 'heart' in prod_desc:
            return 'Heart'
        elif 'stud' in prod_desc:
            return 'Studs'
        elif 'drop' in prod_desc:
            return 'Drop'
    return ''  # Return blank if no match found

# Apply the function to create the 'type' column
df_filtered['type'] = df_filtered['Prod Desc'].apply(determine_type)

birthstone_data = [
    (1, 'January', 'Garnet'),
    (2, 'February', 'Amethyst'),
    (3, 'March', 'Aquamarine'),
    (4, 'April', 'Diamond'),
    (5, 'May', 'Emerald'),
    (6, 'June', 'Pearl'),
    (7, 'July', 'Ruby'),
    (8, 'August', 'Peridot'),
    (9, 'September', 'Sapphire'),
    (10, 'October', 'Opal'),
    (11, 'November', 'Citrine'),
    (12, 'December', 'Tanzanite')
]

# Create a DataFrame from the data
birthstone_sheet = pd.DataFrame(birthstone_data, columns=['Month', 'Month Name', 'Birthstone'])


master_sheet = df_filtered[['PID','category','Birthstone','BSP_or_not','type','Gender','Vendor','Vendor Name','Own Retail','FC Index', 'FLDC','Safe/Non-Safe', 'Item Code']]

# Create the unique sheets

df_unique_vendor = df_filtered[['Vendor', 'Vendor Name']].drop_duplicates().dropna()


data = [
    {"Vendor Name": "ALMOND (THAILAND) LIMITED", "Country of Origin": "Thailand", "Lead Time(weeks)": 8},
    {"Vendor Name": "AMMANTE JEWELLS LLP", "Country of Origin": "India", "Lead Time(weeks)": 8},
    {"Vendor Name": "ARIN", "Country of Origin": "Peru", "Lead Time(weeks)": 9},
    {"Vendor Name": "ARPAS INTERNATIONAL LTD", "Country of Origin": "US", "Lead Time(weeks)": 9},
    {"Vendor Name": "ASIAN STAR COMPANY LTD", "Country of Origin": "India", "Lead Time(weeks)": 8},
    {"Vendor Name": "BEAUTY GEMS FACTORY CO LTD", "Country of Origin": "Thailand", "Lead Time(weeks)": 8},
    {"Vendor Name": "CHARM AMERICA", "Country of Origin": "US", "Lead Time(weeks)": 9},
    {"Vendor Name": "CREATIONS JEWELLERY MFG. PVT. LTD.", "Country of Origin": "India", "Lead Time(weeks)": 8},
    {"Vendor Name": "DAISY'S COLLECTION, INC", "Country of Origin": "China", "Lead Time(weeks)": 8},
    {"Vendor Name": "DEORO - WIRE", "Country of Origin": "Peru", "Lead Time(weeks)": 9},
    {"Vendor Name": "DIA GOLD CREATION PVT. LTD.", "Country of Origin": "India", "Lead Time(weeks)": 8},
    {"Vendor Name": "DRL Manufacturing - LG", "Country of Origin": "DRL", "Lead Time(weeks)": 10},
    {"Vendor Name": "DRL MANUFACTURING S.A.", "Country of Origin": "DRL", "Lead Time(weeks)": 10},
    {"Vendor Name": "DRL/SARDELLI", "Country of Origin": "DRL", "Lead Time(weeks)": 10},
    {"Vendor Name": "GDL JEWELLERY LTD", "Country of Origin": "Thailand", "Lead Time(weeks)": 8},
    {"Vendor Name": "GOLDENLINE C/O BOGAZICI HEDIYELIK A.S.", "Country of Origin": "US", "Lead Time(weeks)": 9},
    {"Vendor Name": "IJM-INTERCONTINENTAL JEWELLERY MFG", "Country of Origin": "Thailand", "Lead Time(weeks)": 8},
    {"Vendor Name": "JOHN C NORDT COMPANY", "Country of Origin": "US", "Lead Time(weeks)": 9},
    {"Vendor Name": "LARA CORPORATION LIMITED", "Country of Origin": "China", "Lead Time(weeks)": 8},
    {"Vendor Name": "Leach & Garner (HK) Limited", "Country of Origin": "China", "Lead Time(weeks)": 8},
    {"Vendor Name": "LINEA NUOVA S.A.", "Country of Origin": "Peru", "Lead Time(weeks)": 9},
    {"Vendor Name": "Milor S.P.A", "Country of Origin": "Italy", "Lead Time(weeks)": 9},
    {"Vendor Name": "MIORO GOLD, LLC", "Country of Origin": "US", "Lead Time(weeks)": 9},
    {"Vendor Name": "NEW GOLD", "Country of Origin": "US", "Lead Time(weeks)": 9},
    {"Vendor Name": "PD&P LTD.", "Country of Origin": "China", "Lead Time(weeks)": 8},
    {"Vendor Name": "RICHLINE ITALY SRL", "Country of Origin": "Italy", "Lead Time(weeks)": 12},
    # Note: The country for "RICHLINE SA PTY" is unclear in the provided data. 
    # If "Zales" is not a country, you can adjust as needed or remove. 
    {"Vendor Name": "RICHLINE SA PTY", "Country of Origin": "Zales", "Lead Time(weeks)": None},
    {"Vendor Name": "RLG STANDARD MANUFACTURING VENDOR", "Country of Origin": "US", "Lead Time(weeks)": 9},
    {"Vendor Name": "S&S JEWELRY", "Country of Origin": "US", "Lead Time(weeks)": 9},
    {"Vendor Name": "SABELLI, S.A. DE C.V.", "Country of Origin": "Mexico", "Lead Time(weeks)": 9},
    {"Vendor Name": "SERENITY JEWELS PVT LTD", "Country of Origin": "India", "Lead Time(weeks)": 8},
    {"Vendor Name": "SHANGOLD INDIA LTD", "Country of Origin": "India", "Lead Time(weeks)": 8},
    {"Vendor Name": "SILO SPA-WIRES", "Country of Origin": "Italy", "Lead Time(weeks)": 12},
    {"Vendor Name": "STRONG JEWELRY(HK) CO LTD CHONG", "Country of Origin": "China", "Lead Time(weeks)": 8},
    {"Vendor Name": "T.C.I. LTD", "Country of Origin": "China", "Lead Time(weeks)": 8},
    {"Vendor Name": "National Chain", "Country of Origin": "US", "Lead Time(weeks)": 9},
    # Repeated entries (if you want to keep them exactly as listed):
    {"Vendor Name": "Leach & Garner (HK) Limited", "Country of Origin": "China", "Lead Time(weeks)": 8},
    {"Vendor Name": "LEACH & GARNER(HK) LTD", "Country of Origin": "China", "Lead Time(weeks)": 8},
    {"Vendor Name": "MANJUSAKA JEWELERS CO.,LTD", "Country of Origin": "China", "Lead Time(weeks)": 8},
    {"Vendor Name": "MEICHONG JEWELRY (HK) COMPANY LIMITED", "Country of Origin": "China", "Lead Time(weeks)": 8},
    {"Vendor Name": "NATIONAL CHAIN", "Country of Origin": "US", "Lead Time(weeks)": 9},
    {"Vendor Name": "PRIME DIRECT LIMITED", "Country of Origin": "China", "Lead Time(weeks)": 8},
]
 
# Create the DataFrame
df_coo = pd.DataFrame(data)

# Merge the data on Vendor Name to add the 'Country of Origin' and 'Lead Time'
vendor_sheet = pd.merge(df_unique_vendor, df_coo[['Vendor Name', 'Country of Origin', 'Lead Time(weeks)']], 
                       on='Vendor Name', how='left')
