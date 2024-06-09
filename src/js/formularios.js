import { postTask, getTask, deleteTask, putTask } from "./index.js";

let cuadroInformacion = document.getElementById("informacion");
let agregarTareas = document.getElementById("añadir");
let txt = document.getElementById("espacio-texto");
let infoStatusTareas = document.getElementById("infoStatusTareas");

document.addEventListener("DOMContentLoaded", async () => {
  await cuadroTareasVacio();

});

// infoStatusTareas.innerHTML = "";
// function cambiosDeEstado() {
//   if (cuadroInformacion.length===0) {
//     vacio = document.createElement('p')
//     cuadroInformacion.appendChild(vacio)
    
//   }
  
// }

txt.addEventListener("keypress", async (event) => {
  if (event.key === "Enter" && txt.value.trim() !== "") {
    document.getElementById("requerimiento").innerHTML = "";
    await postTask(txt.value); ////puedo crear un funcion del if y else, para abreviar codigo y usar parametros
    /// tengo que hacer que el display persista
    infoStatusTareas.style.display = "none";
    await subirTareas();
    txt.innerHTML = "";
  } else {
    document.getElementById("requerimiento").innerHTML = "Ingrese un texto";
  }
});

agregarTareas.addEventListener("click", async function () {
  if (txt.value.trim() !== "") {
    document.getElementById("requerimiento").innerHTML = "";
    await postTask(txt.value);
    infoStatusTareas.style.display = "none";
    await subirTareas();
    txt.innerHTML = "";
  } else {
    document.getElementById("requerimiento").innerHTML = "Ingrese un texto";
    //onchange investigar sobre el input
  }
});

async function cuadroTareasVacio() {
  try {
    let tareas = await getTask();

    if (tareas.length === 0) {
      console.log("hola");
      infoStatusTareas.innerHTML = "No Existen Tareas"
    } else {
      console.log("hola else");
      infoStatusTareas.innerHTML = ""; //es dentro de subir tareaas
      await subirTareas();
    }
  } catch (error) {
    console.error(error);
  }
}

subirTareas();

async function subirTareas() {
  let almacen = await getTask();
  cuadroInformacion.innerHTML = "";
  txt.value = "";
  for (let index = 0; index < almacen.length; index++) {
    const div = document.createElement("div");
    const btnImg = document.createElement("img");
    btnImg.src = "http://localhost:1234/iconoBasura.9d91d138.png";
    const check = document.createElement("input");
    check.id = "checkId";
    check.type = "checkbox";
    div.innerHTML = almacen[index].task;
    btnImg.id = almacen[index].id;
    div.appendChild(btnImg);
    div.appendChild(check);

    btnImg.addEventListener("click", function () {
      deleteTask(btnImg.id);

      div.remove();

      console.log(div.childNodes.length)
      if (cuadroInformacion.children.length === 0) {
        infoStatusTareas.style.display = "block";
        // infoStatusTareas.innerHTML = "No Existen Tareas";
       } //else {
      //   console.log("estoy aqui");
      //   div.childNodes.length < 0
      //   infoStatusTareas.innerHTML = "No Existen Tareas";
      // }
    });

    check.addEventListener("click", async function () {
      await putTask(almacen[index]);
      await contador();
    });

    cuadroInformacion.appendChild(div);
    if (almacen[index].status) {
      check.checked = true;
    }
  }
  await contador();
}

async function contador() {
  let obtenerTareas = await getTask();
  let contador1 = 0;
  obtenerTareas.forEach((element) => {
    if (element.status) {
      contador1++;
    }
    document.getElementById("contadorM").innerHTML = contador1;
  });
}
