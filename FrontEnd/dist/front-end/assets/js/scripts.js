let myButton;

// Esperar hasta que el documento HTML y todos los recursos asociados se hayan cargado completamente
document.addEventListener("DOMContentLoaded", function () {
	myButton = document.getElementById("myBtn");

	window.onscroll = function () {
		scrollFunction();
		scrollFunctionBTT();
	};

	if (myButton) {
		myButton.addEventListener("click", function () {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		});
	}

});

// Función para cambiar el estilo del botón "volver arriba" basado en la posición del scroll
function scrollFunctionBTT() {
	// Verificar si myButton está definido antes de intentar acceder a su propiedad style
	if (myButton) {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			myButton.style.opacity = "1";
		} else {
			myButton.style.opacity = "0";
		}
	}
}

// Función para cambiar el estilo de la barra de navegación basado en la posición del scroll
function scrollFunction() {
	const navbarExample = document.getElementById("navbarExample");
	// Verificar si navbarExample está definido antes de intentar acceder a su propiedad classList
	if (navbarExample) {
		if (document.documentElement.scrollTop > 30) {
			navbarExample.classList.add("top-nav-collapse");
		} else if (document.documentElement.scrollTop < 30) {
			navbarExample.classList.remove("top-nav-collapse");
		}
	}
}

// Hover en escritorio
function toggleDropdown(e) {
	// Verifica si el evento tiene un objetivo y si ese objetivo es un descendiente de un elemento con la clase "dropdown"
	const _d = e.target.closest(".dropdown");
	// Verifica si el elemento _d está presente en el DOM
	if (_d) {
		let _m = document.querySelector(".dropdown-menu", _d);
		setTimeout(function () {
			// Verifica si _d todavía está presente en el DOM y si el usuario sigue hover sobre él
			if (_d.matches(":hover")) {
				_m.classList.add("show");
				_d.classList.add("show");
				_d.setAttribute("aria-expanded", true);
			} else {
				_m.classList.remove("show");
				_d.classList.remove("show");
				_d.setAttribute("aria-expanded", false);
			}
		}, e.type === "mouseleave" ? 300 : 0);
	}
}
/* Card Slider - Swiper */
var cardSlider = new Swiper('.card-slider', {
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	},
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	slidesPerView: 2,
	spaceBetween: 70,
	breakpoints: {
		// when window is <= 991px
		991: {
			slidesPerView: 1
		}
	}
});


/* Filter - Isotope */
const gridCheck = document.querySelector('.grid');

