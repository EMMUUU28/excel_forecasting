import pandas as pd

def create_master_df(df_filtered, birthstone_data, data):
    birthstone_sheet = pd.DataFrame(birthstone_data, columns=['Month', 'Month Name', 'Birthstone'])

    master_sheet = df_filtered[['PID','category','Birthstone','BSP_or_not','type','Gender','Vendor','Vendor Name','Own Retail','FC Index', 'FLDC','Safe/Non-Safe', 'Item Code']]

    df_unique_vendor = df_filtered[['Vendor', 'Vendor Name']].drop_duplicates().dropna()

    
    # Create the DataFrame
    df_coo = pd.DataFrame(data)

    # Merge the data on Vendor Name to add the 'Country of Origin' and 'Lead Time'
    vendor_sheet = pd.merge(df_unique_vendor, df_coo[['Vendor Name', 'Country of Origin', 'Lead Time(weeks)']], 
                        on='Vendor Name', how='left') 
    
    return birthstone_sheet, master_sheet, vendor_sheet