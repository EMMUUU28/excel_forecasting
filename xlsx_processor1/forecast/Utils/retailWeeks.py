from datetime import datetime,timedelta
from calendar import monthrange

def get_retail_weeks(year, month):
            """
            Calculate the number of retail weeks in a given month.
            Retail weeks follow the Sunday-to-Saturday structure, 
            and all days in a week belong to the month in which the week starts.
            
            Args:
                year (int): The year of the month.
                month (int): The month (1 for January, 12 for December).

            Returns:
                int: Number of retail weeks in the month.
            """
            # Get the first day and last day of the month
            first_day = datetime(year, month, 1)
            last_day = datetime(year, month, monthrange(year, month)[1])

            # Find the first Sunday of the month
            first_sunday = first_day + timedelta(days=(6 - first_day.weekday()) % 7)

            # Find the last Saturday of the month
            last_saturday = last_day - timedelta(days=last_day.weekday() + 1)

            # Count retail weeks
            current_week_start = first_sunday
            week_count = 0

            while current_week_start <= last_saturday:
                week_count += 1
                current_week_start += timedelta(days=7)  # Move to the next Sunday

            # Check if the final week starts in the current month (partial week rule)
            if current_week_start <= last_day:
                week_count += 1

            return week_count



def get_previous_retail_week():
        """
        Get the previous week's month, year of the previous month, 
        last year's occurrence of that month, last month before the previous month in numeric format,
        determine SP (Spring) or FA (Fall) based on the previous month,
        and calculate the number of retail weeks for each month individually.
        """
        # Use the current date as input
        current_date = datetime.now()

        # Find the current week's Sunday
        current_sunday = current_date - timedelta(days=current_date.weekday() + 1)

        # Calculate the previous week's Sunday
        previous_week_sunday = current_sunday - timedelta(days=7)

        # Determine the previous week number
        previous_week_number = (previous_week_sunday.day - 1) // 7 + 1

        # Get the month and year of the previous week
        current_month = previous_week_sunday.strftime('%b')
        year_of_previous_month = previous_week_sunday.year

        # Determine last year's occurrence of the same month
        last_year_of_previous_month = year_of_previous_month - 1

        # Determine the last month before the previous month
        last_month_of_previous_month_date = previous_week_sunday.replace(day=1) - timedelta(days=1)
        last_month = last_month_of_previous_month_date.strftime('%b').upper()

        # Custom mapping for months
        month_mapping = {
            'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4,
            'JUN': 5, 'JUL': 6, 'AUG': 7, 'SEP': 8,
            'OCT': 9, 'NOV': 10, 'DEC': 11, 'JAN': 12
        }
        last_month_of_previous_month_numeric = month_mapping[last_month]

        # Determine SP (Spring) or FA (Fall/Winter) based on the previous month
        spring_months = ['FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL']
        fall_months = ['AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN']

        season = "SP" if current_month in spring_months else "FA"

        # Calculate the number of retail weeks for each month of the current year
        current_year = year_of_previous_month
        # Individual variables for retail weeks of each month


        feb_weeks = get_retail_weeks(current_year,2)
        mar_weeks = get_retail_weeks(current_year,3)
        apr_weeks = get_retail_weeks(current_year,4)
        may_weeks = get_retail_weeks(current_year,5)
        jun_weeks = get_retail_weeks(current_year,6)
        jul_weeks = get_retail_weeks(current_year,7)
        aug_weeks = get_retail_weeks(current_year,8)
        sep_weeks = get_retail_weeks(current_year,9)
        oct_weeks = get_retail_weeks(current_year,10)
        nov_weeks = get_retail_weeks(current_year,11)
        dec_weeks = get_retail_weeks(current_year,12)
        jan_weeks = get_retail_weeks(current_year + 1, 1)  # January belongs to the next year

        return current_month, previous_week_number, year_of_previous_month,last_year_of_previous_month, last_month_of_previous_month_numeric,season, feb_weeks, mar_weeks, apr_weeks, may_weeks,jun_weeks, jul_weeks, aug_weeks, sep_weeks, oct_weeks,nov_weeks, dec_weeks, jan_weeks