
import os
import django

# Set your Django settings module - replace 'your_project_name' with your actual project name
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'xlsx_processor1.settings')
django.setup()

from .models import MonthlyForecast,ProductDetail
import pandas as pd

def save_macys_projection_receipts(product, matching_row, year):
    """
    Saves Macy's Projection Receipts data into the MonthlyForecast model.
    Updates fields: jan, feb, mar, ..., dec instead of a single month field.
    """
    # Map DataFrame columns to the corresponding month fields in the model
    receipts_data = {
        'jan': matching_row['JAN RECPT'].iloc[0],
        'feb': matching_row['FEB RECPT'].iloc[0],
        'mar': matching_row['MAR RECPT'].iloc[0],
        'apr': matching_row['APR RECPT'].iloc[0],
        'may': matching_row['May RECPT'].iloc[0],
        'jun': matching_row['JUN RECPT'].iloc[0],
        'jul': matching_row['JUL RECPT'].iloc[0],
        'aug': matching_row['AUG RECPT'].iloc[0],
        'sep': matching_row['SEP RECPT'].iloc[0],
        'oct': matching_row['OCT RECPT'].iloc[0],
        'nov': matching_row['NOV RECPT'].iloc[0],
        'dec': matching_row['DEC RECPT'].iloc[0],
    }
    
    # Convert values to integers if possible, else set to None
    for month in receipts_data:
        try:
            receipts_data[month] = int(receipts_data[month]) if pd.notna(receipts_data[month]) else None
        except (ValueError, TypeError):
            receipts_data[month] = None
    
    # Update or create the forecast entry for the entire year
    MonthlyForecast.objects.update_or_create(
        product=product,
        variable_name='MacysProjectionReciepts',
        year=year,
        defaults=receipts_data  # Updates all month fields at once
    )


# Use this 
# from datetime import datetime
# current_year = datetime.now().year

def save_monthly_forecasts(product, current_year, months, TY_Unit_Sales, LY_Unit_Sales, LY_OH_Units, TY_OH_Units, TY_Receipts, LY_Receipts, TY_MCOM_Unit_Sales, LY_MCOM_Unit_Sales, TY_OH_MCOM_Units, LY_MCOM_OH_Units, PTD_TY_Sales, LY_PTD_Sales, MCOM_PTD_TY_Sales, MCOM_PTD_LY_Sales, OO_Total_Units, OO_MCOM_Total_Units):
    """
    Saves forecast data for all variables in MonthlyForecast, 
    updating fields: jan, feb, mar, ..., dec instead of a single month field.
    """

    # Dictionary mapping month names to model fields
    month_mapping = {
        'JAN': 'jan', 'FEB': 'feb', 'MAR': 'mar', 'APR': 'apr', 'MAY': 'may', 'JUN': 'jun',
        'JUL': 'jul', 'AUG': 'aug', 'SEP': 'sep', 'OCT': 'oct', 'NOV': 'nov', 'DEC': 'dec'
    }

    # All data dictionaries
    all_variables = {
        'TY_Unit_Sales': TY_Unit_Sales,
        'LY_Unit_Sales': LY_Unit_Sales,
        'LY_OH_Units': LY_OH_Units,
        'TY_OH_Units': TY_OH_Units,
        'TY_Receipts': TY_Receipts,
        'LY_Receipts': LY_Receipts,
        'TY_MCOM_Unit_Sales': TY_MCOM_Unit_Sales,
        'LY_MCOM_Unit_Sales': LY_MCOM_Unit_Sales,
        'TY_OH_MCOM_Units': TY_OH_MCOM_Units,
        'LY_MCOM_OH_Units': LY_MCOM_OH_Units,
        'PTD_TY_Sales': PTD_TY_Sales,
        'LY_PTD_Sales': LY_PTD_Sales,
        'MCOM_PTD_TY_Sales': MCOM_PTD_TY_Sales,
        'MCOM_PTD_LY_Sales': MCOM_PTD_LY_Sales,
        'OO_Total_Units': OO_Total_Units,
        'OO_MCOM_Total_Units': OO_MCOM_Total_Units
    }

    # Define the year mapping (last year for LY_ variables, this year for TY_ variables)
    year_mapping = {
        'TY_Unit_Sales': current_year,
        'LY_Unit_Sales': current_year - 1,
        'LY_OH_Units': current_year - 1,
        'TY_OH_Units': current_year,
        'TY_Receipts': current_year,
        'LY_Receipts': current_year - 1,
        'TY_MCOM_Unit_Sales': current_year,
        'LY_MCOM_Unit_Sales': current_year - 1,
        'TY_OH_MCOM_Units': current_year,
        'LY_MCOM_OH_Units': current_year - 1,
        'PTD_TY_Sales': current_year,
        'LY_PTD_Sales': current_year - 1,
        'MCOM_PTD_TY_Sales': current_year,
        'MCOM_PTD_LY_Sales': current_year - 1,
        'OO_Total_Units': current_year,
        'OO_MCOM_Total_Units': current_year
    }

    # Process each variable and construct the forecast data
    for variable_name, data_dict in all_variables.items():
        year = year_mapping[variable_name]
        
        # Initialize a dictionary to store month values
        monthly_values = {month_field: None for month_field in month_mapping.values()}

        for month_name in months:
            month_field = month_mapping.get(month_name.upper())
            if month_field is None:
                continue  # Skip invalid month names

            value = data_dict.get(month_name)
            
            # Convert value to integer if valid, else None
            if pd.isna(value):
                value = None
            else:
                try:
                    value = int(value)
                except (ValueError, TypeError):
                    value = None
            
            # Assign value to corresponding month field
            monthly_values[month_field] = value

        # Update or create the record for the entire year
        MonthlyForecast.objects.update_or_create(
            product=product,
            variable_name=variable_name,
            year=year,
            defaults=monthly_values  # Updates all month fields at once
        )