if (gridCheck !== null) {
	// init Isotope
	var iso = new Isotope('.grid', {
		itemSelector: '.element-item',
		layoutMode: 'fitRows'
	});

	// bind filter button click
	var filtersElem = document.querySelector('.filters-button-group');
	filtersElem.addEventListener('click', function (event) {
		// only work with buttons
		if (!matchesSelector(event.target, 'button')) {
			return;
		}
		var filterValue = event.target.getAttribute('data-filter');
		// use matching filter function
		iso.arrange({ filter: filterValue });
	});

	// change is-checked class on buttons
	var buttonGroups = document.querySelectorAll('.button-group');
	for (var i = 0, len = buttonGroups.length; i < len; i++) {
		var buttonGroup = buttonGroups[i];
		radioButtonGroup(buttonGroup);
	}

	function radioButtonGroup(buttonGroup) {
		buttonGroup.addEventListener('click', function (event) {
			// only work with buttons
			if (!matchesSelector(event.target, 'button')) {
				return;
			}
			buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
			event.target.classList.add('is-checked');
		});
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0; // for Safari
	document.documentElement.scrollTop = 0; // for Chrome, Firefox, IE and Opera
}

/*
function ajax(){
	const http = new XMLHttpRequest();
	const url= 'http://localhost:9000/api/pac';
	http.onreadystatechange = function (){
		if(this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			document.getElementById('response').innerHTML = this.responseText
		}
	}
//const url= 'http://localhost:9000/api';
	http.open("GET", url);
	http.send();
}
document.getElementById("boton").addEventListener("click", function(){
	ajax();
});*/



//medio jala
/*
function ajax() {
    const http = new XMLHttpRequest();
    const url = 'http://localhost:9000/api/pac';
    http.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log(this.responseText);
                document.getElementById('response').innerHTML = this.responseText;
            } else if (this.status == 401) {
                // Manejar el error de autorización aquí
                console.log('No autorizado');
                document.getElementById('response').innerHTML = 'No estás autorizado para acceder a esta información.';
            } else {
                console.log('Error inesperado: ' + this.status);
            }
        }
    };
    http.open("GET", url);
    http.setRequestHeader('Cache-Control', 'no-cache'); // Evitar la caché del navegador
    http.send();
}

document.getElementById("boton").addEventListener("click", function () {
    ajax();
});
*/

function getSanitizedImageUrl(imageUrl, format) {
    // Lógica para obtener la URL de la imagen sanitizada según el formato
    return imageUrl; // Aquí puedes implementar tu lógica para sanitizar la URL de la imagen
}



//prueba
document.querySelector("#boton").addEventListener("click", traerDatos);


function traerDatos(){
	const xhttp = new XMLHttpRequest();
	const url= 'http://localhost:9000/api/pac';
    
    xhttp.open("GET", url, true);
	xhttp.send();
	xhttp.onreadystatechange = function (){
		if(this.readyState == 4 && this.status == 200) {
			let datos= JSON.parse(this.responseText)
            
            let ofta= document.querySelector('#ofta'); 
            ofta.innerHTML=''; //limpiar los datos


            for (let paciente of datos) {
                const fecha = new Date(paciente.fechReg);
                const fechaFormateada = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`;
                ofta.innerHTML += `
                    <tr>
                        <td>${paciente.mat}</td>
                        <td>${paciente.nom} ${paciente.apeP} ${paciente.apeM}</td>
                        <td>
                            <img style="width: 100px; height: 100;" *ngIf="paciente.foto" src="data:image/jpeg;base64,${paciente.foto}" alt="Foto">
                        </td>
                        <td>
                            <a *ngIf="paciente.cert" href="data:application/pdf;base64,${paciente.cert}" target="_blank" download="certificado.pdf">
                                Descargar PDF
                            </a>
                        </td>
                        <td>${fechaFormateada}</td>
                        <td><i style="cursor: pointer;" (click)="eliminarPaciente(paciente._id)"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                        <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path>
                        </svg></i></td>
                    </tr>
                    
                `;
                console.log("jala:3")
            }
            
		}
	}
	
}





/*

function ajax() {
    const http = new XMLHttpRequest();
    const url = 'http://localhost:9000/api/pac';
    http.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                const data = JSON.parse(this.responseText);
                const responseElement = document.getElementById('response');
                // Limpiamos el contenido previo
                responseElement.innerHTML = '';

                const card = document.createElement('div');
                card.classList.add('card', 'mb-3');
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body', 'text-center');
                const spinner = document.createElement('div');
                spinner.classList.add('spinner-border', 'text-primary');
                spinner.style.width = '3rem';
                spinner.style.height = '3rem';
                spinner.setAttribute('role', 'status');

                // Iteramos sobre los datos y creamos los elementos HTML correspondientes
                data.forEach(paciente => {
                    const matricula = document.createElement('p');
                    matricula.textContent = 'Matrícula: ' + paciente.mat;
                    const nombreCompleto = document.createElement('p');
                    nombreCompleto.textContent = 'Nombre: ' + paciente.nom + ' ' + paciente.apeP + ' ' + paciente.apeM;
                    // Ajusta la lógica para la imagen
                    const foto = document.createElement('img');
                    foto.classList.add('img-fluid', 'mb-2');
                    foto.style.maxWidth = '100px';
                    foto.src = paciente.foto ? getSanitizedImageUrl(paciente.foto, 'jpeg') : ''; 
                    foto.alt = 'Foto';
                    // Ajusta la lógica para el certificado
                    const certificado = document.createElement('a');
                    certificado.textContent = 'Descargar Certificado';
                    certificado.href = paciente.cert ? 'data:application/pdf;base64,' + paciente.cert : '';
                    certificado.target = '_blank';
                    certificado.download = 'certificado.pdf';
                    const fechaRegistro = document.createElement('p');
                    fechaRegistro.textContent = 'Fecha de registro: ' + new Date(paciente.fechReg).toLocaleDateString();
                    const opciones = document.createElement('div');
                    opciones.innerHTML = '<i style="cursor: pointer;" onclick="eliminarPaciente(\'' + paciente._id + '\')" class="fas fa-trash text-danger"></i>';
                    cardBody.appendChild(matricula);
                    cardBody.appendChild(nombreCompleto);
                    cardBody.appendChild(foto);
                    cardBody.appendChild(certificado);
                    cardBody.appendChild(fechaRegistro);
                    cardBody.appendChild(opciones);
                });

                card.appendChild(cardBody);
                responseElement.appendChild(card);
            } else if (this.status == 401) {
                // Manejar el error de autorización aquí
                console.log('No autorizado');
                document.getElementById('response').innerHTML = 'No estás autorizado para acceder a esta información.';
            } else {
                console.log('Error inesperado: ' + this.status);
            }
        }
    };
    http.open("GET", url);
    http.setRequestHeader('Cache-Control', 'no-cache');
    http.send();
}

*/












/*
function ajax() {
    const http = new XMLHttpRequest();
    const url = 'http://localhost:9000/api/pac';
    http.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                const data = JSON.parse(this.responseText);
                const responseElement = document.getElementById('response');
                // Limpiamos el contenido previo
                responseElement.innerHTML = '';
                // Iteramos sobre los datos y creamos una tarjeta para cada oftalmólogo
                data.forEach(paciente => {
                    const card = document.createElement('div');
                    card.classList.add('card', 'mb-3');
                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body', 'text-center');
                    const matricula = document.createElement('p');
                    matricula.textContent = 'Matrícula: ' + paciente.mat;
                    const nombreCompleto = document.createElement('p');
                    nombreCompleto.textContent = 'Nombre: ' + paciente.nom + ' ' + paciente.apeP + ' ' + paciente.apeM;
                    const foto = document.createElement('img');
                    foto.classList.add('img-fluid', 'mb-2');
                    foto.style.maxWidth = '100px';
                    foto.src = paciente.foto ? getSanitizedImageUrl(paciente.foto, 'jpeg') : ''; // Ajusta la lógica para la imagen
                    foto.alt = 'Foto';
                    const certificado = document.createElement('a');
                    certificado.textContent = 'Descargar Certificado';
                    certificado.href = paciente.cert ? 'data:application/pdf;base64,' + paciente.cert : '';
                    certificado.target = '_blank';
                    certificado.download = 'certificado.pdf';
                    const fechaRegistro = document.createElement('p');
                    fechaRegistro.textContent = 'Fecha de registro: ' + new Date(paciente.fechReg).toLocaleDateString();
                    const opciones = document.createElement('div');
                    opciones.innerHTML = '<i style="cursor: pointer;" onclick="eliminarPaciente(\'' + paciente._id + '\')" class="fas fa-trash text-danger"></i>'; // Ajusta la lógica para eliminar
                    cardBody.appendChild(matricula);
                    cardBody.appendChild(nombreCompleto);
                    cardBody.appendChild(foto);
                    cardBody.appendChild(certificado);
                    cardBody.appendChild(fechaRegistro);
                    cardBody.appendChild(opciones);
                    card.appendChild(cardBody);
                    responseElement.appendChild(card);
                });
            } else if (this.status == 401) {
                // Manejar el error de autorización aquí
                console.log('No autorizado');
                document.getElementById('response').innerHTML = 'No estás autorizado para acceder a esta información.';
            } else {
                console.log('Error inesperado: ' + this.status);
            }
        }
    };
    http.open("GET", url);
    http.setRequestHeader('Cache-Control', 'no-cache'); // Evitar la caché del navegador
    http.send();
}

document.getElementById("boton").addEventListener("click", function () {
    ajax();
});*/











/*function ajax() {
    const url = 'http://localhost:9000/api/pac';
    const token = authService.getAdminToken();
    
    if (!token) {
        alert('No estás autorizado para acceder a esta información.');
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) {
            throw new Error('Error al cargar los datos.');
        }

        const data = await response.json();
        actualizarTarjeta(data);
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los datos.');
    }
}

function actualizarTarjeta(data) {
    const tarjetaInfoElement = document.getElementById('ofta-info');
    tarjetaInfoElement.innerHTML = ''; // Limpiar el contenido existente de la tarjeta

    data.forEach(paciente => {
        const pacienteCard = crearPacienteCard(paciente);
        tarjetaInfoElement.appendChild(pacienteCard);
    });
}

function crearPacienteCard(paciente) {
    // Crear elementos HTML para representar la información del paciente
    const cardDiv = document.createElement('div');
    cardDiv.className = 'paciente-card';

    const nombrePaciente = document.createElement('h3');
    nombrePaciente.textContent = paciente.nombre;

    const edadPaciente = document.createElement('p');
    edadPaciente.textContent = 'Edad: ' + paciente.edad;

    // Agregar elementos al div de la tarjeta
    cardDiv.appendChild(nombrePaciente);
    cardDiv.appendChild(edadPaciente);

    return cardDiv;
}

document.getElementById("boton").addEventListener("click", function () {
    ajax();
});*/
