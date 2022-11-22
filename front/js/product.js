
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
































/*function addCart(productSelected){ //on créé une fonction pour ajouter un produit au panier avec la variable product. quand on appelle cette fonction, c'est ce produit que l'on veut ajouter au panier.
    let cart = getCart(); //on récupère maintenant le panier
    let foundProduct = cart.find(p => p.id === idProduct); //aujout d'une quantité supplémentaire, et non une duplication d'un produit dans le panier.
    if(foundProduct != undefined){ // s'il est différent de undefined, c'est qu'il existe déjà dans le panier
        foundProduct.quantity++;
    }else{
        cart.push(productSelected);//ajouter un produit au panier. on considère que cart est un tableau, on push un élément au tableau.
    }
    
    saveCart(productSelected);//enregistrement du nouveau panier
}

function saveCart(cart) { //le paramètre cart permet de savoir quel panier on souhaite enregistrer
    localStorage.setItem("cart", JSON.stringify(cart)); //le localStorage permet de conserver des données. on enregistre une valeur associée à une clé. clé="cart" et valeur cart. On transforme le tableau cart en chaine de caractère. On le récupère avec JSON.parse.
}

function getCart(){
    let cart = localStorage.getItem("cart"); //on récupère l'item portant la clé "basket" et on retourne la valeur. On enregistre dans une variable ce que l'on a récupérer.
    if(cart == null){
        return [];
    }else{
        return JSON.parse(cart); //on retourne la valeur en la transformant de nouveau en tableau.
    }
} */


