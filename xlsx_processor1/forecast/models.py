from django.db import models


class ProductDetail(models.Model):
    # Primary key and main identifiers
    product_id = models.CharField(max_length=50, primary_key=True, verbose_name="Cross Ref") #pid
    product_description = models.CharField(max_length=200, null=True, blank=True, verbose_name="PID Desc")

    blu = models.CharField(max_length=100,null=True, blank=True, verbose_name="Adjusted RLJ Item") #RLJ
    mkst = models.CharField(max_length=50,null=True, blank=True, verbose_name="Mkst")    #MKST
    currect_fc_index = models.CharField(max_length=50,null=True, blank=True, verbose_name="FC Index") #Current FC Index
    
    # Item classification fields
    safe_non_safe = models.CharField(max_length=100,null=True, blank=True, verbose_name="Safe/Non-Safe") #Safe/Non-Safe
    item_code = models.CharField(max_length=100,null=True, blank=True, verbose_name="Item Code") #Item Code
    # item_status = models.CharField(max_length=50, verbose_name="Item Status") #Item Status
    
    # Store information
    current_door_count = models.IntegerField(null=True, blank=True, verbose_name="Door Count") #Door Count
    last_store_count = models.IntegerField(null=True, blank=True, verbose_name="Old Door Count") #Last Str Cnt
    door_count_updated = models.DateField(null=True, blank=True, verbose_name="Door Count Updated")    #Door Count Updated
    store_model = models.IntegerField( null=True, blank=True, verbose_name="Model") #Store Model
    com_model = models.IntegerField( null=True, blank=True, verbose_name="Com Model") 
    
    # Inventory and forecast fields
    holiday_build_fc = models.IntegerField(null=True, blank=True, verbose_name="HolidayBuildFC")
    macys_onhand = models.IntegerField(null=True, blank=True, verbose_name="MCYOH Units")
    oo = models.IntegerField(null=True, blank=True, verbose_name="OO Units") #OO Units
    in_transit = models.IntegerField(null=True, blank=True, verbose_name="nav OO") #nav OO
    month_to_date_shipment = models.IntegerField(null=True, blank=True, verbose_name="MTD SHIPMENTS") #MTD SHIPMENTS 
    lastweek_shipment = models.IntegerField(null=True, blank=True, verbose_name="LW Shipments") #LW Shipments
    planned_weeks_of_stock = models.IntegerField(null=True, blank=True, verbose_name="Wks of Stock OH")  #Wks of Stock OH
    weeks_of_projection = models.IntegerField(null=True, blank=True, verbose_name="Wks of on Proj") #Wks of on Proj
    last_4weeks_shipment = models.IntegerField(null=True, blank=True, verbose_name="Last 3Wks Ships") #Last 3Wks Ships
    

    # Vendor information
    vendor_name = models.CharField(max_length=100, null=True, blank=True, verbose_name="Vendor Name") #Vendor Name
    min_order = models.IntegerField(null=True, blank=True, verbose_name="Min Order") #Min Order
    
    # Projection fields
    rl_total = models.IntegerField(null=True, blank=True, verbose_name="Proj") #Proj	
    net_projection = models.IntegerField(null=True, blank=True, verbose_name="Net Proj")  #Net Proj
    unalloc_order = models.IntegerField(null=True, blank=True, verbose_name="Unalloc Orders") #Unalloc Orders
    
    # Distribution center fields
    ma_bin = models.IntegerField(null=True, blank=True, verbose_name="RLJ OH")
    fldc = models.IntegerField(null=True, blank=True, verbose_name="FLDC")
    wip_quantity = models.IntegerField(null=True, blank=True, verbose_name="WIP")
    
    # Status fields
    md_status = models.CharField(max_length=50, null=True, blank=True, verbose_name="MD Status MZ1")
    replanishment_flag = models.CharField(max_length=100, null=True, blank=True, verbose_name="Repl Flag")
    mcom_replanishment = models.CharField(max_length=100, null=True, blank=True, verbose_name="MCOM RPL")
    pool_stock = models.IntegerField(null=True, blank=True, verbose_name="Pool Stock")
    
    # Date fields
    first_reciept_date = models.DateField(null=True, blank=True, verbose_name="1st Rec Date")
    last_reciept_date = models.DateField(null=True, blank=True, verbose_name="Last Rec Date")
    item_age = models.IntegerField(null=True, blank=True, verbose_name="Item Age")
    first_live_date = models.DateField(null=True, blank=True, verbose_name="1st Live")
    
    # Cost and retail fields
    this_year_last_cost = models.FloatField(null=True, blank=True, verbose_name="TY Last Cost")
    macys_owned_retail = models.FloatField( null=True, blank=True, verbose_name="Own Retail")
    awr_first_ticket_retail = models.FloatField( null=True, blank=True, verbose_name="AWR 1st Tkt Ret")
    
    # Policy and configuration fields
    metal_lock = models.FloatField( null=True, blank=True, verbose_name="Metal Lock")
    mfg_policy = models.CharField(max_length=50, null=True, blank=True, verbose_name="MFG Policy")
    
    # KPI fields
    kpi_data_updated = models.CharField(max_length=50, null=True, blank=True, verbose_name="KPI Data Updated")
    kpi_door_count = models.IntegerField(null=True, blank=True, verbose_name="KPI Door count")
    
    # Sales fields
    # standard_sale = models.DecimalField(max_digits=12, null=True, blank=True, verbose_name="STD SALES")
    # last_year_standard_sale = models.DecimalField(max_digits=12, null=True, blank=True, verbose_name="LY STD SALES")
    
    # Location fields
    out_of_stock_location = models.IntegerField(null=True, blank=True, verbose_name="OOS Locs")
    suspended_location_count = models.IntegerField(null=True, blank=True, verbose_name="Suspended Loc Count")
    live_site = models.CharField(max_length=50, null=True, blank=True, verbose_name="Live Site")
    
    # Product categorization fields
    masterstyle_description = models.CharField(max_length=200, null=True, blank=True, verbose_name="Masterstyle Desc")
    masterstyle_id = models.IntegerField(null=True, blank=True, verbose_name="MstrSt ID")

    department_id = models.IntegerField( null=True, blank=True, verbose_name="Dpt ID")
    department_description = models.CharField(max_length=100, null=True, blank=True, verbose_name="Dpt Desc")
    
    subclass_id = models.IntegerField( null=True, blank=True, verbose_name="SC ID")
    subclass_decription = models.CharField(max_length=100, null=True, blank=True, verbose_name="SC Desc")
    
    webid_description = models.CharField(max_length=200, null=True, blank=True, verbose_name="Prod Desc")
    
    # Marketing fields
    v2c = models.CharField(max_length=50, null=True, blank=True, verbose_name="V2C")
    marketing_id = models.CharField(max_length=50, null=True, blank=True, verbose_name="Mktg ID")
    std_store_return = models.FloatField(null=True, blank=True, verbose_name="STD Store Rtn %")
    
    # Planning fields
    last_project_review_date = models.DateField(null=True, blank=True, verbose_name="Last Proj Review Date")
    macy_spring_projection_note = models.TextField(null=True, blank=True, verbose_name="Macy's Spring Proj Notes")
    planner_response = models.TextField(null=True, blank=True, verbose_name="Planner Response")
    
    def __str__(self):
        return f"{self.product_id} - {self.product_description}"



