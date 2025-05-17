from .createDataframe import planning_df,Macys_Recpts,All_DATA,MCOM_Data,index_df
from .staticVariable import  year_of_previous_month,last_year_of_previous_month,STD_PERIOD
import pandas as pd
class VariableLoader:

    def __init__(self,cross_ref):
        # Find the matching row based on cross_ref
        matching_row = planning_df.loc[planning_df['Cross ref'].str.upper() == cross_ref]
        if matching_row.empty:
            raise ValueError(f"Cross ref '{cross_ref}' not found in 'planning_df'.")
        
    
        self.pid_value = matching_row['PID'].iloc[0]
        self.RLJ = matching_row['Adjusted RLJ Item'].iloc[0] 
        self.MKST = matching_row['Mkst'].iloc[0] # Get the first matching PID
        self.Current_FC_Index = matching_row['FC Index'].iloc[0] # Get the first matching PID
        self.Safe_Non_Safe=matching_row['Safe/Non-Safe'].iloc[0]
        self.Item_Code=matching_row['Item Code'].iloc[0]
        self.Item_Status=f"{self.Safe_Non_Safe}/{self.Item_Code}"
        self.Door_Count=matching_row['Door Count'].iloc[0]
        self.Last_Str_Cnt=matching_row['Old Door count'].iloc[0]
        self.Door_count_Updated=matching_row['Door count Updated'].iloc[0]
        self.Store_Model=matching_row['Model'].iloc[0]
        self.Com_Model=matching_row['Com Model'].iloc[0]
        self.Holiday_Bld_FC=matching_row['HolidayBuildFC'].iloc[0]
        self.MCYOH=matching_row['OH Units'].iloc[0]
        self.OO=matching_row['OO Units'].iloc[0]
        self.nav_OO=matching_row['nav OO'].iloc[0]
        self.MTD_SHIPMENTS=matching_row['MTD SHIPMENTS'].iloc[0]
        self.LW_Shipments=matching_row['LW Shipments'].iloc[0]
        self.Wks_of_Stock_OH=matching_row['Wks of Stock OH'].iloc[0]
        self.Wks_of_on_Proj=matching_row['Wks of on Proj'].iloc[0]
        self.Last_3Wks_Ships=matching_row['Last 3Wks Ships'].iloc[0]
        self.Vendor_Name=matching_row['Vendor Name'].iloc[0]
        self.Min_order=matching_row['Min order'].iloc[0]
        self.Proj=matching_row['Proj'].iloc[0]
        self.Net_Proj=matching_row['Net Proj'].iloc[0]
        self.Unalloc_Orders=matching_row['Unalloc Orders'].iloc[0]
        self.RLJ_OH=matching_row['RLJ OH'].iloc[0]
        self.FLDC=matching_row['FLDC'].iloc[0]
        self.WIP=matching_row['WIP'].iloc[0]
        self.MD_Status_MZ1=matching_row['MD Status MZ1'].iloc[0]
        self.Repl_Flag=matching_row['Repl Flag'].iloc[0]
        self.MCOM_RPL=matching_row['MCOM RPL'].iloc[0]
        self.Pool_stock=matching_row['Pool stock'].iloc[0]
        self.st_Rec_Date=matching_row['1st Rec Date'].iloc[0]
        self.Last_Rec_Date=matching_row['Last Rec Date'].iloc[0]
        self.Item_Age=matching_row['Item Age'].iloc[0]
        self.TY_Last_Cost=matching_row['TY Last Cost'].iloc[0]
        self.Own_Retail=matching_row['Own Retail'].iloc[0]
        self.AWR_1st_Tkt_Ret=matching_row['AWR 1st Tkt Ret'].iloc[0]
        self.Metal_Lock=matching_row['Metal Lock'].iloc[0]
        self.MFG_Policy=matching_row['MFG Policy'].iloc[0]
        self.KPI_Data_Updated=matching_row['KPI Data Updated'].iloc[0]
        self.KPI_Door_count=matching_row['KPI Door count'].iloc[0]
        self.OOS_Locs=matching_row['OOS Locs'].iloc[0]
        self.Suspended_Loc_Count=matching_row['Suspended Loc Count'].iloc[0]
        self.Masterstyle_Desc=matching_row['Masterstyle Desc'].iloc[0]
        self.Dpt_ID=matching_row['Dpt ID'].iloc[0]  
        self.Dpt_Desc=matching_row['Dpt Desc'].iloc[0]
        self.SC_ID=matching_row['SC ID'].iloc[0]
        self.SC_Desc=matching_row['SC Desc'].iloc[0]
        self.MstrSt_ID=matching_row['MstrSt ID'].iloc[0]
        self.Masterstyle_Desc=matching_row['Masterstyle Desc'].iloc[0]
        self.PID_Desc=matching_row['PID Desc'].iloc[0]
        self.st_Live=matching_row['1st Live'].iloc[0]
        self.Live_Site=matching_row['Live Site'].iloc[0]
        self.V2C=matching_row['V2C'].iloc[0]
        self.Mktg_ID=matching_row['Mktg ID'].iloc[0]
        self.STD_Store_Rtn=matching_row['STD Store Rtn %'].iloc[0]
        self.Prod_Desc=matching_row['Prod Desc'].iloc[0]
        self.Last_Proj_Review_Date=matching_row['Last Proj Review Date'].iloc[0]
        self.Macys_Recpts_matching_row=Macys_Recpts.loc[Macys_Recpts['PID'].str.upper() == self.pid_value]
        self.Macys_Spring_Proj_Notes =  f"Macy's Spring Proj Notes: {self.Macys_Recpts_matching_row['ACTION'].iloc[0]}" if not self.Macys_Recpts_matching_row.empty else "Macy's Spring Proj Notes: "
        self.Planner_Response=matching_row['Planner Response'].iloc[0] 

        self.Nav_Feb=matching_row['Feb'].iloc[0]
        self.Nav_Mar=matching_row['Mar'].iloc[0]
        self.Nav_Apr=matching_row['Apr'].iloc[0]
        self.Nav_May=matching_row['May'].iloc[0]
        self.Nav_Jun=matching_row['Jun'].iloc[0]
        self.Nav_Jul=matching_row['Jul'].iloc[0]
        self.Nav_Aug=matching_row['Aug'].iloc[0]
        self.Nav_Sep=matching_row['Sep'].iloc[0]
        self.Nav_Oct=matching_row['Oct'].iloc[0]
        self.Nav_Nov=matching_row['Nov'].iloc[0]
        self.Nav_Dec=matching_row['Dec'].iloc[0]
        self.Nav_Jan=matching_row['Jan'].iloc[0]

        self.Macys_Proj_Receipts_Feb=matching_row['FEB RECPT'].iloc[0]
        self.Macys_Proj_Receipts_Mar=matching_row['MAR RECPT'].iloc[0]
        self.Macys_Proj_Receipts_Apr=matching_row['APR RECPT'].iloc[0]
        self.Macys_Proj_Receipts_May=matching_row['May RECPT'].iloc[0]
        self.Macys_Proj_Receipts_Jun=matching_row['JUN RECPT'].iloc[0]
        self.Macys_Proj_Receipts_Jul=matching_row['JUL RECPT'].iloc[0]
        self.Macys_Proj_Receipts_Aug=matching_row['AUG RECPT'].iloc[0]
        self.Macys_Proj_Receipts_Sep=matching_row['SEP RECPT'].iloc[0]
        self.Macys_Proj_Receipts_oct=matching_row['OCT RECPT'].iloc[0]
        self.Macys_Proj_Receipts_Nov=matching_row['NOV RECPT'].iloc[0]
        self.Macys_Proj_Receipts_Dec=matching_row['DEC RECPT'].iloc[0]
        self.Macys_Proj_Receipts_Jan=matching_row['JAN RECPT'].iloc[0]
        index_df.columns = index_df.columns.str.strip().str.upper()
        if pd.isna(self.Current_FC_Index):
            self.Current_FC_Index = "Dia"

        index_row_data = index_df.loc[index_df['INDEX'].astype(str).str.lower() == self.Current_FC_Index.lower()]
        months = ['FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC','JAN']

        self.index_value = {}
        # Loop through each month and fetch its value
        for month in months:
            self.index_value[month] = index_row_data[month].iloc[0] if not index_row_data.empty else 0
            
        self.MCOM_Data_matching_row=MCOM_Data.loc[MCOM_Data['PID'].str.upper() == self.pid_value]
        this_year_value=year_of_previous_month
        last_year_value=last_year_of_previous_month
        self.this_year_data = All_DATA.loc[(All_DATA['PID'] == self.pid_value) & (All_DATA['Year'] == this_year_value)]
        self.last_year_data = All_DATA.loc[(All_DATA['PID'] == self.pid_value) & (All_DATA['Year'] == last_year_value)]
        self.this_year_MCOM=MCOM_Data.loc[(MCOM_Data['PID'] == self.pid_value) & (MCOM_Data['Year'] == this_year_value)]
        self.last_year_MCOM=MCOM_Data.loc[(MCOM_Data['PID'] == self.pid_value) & (MCOM_Data['Year'] == last_year_value)]
        # Define months in order
        # Initialize dictionaries to store results
        planned_shp=[self.Nav_Feb,self.Nav_Mar,self.Nav_Apr,self.Nav_May,self.Nav_Jun,self.Nav_Jul,self.Nav_Aug,self.Nav_Sep,self.Nav_Oct,self.Nav_Nov,self.Nav_Dec,self.Nav_Jan]
        self.planned_shp={key:abs(planned_shp[i]) for i,key in enumerate(months)}

        self.TY_Unit_Sales = {month: 0 for month in months}
        self.LY_Unit_Sales = {month: 0 for month in months}
        self.LY_OH_Units = {month: 0 for month in months}
        self.TY_OH_Units = {month: 0 for month in months}
        self.TY_Receipts = {month: 0 for month in months}
        self.TY_MCOM_Unit_Sales = {month: 0 for month in months}
        self.TY_MCOM_OH_Units={month: 0 for month in months}
        self.PTD_TY_Sales={month: 0 for month in months}
        self.MCOM_PTD_TY_Sales={month: 0 for month in months}
        self.LY_MCOM_Unit_Sales={month: 0 for month in months}
        self.LY_MCOM_OH_Units = {month: 0 for month in months}
        self.OO_Total_Units={month: 0 for month in months}
        self.OO_MCOM_Total_Units={month: 0 for month in months}
        self.LY_Receipts={month: 0 for month in months}
        self.LY_PTD_Sales={month: 0 for month in months}
        self.MCOM_PTD_LY_Sales={month: 0 for month in months}
        # Sum data for each month
        for month in months:

            self.TY_Unit_Sales[month] = self.this_year_data.loc[self.this_year_data['Month'].str.upper() == month, 'PTD TY Unit Sales'].sum()
            self.LY_Unit_Sales[month] = self.last_year_data.loc[self.last_year_data['Month'].str.upper() == month, 'PTD TY Unit Sales'].sum()
            self.LY_OH_Units[month] = self.last_year_data.loc[self.last_year_data['Month'].str.upper() == month, 'OH TY Units'].sum()
            self.TY_OH_Units[month] = self.this_year_data.loc[self.this_year_data['Month'].str.upper() == month, 'OH TY Units'].sum()
            self.TY_Receipts[month] = self.this_year_data.loc[self.this_year_data['Month'].str.upper() == month, 'PTD TY RCVD Unit'].sum()
            self.TY_MCOM_Unit_Sales[month] = self.this_year_MCOM.loc[self.this_year_MCOM['Month'].str.upper() == month, 'PTD TY Unit Sales'].sum()
            self.LY_MCOM_Unit_Sales[month] = self.last_year_MCOM.loc[self.last_year_MCOM['Month'].str.upper() == month, 'PTD TY Unit Sales'].sum()
            self.TY_MCOM_OH_Units[month] = self.this_year_MCOM.loc[self.this_year_MCOM['Month'].str.upper() == month, 'OH TY Units'].sum()
            self.PTD_TY_Sales[month] = self.this_year_data.loc[self.this_year_data['Month'].str.upper() == month, 'PTD TY $ Sales'].sum()
            self.LY_PTD_Sales[month] = self.last_year_data.loc[self.last_year_data['Month'].str.upper() == month, 'PTD TY $ Sales'].sum()
            self.MCOM_PTD_TY_Sales[month] = self.this_year_MCOM.loc[self.this_year_MCOM['Month'].str.upper() == month, 'PTD TY $ Sales'].sum()
            self.MCOM_PTD_LY_Sales[month] = self.last_year_MCOM.loc[self.last_year_MCOM['Month'].str.upper() == month, 'PTD TY $ Sales'].sum()
            self.LY_MCOM_OH_Units[month] = self.last_year_MCOM.loc[self.last_year_MCOM['Month'].str.upper() == month, 'OH TY Units'].sum()
            self.OO_Total_Units[month] = self.this_year_data.loc[self.this_year_data['Month'].str.upper() == month, 'OO Total Units'].sum()
            self.OO_MCOM_Total_Units[month] = self.this_year_MCOM.loc[self.this_year_MCOM['Month'].str.upper() == month, 'OO Total Units'].sum()
            self.LY_Receipts[month] = self.last_year_data.loc[self.last_year_data['Month'].str.upper() == month, 'PTD TY RCVD Unit'].sum()
        
        self.STD_TY_Unit_Sales_list = [self.TY_Unit_Sales[month] for month in STD_PERIOD]

        self.STD_LY_Unit_Sales_list=[self.LY_Unit_Sales[month] for month in STD_PERIOD]
        self.macys_proj_receipt=[self.Macys_Proj_Receipts_Feb,self.Macys_Proj_Receipts_Mar,self.Macys_Proj_Receipts_Apr,self.Macys_Proj_Receipts_May,self.Macys_Proj_Receipts_Jun,self.Macys_Proj_Receipts_Jul,self.Macys_Proj_Receipts_Aug,self.Macys_Proj_Receipts_Sep,self.Macys_Proj_Receipts_oct,self.Macys_Proj_Receipts_Nov,self.Macys_Proj_Receipts_Dec,self.Macys_Proj_Receipts_Jan]
        self.macys_proj_receipt={key:self.macys_proj_receipt[i] for i,key in enumerate(months)}
        target_months={'FEB', 'MAR', 'APR'}
        if any(month in STD_PERIOD for month in target_months):
            ac_this_year_value=year_of_previous_month
            L_this_year_value=year_of_previous_month-1
            ac_last_year_value=last_year_of_previous_month
            L_last_year_value=last_year_of_previous_month-1
            ac_this_year_data = All_DATA.loc[(All_DATA['PID'] == self.pid_value) & (All_DATA['Year'] == ac_this_year_value)]
            L_this_year_data = All_DATA.loc[(All_DATA['PID'] == self.pid_value) & (All_DATA['Year'] == L_this_year_value)]
            ac_last_year_data = All_DATA.loc[(All_DATA['PID'] == self.pid_value) & (All_DATA['Year'] == ac_last_year_value)]
            L_last_year_data = All_DATA.loc[(All_DATA['PID'] == self.pid_value) & (All_DATA['Year'] == L_last_year_value)]
            Ac_TY_Unit_Sales = {month: 0 for month in months}
            L_TY_Unit_Sales = {month: 0 for month in months}
            Ac_LY_Unit_Sales = {month: 0 for month in months}
            L_LY_Unit_Sales = {month: 0 for month in months}
            for month in months:
                self.TY_Unit_Sales[month] = self.this_year_data.loc[self.this_year_data['Month'].str.upper() == month, 'PTD TY Unit Sales'].sum()
                Ac_TY_Unit_Sales[month] = ac_this_year_data.loc[ac_this_year_data['Month'].str.upper() == month, 'PTD TY Unit Sales'].sum()
                L_TY_Unit_Sales[month] = L_this_year_data.loc[L_this_year_data['Month'].str.upper() == month, 'PTD TY Unit Sales'].sum()
                Ac_LY_Unit_Sales[month] = ac_last_year_data.loc[ac_last_year_data['Month'].str.upper() == month, 'PTD TY Unit Sales'].sum()
                L_LY_Unit_Sales[month] = L_last_year_data.loc[L_last_year_data['Month'].str.upper() == month, 'PTD TY Unit Sales'].sum()


            self.STD_TY_Unit_Sales_list = [
            Ac_TY_Unit_Sales.get(month, L_TY_Unit_Sales.get(month, 0)) if month in ['FEB', 'MAR', 'APR']
            else L_TY_Unit_Sales.get(month, 0)
            for month in STD_PERIOD
        ]
            self.STD_LY_Unit_Sales_list=[
            Ac_LY_Unit_Sales.get(month, L_LY_Unit_Sales.get(month, 0)) if month in ['FEB', 'MAR', 'APR']
            else L_LY_Unit_Sales.get(month, 0)
            for month in STD_PERIOD
        ]

