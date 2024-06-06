import { postTask, getTask, deleteTask, putTask } from "./index.js";

let contador = 0


let cuadroInformacion = document.getElementById('informacion');

let agregarTareas = document.getElementById('añadir');

let txt = document.getElementById("espacio-texto");

// let cargarInfo = await postTask()

txt.addEventListener("keypress", (event) => {

  if (event.key === "Enter" && txt.value.trim() !== "" ) {

    postTask(txt.value)
  } else {
    document.getElementById('requerimiento').innerHTML = "Ingrese un texto"
  }
  ///Tengo que mostrar una alerta que me muestre que tiene que tiene que ingresar texto

});

agregarTareas.addEventListener("click",function () {

  if (txt.value.trim() !== "") {
    ///Tengo que mostrar una alerta que me muestre que tiene que tiene que ingresar texto

    postTask(txt.value)
    
  } else {
    document.getElementById('requerimiento').innerHTML = "Ingrese un texto"
  }
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

  check.addEventListener("click",function () {

    let tareasHechas = putTask(almacen[index])

    for (let index = 0; index < tareasHechas.length; index++) {

      if (tareasHechas[index]) {
        
        actualizarContador(++contador)
      }    
    }
  })
}

}
subirTareas()

function actualizarContador(contador) {

  document.getElementById('contador').innerHTML = contador;
  
  
}













//  const div = document.createElement('div');

    //  div.innerHTML = JSON.stringify(data)
     
    //  cuadroInformacion.appendChild(div)