class MonthlyForecast(models.Model):
    """Normalized model for all monthly forecast data with separate fields for each month"""

    VARIABLE_CHOICES = [
        ('MacysProjectionReciepts', 'Macys Projection Receipts'),  
        ('PlannedEOH', 'Planned EOH'),  # current plan_oh
        ('PlannedShipment', 'Planned Shipment'),
        ('PlannedForecast', 'Planned Forecast'),
        ('RecommendedForecast', 'Recommended Forecast'),
        ('ForecastByTrend', 'Forecast By Trend'),
        ('IndexPercentage', 'Index Percentage'),
        ('GrossProjection', 'Gross Projection'),

        # Added variables based on your dataset
        ('TY_Unit_Sales', 'This Year Unit Sales'),
        ('LY_Unit_Sales', 'Last Year Unit Sales'),
        ('LY_OH_Units', 'Last Year On-Hand Units'),
        ('TY_OH_Units', 'This Year On-Hand Units'),
        ('TY_Receipts', 'This Year Receipts'),
        ('LY_Receipts', 'Last Year Receipts'),
        ('TY_MCOM_Unit_Sales', 'This Year MCOM Unit Sales'),
        ('LY_MCOM_Unit_Sales', 'Last Year MCOM Unit Sales'),
        ('TY_OH_MCOM_Units', 'This Year MCOM On-Hand Units'),
        ('LY_MCOM_OH_Units', 'Last Year MCOM On-Hand Units'),
        ('PTD_TY_Sales', 'PTD This Year Sales'),
        ('LY_PTD_Sales', 'Last Year PTD Sales'),
        ('MCOM_PTD_TY_Sales', 'MCOM PTD This Year Sales'),
        ('MCOM_PTD_LY_Sales', 'MCOM PTD Last Year Sales'),
        ('OO_Total_Units', 'OO Total Units'),
        ('OO_MCOM_Total_Units', 'OO MCOM Total Units'),
    ]

    product = models.ForeignKey(ProductDetail, on_delete=models.CASCADE, verbose_name="Product")
    variable_name = models.CharField(max_length=50, choices=VARIABLE_CHOICES, verbose_name="Variable")
    year = models.PositiveIntegerField()

    # Separate fields for each month
    jan = models.IntegerField(null=True, blank=True, verbose_name="January")
    feb = models.IntegerField(null=True, blank=True, verbose_name="February")
    mar = models.IntegerField(null=True, blank=True, verbose_name="March")
    apr = models.IntegerField(null=True, blank=True, verbose_name="April")
    may = models.IntegerField(null=True, blank=True, verbose_name="May")
    jun = models.IntegerField(null=True, blank=True, verbose_name="June")
    jul = models.IntegerField(null=True, blank=True, verbose_name="July")
    aug = models.IntegerField(null=True, blank=True, verbose_name="August")
    sep = models.IntegerField(null=True, blank=True, verbose_name="September")
    oct = models.IntegerField(null=True, blank=True, verbose_name="October")
    nov = models.IntegerField(null=True, blank=True, verbose_name="November")
    dec = models.IntegerField(null=True, blank=True, verbose_name="December")

    class Meta:
        unique_together = ['product', 'variable_name', 'year']
        indexes = [
            models.Index(fields=['product', 'variable_name']),
            models.Index(fields=['year']),
        ]

    def __str__(self):
        return f"{self.product} - {self.variable_name} - {self.year}: Jan({self.jan}), Feb({self.feb}), ... Dec({self.dec})"


  
