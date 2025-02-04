# ----------------Preprocess the dataframe and return the filtered Dataframe----------------------

from .static import birthstones


# Function to check if 'Class Desc' contains any birthstone name
def find_birthstone(class_desc):
    if isinstance(class_desc, str):  # Ensure the value is a string
        for stone in birthstones:
            if stone in class_desc.upper():  # Check if the birthstone is part of the string
                return stone
    return ''  # Return blank if no birthstone is found


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




from .static import columns_to_extract

def filter_df(planning_df):
#make master sheet# Specify the columns you want to extract
    
    # Extract the specified columns
    df_filtered = planning_df[columns_to_extract]

    # Create a new 'Gender' column based on the conditions
    df_filtered['Gender'] = 'Women'  # Default value
    df_filtered.loc[df_filtered['Dpt ID'].isin([768, 771]), 'Gender'] = 'Men'
    df_filtered.loc[df_filtered['CL ID'] == 86, 'Gender'] = 'Children'

    # Apply the function to create the 'Birthstone' column
    df_filtered['Birthstone'] = df_filtered['Class Desc'].apply(find_birthstone)

    # Create the 'BSP_or_not' column based on the 'MstrSt ID' condition
    df_filtered['BSP_or_not'] = df_filtered['MstrSt ID'].apply(lambda x: 'BSP' if x in [26481, 74692] else '')

    # Apply the function to create the 'category' column
    df_filtered['category'] = df_filtered['Class Desc'].apply(categorize_product)

    # Apply the update function
    df_filtered['category'] = df_filtered.apply(update_category_from_prod_desc, axis=1)
   
    # Apply the function to create the 'type' column
    df_filtered['type'] = df_filtered['Prod Desc'].apply(determine_type)


    return df_filtered

