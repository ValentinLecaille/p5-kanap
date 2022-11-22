// lecture du panier à partir du local storaage et transformation en tableau
const cart = JSON.parse(localStorage.getItem("productSelected")); 

//colors: "Blue"
//idProduct:"107fb5b75607497b96722bda5b504926"
//quantity:"1"

//Affichage des informations produits du LS 

function displayCart() {
    // récupération de l'ensemble du catalogue de produits à partir de l'API
    const products = fetch(`http://localhost:3000/api/products/`)
    // transformation du retour de l'API en tableau
    .then(data => data.json())
    // récupération du tableau de l'API (productsList)
    .then (productsList => { 
        const sectionCartItems = document.getElementById("cart__items");
        // itération (boucle) sur le tableau du cart, "cartProduct" représente un produit du cart
        // cartproduct contient id, color et quantity
        cart.forEach((cartProduct) => {
            // récupération du produit catalogue qui correspond à cartProduct
            // productEx contient tous les détails du produits
            const productEx = productsList.find((product) => product._id == cartProduct.idProduct); 
            
            // construction du HTML 
            const article = document.createElement("article");
            article.className = "cart__item";
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
                            divContentSettingsQuantity.appendChild(inputSettingsQuantity);
    
                        const divContentSettingsDelete = document.createElement("div");
                        divContentSettingsDelete.className = "cart__item__content__settings__delete"
                        divCartItemContentSettings.appendChild(divContentSettingsDelete);
    
                            const pSettingsDelete = document.createElement("p");
                            pSettingsDelete.className = "deleteItem";
                            pSettingsDelete.textContent = 'Supprimer';
                            divContentSettingsDelete.appendChild(pSettingsDelete);
        });
    }); //then
}

displayCart();






































/*const cartItemsContainer = document.querySelector("#cart__items");
const productSelected = localStorage.getItem('productSelected');
   

fetch("http://localhost:3000/api/products/")
    .then(data => data.json())
    .then(jsonListProduct => {
        for(let productSelected of jsonListProduct){
            const sectionCartItems = document.querySelector("#cart__items");

                const article = document.createElement("article");
                sectionCartItems.appendChild(article);

                    const divImg = document.createElement("div");
                    article.appendChild(divImg);
                        const img = document.createElement("img");
                        divImg.appendChild(img);


            
            
        }
}) */









































/*function saveCart(cart) { //le paramètre cart permet de savoir quel panier on souhaite enregistrer
    localStorage.setItem("cart", JSON.stringify(cart)); //le localStorage permet de conserver des données. on enregistre une valeur associée à une clé. clé="cart" et valeur cart. On transforme le tableau cart en chaine de caractère. On le récupère avec JSON.parse.
}

function getCart(){
    let cart = localStorage.getItem("cart"); //on récupère l'item portant la clé "basket" et on retourne la valeur. On enregistre dans une variable ce que l'on a récupérer.
    if(cart == null){
        return [];
    }else{
        return JSON.parse(cart); //on retourne la valeur en la transformant de nouveau en tableau.
    }
}

function addCart(productSelected){ //on créé une fonction pour ajouter un produit au panier avec la variable product. quand on appelle cette fonction, c'est ce produit que l'on veut ajouter au panier.
    let cart = getCart(); //on récupère maintenant le panier
    let foundProduct = cart.find(p => p.id === product.id); //aujout d'une quantité supplémentaire, et non une duplication d'un produit dans le panier.
    if(foundProduct != undefined){ // s'il est différent de undefined, c'est qu'il existe déjà dans le panier
        foundProduct.quantity++;
    }else{
        cart.push(product);//ajouter un produit au panier. on considère que cart est un tableau, on push un élément au tableau.
    }
    
    saveCart(cart);//enregistrement du nouveau panier


function removeFromCart(product){ //fonction pour retirer un élément du panier
    let cart = getCart(); //on prend le panier complet
    cart = cart.filter(p => p.id != product.id); //on filtre le tableau par rapport à une condition
    saveCart(cart);//enregistrement du nouveau panier
}

function changeQuantity(product, quantity){ //changer la quantité dans le panier
    let cart = getCart();
    let foundProduct = cart.find(p => p.id == product.id);
    if(foundProduct != undefined){
        foundProduct.quantity += quantity; // si le produit est trouvé, il faut changer sa quantité
        if(foundProduct.quantity <= 0) {
            removeFromCart(foundProduct);
        }else
        saveCart(cart);
    }
    
}

function getNumberProduct(){ //calcul de la quantité du panier. A partir du panier, être capable de retourner la quantité de produits dans le panier.
    let cart = getCart();
    let number =0;
    for (let product of cart){
        number += product.quantity;
    }
    return number;
}

function getTotalPrice(){ //calcul du prix total du panier
    let cart = getCart();
    let total =0;
    for (let product of cart){
        total += product.quantity * product.price;
    }
    return total;
} }*/