class StoreForecast(models.Model):
    category = models.CharField(max_length=100)
    pid = models.CharField(max_length=100)
    lead_time = models.IntegerField()
    leadtime_holiday_adjustment = models.BooleanField()
    month_12_fc_index = models.FloatField()
    loss = models.FloatField()
    month_12_fc_index_loss = models.FloatField()
    selected_months = models.JSONField()
    trend = models.FloatField()
    inventory_maintained = models.BooleanField()
    trend_index_difference = models.FloatField()
    red_box_item = models.BooleanField()
    forecasting_method = models.CharField(max_length=100)
    door_count = models.IntegerField()
    average_com_oh = models.FloatField()
    fldc = models.IntegerField()
    birthstone = models.CharField(max_length=100)
    birthstone_month = models.CharField(max_length=100,null=True, blank=True)
    considered_birthstone_required_quantity = models.BooleanField()
    forecast_month = models.CharField(max_length=10)
    forecast_month_required_quantity = models.FloatField()
    forecast_month_planned_oh = models.IntegerField()
    next_forecast_month = models.CharField(max_length=10)
    next_forecast_month_required_quantity = models.FloatField()
    next_forecast_month_planned_oh = models.IntegerField()
    added_qty_macys_soq = models.IntegerField()
    forecast_month_planned_shipment = models.FloatField()
    next_forecast_month_planned_shipment = models.FloatField()
    total_added_qty = models.FloatField()

    class Meta:
        # Define your unique fields to identify existing records
        unique_together = ('category', 'pid', 'forecast_month')


