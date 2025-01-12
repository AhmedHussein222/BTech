if (window.history.scrollRestoration) {
    window.history.scrollRestoration = 'manual'; // Disable automatic scroll restoration
}
window.scrollTo(0, 0);
//login
let user = document.getElementById("register")
user.addEventListener("click",function()
{
    window.open("regfinal.html","_self")
})
/* cart counter  */
let cartItems = JSON.parse(localStorage.getItem("cart-items")) || [];
document.getElementById("counter").innerHTML = cartItems.length;


//slider
let slid = document.getElementById("sliderimgs")
let imgs =["https://btech.com/media/homecontent/banner/2/3/2368_px_x_800_en_hoover.png",
 "https://slidebazaar.com/wp-content/uploads/2021/09/product-banner-jpg.webp",
 "https://btech.com/media/homecontent/banner/w/e/web-banner__2368x800_en1_khjg_df.jpg",
 "https://btech.com/media/homecontent/banner/2/3/2368x800_en_5.jpg",
 "https://btech.com/media/homecontent/banner/b/e/beko_web-banner_jan-2025_-2368x800_en.png"]
 let i =0 ;
function Autoplayimg()
{
    let play =setInterval(function(){
        i++;
        if(i==imgs.length) i=0;
        slid.setAttribute("src",imgs[i]);
    },2000)
}
window.addEventListener('load',Autoplayimg)

//Category
let category = new XMLHttpRequest();
category.open("get", "./B.Tech.json");

category.onreadystatechange = function () {
    if (category.readyState == 4 && category.status >= 200 && category.status < 300) {
        let CategoData = JSON.parse(category.responseText);
        GetAllGategory(CategoData.categories);
    }
};
category.send();

function GetAllGategory(categories) {

    let Container = document.getElementById("divforcategory");
    Container.style.display = "flex";
    Container.style.flexWrap = "wrap";
    Container.style.textAlign = "center";
    Container.style.justifyContent = "space-around";
    Container.style.marginTop = "20px";
    Container.style.boxShadow = "0px 1px 4px rgba(0, 0, 0, .06)";

    for (const Cat of categories) {
      let   imgCat = document.createElement("img");
        imgCat.src = Cat.img;
        imgCat.style.width = "70px";
        imgCat.style.height = "70px";
        imgCat.style.borderRadius = "50%";
        imgCat.style.marginTop = "10px";  
        let namecat = document.createElement("h3");
        namecat.innerText = Cat.name;
        let catDiv = document.createElement("div");

        catDiv.appendChild(imgCat);
        catDiv.appendChild(namecat);
        Container.appendChild(catDiv);

        
        //opacity
        imgCat.addEventListener("mouseover", function () {
            let opacity = 1; 
            let OP = setInterval(function () {
                if (opacity > 0.3) {
                    opacity -= 0.05; 
                    imgCat.style.opacity = opacity; 
                } else {
                    clearInterval(OP); 
                }
            }, 30); 
        });
        imgCat.addEventListener("mouseout", function () {
            let opacity = 0.3; 
            let opt = setInterval(function () {
                if (opacity < 1) {
                    opacity += 0.05; 
                    imgCat.style.opacity = opacity; 
                } else {
                    clearInterval(opt); 
                }
            }, 30); 
        });
        //end 
        // categories
        const categoryDropdown = document.getElementById("categories");
       if (categoryDropdown) {
       categoryDropdown.addEventListener("change", function () {
      const selectedValue = this.value;
       if (selectedValue) {
        window.location.href = selectedValue;
      }
      });
  }   else {
         console.error("Dropdown element not found!");
  }

        
        //handle cat to go to prod page
        catDiv.addEventListener("click", function () {
            let categoryId = Cat.id; 
            window.open("product.html?id="+categoryId, "_self");
        });
        }

    }



//seach by brand
document.getElementById("searchinput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        var inputSearch = document.getElementById("searchinput").value;
        var Allproducts = new XMLHttpRequest();
        Allproducts.open("GET", "./B.Tech.json");
        Allproducts.onreadystatechange = function () {
            if (Allproducts.readyState == 4 && Allproducts.status >= 200 && Allproducts.status < 300) {
                let ProductData = JSON.parse(Allproducts.responseText);
                Getprobyname(ProductData.categories, inputSearch);
            }
        };
        Allproducts.send();
    }
});

