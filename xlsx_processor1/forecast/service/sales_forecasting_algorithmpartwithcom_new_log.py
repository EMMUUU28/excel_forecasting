import copy
import logging
from forecast.service.utils import *

logging.basicConfig(filename=r'log_file_all1.log', level=logging.INFO,
                    format='%(asctime)s:%(levelname)s:%(message)s',
                    filemode='w')

def algorithm(loader,category,all_birthstone_products,upcoming_birthstone_products,pids_below_door_count_alert,less_than_macys_SOQ_alert,added_macys_proj_receipts_alert,notify_macys_alert,min_order_alert,store,coms,omni):
   
    from forecast.service.getretailinfo import current_month,year_of_previous_month,season,previous_week_number
    from forecast.service.staticVariable import month_week_dict,CURRENT_DATE
    from forecast.service.createDataframe import return_QA_df,master_sheet,vendor_sheet, birthstone_sheet
    
    vendor = get_vendor_by_pid(loader.pid_value, master_sheet)
    country, lead_time = get_vendor_details(vendor, vendor_sheet)
    logging.info(f'pid: {loader.pid_value}')
    forecast_date =calculate_forecast_date(CURRENT_DATE, lead_time)
    logging.info(f'current_month: {current_month}')
    logging.info(f'previous_week_number: {previous_week_number}')
    lead_time,leadtime_holiday = adjust_lead_time(country, CURRENT_DATE, forecast_date, lead_time)
    forecast_date =calculate_forecast_date(CURRENT_DATE, lead_time)
    forecast_month = get_forecast_info(forecast_date)
    logging.info(f'loader.Safe_Non_Safe: {loader.Safe_Non_Safe}')
    current_month=current_month.upper()
    current_month_weeks = month_week_dict[current_month]
    logging.info(f'current_month_weeks: {current_month_weeks}')
    pid_type=find_pid_type(loader.Safe_Non_Safe,loader.pid_value,loader.LY_Unit_Sales,loader.LY_MCOM_Unit_Sales,loader.KPI_Door_count)
    print('CURRENT_DATE',CURRENT_DATE)
    print('forecast_date',forecast_date)
    logging.info(f'lead_time: {lead_time}')
    logging.info(f'forecast_month: {forecast_month}')
    print('forecast_month',forecast_month)
    print(f'lead_time: {lead_time}')
    logging.info(f'pid_type: {pid_type}')
    logging.info(f'index_value: {loader.index_value}')
    forecast_month_next_month=find_next_month_after_forecast_month(forecast_month)
    rank =loader.Item_Code
    row4_values=[i+1 for i in range(12)]
    row17_values=[loader.TY_Unit_Sales[month] for month in MONTHS]
    row39_values=[loader.LY_Unit_Sales[month] for month in MONTHS]
    forecast_season=get_forecast_month_season(forecast_month)
    logging.info(f'forecast_season: {forecast_season}')
    logging.info(f'season: {season}')
    logging.info(f'Door count: {loader.KPI_Door_count}')
    season='SPRING' if season == 'SP' else 'FALL'
    forecast_season_month=find_season_list(forecast_season)
    season_month=find_season_list(season)
    logging.info(f'season_month: {season_month}')
    in_transit = calculate_in_transit_qty(loader.OO, loader.nav_OO)
    logging.info(f'in_transit: {in_transit}')
    planned_shp = loader.planned_shp
    planned_shp[current_month] += in_transit
    logging.info(f'planned_shp: {planned_shp}')
    check_no_red_box = contains_no_longer_red_box(loader.Planner_Response)
    selected_months=None
    pid_omni_status=False
    VDF_status=False
    if pid_type=='store_pid':
        STD_index_value=calculate_std_index_value(loader.index_value,STD_PERIOD)
        logging.info(f'STD_index_value: {STD_index_value}')
        month_12_fc_index=calculate_12th_month_forecast(loader.STD_TY_Unit_Sales_list, STD_index_value)
        logging.info(f'month_12_fc_index: {month_12_fc_index}')
        month_12_fc_index_original=copy.deepcopy(month_12_fc_index)
        std_trend=calculate_std_trend(loader.STD_TY_Unit_Sales_list, loader.STD_LY_Unit_Sales_list)
        logging.info(f'std_trend: {std_trend}')
        fc_by_index=calculate_fc_by_index(loader.index_value, month_12_fc_index)
        fc_by_trend=calculate_fc_by_trend(last_month_of_previous_month_numeric, current_month_number,std_trend, row4_values, row17_values, row39_values)
        logging.info(f'fc_by_index: {fc_by_index}')
        logging.info(f'fc_by_trend: {fc_by_trend}')
        last_year_store_eom_oh_for_inventory_check=last_year_eom_oh_season(loader.LY_OH_Units,loader.LY_MCOM_OH_Units,season_month)
        logging.info(f'last_year_store_eom_oh_for_inventory_check: {last_year_store_eom_oh_for_inventory_check}')
        is_maintained_status=is_maintained(last_year_store_eom_oh_for_inventory_check, 0.95, loader.KPI_Door_count)
        logging.info(f'is_maintained_status: {is_maintained_status}')
        forecasting_method=decide_forecasting_method(is_maintained_status)
        
        logging.info(f'check_no_red_box: {check_no_red_box}')
        if check_no_red_box:
            forecasting_method = "FC By Index"
            logging.info(f'updated_forecasting_method: {forecasting_method}')
        logging.info(f'forecasting_method: {forecasting_method}')
        loss=0
        if forecasting_method =='FC By Index':
            average_value = sum(last_year_store_eom_oh_for_inventory_check) / len(last_year_store_eom_oh_for_inventory_check)
            logging.info(f'average_value: {average_value}')
            loss=calculate_loss(loader.KPI_Door_count, average_value)
            logging.info(f'loss: {loss}')
            loss_percent =determine_loss_percent(loss,rank, loader.Own_Retail)
            logging.info(f'loss_percent: {loss_percent}')
            month_12_fc_index=update_12_month_forecast_by_loss(month_12_fc_index, loss_percent)
            logging.info(f'Updated_month_12_fc_index: {month_12_fc_index}')
            fc_by_index=calculate_fc_by_index(loader.index_value, month_12_fc_index)
            logging.info(f'fc_by_index_updated: {fc_by_index}')
        elif forecasting_method =='FC By Trend':
            if current_month!='FEB':
                logging.info(f'current_month_weeks: {current_month_weeks}')
                selected_months=new_trend_month_selection(current_month_weeks,current_month,season_month)
                logging.info(f'selected_months: {selected_months}')
                TY_Unit_Sales_list_new_trend = [loader.TY_Unit_Sales[month] for month in selected_months]
                if current_month_weeks > 2:
                    TY_Unit_Sales_list_new_trend[-1] = round(TY_Unit_Sales_list_new_trend[-1] / (CURRENT_MONTH_SALES_PERCENTAGES/100))
                LY_Unit_Sales_list_new_trend=[loader.LY_Unit_Sales[month] for month in selected_months]
                logging.info(f'TY_Unit_Sales_list_new_trend: {TY_Unit_Sales_list_new_trend}')
                logging.info(f'LY_Unit_Sales_list_new_trend: {LY_Unit_Sales_list_new_trend}')
                logging.info(f'std_trend: {std_trend}')
                new_std_trend=calculate_std_trend(TY_Unit_Sales_list_new_trend,LY_Unit_Sales_list_new_trend)  
                logging.info(f'new_std_trend: {new_std_trend}')
                std_trend=adjust_std_trend_minimum(std_trend, new_std_trend)
                logging.info(f'minimum_new_std_trend: {std_trend}')
                result = is_same_sales(TY_Unit_Sales_list_new_trend, LY_Unit_Sales_list_new_trend)
                logging.info(f'is_same_sales: {result}')
                if result:
                    std_trend = 0
                    forecasting_method = "Average"
                fc_by_trend=calculate_fc_by_trend(last_month_of_previous_month_numeric, current_month_number,std_trend, row4_values, row17_values, row39_values)
                logging.info(f'fc_by_trend: {fc_by_trend}')
                logging.info(f'updated_std_trend: {std_trend}')
                logging.info(f'updated_forecasting_method: {forecasting_method}')
        difference=compare_seasonal_forecasts_by_method(fc_by_index, fc_by_trend,forecast_season)
        logging.info(f'difference: {difference}')
        if difference < 15:
            forecasting_method = "Average"
            logging.info(f'updated_forecasting_method: {forecasting_method}')

        logging.info(f'fc_by_trend: {fc_by_trend}')
        fc_by_average=calculate_fc_by_average(fc_by_index, fc_by_trend)
        logging.info(f'fc_by_average: {fc_by_average}')
        recommended_fc=get_recommended_forecast(forecasting_method, fc_by_index, fc_by_trend, fc_by_average)
        logging.info(f'recommended_fc: {recommended_fc}')
        planned_fc=calculate_planned_fc(row4_values, recommended_fc, loader.TY_Unit_Sales, loader.LY_OH_Units,rolling_method, current_month_number)
        logging.info(f'rolling_method: {rolling_method}')
        logging.info(f'planned_fc: {planned_fc}')
        current_month_fc=calculate_current_month_fc(current_month, loader.TY_Unit_Sales)
        logging.info(f'current_month_fc: {current_month_fc}')
        actual_sale_unit= loader.TY_Unit_Sales[current_month]
        planned_fc=update_planned_fc_for_current_month(loader.LY_Unit_Sales,recommended_fc,fc_by_trend,planned_fc,current_month,current_month_fc,current_month_weeks,previous_week_number,is_maintained_status,std_trend,check_no_red_box,actual_sale_unit)
        logging.info(f'updated_planned_fc: {planned_fc}')

        planned_oh = calculate_planned_oh_partial(rolling_method, current_month_number, planned_fc, planned_shp, loader.TY_OH_Units, loader.TY_Receipts, loader.LY_OH_Units, loader.TY_Unit_Sales, current_month, override_value=None)
        logging.info(f'planned_oh: {planned_oh}')
        planned_oh_before_adding_qty = copy.deepcopy(planned_oh)
        required_quantity ,birthstone_status,birthstone,birthstone_month= calculate_required_quantity(master_sheet, loader.pid_value, birthstone_sheet, forecast_month, loader.KPI_Door_count, all_birthstone_products, upcoming_birthstone_products)
        logging.info(f'required_quantity: {required_quantity}')
        average_com_eom_oh = calculate_average_com_eom_oh(loader.TY_MCOM_OH_Units)
        logging.info(f'average_com_eom_oh: {average_com_eom_oh}')
        required_quantity,Calculate_FLDC = update_required_quantity_for_forecast_month(forecast_month, planned_fc, required_quantity, average_com_eom_oh, loader.KPI_Door_count)
        logging.info(f'updated required_quantity for forecast_month: {required_quantity}')
        planned_shp, pids_below_door_count_alert = update_projection_for_month(forecast_month, required_quantity, planned_oh, planned_shp, loader.pid_value, pids_below_door_count_alert)
        logging.info(f'planned_shp after update_projection_for_month: {planned_shp}')
        logging.info(f'pids_below_door_count_alert: {pids_below_door_count_alert}')
        planned_oh = calculate_planned_oh_partial(rolling_method, current_month_number, planned_fc, planned_shp, loader.TY_OH_Units, loader.TY_Receipts, loader.LY_OH_Units, loader.TY_Unit_Sales, current_month,override_value=None)
        logging.info(f'planned_oh after update: {planned_oh}')
        check = is_late_forecast_week(forecast_date)
        logging.info(f'is_late_forecast_week: {check}')
        if check:
            planned_shp, pids_below_door_count_alert = update_projection_for_month(forecast_month_next_month, required_quantity, planned_oh, planned_shp, loader.pid_value, pids_below_door_count_alert)
            logging.info(f'planned_shp after late forecast month update: {planned_shp}')
            logging.info(f'pids_below_door_count_alert after late update: {pids_below_door_count_alert}')

        planned_oh = calculate_planned_oh_partial(rolling_method, current_month_number, planned_fc, planned_shp, loader.TY_OH_Units, loader.TY_Receipts, loader.LY_OH_Units, loader.TY_Unit_Sales, current_month,override_value=None)
        logging.info(f'final planned_oh before holiday check: {planned_oh}')


        # Add the dictionary key-values as new columns
    elif pid_type=='com_pid':
        if loader.Safe_Non_Safe in ['FB','COM ONLY','COM REPLEN','VDF REPLEN'] or loader.pid_value in VDF_item or (loader.Safe_Non_Safe in ['OMNI'] and count_ttl_com_sale(loader.LY_Unit_Sales,loader.LY_MCOM_Unit_Sales)>=70 ) :
            STD_index_value=calculate_std_index_value(loader.index_value,STD_PERIOD)
            logging.info(f'STD_index_value: {STD_index_value}')
            month_12_fc_index=calculate_12th_month_forecast(loader.STD_TY_Unit_Sales_list, STD_index_value)
            logging.info(f'month_12_fc_index: {month_12_fc_index}')
            std_trend=calculate_std_trend(loader.STD_TY_Unit_Sales_list, loader.STD_LY_Unit_Sales_list)
            logging.info(f'std_trend: {std_trend}')
            if current_month!='FEB':
                logging.info(f'current_month_weeks: {current_month_weeks}')
                selected_months=new_trend_month_selection(current_month_weeks,current_month,season_month)
                logging.info(f'selected_months: {selected_months}')
                TY_com_Unit_Sales_list_new= [loader.TY_MCOM_Unit_Sales[month] for month in selected_months]
                if current_month_weeks > 2:
                    TY_com_Unit_Sales_list_new[-1] = round(TY_com_Unit_Sales_list_new[-1] / (CURRENT_MONTH_SALES_PERCENTAGES/100))
                logging.info(f'current month com: {TY_com_Unit_Sales_list_new[-1]}')
                LY_com_Unit_Sales_list_new=[loader.LY_MCOM_Unit_Sales[month] for month in selected_months]

                com_std_trend=calculate_std_trend(TY_com_Unit_Sales_list_new,LY_com_Unit_Sales_list_new)  
                new_com_std_trend=handle_large_trend(com_std_trend)
                std_trend=new_com_std_trend
                logging.info(f'std_trend: {std_trend}')

                STD_index_value=calculate_std_index_value(loader.index_value,selected_months)
                new_com_month_12_fc_index=calculate_12th_month_forecast(TY_com_Unit_Sales_list_new, STD_index_value)
                month_12_fc_index=new_com_month_12_fc_index
            LY_MCOM_OH_Units_new= [loader.LY_MCOM_OH_Units[month] for month in selected_months]
            is_maintained_status_com=is_maintained_for_com(LY_MCOM_OH_Units_new, threshold=2, ratio=0.2)
            forecasting_method=decide_forecasting_method(is_maintained_status_com)
            if check_no_red_box:
                forecasting_method = "FC By Index"
                logging.info(f'updated_forecasting_method: {forecasting_method}')
            fc_by_index=calculate_fc_by_index(loader.index_value, month_12_fc_index)
            logging.info(f'fc_by_index_updated: {fc_by_index}')   
            fc_by_trend=calculate_fc_by_trend(last_month_of_previous_month_numeric, current_month_number,std_trend, row4_values, row17_values, row39_values)
            difference=compare_seasonal_forecasts_by_method(fc_by_index, fc_by_trend,forecast_season)
            logging.info(f'difference: {difference}')
            if difference < 15:
                forecasting_method = "Average"
                logging.info(f'updated_forecasting_method: {forecasting_method}')


            logging.info(f'fc_by_trend: {fc_by_trend}')
            fc_by_average=calculate_fc_by_average(fc_by_index, fc_by_trend)
            logging.info(f'fc_by_average: {fc_by_average}')
            recommended_fc=get_recommended_forecast(forecasting_method, fc_by_index, fc_by_trend, fc_by_average)
            planned_fc=calculate_planned_fc(row4_values, recommended_fc, loader.TY_Unit_Sales, loader.LY_OH_Units,rolling_method, current_month_number)
            current_month_fc=calculate_current_month_fc(current_month, loader.TY_MCOM_Unit_Sales)
            logging.info(f'current_month_fc: {current_month_fc}')
            actual_com_sale_unit= loader.TY_MCOM_Unit_Sales[current_month]
            planned_fc=update_planned_fc_for_current_month(loader.LY_Unit_Sales,recommended_fc,fc_by_trend,planned_fc,current_month,current_month_fc,current_month_weeks,previous_week_number,is_maintained_status_com,std_trend,check_no_red_box,actual_com_sale_unit)
            logging.info(f'planned_fc: {planned_fc}')
            TY_COM_OH_Units_List= [loader.TY_MCOM_OH_Units[month] for month in selected_months]     
            LY_COM_OH_Units_List= [loader.LY_MCOM_OH_Units[month] for month in selected_months]
            TY_average_COM_OH = sum(TY_COM_OH_Units_List) / len(TY_COM_OH_Units_List)
            LY_average_COM_OH = sum(LY_COM_OH_Units_List) / len(LY_COM_OH_Units_List)
            logging.info(f'loader.LY_MCOM_Unit_Sales : {loader.LY_MCOM_Unit_Sales}')
            LY_MCOM_Unit_Sales_List= [loader.LY_MCOM_Unit_Sales[month] for month in MONTHS]
            if is_maintained_status_com:
                com_doorcount=find_average_com_oh(TY_average_COM_OH,LY_average_COM_OH,std_trend)
                logging.info(f'com_doorcount inventory maintain: {com_doorcount}')
            else:
                com_doorcount =round( (sum(LY_MCOM_Unit_Sales_List) / len(LY_MCOM_Unit_Sales_List)),0)
                logging.info(f'com_doorcount inventory not maintain: {com_doorcount}')
            required_quantity,Calculate_FLDC=required_quantity_for_com(forecast_month, planned_fc,com_doorcount)
            logging.info(f'required_quantity: {required_quantity}')
            override_value=loader.TY_MCOM_OH_Units[current_month]
            logging.info(f'override_value: {override_value}')
            planned_oh = calculate_planned_oh_partial(rolling_method, current_month_number, planned_fc, planned_shp, loader.TY_OH_Units, loader.TY_Receipts, loader.LY_OH_Units, loader.TY_Unit_Sales, current_month,override_value=override_value)
            logging.info(f'planned_oh: {planned_oh}')
            planned_oh_before_adding_qty_com = copy.deepcopy(planned_oh)
            planned_shp, pids_below_door_count_alert = update_projection_for_month(forecast_month, required_quantity, planned_oh, planned_shp, loader.pid_value, pids_below_door_count_alert)
            logging.info(f'planned_shp after update_projection_for_month: {planned_shp}')

            planned_oh = calculate_planned_oh_partial(rolling_method, current_month_number, planned_fc, planned_shp, loader.TY_OH_Units, loader.TY_Receipts, loader.LY_OH_Units, loader.TY_Unit_Sales, current_month,override_value=override_value)
            logging.info(f'planned_oh after update: {planned_oh}')

            check = is_late_forecast_week(forecast_date)
            logging.info(f'is_late_forecast_week: {check}')

            if check:
                planned_shp, pids_below_door_count_alert = update_projection_for_month(forecast_month_next_month, required_quantity, planned_oh, planned_shp, loader.pid_value, pids_below_door_count_alert)
                logging.info(f'planned_shp after late forecast month update: {planned_shp}')
                logging.info(f'pids_below_door_count_alert after late update: {pids_below_door_count_alert}')

            planned_oh = calculate_planned_oh_partial(rolling_method, current_month_number, planned_fc, planned_shp, loader.TY_OH_Units, loader.TY_Receipts, loader.LY_OH_Units, loader.TY_Unit_Sales, current_month,override_value=None)
            VDF_added_qty=0

            if loader.pid_value in VDF_item or loader.Safe_Non_Safe in ['VDF REPLEN'] :
                VDF_status=True
                logging.info(f'This is VDF item')
                logging.info(f'count_ttl_com_sale: {count_ttl_com_sale(loader.LY_Unit_Sales,loader.LY_MCOM_Unit_Sales)}')
                sell_base_min_value=10 if count_ttl_com_sale(loader.LY_Unit_Sales,loader.LY_MCOM_Unit_Sales) >70 else 5
                logging.info(f'sell_base_min_value: {sell_base_min_value}')
                logging.info(f'loader.RLJ_OH: {loader.RLJ_OH}')
                logging.info(f'loader.FLDC: {loader.FLDC}')
                logging.info(f'loader.WIP: {loader.WIP}')
                VDFqty=sum([loader.RLJ_OH, loader.FLDC , loader.WIP])
                if VDFqty<sell_base_min_value:
                    VDF_added_qty=VDFqty-sell_base_min_value
                    planned_shp[forecast_month]=+VDF_added_qty
                logging.info(f'planned_shp: {planned_shp}')

        elif loader.Safe_Non_Safe in ['OMNI'] and count_ttl_com_sale(loader.LY_Unit_Sales,loader.LY_MCOM_Unit_Sales)>=65 :
            pid_omni_status=True
            ###########com calculation#####################
            logging.info(f'com calculation for omni')
            STD_index_value=calculate_std_index_value(loader.index_value,STD_PERIOD)
            logging.info(f'STD_index_value: {STD_index_value}')
            month_12_fc_index=calculate_12th_month_forecast(loader.STD_TY_Unit_Sales_list, STD_index_value)
            logging.info(f'month_12_fc_index: {month_12_fc_index}')
            std_trend=calculate_std_trend(loader.STD_TY_Unit_Sales_list, loader.STD_LY_Unit_Sales_list)
            logging.info(f'std_trend: {std_trend}')
            if current_month!='FEB':
                logging.info(f'current_month_weeks: {current_month_weeks}')
                selected_months=new_trend_month_selection(current_month_weeks,current_month,season_month)
                logging.info(f'selected_months: {selected_months}')
                TY_com_Unit_Sales_list_new= [loader.TY_MCOM_Unit_Sales[month] for month in selected_months]
                if current_month_weeks > 2:
                    TY_com_Unit_Sales_list_new[-1] = round(TY_com_Unit_Sales_list_new[-1] / (CURRENT_MONTH_SALES_PERCENTAGES/100))
                logging.info(f'current month com: {TY_com_Unit_Sales_list_new[-1]}')
                LY_com_Unit_Sales_list_new=[loader.LY_MCOM_Unit_Sales[month] for month in selected_months]

                com_std_trend=calculate_std_trend(TY_com_Unit_Sales_list_new,LY_com_Unit_Sales_list_new)  
                logging.info(f'new_std_trend: {com_std_trend}')
                new_com_std_trend=handle_large_trend(com_std_trend)
                std_trend=new_com_std_trend
                logging.info(f'std_trend: {std_trend}')

                STD_index_value=calculate_std_index_value(loader.index_value,selected_months)
                new_com_month_12_fc_index=calculate_12th_month_forecast(TY_com_Unit_Sales_list_new, STD_index_value)
                month_12_fc_index=new_com_month_12_fc_index
            LY_MCOM_OH_Units_new= [loader.LY_MCOM_OH_Units[month] for month in selected_months]
            is_maintained_status_com=is_maintained_for_com(LY_MCOM_OH_Units_new, threshold=2, ratio=0.2)
            forecasting_method=decide_forecasting_method(is_maintained_status_com)
            logging.info(f'check_no_red_box: {check_no_red_box}')
            if check_no_red_box:
                forecasting_method = "FC By Index"
            fc_by_index=calculate_fc_by_index(loader.index_value, month_12_fc_index)
            logging.info(f'fc_by_index_updated: {fc_by_index}')   
            fc_by_trend=calculate_fc_by_trend(last_month_of_previous_month_numeric, current_month_number,std_trend, row4_values, row17_values, row39_values)
            com_difference=compare_seasonal_forecasts_by_method(fc_by_index, fc_by_trend,forecast_season)
            logging.info(f'difference: {com_difference}')
            if com_difference < 15:
                forecasting_method = "Average"
                logging.info(f'updated_forecasting_method: {forecasting_method}')

            logging.info(f'updated_forecasting_method: {forecasting_method}')
            logging.info(f'fc_by_trend: {fc_by_trend}')
            fc_by_average=calculate_fc_by_average(fc_by_index, fc_by_trend)
            logging.info(f'fc_by_average: {fc_by_average}')
            recommended_fc=get_recommended_forecast(forecasting_method, fc_by_index, fc_by_trend, fc_by_average)
            planned_fc_com=calculate_planned_fc(row4_values, recommended_fc, loader.TY_Unit_Sales, loader.LY_OH_Units,rolling_method, current_month_number)
            current_month_fc=calculate_current_month_fc(current_month, loader.TY_MCOM_Unit_Sales)
            logging.info(f'current_month_fc: {current_month_fc}')
            actual_com_sale_unit= loader.TY_MCOM_Unit_Sales[current_month]
            planned_fc_com=update_planned_fc_for_current_month(loader.LY_Unit_Sales,recommended_fc,fc_by_trend,planned_fc_com,current_month,current_month_fc,current_month_weeks,previous_week_number,is_maintained_status_com,std_trend,check_no_red_box,actual_com_sale_unit)
            TY_COM_OH_Units_List= [loader.TY_MCOM_OH_Units[month] for month in selected_months]     
            LY_COM_OH_Units_List= [loader.LY_MCOM_OH_Units[month] for month in selected_months]
            TY_average_COM_OH = sum(TY_COM_OH_Units_List) / len(TY_COM_OH_Units_List)
            LY_average_COM_OH = sum(LY_COM_OH_Units_List) / len(LY_COM_OH_Units_List)
            logging.info(f'loader.LY_MCOM_Unit_Sales : {loader.LY_MCOM_Unit_Sales}')
            LY_MCOM_Unit_Sales_List= [loader.LY_MCOM_Unit_Sales[month] for month in MONTHS]
            if is_maintained_status_com:
                com_doorcount=find_average_com_oh(TY_average_COM_OH,LY_average_COM_OH,std_trend)
                logging.info(f'com_doorcount inventory maintain: {com_doorcount}')
            else:
                com_doorcount =round( (sum(LY_MCOM_Unit_Sales_List) / len(LY_MCOM_Unit_Sales_List)),0)
                logging.info(f'com_doorcount inventory not maintain: {com_doorcount}')
            required_quantity_com,com_Calculate_FLDC=required_quantity_for_com(forecast_month, planned_fc_com,com_doorcount)
            logging.info(f'required_quantity_com: {required_quantity_com}')
            

            ###########store calculation#####################
            logging.info(f'store calculation for omni')
            TY_store_sales_unit = {
                month: loader.TY_Unit_Sales[month] - loader.TY_MCOM_Unit_Sales[month]
                for month in loader.TY_Unit_Sales
            }
            LY_store_sales_unit = {
                month: loader.LY_Unit_Sales[month] - loader.LY_MCOM_Unit_Sales[month]
                for month in loader.LY_Unit_Sales
            }
            if current_month!='FEB':
                logging.info(f'current_month_weeks: {current_month_weeks}')
                selected_months=new_trend_month_selection(current_month_weeks,current_month,season_month)
                logging.info(f'selected_months: {selected_months}')
                TY_store_Unit_Sales_list_new= [TY_store_sales_unit[month] for month in selected_months]
                if current_month_weeks > 2:
                    TY_store_Unit_Sales_list_new[-1] = round(TY_store_Unit_Sales_list_new[-1] / (CURRENT_MONTH_SALES_PERCENTAGES/100))
                logging.info(f'current store com: {TY_store_Unit_Sales_list_new[-1]}')
                LY_store_Unit_Sales_list_new=[LY_store_sales_unit[month] for month in selected_months]
                store_std_trend=calculate_std_trend(TY_store_Unit_Sales_list_new,LY_store_Unit_Sales_list_new)  
                logging.info(f'new_std_trend: {store_std_trend}')
                std_trend=calculate_std_trend(loader.STD_TY_Unit_Sales_list, loader.STD_LY_Unit_Sales_list)
                logging.info(f'std_trend: {std_trend}')
                new_store_std_trend=handle_large_trend(store_std_trend)
                std_trend=new_store_std_trend
                logging.info(f'std_trend: {std_trend}')

                STD_index_value=calculate_std_index_value(loader.index_value,selected_months)
                new_store_month_12_fc_index=calculate_12th_month_forecast(TY_store_Unit_Sales_list_new, STD_index_value)
                month_12_fc_index=new_store_month_12_fc_index
                logging.info(f'new_com_month_12_fc_index: {new_com_month_12_fc_index}')

            last_year_store_eom_oh_for_inventory_check=last_year_eom_oh_season(loader.LY_OH_Units,loader.LY_MCOM_OH_Units,season_month)
            logging.info(f'last_year_store_eom_oh_for_inventory_check: {last_year_store_eom_oh_for_inventory_check}')
            is_maintained_status_store=is_maintained(last_year_store_eom_oh_for_inventory_check, 0.95, loader.KPI_Door_count)
            logging.info(f'is_maintained_status: {is_maintained_status_store}')
            forecasting_method=decide_forecasting_method(is_maintained_status_store)
            loss=0

            if forecasting_method =='FC By Index':
                average_value = sum(last_year_store_eom_oh_for_inventory_check) / len(last_year_store_eom_oh_for_inventory_check)
                logging.info(f'average_value: {average_value}')
                loss=calculate_loss(loader.KPI_Door_count, average_value)
                logging.info(f'loss: {loss}')
                loss_percent =determine_loss_percent(loss,rank, loader.Own_Retail)
                logging.info(f'loss_percent: {loss_percent}')
                month_12_fc_index=update_12_month_forecast_by_loss(month_12_fc_index, loss_percent)
            fc_by_index=calculate_fc_by_index(loader.index_value, month_12_fc_index)
            logging.info(f'fc_by_index_updated: {fc_by_index}')   
            fc_by_trend=calculate_fc_by_trend(last_month_of_previous_month_numeric, current_month_number,std_trend, row4_values, row17_values, row39_values)
            difference=compare_seasonal_forecasts_by_method(fc_by_index, fc_by_trend,forecast_season)
            logging.info(f'difference: {difference}')
            if difference < 15:
                forecasting_method = "Average"
                logging.info(f'updated_forecasting_method: {forecasting_method}')
            logging.info(f'check_no_red_box: {check_no_red_box}')
            if check_no_red_box:
                forecasting_method = "FC By Index"
            logging.info(f'updated_forecasting_method: {forecasting_method}')
            logging.info(f'fc_by_trend: {fc_by_trend}')
            fc_by_average=calculate_fc_by_average(fc_by_index, fc_by_trend)
            logging.info(f'fc_by_average: {fc_by_average}')
            recommended_fc=get_recommended_forecast(forecasting_method, fc_by_index, fc_by_trend, fc_by_average)
            planned_fc_store=calculate_planned_fc(row4_values, recommended_fc, loader.TY_Unit_Sales, loader.LY_OH_Units,rolling_method, current_month_number)
            current_month_fc=calculate_current_month_fc(current_month, loader.TY_MCOM_Unit_Sales)
            logging.info(f'current_month_fc: {current_month_fc}')
            actual_store_sale_unit= TY_store_sales_unit[current_month]
            planned_fc_store=update_planned_fc_for_current_month(loader.LY_Unit_Sales,recommended_fc,fc_by_trend,planned_fc_store,current_month,current_month_fc,current_month_weeks,previous_week_number,is_maintained_status_store,std_trend,check_no_red_box,actual_store_sale_unit)
            required_quantity_store ,birthstone_status,birthstone,birthstone_month= calculate_required_quantity(master_sheet, loader.pid_value, birthstone_sheet, forecast_month, loader.KPI_Door_count, all_birthstone_products, upcoming_birthstone_products)
            average_com_eom_oh=0
            required_quantity_store,store_Calculate_FLDC = update_required_quantity_for_forecast_month(forecast_month, planned_fc_store, required_quantity_store, average_com_eom_oh, loader.KPI_Door_count)
            logging.info(f'required_quantity_store: {required_quantity_store}')
            planned_fc={month: planned_fc_store.get(month, 0) + planned_fc_com.get(month, 0) for month in planned_fc_store}
            planned_oh = calculate_planned_oh_partial(rolling_method, current_month_number, planned_fc, planned_shp, loader.TY_OH_Units, loader.TY_Receipts, loader.LY_OH_Units, loader.TY_Unit_Sales, current_month,override_value=None)
            planned_oh_before_adding_qty = copy.deepcopy(planned_oh)
            required_quantity={month: required_quantity_store.get(month, 0) + required_quantity_com.get(month, 0) for month in required_quantity_store}
            logging.info(f'required_quantity: {required_quantity}')
            planned_shp, pids_below_door_count_alert = update_projection_for_month(forecast_month, required_quantity, planned_oh, planned_shp, loader.pid_value, pids_below_door_count_alert)
            check = is_late_forecast_week(forecast_date)
            logging.info(f'is_late_forecast_week: {check}')
            if check:
                planned_shp, pids_below_door_count_alert = update_projection_for_month(forecast_month_next_month, required_quantity, planned_oh, planned_shp, loader.pid_value, pids_below_door_count_alert)
                logging.info(f'planned_shp after late forecast month update: {planned_shp}')
                logging.info(f'pids_below_door_count_alert after late update: {pids_below_door_count_alert}')
            planned_oh = calculate_planned_oh_partial(rolling_method, current_month_number, planned_fc, planned_shp, loader.TY_OH_Units, loader.TY_Receipts, loader.LY_OH_Units, loader.TY_Unit_Sales, current_month,override_value=None)
            logging.info(f'final planned_oh before holiday check: {planned_oh}')


    if pid_type!='Not forecast':
        week_of_forecast_month = get_week_of_month(forecast_date)
        logging.info(f'week_of_forecast_month: {week_of_forecast_month}')

        target_month_abbr, target_week = calculate_week_and_month(forecast_month, week_of_forecast_month, year_of_previous_month, WEEK_TO_ADD_FOR_HOLIDAY)
        logging.info(f'target_month_abbr: {target_month_abbr}, target_week: {target_week}')

        holiday_name, check_is_holiday = check_holiday(target_month_abbr, target_week, df_holidays)
        logging.info(f'holiday_name: {holiday_name}, check_is_holiday: {check_is_holiday}')

        planned_shp = adjust_planned_shp_for_holiday(check_is_holiday, category, holiday_name, forecast_month, required_quantity, planned_shp)
        logging.info(f'planned_shp after holiday adjustment: {planned_shp}')

        forecast_season_month = find_season_list(forecast_season)
        logging.info(f'forecast_season_month: {forecast_season_month}')

        planned_season_sum = season_sum(planned_shp, forecast_season_month)
        logging.info(f'planned_season_sum: {planned_season_sum}')

        macys_season_sum = season_sum(loader.macys_proj_receipt, forecast_season_month)
        logging.info(f'macys_season_sum: {macys_season_sum}')

        sum_of_omni_receipt_and_planned_shipment_upto_next_month_after_forecast_month, macys_proj_receipt_upto_next_month_after_forecast_month = calculate_seasonwise_projection(
            forecast_month, planned_shp, loader.macys_proj_receipt, loader.TY_Receipts, forecast_season_month
        )
        logging.info(f'sum_of_omni_and_planned_upto_next_month: {sum_of_omni_receipt_and_planned_shipment_upto_next_month_after_forecast_month}')
        logging.info(f'macys_proj_receipt_upto_next_month: {macys_proj_receipt_upto_next_month_after_forecast_month}')

        average_store_sale_thru = calculate_store_sale_thru(loader.LY_Unit_Sales, loader.LY_MCOM_Unit_Sales, loader.LY_OH_Units, loader.LY_MCOM_OH_Units)
        logging.info(f'average_store_sale_thru: {average_store_sale_thru}')
        if pid_type=='store_pid':
            MAcy_SOQ_percentage = determine_percentage_to_add_quantity(average_store_sale_thru, loader.Own_Retail)
        else:
            MAcy_SOQ_percentage = 0.75
        logging.info(f'MAcy_SOQ_percentage: {MAcy_SOQ_percentage}')
        return_quantity_dict, return_quantity_dict_80_percent = get_return_quantity_dict(loader.pid_value, return_QA_df)

        planned_shp, less_than_macys_SOQ_alert, added_macys_proj_receipts_alert,macy_additional_units = adjust_planned_shipments_based_on_macys(
            forecast_month, macys_proj_receipt_upto_next_month_after_forecast_month,
            sum_of_omni_receipt_and_planned_shipment_upto_next_month_after_forecast_month,
            MAcy_SOQ_percentage, planned_shp, planned_oh, loader.KPI_Door_count, category,
            return_quantity_dict_80_percent, loader.pid_value, less_than_macys_SOQ_alert,
            added_macys_proj_receipts_alert
        )
        logging.info(f'planned_shp after macys adjustment: {planned_shp}')

        total_gross_projection = sum([
            loader.Nav_Feb, loader.Nav_Mar, loader.Nav_Apr, loader.Nav_May, loader.Nav_Jun,
            loader.Nav_Jul, loader.Nav_Aug, loader.Nav_Sep, loader.Nav_Oct, loader.Nav_Nov,
            loader.Nav_Dec, loader.Nav_Jan
        ])
        logging.info(f'total_gross_projection: {total_gross_projection}')

        notify_macys_alert, min_order_alert, total_added_quantity = check_macys_min_order(
            loader.pid_value, macys_season_sum, planned_season_sum, total_gross_projection,
            in_transit, planned_shp, loader.Min_order, notify_macys_alert, min_order_alert
        )

        logging.info(f'total_added_quantity: {total_added_quantity}')
        if pid_type=='store_pid':
            data_store = {
            "category":category,
            "pid": loader.pid_value,
            "lead time":lead_time,
            "leadtime holiday adjustment":leadtime_holiday,
            "month_12_fc_index":month_12_fc_index_original,
            "loss":loss,
            "month_12_fc_index_(loss)":month_12_fc_index,
            "selected_months":selected_months,
            "trend":std_trend,
            "Inventory maintained":is_maintained_status,
            "trend index difference":difference,
            "red_box item":check_no_red_box,
            "forecasting_method":forecasting_method,            
            "Door Count":loader.KPI_Door_count,
            "average com_oh":average_com_eom_oh,
            "FLDC" :Calculate_FLDC,
            "birthstone":birthstone,
            "birthstone_month":birthstone_month,
            "considered birthstone for requried quantity":birthstone_status,
            "forecast_month": forecast_month,
            "forecast_month_required_quantity": f'{required_quantity[forecast_month]}',
            "forecast_month_planned_oh_before_adding_qty":planned_oh_before_adding_qty[forecast_month], 
            "Next_forecast_month":forecast_month_next_month,
            "Next_forecast_month_required_quantity": f'{required_quantity[forecast_month_next_month]}',
            "Next_forecast_month_planned_oh_before_adding_qty":planned_oh_before_adding_qty[forecast_month_next_month],
            "Added qtys by Macys SOQ":macy_additional_units,  
            "forecast_month_planned_shipment":planned_shp[forecast_month],
            "Next_forecast_month_planned_shipment":planned_shp[forecast_month_next_month],
            "Total added qty":total_added_quantity,
 
        }
            store.append(data_store)
        elif pid_type=='com_pid'and not pid_omni_status:
            data_com = {
            "category":category,
            "pid": loader.pid_value,
            "lead time":lead_time,
            "leadtime holiday adjustment":leadtime_holiday,
            "selected_months":selected_months,
            "com_month_12_fc_index":new_com_month_12_fc_index,
            "com trend":new_com_std_trend,
            "trend":std_trend,
            "Inventory maintained":is_maintained_status_com,
            "trend index difference":difference,
            "red_box item":check_no_red_box,
            "forecasting_method":forecasting_method,            
            "minimum required oh for com":com_doorcount,
            "FLDC" :Calculate_FLDC,
            "forecast_month": forecast_month,
            "forecast_month_required_quantity": f'{required_quantity[forecast_month]}',
            "forecast_month_planned_oh_before_adding_qty":planned_oh_before_adding_qty_com[forecast_month], 
            "Next_forecast_month":forecast_month_next_month,
            "Next_forecast_month_required_quantity": f'{required_quantity[forecast_month_next_month]}',
            "Next_forecast_month_planned_oh_before_adding_qty":planned_oh_before_adding_qty_com[forecast_month_next_month],
            "Added qtys by Macys SOQ":macy_additional_units,  
            "VDF_status":VDF_status,
            "VDF_added_qty":VDF_added_qty,
            "forecast_month_planned_shipment":planned_shp[forecast_month],
            "Next_forecast_month_planned_shipment":planned_shp[forecast_month_next_month],
            "Total added qty":total_added_quantity,
            }
            coms.append(data_com)
        elif pid_omni_status:
            data_omni= {
            "category":category,
            "pid": loader.pid_value,
            "lead time":lead_time,
            "leadtime holiday adjustment":leadtime_holiday,
            "selected_months":selected_months,
            "Com month_12_fc_index":new_com_month_12_fc_index,
            "com trend":new_com_std_trend,
            "Com Inventory maintained":is_maintained_status_com,
            "trend index difference":com_difference,
            "red_box item":check_no_red_box,
            "forecasting_method":forecasting_method,            
            "minimum required oh for com":com_doorcount,
            "Com FLDC" :com_Calculate_FLDC,
            "forecast_month": forecast_month,
            "forecast_month_required_quantity": f'{required_quantity_com[forecast_month]}',
            "Next_forecast_month":forecast_month_next_month,
            "Next_forecast_month_required_quantity": f'{required_quantity[forecast_month_next_month]}',
            "store_month_12_fc_index":new_store_month_12_fc_index,
            "loss":loss,
            "store_month_12_fc_index_(loss)":month_12_fc_index,
            "trend":std_trend,
            "store Inventory maintained":is_maintained_status_store,
            "trend index difference":difference,
            "forecasting_method":forecasting_method,            
            "Door Count":loader.KPI_Door_count,
            "store FLDC" :store_Calculate_FLDC,
            "birthstone":birthstone,
            "birthstone_month":birthstone_month,
            "considered birthstone for requried quantity":birthstone_status,
            "forecast_month": forecast_month,
            "forecast_month_planned_oh_before_adding_qty":planned_oh_before_adding_qty[forecast_month], 
            "Next_forecast_month_planned_oh_before_adding_qty":planned_oh_before_adding_qty[forecast_month_next_month],
            "Added qtys by Macys SOQ":macy_additional_units,  
            "forecast_month_planned_shipment":planned_shp[forecast_month],
            "Next_forecast_month_planned_shipment":planned_shp[forecast_month_next_month],
            "Total added qty":total_added_quantity,
 
            }
            omni.append(data_omni)
        else:
            None

    if pid_type=='Not forecast':
        std_trend=0
        STD_index_value=0
        month_12_fc_index=0
        forecasting_method='Average'
        planned_shp={'FEB':0, 'MAR': 0, 'APR':0, 'MAY':0, 'JUN':0, 'JUL': 0, 'AUG': 0, 'SEP':0, 'OCT':0, 'NOV': 0, 'DEC':0, 'JAN':0}
        planned_fc={'FEB':0, 'MAR': 0, 'APR':0, 'MAY':0, 'JUN':0, 'JUL': 0, 'AUG': 0, 'SEP':0, 'OCT':0, 'NOV': 0, 'DEC':0, 'JAN':0}
        total_added_quantity=0
        logging.info(f'total_added_quantity: {total_added_quantity}')
    return current_month,pid_type,std_trend,STD_index_value ,month_12_fc_index,forecasting_method,planned_shp,planned_fc,store,coms,omni

