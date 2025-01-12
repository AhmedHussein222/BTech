/* cart counter  */
document.getElementById("counter").innerHTML=JSON.parse(localStorage.getItem("cart-items")).length;


document.getElementById("city").addEventListener("change", function () {
  const selectedCity = this.value;
  if (selectedCity) {
    return selectedCity;
  }
});
function showMessage() {
  // Get the values from the fields
  const fullName = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const cardNumber = document.getElementById("card-number").value.trim();
  const cvv = document.getElementById("cvv").value.trim();
  const city = document.getElementById("city").value;

  if (!fullName || !email || !address || !cardNumber || !cvv || !city) {
    alert("Please fill in all the required fields.");
    return;
  }

  if (cardNumber.length !== 16 || isNaN(cardNumber)) {
    alert("Please enter a valid 16-digit card number.");
    return;
  }

  if (cvv.length !== 3 || isNaN(cvv)) {
    alert("Please enter a valid 3-digit CVV.");
    return;
  }

  alert("The order has been successfully completed.");
  location.reload();
}

function calculateTotalItems() {
  const orderItems = document.querySelectorAll(".order-items li");
  const totalQuantity = orderItems.length;
  const totalQuantitySpan = document.querySelector(
    ".summary-footer div:nth-child(1) span:last-child"
  );
  totalQuantitySpan.textContent = `${totalQuantity} items`;
}

function calculateTotalPrice() {
  const orderItems = document.querySelectorAll(".order-items li");
  let totalPrice = 0;

  orderItems.forEach((item) => {
    const priceText = item.querySelector("span:last-child").textContent;
    const price = parseFloat(
      priceText.replace(/,/g, "").replace("EGP", "").trim()
    );
    totalPrice += price;
  });

  const totalPriceSpan = document.querySelector(".total span:last-child");
  totalPriceSpan.textContent = `${totalPrice.toLocaleString()} EGP`;
}

calculateTotalItems();
calculateTotalPrice();

function showMessage() {
  // Get the values from the fields
  const fullName = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const cardNumber = document.getElementById("card-number").value.trim();
  const cvv = document.getElementById("cvv").value.trim();
  const city = document.getElementById("city").value;

  if (!fullName || !email || !address || !cardNumber || !cvv || !city) {
    alert("Please fill in all the required fields.");
    return;
  }

  if (cardNumber.length !== 16 || isNaN(cardNumber)) {
    alert("Please enter a valid 16-digit card number.");
    return;
  }

  if (cvv.length !== 3 || isNaN(cvv)) {
    alert("Please enter a valid 3-digit CVV.");
    return;
  }

  alert("The order has been successfully completed.");
  location.reload();
}

/*    */

order_items= document.getElementById("order-items");
cart_items= JSON.parse(localStorage.getItem("cart-items"));
console.log(cart_items);
total = 0;


const xhr = new XMLHttpRequest();
xhr.open("GET", "./B.Tech.json");
xhr.onload = function () {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    for (let category of data.categories) {
      for (let product of category.products) {
        for (const i of cart_items) {
          if (product.id == i.p_id) {
          order_items.innerHTML +=`
               <li>
                    <span>${product.title}</span>
                    <span>${product.price} EGP</span>
                </li>
          ` ;
          total += parseInt(product.price);
          document.getElementById("total").innerHTML = total + " EGP";
          
          

        }
        }
        
      }
    }
        
      }
      
    }
   
;

xhr.onerror = function () {
  console.error("Network Error");
};

xhr.send();
console.log(total);

document.getElementById("quantity").innerHTML = cart_items.length + " Items";
document.getElementById("total").innerHTML = total + " EGP";







