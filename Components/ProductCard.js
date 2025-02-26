export default class ProductCard {
  constructor(product, cartState) {
    this.product = product;
    this.cartState = cartState;
    this.card = this.initCard();
    this.addToCartButton = this.createAddToCartButton();
    this.updateCart = this.updateCart.bind(this);
    this.cartState.subscribe(this.updateCart);
  }
  initCard() {
    const $parentDiv = document.createElement("div");
    const $imageContainer = document.createElement("div");
    const { category, image, name, price } = this.product;
    $imageContainer.className = "image-container";
    const $productImg = document.createElement("img");
    $productImg.src = image.mobile;
    $productImg.alt = name.mobile;
    $productImg.className = "product-image";
    $imageContainer.append($productImg);

    const $productInfoContainer = document.createElement("div");
    const $category = document.createElement("h5");
    $category.textContent = category;
    $category.className = "category";
    const $name = document.createElement("h4");
    $name.textContent = name;
    $name.className = "product-name";
    const $price = document.createElement("p");
    $price.innerText = `$${price}`;
    $price.className = "price";

    $productInfoContainer.append($category, $name, $price);
    $parentDiv.append($imageContainer, $productInfoContainer);
    return $parentDiv;
  }

  createAddToCartButton() {
    const $cardButton = document.createElement("button");
    $cardButton.className = "add-to-cart-btn";
    const $updateItemInCart = document.createElement("div");
    const initialCount = this.cartState.getItemCount(this.product);
    $updateItemInCart.innerHTML = `
      <div class="cart-ctl-container">
        <button data-function="remove-one" class="icon-container">
          <img src="/assets/images/icon-decrement-quantity.svg" class="icon"/>
        </button>
        <p class="cart-details">${initialCount}</p>
        <button data-function="add-one" class="icon-container">
          <img src="/assets/images/icon-increment-quantity.svg" class="icon"/>
        </button>
      </div>
    `;
    $updateItemInCart.hidden = true;
    const $cartIcon = document.createElement("img");
    $cartIcon.src = "./assets/images/icon-add-to-cart.svg";
    $cartIcon.alt = "cart icon";
    $cartIcon.className = "cart-icon";

    const $buttonText = document.createElement("span");
    $buttonText.textContent = "Add to Cart";

    $cardButton.append($cartIcon, $buttonText);

    $cardButton.addEventListener("click", () => {
      this.cartState.addToCart(this.product);
    });

    $updateItemInCart.addEventListener(
      "click",
      this.handleQuantityChange.bind(this)
    );

    return { $cardButton, $updateItemInCart };
  }

  handleQuantityChange(e) {
    const button = e.target.closest("button");
    if (!button) return;

    const action = button.dataset.function;
    switch (action) {
      case "remove-one":
        this.cartState.removeOne(this.product);
        break;
      case "add-one":
        this.cartState.addToCart(this.product);
        break;
    }
  }

  updateCart() {
    const itemInCart = this.cartState.getItemCount(this.product);
    const { $updateItemInCart, $cardButton } = this.addToCartButton;

    // Update quantity display
    const quantityDisplay = $updateItemInCart.querySelector(".cart-details");
    if (quantityDisplay) {
      quantityDisplay.textContent = itemInCart;
    }

    // Toggle visibility
    $updateItemInCart.hidden = itemInCart === 0;
    $cardButton.hidden = itemInCart > 0;
  }
}
