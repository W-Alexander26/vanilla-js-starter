import { postTask, getTask, deleteTask, putTask } from "./index.js";

let cuadroInformacion = document.getElementById("informacion");

let agregarTareas = document.getElementById("añadir");

let txt = document.getElementById("espacio-texto");

txt.addEventListener("keypress", async (event) => {
  if (event.key === "Enter" && txt.value.trim() !== "") {
    document.getElementById("requerimiento").innerHTML = "";

    console.log(txt);

    await postTask(txt.value); ////puedo crear un funcion del if y el, para abreviar codigo y usar parametros
    await subirTareas();
    txt.innerHTML = "";
  } else {
    document.getElementById("requerimiento").innerHTML = "Ingrese un texto";
  }
  ///Tengo que mostrar una alerta que me muestre que tiene que tiene que ingresar texto
});

agregarTareas.addEventListener("click", async function () {
  if (txt.value.trim() !== "") {
    ///Tengo que mostrar una alerta que me muestre que tiene que tiene que ingresar texto
    //antes de entrar e
    document.getElementById("requerimiento").innerHTML = "";

    await postTask(txt.value);
    await subirTareas();
    txt.innerHTML = "";
  } else {
    document.getElementById("requerimiento").innerHTML = "Ingrese un texto";

    //onchange investigar sobre el input
    //
  }
});

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

    contadorM.innerHTML = contador1;
  });
}
