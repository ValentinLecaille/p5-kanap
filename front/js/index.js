// on déclare la constante servant de container html pour intégrer les différents produits de l'API
const itemsContainer = document.querySelector(".items");

// on appelle le fetch pour récupérer les données de l'api
fetch("http://localhost:3000/api/products/")

    // on transforme les données de l'api au format json
    .then(data => data.json())

    // pour chaque donnée de l'api, on place cette donnée dans la balise html que l'on créé
    .then(jsonListProduct => {
        for(let jsonProduct of jsonListProduct){
            const a = document.createElement("a");
            a.href = `./product.html?id=${jsonProduct._id}`;

            const article = document.createElement("article");
            a.appendChild(article);

            const img = document.createElement("img");
            img.src = jsonProduct.imageUrl;
            img.alt = jsonProduct.altTxt;
            article.appendChild(img);

            const h3 = document.createElement("h3");
            // on affecte une classe css (qui doit déjà exister)
            h3.className = "productName";
            h3.textContent = jsonProduct.name;
            article.appendChild(h3);

            const p = document.createElement("p");
            p.className = "productDescription";
            p.textContent = jsonProduct.description;
            article.appendChild(p);

            itemsContainer.appendChild(a);
        }
    });



