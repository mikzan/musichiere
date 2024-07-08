function remove(z){
    var nodo = document.getElementById(z);
    while (nodo.firstChild) {
        nodo.removeChild(nodo.firstChild);
    }
}

class song {
    constructor(titolo, artista, anno, genere, copertina){
        this.titolo = titolo;
        this.artista = artista;
        this.anno = anno;
        this.genere = genere;
        this.copertina = copertina;
    }
}

window.onload = gestoreLoad;
let listaS = new Array();

function gestoreLoad(){

    if (localStorage.length == 0) {
        let n1 = new song ("Prova", "prova", 1999, "pop", "img/prova.jpeg");
        listaS.push(n1);

        n1 = new song ("Prova1", "prova1", 1986, "pop2", "img/prova.jpeg");
        listaS.push(n1);

        n1 = new song ("Prova2", "prova2", 2014, "pop4", "img/prova.jpeg");
        listaS.push(n1);
        primo = false;

    } else {
        listaS = JSON.parse(localStorage.getItem('canzoni'));
    }

    let btn = document.getElementById("btn");
    let btn1 = document.getElementById("btn1");
    let btn2 = document.getElementById("btn2");
    btn.onclick = inserisci;
    btn1.onclick = visualizza;
    btn2.onclick = cambia;
    let nodo = document.getElementById("result");

    function popolaSelect(){
        let nodoSelect = document.getElementById("titoloM");
    
        for (let i = 0; i < listaS.length; i++) {
            let nodoOption = document.createElement("option");
            nodoOption.textContent = listaS[i].titolo;
            nodoOption.value = listaS[i].titolo;
            nodoSelect.appendChild(nodoOption);
        }
    }
    
    popolaSelect();

    function salvaDati(){
        localStorage.setItem('canzoni', JSON.stringify(listaS));
        alert("lista aggiornata");
    }

    function inserisci(){
        let titolo = document.getElementById("titolo").value;
        let artista = document.getElementById("artista").value;
        let anno = document.getElementById("anno").value;
        let genere = document.getElementById("genere").value;
        let copertina = document.getElementById("img").value;
        let s1 = new song(titolo, artista, anno, genere, copertina);
        listaS.push(s1);
        alert("Canzone aggiunta con successo!");
        remove("titoloM");
        popolaSelect();
        salvaDati();
    }

    function visualizza(){
        remove("result");
        for (let i = 0; i < listaS.length; i++){             
            let nodoCard = document.createElement("div");
            nodoCard.className = "card col-sm-6";
            nodoCard.style.width = "18rem";
            let nodoImg = document.createElement("img");
            nodoImg.src = listaS[i].copertina;
            nodoImg.className = "card-img-top";
            nodoCard.appendChild(nodoImg);
            let nodoCardBody = document.createElement("div");
            nodoCardBody.className = "card-body";
            nodoCard.appendChild(nodoCardBody);
            let nodoTitolo = document.createElement("h5");
            nodoTitolo.className = "card-title";
            nodoTitolo.textContent = listaS[i].titolo;
            nodoCardBody.appendChild(nodoTitolo);
            let nodoText = document.createElement("p");
            nodoText.className = "card-text";
            
            nodoText.textContent = listaS[i].artista + " " + listaS[i].anno + " " + listaS[i].genere;
            nodoCardBody.appendChild(nodoText);
            nodo.appendChild(nodoCard);   
        }
    }

    function cambia(){
        let ok = false;
        let titolo = document.getElementById("titolo1").value;
        let img = document.getElementById("img1").value;
        for (let i = 0; i < listaS.length; i++){
            if (listaS[i].titolo == titolo) {
                listaS[i].copertina = img;
                ok = true;
            }
        }

        if (ok){
            alert("Immagine modificata con successo");
        } else {
            alert("Titolo non trovato!");
        }
    }

}

