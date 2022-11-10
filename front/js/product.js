
window.onload = function() // execution après chargement de la page
{
    //transfert de l'id par le biais de l'url
    const queryString_url_id = window.location.search;
    const urlSearchParams = new URLSearchParams(queryString_url_id);
    const getId = urlSearchParams.get("id"); // insertion d'un id= dans l'url de index.js

    fetch("http://localhost:3000/api/products/" + getId)
        .then(data => data.json())
        .then(product => {
            document.getElementById("price").textContent = product.price;
            document.getElementById("title").textContent = product.name;
            document.getElementById("description").textContent = product.description;
            document.getElementById("productImg").src = product.imageUrl;
            document.getElementById("productImg").alt = product.altTxt;

            const color = document.getElementById("colors");
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