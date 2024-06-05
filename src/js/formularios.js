import { postTask, getTask, deleteTask } from "./index.js";

// let contador = 0;

let cuadroInformacion = document.getElementById('informacion');

let agregarTareas = document.getElementById('añadir');

let txt = document.getElementById("espacio-texto");

// let txt = document.getElementById("espacio-texto");

// let cargarInfo = await postTask()

txt.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    
    postTask(txt.value)
  }

});
agregarTareas.addEventListener("click",function () {

  postTask(txt.value)
});

async function subirTareas() {

 let almacen = await getTask()

 for (let index = 0; index < almacen.length; index++) {

  const div = document.createElement('div')
  
  const btnImg = document.createElement('img')

  btnImg.src = "http://localhost:1234/iconoBasura.9d91d138.png"

  const check = document.createElement('input')

  check.type = "checkbox"

  div.innerHTML = almacen[index].task

  btnImg.id = almacen[index].id

  cuadroInformacion.appendChild(div)
  
  div.appendChild(btnImg)

  div.appendChild(check)

  btnImg.addEventListener("click",function () {
    
    deleteTask(btnImg.id)
    
    div.remove()

  })

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
