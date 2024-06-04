import { postTask } from "./index.js";
import { getTask } from "./index.js";

// let contador = 0;

let cuadroInformacion = document.getElementById('informacion');

let agregarTareas = document.getElementById('añadir');
let txt = document.getElementById("espacio-texto");

// let txt = document.getElementById("espacio-texto");

// let cargarInfo = await postTask()

agregarTareas.addEventListener("click",function () {

  postTask(txt.value)
});

async function subirTareas() {

 let almacen = await getTask()


 for (let index = 0; index < almacen.length; index++) {

  const div = document.createElement('div')

  div.innerHTML = almacen[index].task

  cuadroInformacion.appendChild(div)

}

}
subirTareas()


// function actualizarContador(contador) {

//   document.getElementById('contador').innerHTML = contador;

// }

// function agregar() {

//   actualizarContador(++contador);
  
// }


//  const div = document.createElement('div');

    //  div.innerHTML = JSON.stringify(data)
     
    //  cuadroInformacion.appendChild(div)
