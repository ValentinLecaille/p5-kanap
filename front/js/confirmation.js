window.onload = function(){
    // récupération de l'ID par le biais de l'URL
    const getIdFromUrl = window.location.search;
    const urlSearchParams = new URLSearchParams(getIdFromUrl);
    const getId = urlSearchParams.get("orderId");

    // affichage de l'Id de la  commande à l'emplacement prévu à cet effet
    document.getElementById("orderId").textContent = getId;
}