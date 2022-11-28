// lecture du panier à partir du local storaage et transformation en tableau
let cart = [];

// je récupère les informations du localstorage
function getCart() {
    let cart = localStorage.getItem("productSelected");
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

//colors: "Blue"
//idProduct:"107fb5b75607497b96722bda5b504926"
//quantity:"1"
let products = [];

function init() { 
    // récupération de l'ensemble du catalogue de produits à partir de l'API
    products = fetch(`http://localhost:3000/api/products/`)
    // transformation du retour de l'API en tableau
    .then(data => data.json())
    // récupération du tableau de l'API (productsList)
    .then(productsList => {
        products = productsList //variable globale products : permet d'avoir les détails des produits de l'API
        displayCart(); // on appelle display Cart pour l'affichage
    });
}

//Affichage des informations produits du LS 
function displayCart() { 
    cart = JSON.parse(localStorage.getItem("productSelected"));

        const sectionCartItems = document.getElementById("cart__items");
        sectionCartItems.innerHTML = "";
        // itération (boucle) sur le tableau du cart, "cartProduct" représente un produit du cart
        // cartproduct contient id, color et quantity
        let totalProducts = 0;
        let totalQuantity = 0;
        cart.forEach((cartProduct) => {
            // récupération du produit catalogue qui correspond à cartProduct
            // productEx contient tous les détails du produits
            const productEx = products.find((product) => product._id == cartProduct.idProduct); 
            
            // construction du HTML
            const article = document.createElement("article");
            article.className = "cart__item";
            article.id = "product_" + cartProduct.idProduct;
            sectionCartItems.appendChild(article);

            const divCartItemImg = document.createElement("div");
            divCartItemImg.className = "cart__item__img";
            article.appendChild(divCartItemImg);

            const divImg = document.createElement("img");
            divImg.src = productEx.imageUrl;
            divImg.alt = productEx.altTxt;
            divCartItemImg.appendChild(divImg);

            const divCartItemContent = document.createElement("div");
            divCartItemContent.className = "cart__item__content";
            article.appendChild(divCartItemContent);

            const divCartItemContentDescription = document.createElement("div");
            divCartItemContentDescription.className = "cart__item__content__description";
            divCartItemContent.appendChild(divCartItemContentDescription);

            const h2ContentDescription = document.createElement("h2");
            h2ContentDescription.className = "cart__item__content__titlePrice";
            h2ContentDescription.textContent = productEx.name;
            divCartItemContentDescription.appendChild(h2ContentDescription);

            const pContentColor = document.createElement("p");
            pContentColor.textContent = cartProduct.colors;
            divCartItemContentDescription.appendChild(pContentColor);

            const pContentPrice = document.createElement("p");
            pContentPrice.className = "cart__item__content__titlePrice";
            pContentPrice.textContent = productEx.price + ` €`;
            divCartItemContentDescription.appendChild(pContentPrice);

            const divCartItemContentSettings = document.createElement("div");
            divCartItemContentSettings.className = "cart__item__content__settings";
            divCartItemContent.appendChild(divCartItemContentSettings);

            const divContentSettingsQuantity = document.createElement("div");
            divContentSettingsQuantity.className = "cart__item__content__settings__quantity";
            divCartItemContentSettings.appendChild(divContentSettingsQuantity);

            const pSettingsQuantity = document.createElement("p");
            pSettingsQuantity.textContent = "Qté :";
            divContentSettingsQuantity.appendChild(pSettingsQuantity);

            const inputSettingsQuantity = document.createElement("input");
            inputSettingsQuantity.className = "itemQuantity";
            inputSettingsQuantity.value = cartProduct.quantity;
            inputSettingsQuantity.setAttribute("type", "number");
            inputSettingsQuantity.setAttribute("min", "1");
            inputSettingsQuantity.setAttribute("max", "100");
            inputSettingsQuantity.setAttribute("name", "itemQuantity");
            inputSettingsQuantity.setAttribute("value", cartProduct.quantity)
            divContentSettingsQuantity.appendChild(inputSettingsQuantity);
            inputSettingsQuantity.onclick = function(ev){
                changeQuantity(ev.target.value, cartProduct.idProduct);
            }

            const divContentSettingsDelete = document.createElement("div");
            divContentSettingsDelete.className = "cart__item__content__settings__delete"
            divCartItemContentSettings.appendChild(divContentSettingsDelete);

            const pSettingsDelete = document.createElement("p");
            pSettingsDelete.className = "deleteItem";
            pSettingsDelete.textContent = 'Supprimer';
            divContentSettingsDelete.appendChild(pSettingsDelete);
            pSettingsDelete.onclick = function(){ 
                removeFromCart(cartProduct.idProduct);
            }

//  ----    AFFICHAGE DES INFOS TOTAL PANIER      

            let cart = getCart(); //on prend le panier complet

            //calcul du nombre total d'articles dans le panier
            totalProducts += parseInt(cartProduct.quantity) * productEx.price;
            totalQuantity += parseInt(cartProduct.quantity);

        })
        //je place le nombre total d'article dans l'emplacement prévu
        const showTotalQuantity = document.querySelector("#totalQuantity");
        showTotalQuantity.textContent = totalQuantity;

        const showTotalPrice = document.querySelector("#totalPrice");
        showTotalPrice.textContent = totalProducts;
}
init()

function removeFromCart(productId) {
	let cart = getCart();
	cart = cart.filter((p) => p.idProduct != productId);
    localStorage.setItem("productSelected", JSON.stringify(cart));

    //document.getElementById("product_" + productId).remove(); //on supprime du html
    displayCart();
  }

  function changeQuantity(quantity, productId) {
	let cart = getCart();
    let foundProduct = cart.find((p) => p.idProduct === productId);

    if (foundProduct) {
        foundProduct.quantity = quantity;
    } else { (foundProduct.quantity <= 0) 
            removeFromCart(productId);
    }

    localStorage.setItem("productSelected", JSON.stringify(cart)),
    displayCart();
    }