class ComForecast(models.Model):
    category = models.CharField(max_length=100)
    pid = models.CharField(max_length=100)
    lead_time = models.IntegerField()
    leadtime_holiday_adjustment = models.BooleanField()
    selected_months = models.JSONField()
    com_month_12_fc_index = models.FloatField()
    com_trend = models.FloatField()
    trend = models.FloatField()
    inventory_maintained = models.BooleanField()
    trend_index_difference = models.FloatField()
    red_box_item = models.BooleanField()
    forecasting_method = models.CharField(max_length=100)
    minimum_required_oh_for_com = models.FloatField()
    fldc = models.IntegerField()
    forecast_month = models.CharField(max_length=10)
    forecast_month_required_quantity = models.FloatField()
    forecast_month_planned_oh = models.IntegerField()
    next_forecast_month = models.CharField(max_length=10)
    next_forecast_month_required_quantity = models.FloatField()
    next_forecast_month_planned_oh = models.IntegerField()
    added_qty_macys_soq = models.IntegerField()
    vdf_status = models.BooleanField()
    vdf_added_qty = models.IntegerField()
    forecast_month_planned_shipment = models.FloatField()
    next_forecast_month_planned_shipment = models.IntegerField()
    total_added_qty = models.IntegerField()
    
    class Meta:
        unique_together = ('category', 'pid', 'forecast_month')


class OmniForecast(models.Model):
    category = models.CharField(max_length=100)
    pid = models.CharField(max_length=100)
    lead_time = models.IntegerField()
    leadtime_holiday_adjustment = models.BooleanField()
    selected_months = models.JSONField()
    com_month_12_fc_index = models.FloatField()
    com_trend = models.FloatField()
    com_inventory_maintained = models.BooleanField()
    trend_index_difference = models.FloatField()
    red_box_item = models.BooleanField()
    forecasting_method = models.CharField(max_length=100)
    minimum_required_oh_for_com = models.FloatField()
    com_fldc = models.IntegerField()
    forecast_month = models.CharField(max_length=10)
    forecast_month_required_quantity = models.FloatField()
    next_forecast_month = models.CharField(max_length=10)
    next_forecast_month_required_quantity = models.FloatField()
    store_month_12_fc_index = models.FloatField()
    loss = models.FloatField()
    store_month_12_fc_index_loss = models.FloatField()
    trend = models.FloatField()
    store_inventory_maintained = models.BooleanField()
    door_count = models.IntegerField()
    store_fldc = models.IntegerField()
    birthstone = models.CharField(max_length=100)
    birthstone_month = models.CharField(max_length=100,null=True, blank=True)
    considered_birthstone_required_quantity = models.BooleanField()
    forecast_month_planned_oh = models.IntegerField()
    next_forecast_month_planned_oh = models.IntegerField()
    added_qty_macys_soq = models.IntegerField()
    forecast_month_planned_shipment = models.FloatField()
    next_forecast_month_planned_shipment = models.FloatField()
    total_added_qty = models.FloatField()
    
    class Meta:
        unique_together = ('category', 'pid', 'forecast_month')