function Getprobyname(Catego, inputSearch) {
    let Container = document.getElementById("divforfilterpro");
    Container.innerHTML = ""; 
    Container.style.display = "flex";
    Container.style.flexWrap = "wrap";
    Container.style.textAlign = "center";
    Container.style.justifyContent = "space-around";
    Container.style.marginTop = "20px";

    let filterbrand = [];
    for (var i = 0; i < Catego.length; i++) {
        var category = Catego[i];
        for (var j = 0; j < category.products.length; j++) {
            var pro = category.products[j];
            if (pro.brand === inputSearch) { 
                filterbrand.push(pro);
            }
        }
    }

    if (filterbrand.length > 0) {
        for (const pro of filterbrand) {
            let imgpro = document.createElement("img");
            imgpro.src = pro.img;
            imgpro.style.width = "150px";
            imgpro.style.height = "150px";
            imgpro.style.borderRadius = "2%";

            let namepro = document.createElement("h5");
            namepro.innerText = pro.title;

            let pricepro = document.createElement("h6");
            pricepro.innerText = "EGP " + pro.price;;

            let brandpro = document.createElement("h6");
            brandpro.innerText = "Brand: " + pro.brand;

            let proDiv = document.createElement("div");
            proDiv.style.marginBottom = "20px";
            proDiv.style.textAlign = "left";

            proDiv.style.boxShadow = "0px 4px 4px rgba(152, 147, 147, 0.6)";
            proDiv.style.borderRadius = "2%";
            proDiv.style.padding = "5px";
            proDiv.style.marginTop = "20px";

            proDiv.appendChild(imgpro);
            proDiv.appendChild(namepro);
            proDiv.appendChild(pricepro);
            proDiv.appendChild(brandpro);

            Container.appendChild(proDiv);
        }
    } else {
        let noResults = document.createElement("p");
        noResults.innerText = "No products found for brand: " + inputSearch;
        Container.appendChild(noResults);
    }
}



//show product less 200 price
    var ProcLess = new XMLHttpRequest(); 
    ProcLess.open("get", "./B.Tech.json"); 
    ProcLess.onreadystatechange = function() {
        if (ProcLess.readyState == 4 && ProcLess.status >= 200 && ProcLess.status < 300) {
            var GetProData = JSON.parse(ProcLess.responseText); 
            GetProLessprice(GetProData.categories); 
        }
    };
    ProcLess.send();

   function GetProLessprice(categories) { 
        let filterbyprice = [];
        for (var i = 0; i < categories.length; i++) {
            var category = categories[i]; 
            for (var j = 0; j < category.products.length; j++) {
                var pro = category.products[j]; 

                if (pro.price <= 350) {

                    filterbyprice.push(pro); 
                }
            }
        }
        console.log(filterbyprice);
        
        
        let Containerlessprice = document.getElementById("prolessprice");
        
        for (var k = 0; k < filterbyprice.length; k++) {
            let prod = filterbyprice[k]; 
           // let wishlist= document.createElement("p");
          //  wishlist.innerHTML='<i class="fa-regular fa-heart"></i>'
            let imgprod = document.createElement("img");
            imgprod.src = prod.img;
            imgprod.style.width = "180px";
            imgprod.style.height = "180px";
            imgprod.style.borderRadius = "2%";
    
            let nameprod = document.createElement("h5");
            nameprod.innerText = prod.title;
    
            let priceprod = document.createElement("h6");
            priceprod.innerText = "EGP " + prod.price; 
    
            let brandprod = document.createElement("h6");
            brandprod.innerText = "Brand " + prod.brand;

            let prodDiv = document.createElement("div");
            prodDiv.style.marginBottom = "20px";  
            prodDiv.style.textAlign = "left";  
            prodDiv.style.boxShadow = "0px 4px 4px rgba(152, 147, 147, 0.6)";
            prodDiv.style.borderRadius = "2%";
            prodDiv.style.padding = "5px";
            prodDiv.style.marginTop = "20px";
           // prodDiv.appendChild(wishlist);
            prodDiv.appendChild(imgprod);
            prodDiv.appendChild(nameprod);
            prodDiv.appendChild(priceprod);
            prodDiv.appendChild(brandprod);
    
            prodDiv.addEventListener("click",function () {
                window.location.href = `Product_Details.html?id=${prod.id}&discount=20`; 
            })
            Containerlessprice.appendChild(prodDiv);
        }
    }