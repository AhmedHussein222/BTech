/* cart counter  */
const cartItems = localStorage.getItem("cart-items");
document.getElementById("counter").innerHTML = cartItems ? JSON.parse(cartItems).length : 0;


// Register button click
// let user = document.getElementById("register");
// user.addEventListener("click", function() {
//     window.open("regfinal.html", "_self");
// });

// Function to get category ID from the URL
function getCategoryId() {
    const queryString = window.location.search;
    const params = queryString.split('&');
    for (let param of params) {
        const [key, value] = param.split('=');
        if (key === '?id' || key === 'id') {
            return decodeURIComponent(value);
        }
    }
    return null;
}

var categoryId = getCategoryId();


var ProCard = new XMLHttpRequest();
ProCard.open("GET", "B.Tech.json");
ProCard.onreadystatechange = function() {
    if (ProCard.readyState == 4 && ProCard.status >= 200 && ProCard.status < 300) {
        try {
            var data = JSON.parse(ProCard.response);
            var category = null;

            for (var i = 0; i < data.categories.length; i++) {
                if (data.categories[i].id == categoryId) {
                    category = data.categories[i];
                    break;
                }
            }
            // Function sort

            if (category) {
                let products = category.products;
                console.log(products);
                DisplayCards(products);

                document.getElementById('sort-options').addEventListener('change', function() {
                    const sortOption = this.value;
                    let sortedProducts = [...products];
                    if (sortOption === 'price-desc') {
                        sortedProducts.sort((a, b) => b.price - a.price);
                    } else if (sortOption === 'price-asc') {
                        sortedProducts.sort((a, b) => a.price - b.price);
                    }
                    document.querySelector('.products-container').innerHTML = '';
                    DisplayCards(sortedProducts);
                });
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    } else if (ProCard.readyState == 4) {
        console.error("Error fetching JSON:", ProCard.status, ProCard.statusText);
    }
};
ProCard.send();

// Function display 
function DisplayCards(products) {
    var container = document.querySelector('.products-container');
    if (!container) {
        container = document.createElement('div');
        container.className = "products-container";
        document.body.appendChild(container);
    }

    for (const product of products) {
        var card = document.createElement('div');
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.img}" alt="${product.title}" class="product-image">
            <h4 class="product-title">${product.title}</h4>
            <h6 class="product-description">${product.description}</h6>
            <p class="product-price">${product.price} USD</p>
            <button class="favorite-btn" onclick="toggleFavorite(event, this, ${product.id})">
                <svg class="favorite-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button>
        `;

        // categories
        const categoryDropdown = document.getElementById("categories");
        if (categoryDropdown) {
        categoryDropdown.addEventListener("change", function () {
       const selectedValue = this.value;
        if (selectedValue) {
        window.location.href = selectedValue;
       }
      });
       } 
        else {
       console.error("Dropdown element not found!");
      }

        // product Details
        card.addEventListener('click', function() {
            window.location.href = `Product_Details.html?id=${product.id}&discount=20`; 
        });

        id = product.id;
        
        card.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.opacity = '1';
        });

        card.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '0.9';
        });

        container.appendChild(card);
    }
}

// Function favorite icon 

function toggleFavorite(event, button, productId) {
    
    event.stopPropagation();

    const icon = button.querySelector('.favorite-icon');
    
    icon.classList.toggle('active');

    if (icon.classList.contains('active')) {
        icon.style.fill = 'red'; 
    } else {
        icon.style.fill = 'gray'; 
    }
    /* add to favorite */
const fav = JSON.parse(localStorage.getItem("fav-items")) || [];  
const index = fav.findIndex(element => element.p_id == productId);
    
    if (index !== -1) {
      fav.splice(index, 1);
    } else {
      fav.push({ p_id: productId });
    }
    
    localStorage.setItem("fav-items", JSON.stringify(fav));
    
    
}


// Prevent scroll restoration
if (window.history.scrollRestoration) {
    window.history.scrollRestoration = 'manual'; 
}
window.scrollTo(0, 0);