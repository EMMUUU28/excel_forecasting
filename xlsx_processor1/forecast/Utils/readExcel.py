# -------------------------Read Excel File, Create Dataframe and return it respectively------------------------

import pandas as pd 
import multiprocessing as mp

# multiprocess pool for reading excel 
def process_sheet(sheet_name, config, input_path):
    """
    Function to process a single sheet with specified configuration.
    """
    print(f"Processing sheet: {sheet_name}")
    try:
        excel_file = pd.ExcelFile(input_path)
        data = excel_file.parse(sheet_name=sheet_name, **config)
        print(f"Finished processing sheet: {sheet_name}")
        return sheet_name, data
    except Exception as e:
        print(f"Error processing sheet {sheet_name}: {e}")
        return sheet_name, None
    
def create_df(input_path):
    sheet_config = {
        "Index": {"usecols": "A:P", "nrows": 41, "header": 2},
        "report grouping": {"header": None},
        "Repln Items": {"header": 2},
        "Setup Sales -L3M & Future": {"header": 9},
        "Macys Recpts": {"header": 1},
        "All_DATA": {"header": 0},
        "MCOM_Data": {"header": 0},
    }

    # Create a multiprocessing pool
    with mp.Pool(processes=mp.cpu_count()) as pool:
        # Prepare arguments for multiprocessing
        pool_args = [(sheet_name, config, input_path) for sheet_name, config in sheet_config.items()]
        
        # Process each sheet in parallel
        output = pool.starmap(process_sheet, pool_args)

    # Collect results into a dictionary
    dataframes = {sheet_name: data for sheet_name, data in output if data is not None}
    print("All sheets processed successfully!")

    return dataframes