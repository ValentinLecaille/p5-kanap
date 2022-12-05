
//transfert de l'id produit par le biais de l'url
const queryString_url_id = window.location.search;
const urlSearchParams = new URLSearchParams(queryString_url_id);
const getId = urlSearchParams.get("id"); // insertion d'un id= dans l'url de index.js
//récupération des choix de l'utilisateur 
let color = null;
let quantity = null;
let addCartBtn = null;
let price = null;
let article = null;

window.onload = function() // execution après le chargement de la page.
{
    fetch("http://localhost:3000/api/products/" + getId) //intégration de l'id de chaque produit dans l'url
        .then(data => data.json()) //transformation des informations de l'api au format json pour lecture par JS
        .then(product => {
            article = product;
            document.getElementById("price").textContent = product.price;
            document.getElementById("title").textContent = product.name;
            document.getElementById("description").textContent = product.description;
            document.getElementById("productImg").src = product.imageUrl;
            document.getElementById("productImg").alt = product.altTxt;
            document.getElementById("pageTitle").textContent = product.name;

            const color = document.getElementById("colors"); //chercher infos compréhension
            const optionColor = product.colors;
            for(let i=0; i < optionColor.length; i++){
                let opt = optionColor[i];
                let el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                color.appendChild(el);
            }
        });
}
color = document.getElementById("colors");
quantity = document.getElementById("quantity");
addCartBtn = document.querySelector("button");
price = document.getElementById("price");

//écoute de l'action sur le bouton
addCartBtn.addEventListener("click", (event)=>{ //écoute du click et fonction de callback

    //mettre le choix de l'utilisateur dans une variable
    const colorSelected = color.value;
    const quantitySelected = quantity.value;

    //récupérer les valeurs du formulaire (infos du produit sélectionné)
    let productSelected = {
        colors: colorSelected,
        quantity: quantitySelected,
        idProduct: getId,
    }
    verifyInput(productSelected);
})


//vérification de la conformité des informations selectionnés
function verifyInput(productSelected){
    //alerte si aucune couleur sélectionnée
    if (color.value == []){
        alert("Veuillez choisir une couleur");
    //confirmation si couleur selectionnée et quantité comprise entre 1 et 100.

    }else if(quantity.value > 0 && quantity.value < 101){
        window.confirm("Votre sélection a bien été prise en compte.");

    // envoi de la sélection au panier par l'appel de la fonction addCart
        addCart(productSelected);
        window.location.assign("cart.html");

    }else{
        alert("Veuillez saisir une quantité comprise entre 0 et 100")
    }
}


function addCart(productSelected){
    let cart = JSON.parse(localStorage.getItem("productSelected"));//transforme la valeur du produit sélectionné pour l'ajouter au tableau panier.

    if(cart == null){ //Si le tableau panier est nul, la fonction créé un nouveau tableau.
        cart = [];
        cart.push(productSelected); //On push le nouveau produit sélectionné et ses informations dans le tableau créé.
        localStorage.setItem("productSelected", JSON.stringify(cart));

    }else{
        const getProduct = cart.find((product) => //on créé la variable getproduct pour chercher dans le tableau existant. 
            product.idProduct == productSelected.idProduct //S'il existe ce produit dans le panier
            &&  //et
            product.colors == productSelected.colors ); //S'il existe ce produit avec la même couleur dans le panier

        if (getProduct){ //s'il existe déjà le même produit avec les même option, on ajoute seulement en quantité.
            getProduct.quantity = Number(productSelected.quantity) + Number(getProduct.quantity);
            localStorage.setItem("productSelected", JSON.stringify(cart));

        }else{
            cart.push(productSelected);
            localStorage.setItem("productSelected", JSON.stringify(cart));
        }
    }
}
