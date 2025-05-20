import { v4 as uuidv4 } from 'uuid';

// Simplified mock product data with less content
const originalProductData = {
  "Bridge Gem742": {
    "Pid_to_all": [
      "CA5032H7A8YG0", "B47715CRCHE", "W81825COPP-E", "SJX41705COPPCWCE",
      "SAX5962AA8E1PKCH", "CJ4354Z1ZZYG0"
    ],
    "Pid_to_review": [
      "CA5032H7A8YG0", "B47715CRCHE", "W81825COPP-E", "SJX41705COPPCWCE"
    ],
    "Pid_to_best_selling": [
      "CA5032H7A8YG0", "B47715CRCHE", "W81825COPP-E"
    ],
    "Pid_to_min_order": ["CA5032H7A8YG0", "B47715CRCHE"],
    "Pid_to_birthstone": ["W81805CEP-E", "B47715CEPCHE"],
    "Pid_to_notify_to_macy": [
      "B47715CWCH", "CJ0002H2ZZAG0", "W81805CEP-E", "CA5032H7A8YG0"
    ],
    "Pid_to_Store_product": [
      "B47715CWCH", "W81805CSW-E", "CA5032H7A8YG0", "W81805CW"
    ],
    "Pid_to_com_product": ["31-G65", "59-W24P"]
  },
  "Gold262&270": {
    "Pid_to_all": [
      "E25-8363BD-3C", "C10-120L-75", "263.020.16", "B10-416CC-R","SBX559559PQCE"
    ],
    "Pid_to_review": [
      "E25-8363BD-3C", "C10-120L-75", "263.020.16", "B10-416CC-R"
    ],
    "Pid_to_best_selling": ["263.020.16", "B10-416CC-R"],
    "Pid_to_min_order": ["LTU048", "FRE029273Y50"],
    "Pid_to_birthstone": [],
    "Pid_to_notify_to_macy": [
      "LTU048", "FRE029273Y50", "E10-5273-Y", "FRE076657Y"
    ],
    "Pid_to_Store_product": [
      "LTU048", "LTU.010", "LTU.029SQ", "LTU.105"
    ],
    "Pid_to_com_product": [
      "B10-416CC-R", "TRG077978Y7"
    ]
  },
  "Womens Silver260&404": {
    "Pid_to_all": [
      "VSE078620Y40", "VSE078620Y15", "VSE078620Y30", "PJ7145P0ZZSZ0"
    ],
    "Pid_to_review": [
      "VSE078620Y40", "PJ7145P0ZZYZ0", "SSC065765S22"
    ],
    "Pid_to_best_selling": [
      "SSC067104S75", "VSC067106Y75"
    ],
    "Pid_to_min_order": [
      "VSC067104Y75", "SSC067104S75"
    ],
    "Pid_to_birthstone": ["VSE078620Y30"],
    "Pid_to_notify_to_macy": [
      "VSE078007Y36", "VSC065765Y18", "VSC067103Y18"
    ],
    "Pid_to_Store_product": [
      "PJ4075P0ZZYG1", "VSE078620Y40", "VSE078620Y15", "VSE078620Y30"
    ],
    "Pid_to_com_product": [
      "VSC076535Y75", "SSC068515S10"
    ]
  }
};

/**
 * Generate product details for each product ID
 * This simulates a database with more detailed product information
 */
export const enhanceProductData = (data) => {
  // Create a deep copy of the data to avoid modifying read-only objects
  const enhancedData = JSON.parse(JSON.stringify(data));
  
  // Add product details to each category
  Object.keys(enhancedData).forEach(category => {
    // Create a new object for product details
    const productDetails = {};
    
    // Get all unique product IDs in this category
    const allProductIds = [...new Set(enhancedData[category].Pid_to_all || [])];
    
    // Generate details for each product
    allProductIds.forEach(productId => {
      productDetails[productId] = {
        product_details: {
          product_id: productId,
          name: `${category} - ${productId}`,
          description: `This is a premium product from the ${category} collection.`,
          price: `${Math.floor(Math.random() * 1000) + 99}.99`,
          material: getRandomMaterial(),
          category: category,
          stock: Math.floor(Math.random() * 100),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          tags: generateRandomTags()
        },
        monthly_forecast: generateRandomForecast(productId)
      };
    });
    
    // Assign the product details to the enhanced data
    enhancedData[category].productDetails = productDetails;
  });
  
  return enhancedData;
};

/**
 * Get mock product data
 * This can be used as a fallback when the API isn't available
 */
export const getMockProductData = () => {
  return enhanceProductData(originalProductData);
};

/**
 * Format API data to match the expected format in the UI
 */
export const formatApiData = (apiData) => {
  // This would transform API data into the format expected by the UI
  // Implementation depends on the actual API response structure
  return apiData;
};

// Helper functions for generating mock data
function getRandomMaterial() {
  const materials = ['Gold', 'Silver', 'Platinum', 'Copper', 'Titanium', 'Stainless Steel', 'Alloy'];
  return materials[Math.floor(Math.random() * materials.length)];
}

function generateRandomTags() {
  const allTags = ['luxury', 'casual', 'bestseller', 'new', 'sale', 'limited', 'exclusive', 'trending'];
  const numTags = Math.floor(Math.random() * 4) + 1;
  const tags = [];
  
  for (let i = 0; i < numTags; i++) {
    const randomTag = allTags[Math.floor(Math.random() * allTags.length)];
    if (!tags.includes(randomTag)) {
      tags.push(randomTag);
    }
  }
  
  return tags;
}

function generateRandomForecast(productId) {
  const forecast = [];
  const currentYear = new Date().getFullYear();
  const variables = ['sales', 'revenue'];
  
  variables.forEach(variable => {
    for (let year = currentYear; year <= currentYear + 1; year++) {
      forecast.push({
        id: uuidv4(),
        product: productId,
        variable_name: variable,
        year: year,
        q1: Math.floor(Math.random() * 1000),
        q2: Math.floor(Math.random() * 1000),
        q3: Math.floor(Math.random() * 1000),
        q4: Math.floor(Math.random() * 1000)
      });
    }
  });
  
  return forecast;
}