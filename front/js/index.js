const itemsContainer = document.querySelector(".items");
fetch("http://localhost:3000/api/products/")
    .then(data => data.json())
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



