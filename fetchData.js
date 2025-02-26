const fetchProducts = async () => {
  try {
    const response = await fetch("./data.json");
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error loading products:", error);
  }
};

export default fetchProducts;
