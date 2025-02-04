# List of birthstone names
birthstones = [
        'GARNET', 'AMETHYST', 'AQUAMARINE', 'DIAMOND', 'EMERALD', 'PEARL', 
        'RUBY', 'PERIDOT', 'SAPPHIRE', 'OPAL', 'CITRINE', 'TANZANITE'
    ]

columns_to_extract = [
        'PID', 'Cross ref', 'Sort', 'Dpt ID', 'Dpt Desc', 'Mkst', 'PID Desc',
        'CL ID', 'Class Desc', 'SC ID', 'SC Desc', 'MstrSt ID', 'Masterstyle Desc',
        'TY Last Cost', 'Own Retail', 'AWR 1st Tkt Ret', 'Prod Desc', 'Grouping',
        'Vendor', 'Vendor Name', 'FC Index', 'FLDC','Safe/Non-Safe', 'Item Code'
    ]


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
    }
    