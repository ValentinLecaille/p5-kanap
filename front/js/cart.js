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

let products = [];

function init() { 

    // récupération de l'ensemble du catalogue de produits à partir de l'API
    products = fetch(`http://localhost:3000/api/products/`)
    // transformation du retour de l'API en tableau
    .then(data => data.json())
    // récupération du tableau de l'API (productsList)
    .then(productsList => {
        // variable globale products : permet d'avoir les détails des produits de l'API
        products = productsList;
        // on appelle display Cart pour l'affichage
        displayCart(); 
    });
}

// Affichage des informations produit du LS 
function displayCart() { 
    cart = JSON.parse(localStorage.getItem("productSelected"));
    if (cart == null) {
        cart = [];
    }
    if (cart.length == 0) {
        document.getElementById("cartDiv").classList.add("hidden");
    } else {
        document.getElementById("cartDiv").classList.remove("hidden");
    }

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
                changeQuantity(ev.target.value, cartProduct.idProduct, cartProduct.colors);
            }

            const divContentSettingsDelete = document.createElement("div");
            divContentSettingsDelete.className = "cart__item__content__settings__delete"
            divCartItemContentSettings.appendChild(divContentSettingsDelete);

            const pSettingsDelete = document.createElement("p");
            pSettingsDelete.className = "deleteItem";
            pSettingsDelete.textContent = 'Supprimer';
            divContentSettingsDelete.appendChild(pSettingsDelete);
            pSettingsDelete.onclick = function(){ 
                removeFromCart(cartProduct.idProduct, cartProduct.colors);
            }

//  ----    AFFICHAGE DES INFOS TOTAL PANIER      

            // on prend le panier complet
            let cart = getCart();

            // calcul du nombre total d'articles dans le panier
            totalProducts += parseInt(cartProduct.quantity) * productEx.price;
            totalQuantity += parseInt(cartProduct.quantity);

        })
        // je place le nombre total d'article dans l'emplacement prévu
        const showTotalQuantity = document.querySelector("#totalQuantity");
        showTotalQuantity.textContent = totalQuantity;

        // je place le montant total du panier dans l'emplacement prévu
        const showTotalPrice = document.querySelector("#totalPrice");
        showTotalPrice.textContent = totalProducts;
}
// on appelle la fonction init
init()

// fonction pour suprrimer un élément du panier (LS)
function removeFromCart(productId, color) {
	let cart = getCart();
    // on filtre dans le panier (cart) par l'ID
	cart = cart.filter((p) => ((p.idProduct != productId) || (p.colors != color)));
    localStorage.setItem("productSelected", JSON.stringify(cart));
    displayCart();
  }

// fonction pour changer la quantité d'un élément du panier (LS)

function changeQuantity(quantity, productId, color) {
	let cart = getCart();
    // on cherche dans le panier (cart) par l'ID
    let foundProduct = cart.find((p) => (p.idProduct == productId) && (p.colors == color));

    if (foundProduct) {
        if (quantity > 0)
            foundProduct.quantity = quantity;
        else 
            removeFromCart(productId);
    }
    localStorage.setItem("productSelected", JSON.stringify(cart));
    displayCart();
}

// *------ ENVOI DU FORMULAIRE ----------- //

// on récupère le formulaire du HTML via l'ID
const myForm = document.forms['myForm'];
const errorFirstName = document.getElementById('firstNameErrorMsg');
const errorLastName = document.getElementById('lastNameErrorMsg');
const errorAddress = document.getElementById('addressErrorMsg');
const errorCity = document.getElementById('cityErrorMsg');
const errorEmail = document.getElementById('emailErrorMsg');

let inputFirstName = myForm.firstName;
let inputLastName = myForm.lastName;
let inputAddress = myForm.address;
let inputCity = myForm.city;
let inputEmail = myForm.email;

// const regexText = new RegExp ("^[a-zéèçàA-Z0-9.-_ ]{2,50}$");
const regexName = /^[A-Z][a-z]{1,15}(\-[A-Z][a-z]{1,15})?$/;
const regexAddress = /^[A-Za-z0-9\-\s']{1,100}$/;
const regexEmail = new RegExp ("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");

function validFirstName(){
    errorFirstName.classList.add("hidden");

    if (regexName.test(inputFirstName.value.trim()) == false){
        errorFirstName.classList.remove ("hidden");
        return false;
    }
    return true;
}

function validLastName(){
    errorLastName.classList.add("hidden");

    if (regexName.test(inputLastName.value.trim()) == false){
        errorLastName.classList.remove ("hidden");
        return false;
    }
    return true;
}

function validAddress(){
    errorAddress.classList.add("hidden");

    if (regexAddress.test(inputAddress.value.trim()) == false){
        errorAddress.classList.remove ("hidden");
        return false;
    }
    return true;    
}

function validCity(){
    errorCity.classList.add("hidden");

    if (regexAddress.test(inputCity.value.trim()) == false){
        errorCity.classList.remove ("hidden");
        return false;
    }
    return true;      
}

function validEmail(){
    errorEmail.classList.add("hidden");

    if (regexEmail.test(inputEmail.value.trim()) == false){
        errorEmail.classList.remove ("hidden");
        return false;
    }
    return true;  
}

// on déclenche la fonction événement à la soumission du formulaire
myForm.addEventListener('submit', function(e) {
    let isError = false;
    
    if(!validFirstName()){
        isError = true;
    }

    if(!validLastName()){
        isError = true;
    }

    if(!validAddress()){
        isError = true;
    }

    if(!validCity()){
        isError = true;
    }
    
    if (isError) {
        e.preventDefault();
        return (false);
    }

    // on créé un tableau pour récupérer les id produits du panier
    let productToOrder = [];
    for (let i=0; i < cart.length; i++) {
        productToOrder.push(cart[i].idProduct);
    };

    // on créé l'objet qui détiendra les éléments de contact provenant du formulaire et les id produits du panier
    let orderObject = {
        contact: {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            address: inputAddress.value,
            city: inputCity.value,
            email: inputEmail.value,
        },
        products: productToOrder
    };

    // préparation des options du fetch
    let fetchOptions = {
        method: 'POST',
        body: JSON.stringify(orderObject),
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (orderObject.products == 0) {
        alert("Votre panier est vide")
    } else {

        fetch("http://localhost:3000/api/products/order", fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((order) => {
                localStorage.clear();
                document.location.href = `./confirmation.html?orderId=${order.orderId}`;
            })
            .catch((err) => {
                alert(err.message)
                console.log(err)
            })
    }
});