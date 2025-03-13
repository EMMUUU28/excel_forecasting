// Product Details Generator
export const generateProductDetails = (productId) => {
    // Generate consistent random values based on product ID
    const hash = productId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    // Use hash to seed random values
    const seed = Math.abs(hash);
    
    // Comprehensive lists for random generation
    const vendors = [
      "Acme Jewelry", "Diamond Direct", "Gold Fusion", 
      "Silver Elite", "Precious Gems", "Luxury Metals"
    ];
    const countries = [
      "USA", "China", "India", "Italy", 
      "Thailand", "Turkey", "Vietnam"
    ];
    const itemStatus = [
      "In Stock", "Low Stock", "On Order", 
      "Discontinued", "New Arrival"
    ];
    const subclasses = [
      "Rings", "Necklaces", "Earrings", 
      "Bracelets", "Pendants", "Watches"
    ];
    const masterTypes = [
      "Gold", "Silver", "Platinum", 
      "Diamond", "Pearl", "Gemstone"
    ];
  
    // Generate ratings and reviews
    const generateReviewMetrics = () => {
      const overallRating = parseFloat(((seed % 50 + 50) / 10).toFixed(1)); // 5.0 to 10.0
      const totalReviews = seed % 500 + 10; // 10 to 510 reviews
      const recommendationRate = 70 + (seed % 30); // 70% to 99% recommendation rate
      
      return {
        overallRating,
        totalReviews,
        recommendationRate
      };
    };
  
    // Generate random stock and logistics info
    const generateStockInfo = () => {
      const totalStock = seed % 1000 + 50; // 50 to 1050 items
      const reservedStock = seed % 200; // 0 to 199 items
      const availableStock = totalStock - reservedStock;
      
      return {
        totalStock,
        reservedStock,
        availableStock
      };
    };
  
    // Main product details generation
    return {
      // Basic Product Info
      productId,
      
      // Randomly Generated Details
      kpidoor_count: (seed % 100) + 5,
      in_transit: (seed % 50),
      item_status: itemStatus[seed % itemStatus.length],
      min_order: (seed % 10) + 1,
      vendor: vendors[seed % vendors.length],
      country: countries[seed % countries.length],
      lead_time: (seed % 60) + 5,
      price: parseFloat(((seed % 10000) / 100).toFixed(2)),
      subclass: subclasses[seed % subclasses.length],
      mastertype: masterTypes[seed % masterTypes.length],
      
      // Advanced Metrics
      ...generateReviewMetrics(),
      ...generateStockInfo(),
      
      // Additional Metadata
      weight: parseFloat(((seed % 500) / 10).toFixed(1)), // 0.0 to 50.0
      dimensions: {
        length: (seed % 30) + 5, // 5 to 35 cm
        width: (seed % 20) + 3,  // 3 to 23 cm
        height: (seed % 15) + 2  // 2 to 17 cm
      },
      
      // Manufacturing Details
      manufacturing: {
        origin: countries[seed % countries.length],
        certifications: seed % 2 === 0 ? ["ISO 9001", "Conflict-Free"] : ["Ethically Sourced"]
      }
    };
  };
  
  // Function to enhance entire product dataset
  export const enhanceProductData = (data) => {
    const result = {};
    
    Object.keys(data).forEach(category => {
      result[category] = {};
      
      // Copy existing list types
      Object.keys(data[category]).forEach(listType => {
        result[category][listType] = data[category][listType];
      });
      
      // Generate product details
      result[category].productDetails = {};
      const uniqueProducts = [...new Set(data[category].Pid_to_all)];
      
      uniqueProducts.forEach(productId => {
        result[category].productDetails[productId] = generateProductDetails(productId);
      });
    });
    
    return result;
  };