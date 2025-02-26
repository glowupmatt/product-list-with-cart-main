import CartState from "./State/CartState.js";
import ProductCard from "./Components/ProductCard.js";
import fetchData from "./fetchData.js";

(async () => {
  const cartState = new CartState();
  const $dessertList = document.getElementById("dessert-list");
  try {
    const products = await fetchData();
    products.forEach((product) => {
      const productCard = new ProductCard(product, cartState);
      $dessertList.append(
        productCard.card,
        productCard.addToCartButton.$cardButton,
        productCard.addToCartButton.$updateItemInCart
      );
    });
  } catch (err) {
    console.log(err);
  }
})();
