import { postTask, getTask, deleteTask, putTask } from "./index.js";//importamos todos los metodos que serán utilizados a continuación.

let cuadroInformacion = document.getElementById("informacion");//declaramos la variable que tendra todas las tareas a mostrar.
let agregarTareas = document.getElementById("añadir");//declaramos el botón que al presionarlo subira las tareas.
let txt = document.getElementById("espacio-texto");//declaramos el input que va a subir la información de cada tarea.
let infoStatusTareas = document.getElementById("infoStatusTareas");//declaramos una variable encargada de mostrar texto sobre si existen o no.

document.addEventListener("DOMContentLoaded", async () => {//declaramos una funcion asincrona que estara a la escucha de toda la carga del contenido del "DOM".
  await cuadroTareasVacio();//estara a la espera de la promesa que es una funcion encargada de mostrar el texto "si existen tareas o no".
});

txt.addEventListener("keypress", async (event) => {//cuando estemos dentro del input "txt", se ejecutara una funcion qué estara a la escucha de caracter del teclado, ejecutandose un evento.
  if (event.key === "Enter" && txt.value.trim() !== "") {// si el evento tiene la llave con el caracter "enter" y si el contenido de la tareas es diferente a vacio y sin espacios.
    document.getElementById("requerimiento").innerHTML = "";//entonces se limpiara la variable que dara aviso si la tarea se subio correctamente o no. 
    await postTask(txt.value);//la promesa que se encarga de editar las tareas estara a la espera y se le enviara como parametro el input junto con su contenido.
    infoStatusTareas.style.display = "none";//la variable que se encarga de mostrar si hay tareas o no, será ocultado.
    await subirTareas();//estara a la espera la promesa que contiene una funcion para subir tareas.
    txt.innerHTML = "";//se va a limpiar el input que almanecena el contenido de la tareas.
  } else {//sino esto no se cumple.
    document.getElementById("requerimiento").innerHTML = "Ingrese un texto";//la variable encargada de dar el aviso al subir a la api, mostrara que tienes que introdir un texto.
  }
});

agregarTareas.addEventListener("click", async function () {//cuando presiones el boton "agregarTareas", esté estara a la escucha de un "click" para ejecutar un funcion asincrona.
  if (txt.value.trim() !== "") {//si el contenido del input es estrictamente distinto y sin espacios de vacio.
    document.getElementById("requerimiento").innerHTML = "";//entonces se limpiara la variable que dara aviso si la tarea se subio correctamente o no.
    await postTask(txt.value);//la promesa que se encarga de editar las tareas estara a la espera y se le enviara como parametro el input junto con su contenido.
    infoStatusTareas.style.display = "none";//la variable que se encarga de mostrar si hay tareas o no, será ocultado.
    await subirTareas();//estara a la espera la promesa que contiene una funcion para subir tareas.
    txt.innerHTML = "";//se va a limpiar el input que almanecena el contenido de la tareas.
  } else {//sino.
    document.getElementById("requerimiento").innerHTML = "Ingrese un texto";//la variable encargada de dar el aviso al subir a la api, mostrara que tienes que introdir un texto. 
  }
});

async function cuadroTareasVacio() {//creamos una funcion asincrona para saber si el cuadro que contiene tareas, tiene tareas.
  try {// con el try obtenemos la promesa.
    let tareas = await getTask();// declaramos un variable que va a guardar todas las tareas subidas.

    if (tareas.length === 0) {//creamos una condicion diciendo, si el tamaño de las tareas es estrictamente igual a "0".
      //console.log("hola");
      infoStatusTareas.innerHTML = "No Existen Tareas";//entonces la variable encarga de mostrar la informacion de la existencia de tareas o no, mostrara que no existen.
    } else {//sino.
      //console.log("hola else");
      infoStatusTareas.style.display = "none";//la variable que muestra si hay tareas o no, será ocultado.
      await subirTareas();//estara a la espera la promesa que sube las tareas para que guarde está informacion.
    }
  } catch (error) {//con el "catch" vamos a guardar cada error en la variable "error".
    console.error(error);//este mismo será mostrado en consola.
  }
}

subirTareas();//invocamos a la funcion encargada de subir las tareas.

async function subirTareas() {//creamos la funcion asincrona que subira las tareas.
  let almacen = await getTask();// declaramos un variable que va a guardar todas las tareas subidas.
  cuadroInformacion.innerHTML = "";//se la hará una limpieza a la variable.
  txt.value = "";//tambien se limpiar la variable que contiene el valor del input.
  for (let index = 0; index < almacen.length; index++) {//vamos a recorrer todas las tareas.
    const div = document.createElement("div");//después que se recorran vamos a crear una varible que hará un "div"
    const btnImg = document.createElement("img");//tambien se creara una imagen.
    btnImg.src = "http://localhost:1234/iconoBasura.9d91d138.png";//la imagen tendra una url que muestra el icono de un basurero.
    const check = document.createElement("input");//creamos tambien un input.
    check.id = "checkId";//a este input junto con su propiedad "id" le asigamos un valor en texto.
    check.type = "checkbox";//al mismo input junto con l propiedad del tipo, decimos que sera de tipo "checkbox"
    div.innerHTML = almacen[index].task;//dentro del "div", le haremos una incersion siendo asigando el valor de la variable que tiene todas las tareas junto con sus posiciones y el atributo de las tareas.
    btnImg.id = almacen[index].id;//dentro de la imagen junto con su atrinbuto de id, le asignamos la varible que tiene todas las tareas con el atriuto de "id".
    div.appendChild(btnImg);//vamos a añadir dentro del "div" creado antes, a la imagen,
    div.appendChild(check);//dentro del tambien vamos a agregar el check.

    btnImg.addEventListener("click", function () {//la imagen tendra una funcion que estará a la escucha de un click.
      deleteTask(btnImg.id);//cuando suceda, se borraran la imagen con su id.
      div.remove();//tambien sera removido el "div"
      if (cuadroInformacion.children.length === 0) {//si la variable que contendra las tareas tiene un tamaño igual a cero.
        infoStatusTareas.style.display = "block";//entonces bloquea la informacion de la variable que muestra el estado de las tareas.
      }
    });

    check.addEventListener("click", async function () {//dentro del check, se creara un funcion que estara a la escucha de un click.
      await putTask(almacen[index]);//estara a la espera la promesa que edita las tareas, teniendo como parametro la variable que sube las tareas junto con sus posciones.
      await contador();// tambien estara a la espera la promesa que ejecuta un contador para irlo aumentando.
    });

    cuadroInformacion.appendChild(div);//a la variable que contendra todas las tareas se la va añadir el div.
    if (almacen[index].status) {//si la varible que sube las tareas junto con sus posicones y el estado de ellas.
      check.checked = true;//el input check junto con su atributo cambiara a verdadero.
    }
  }
  await contador();//estara a la espera la funcion que ejecuta el contador.
}

async function contador() {// se crea la funcion asincrona de contador.
  let obtenerTareas = await getTask();//declaramos un varible que obtiene todas las tareas.
  let contador1 = 0;//declaramos una variable que tendra un numero cero para irlo aumentando.
  obtenerTareas.forEach((element) => {//recorremos la varible que obtiene las tareas y decime que cada elemento.
    if (element.status) {//si cada elemento junto su atributo de estado.
      contador1++;//entonces el contador ira aumentando de a uno.
    }
    document.getElementById("contadorM").innerHTML = contador1;//declaramos una variable que cambiara el numero del contador.
  });
}
