//variables
const tarjetas = document.querySelector(".cursos");
const tbody = document.querySelector("#tbody")
let carrito = [];



//funciones
const cursos = async () => {
    const url = ".js/cursos.json"
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        
        datos.forEach(dato => {
            const { id, img, curso, precio } = dato;
            const elemento = `<div class="card-${id}" style="width: 18rem;" >
                                            <img src="${img}" class="card-img-top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">${curso}</h5>
                                              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                                                    content.</p>
                                                    <p>$${precio}</p>
                                                <a href="#" data-id="${id}" class="btn btn-dark">Comprar</a>
                                            </div>
                              </div>`;
                
            tarjetas.insertAdjacentHTML("beforeend", elemento)
            
            });
            
    } catch (error) {
        console.log(`El error es ${error}`)
    }
}

const leerDatosCursos = e => {
    if (e.target.classList.contains("btn-dark")) {
        

        const infoCursos = {
            id: e.target.dataset.id,
            nombre: e.target.parentNode.children[0].textContent,
            precio: e.target.parentNode.children[2].textContent,
            cantidad: 1

            //agregar al carrito
        };

        const existe = carrito.some(curso => curso.id === infoCursos.id);
        if (existe) {
            const cursos = carrito.map(curso => {
                if (curso.id === infoCursos.id) {
                    curso.cantidad++;
                    return curso;
                } else {
                    return curso;
                }
            })
        } else {
            carrito = [...carrito, infoCursos];
        }
        agregandoCursos();
    }
}

const agregandoCursos = () => {
    limpiarHtml();
    carrito.forEach(curso => {
        const { id, nombre, precio, cantidad } = curso;
        const row = document.createElement("tr")
        row.innerHTML += `<td>${nombre}</td>
                            <td>${precio}</td>
                            <td>${cantidad}</td>
                            <td><button data-id ="${id}" class= "eliminar">X</button></td>`;
        
        tbody.appendChild(row)
        
    })
     
}
const eliminarCurso = (e) => {
    
    if (e.target.classList.contains("eliminar")) {
        const cursoId = e.target.getAttribute("data-id");
        
        //elimina del array

        carrito = carrito.filter(curso => curso.id !== cursoId)
        
        agregandoCursos();
        
    }
    
}

const limpiarHtml = () => {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }
}



//Eventos
document.addEventListener("DOMContentLoaded", cursos);
tarjetas.addEventListener("click", e => leerDatosCursos(e));
tbody.addEventListener("click", eliminarCurso);





