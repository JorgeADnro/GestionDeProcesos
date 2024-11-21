// ajax.js
function ajax() {
    const http = new XMLHttpRequest();
    const url = 'http://localhost:4200/VerProfesionales/card-ofta'; 
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            document.getElementById('card-ofta').innerHTML = this.responseText; 
        }
    };

    http.open("GET", url);
    http.send();
}
