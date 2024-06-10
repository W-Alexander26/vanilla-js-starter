async function getTask() {//creamos la funcion asincrona para obtener todas las tareas.
  try {//con "try" vamos a tomar la obtencion de la promesa. 
    const response = await fetch("http://localhost:3000/api/task");//declaramos una variable fija, que tendra la promesa obteniendo la api, la promesa estara en espera hasta que está se cumpla.
    const data = await response.json();//declaramos otra variable fija que guarda la promesa como un objeto y estara a la espera hasta que se cumpla. 
    return data;// retornamos el valor del objeto.
  } catch (error) {//utilazamos el "catch" para que guarde todos los errores.
    console.error(error);//cada error sera mostrado en consola.
  }
}

const postTask = async (txt) => {//creamos una funcion que posteara todas las tareas a la api, enviandose como parametro el input encargado de obtener la informacion.
  try {//con "try" vamos a tomar la obtencion de la promesa.
    const response = await fetch("http://localhost:3000/api/task", {//declaramos una variable fija, que tendra la promesa obteniendo la api, la promesa estara en espera hasta que está se cumpla.
      method: "POST",//dentro de la funcion que postea las tareas, creamos un objeto con la propiedad "method" que muestra el metodo que se va a ejecutar en string.
      headers: {//utilizamos la propiedad "header" que nos va a indicar el tipo de contenido a mostrar, declarandose en "string".
        "Content-Type": "application/json",
      },
      body: JSON.stringify({//declaramos la propiedad del cuerpo, convertida en objeto y a la vez en cadena de texto.
        task: txt,//dentro del cuerpo del objeto, declaramos un atributo llamado "task, quien se va a encargar de almacenar las tareas y el encargado de tener esa informacion es el input "txt".
        status: false,//declaramos tambien el "status" para cambiarlo cuando se cumplan ciertas condiciones.
      }),
    });
    const data = await response.json();;//declaramos otra variable fija que guarda la promesa como un objeto y estara a la espera hasta que se cumpla.
    console.log(data);//mostraremos todos los archivss de datos en la consola.
  } catch (error) {//utilazamos el "catch" para que guarde todos los errores.
    console.log(error);//cada error sera mostrado en consola.
  }
};

const deleteTask = async (id) => {//creamos una funcion que eliminara todas las tareas de la api, enviandose como parametro la "id" de cada tarea.
  try {//con "try" vamos a tomar la obtencion de la promesa.
    const response = await fetch("http://localhost:3000/api/task/" + id, {//declaramos una variable , que tendra la promesa obteniendo la api y la "id" de cada tarea, la promesa estara en espera hasta que está se cumpla.
      method: "DELETE",//dentro de la funcion que elimina las tareas, creamos un objeto con la propiedad "method" que muestra el metodo que se va a ejecutar en string.
      headers: {//utilizamos la propiedad "header" que nos va a indicar el tipo de contenido a mostrar, declarandose en "string".
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();//declaramos otra variable fija que guarda la promesa como un objeto y estara a la espera hasta que se cumpla.
    return data // retornamos el valor del objeto.
  } catch (error) {//utilazamos el "catch" para que guarde todos los errores.
    console.log(error);//cada error sera mostrado en consola.
  }
};

const putTask = async (txt) => {//creamos una funcion que editara todas las tareas de la api, enviandose como parametro el input encargado de obtener la informacion.
  try {//con "try" vamos a tomar la obtencion de la promesa.
    txt.status = !txt.status;//declaramos que el input "txt" con la propiedad "status" tendra asigando una negación del mismo input "txt" con la misma propiedad "status".
    const response = await fetch(`http://localhost:3000/api/task/${txt.id}`, {//declaramos una variable , que tendra la promesa obteniendo la api y se le interpola el input "txt" junto con la propiedad "id", la promesa estara en espera hasta que está se cumpla.
      method: "PUT",//dentro de la funcion que edita las tareas, creamos un objeto con la propiedad "method" que muestra el metodo que se va a ejecutar en string.
      headers: {//utilizamos la propiedad "header" que nos va a indicar el tipo de contenido a mostrar, declarandose en "string".
        "Content-Type": "application/json",
      },
      body: JSON.stringify(txt),//declaramos la propiedad del cuerpo, convertida en objeto y a la vez en cadena de texto. Y tendra de parametro ek input que obtiene la informacion de las tareas.
    });
    const data = await response.json();//declaramos otra variable fija que guarda la promesa como un objeto y estara a la espera hasta que se cumpla.
    console.log(data);//mostraremos todos los archivss de datos en la consola.
  } catch (error) {//utilazamos el "catch" para que guarde todos los errores.
    console.log(error);//cada error sera mostrado en consola.
  }
};

export { postTask, getTask, deleteTask, putTask };// exportamos los 4 metodos para utilizarlos en otro documento.
