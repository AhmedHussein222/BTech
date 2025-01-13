/* card counter*/

const cartItems = JSON.parse(localStorage.getItem("cart-items")) || [];
document.getElementById("counter").innerHTML = cartItems.length;




document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const discount = 20;


  function findProductById(categories, id) {
    id = String(id);
    for (let category of categories) {
      for (let product of category.products) {
        if (String(product.id) === id) {
          return product;
        }
      }
    }
    return null;
  }
  
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "./B.Tech.json");
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const product = findProductById(data.categories, productId);
      if (product) {
        displayProductDetails(product, discount);
      } else {
        console.error("Product not found");
      }
    } else {
      console.error("Error loading JSON:", xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error("Network Error");
  };

  xhr.send();
  function displayProductDetails(product, discount) {
    const container = document.querySelector(".product-detail");
    const discountedPrice = product.price - (product.price * discount) / 100;

    const addToCartButton = document.querySelector(".add-to-cart");
    container.innerHTML = `
            <div class="product-image">
                <img src="${product.img}" alt="${product.title}">
            </div>
            <h1>${product.title}</h1>
            <button class="favorite-btn">
                <svg class="favorite-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button>
            <p class="product-price">
                <span class="original-price">$${product.price.toFixed(2)}</span>
                <span class="discounted-price">$${discountedPrice.toFixed(2)}</span>
            </p>
            <p class="product-description">${product.description}</p>
        `;

    addToCartButton.style.display = "inline-block";
        /*   connect cart  and favorite with product */
    addToCartButton.addEventListener("click", function () {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.length > 0) {
        const cart = JSON.parse(localStorage.getItem("cart-items")) || [];
        cart.push({
          p_id: product.id,
        });
        localStorage.setItem("cart-items", JSON.stringify(cart));
        location.reload();
        alert("Product added to cart!");
      } else {
        alert("Log in to add to cart!");
        location.href = "login.html";
      }
      
    });

    const favoriteButton = container.querySelector(".favorite-btn");
  favoriteButton.addEventListener("click", function () {
    const fav = JSON.parse(localStorage.getItem("fav-items")) || [];




    const index = fav.findIndex(element => element.p_id == product.id);
    
    if (index !== -1) {
      fav.splice(index, 1);
    } else {
      fav.push({ p_id: product.id });
    }
    
    localStorage.setItem("fav-items", JSON.stringify(fav));
    favoriteButton.classList.toggle("active");
  });
  
}

  const categoryDropdown = document.getElementById("categories");
  if (categoryDropdown) {
    categoryDropdown.addEventListener("change", function () {
      const selectedValue = this.value;
      if (selectedValue) {
        window.location.href = selectedValue;
      }
    });
  } else {
    console.error("Dropdown element not found!");
  }

  function loadReviews() {
    const reviewsContainer = document.getElementById("reviews-container");
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviewsContainer.innerHTML = "";

    if (reviews.length === 0) {
      reviewsContainer.innerHTML = `<p class="no-reviews">No reviews yet</p>`;
    } else {
      reviews.forEach((review) => {
        const reviewDiv = document.createElement("div");
        reviewDiv.className = "review-container";
        reviewDiv.textContent = review;
        reviewsContainer.appendChild(reviewDiv);
      });
    }
  }

  function addReview() {
    const reviewInput = document.getElementById("reviewInput");
    const reviewText = reviewInput.value.trim();

    if (reviewText) {
      const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
      reviews.push(reviewText);
      localStorage.setItem("reviews", JSON.stringify(reviews));

      reviewInput.value = "";
      loadReviews();
    } else {
      alert("Please write a review before submitting!");
    }
  }

  const reviewSubmitButton = document.querySelector("#submitReviewButton");
  if (reviewSubmitButton) {
    reviewSubmitButton.addEventListener("click", addReview);
  }

  loadReviews();

  document.querySelectorAll(".menu2 a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector(".menu2").offsetHeight;
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - 3 * navbarHeight;

      }
    });
  });
});



    