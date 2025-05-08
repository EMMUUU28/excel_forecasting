

def calculate_planned_sell_through(planned_fc, plan_oh):
    result = {}
    for key in planned_fc:
        if key in plan_oh:  # Ensuring the key exists in both dictionaries
            fc = planned_fc[key]
            oh = plan_oh[key]
            if (fc + oh) != 0:  # Avoid division by zero
                result[key] = fc / (fc + oh)
            else:
                result[key] = None  # Handle division by zero, if any
        else:
            result[key] = None  # Handle missing keys in plan_oh
    return result

# planned_sell_through = calculate_planned_sell_through (planned_fc, plan_oh)


def calculate_store_unit_sales_and_OH(TY_Unit_Sales, TY_MCOM_Unit_Sales):
    result = {}
    for key in TY_Unit_Sales:
        if key in TY_MCOM_Unit_Sales:  # Ensure the key exists in both dictionaries
            sales = TY_Unit_Sales[key]
            mcom_sales = TY_MCOM_Unit_Sales[key]
            result[key] = sales - mcom_sales
        else:
            result[key] = None  # Handle missing keys in TY_MCOM_Unit_Sales
    return result

# TY_store_unit_sales = calculate_store_unit_sales(TY_Unit_Sales, TY_MCOM_Unit_Sales)
# TY_store_EOM_OH =calculate_store_unit_sales(TY_OH_Units, TY_OH_MCOM_Units)

def calculate_com_to_ttl_sales_and_OH(TY_MCOM_Unit_Sales, TY_Unit_Sales):
    result = {}
    for key in TY_MCOM_Unit_Sales:
        if key in TY_Unit_Sales and TY_Unit_Sales[key] != 0:  # Check key exists and denominator is not zero
            mcom_sales = TY_MCOM_Unit_Sales[key]
            unit_sales = TY_Unit_Sales[key]
            result[key] = mcom_sales / unit_sales
        else:
            result[key] = 0  # Set result as 0 in case of error (e.g., division by zero or missing key)
    return result


# TY_COM_to_TTL=calculate_com_to_ttl_sales_and_OH(TY_MCOM_Unit_Sales, TY_Unit_Sales)
# TY_COM_to_TTL=calculate_com_to_ttl_sales_and_OH(TY_OH_MCOM_Units, TY_OH_Units)


def format_sales_data(PTD_TY_Sales, TY_OH_Units, own_retail):
    result = {}
    for key in PTD_TY_Sales:
        sales = PTD_TY_Sales[key]
        units = TY_OH_Units.get(key, 0)  # Using get to handle missing keys, defaulting to 0

        # Calculate the sales per unit
        if units != 0:
            sales_per_unit = sales / units
        else:
            sales_per_unit = 0

        # Format the sales per unit as currency
        formatted_sales_per_unit = f"${sales_per_unit:.2f}"

        # Calculate the percentage change
        if own_retail != 0 and units != 0:
            percentage_change = ((sales / units - own_retail) / own_retail) * 100
        else:
            percentage_change = 0

        # Format the percentage change
        formatted_percentage_change = f"{percentage_change:.0f}"

        # Combine the two formatted strings
        result[key] = f"{formatted_sales_per_unit} / {formatted_percentage_change}"

    return result


Omni_AUR/_Diff_Own = format_sales_data(PTD_TY_Sales,TY_Unit_Sales, own_retail)


def calculate_omni_sell_through(TY_Unit_Sales, TY_OH_Units):
    result = {}
    for key in TY_Unit_Sales:
        unit_sales = TY_Unit_Sales.get(key, 0)
        oh_units = TY_OH_Units.get(key, 0)
        total_units = unit_sales + oh_units

        if total_units != 0:  # Check to avoid division by zero
            result[key] = unit_sales / total_units
        else:
            result[key] = 0  # Return 0 if division by zero would occur

    return result

omni_sell_through_ = calculate_omni_sell_through(TY_Unit_Sales, TY_OH_Units)





def calculate_store_sell_through(TY_Unit_Sales, TY_MCOM_Unit_Sales, TY_OH_Units, TY_OH_MCOM_Units):
    result = {}
    for key in set(TY_Unit_Sales.keys()).union(TY_OH_Units.keys()):
        unit_sales = TY_Unit_Sales.get(key, 0)
        mcom_unit_sales = TY_MCOM_Unit_Sales.get(key, 0)
        oh_units = TY_OH_Units.get(key, 0)
        oh_mcom_units = TY_OH_MCOM_Units.get(key, 0)

        # Calculate differences
        net_units_sales = unit_sales - mcom_unit_sales
        net_oh_units = oh_units - oh_mcom_units

        # Sum of differences
        total_diff = net_units_sales + net_oh_units

        # Avoid division by zero
        if total_diff != 0:
            result[key] = net_units_sales / total_diff
        else:
            result[key] = 0  # If division by zero or no net change, result is 0

    return result

store_sell_through_ = calculate_store_sell_through(TY_Unit_Sales, TY_MCOM_Unit_Sales, TY_OH_Units, TY_OH_MCOM_Units)



7)
def calculate_turn(TY_Unit_Sales, TY_OH_Units):
    result = {}
    for key in TY_Unit_Sales:
        sales = TY_Unit_Sales[key]
        oh_units = TY_OH_Units.get(key, 0)  # Default to 0 if key is missing

        # Avoid division by zero and return 0 in such cases
        if oh_units != 0:
            result[key] = sales / oh_units
        else:
            result[key] = 0

    return result

omni_turn = calculate_turn(TY_Unit_Sales, TY_OH_Units)

store_turn = calculate_turn(TY_store_unit_sales, TY_store_EOM_OH)


8)def calculate_diff(TY_store_unit_sales, LY_store_unit_sales):
    result = {}
    for key in TY_store_unit_sales:
        ty_sales = TY_store_unit_sales.get(key, 0)
        ly_sales = LY_store_unit_sales.get(key, 0)

        # Check if the sum of this year's and last year's sales is zero
        if (ty_sales + ly_sales) == 0:
            result[key] = 0
        else:
            # Compute the ratio only if LY sales are not zero to avoid division by zero
            if ly_sales != 0:
                result[key] = (ty_sales - ly_sales) / ly_sales
            else:
                # Handle potential division by zero by setting to 1 (as per IFERROR)
                result[key] = 1
    return result

store_unit_sales_diff = calculate_diff(TY_store_unit_sales, LY_store_unit_sales)
com_unit_sales_diff = calculate_diff(TY_MCOM_Unit_Sales, LY_MCOM_Unit_Sales)
store_eom_oh_diff = calculate_diff(TY_store_EOM_OH, LY_store_EOM_OH)
