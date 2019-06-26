window.onload = function () {
    what();

    function what() { //Tervehdys!
        var kt = localStorage.kirjautunutKayttaja
        var tervehdys = document.getElementById("hej")
        tervehdys.innerHTML = "<h2>" + "Tervetuloa " + kt + "!";

    };
}
function getLocalItems(k){
    if (k){
        try{
            return JSON.parse(localStorage.getItem(k))
        } catch(e){
            return localStorage.getItem(k)
        }
    }
}

function setLocalItems(k, value){
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    localStorage.setItem(k, value)
}

// Put all entries in an object «store»
let store = {}
for (let i = 0, l = localStorage.length; i < l; i++) {
    store[localStorage.key(i)] = getLocalItems(localStorage.key(i))
}
console.log(store)

// Write all keys of «store» in localStorage
for (let o in store) {
    setLocalItems(o, store[o])
}