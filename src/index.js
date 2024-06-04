let contador = 0;

let cuadroInformacion = document.getElementById('informacion');

let agregarTareas = document.getElementById('añadir');

let txt = document.getElementById("espacio-texto");

function actualizarContador(contador) {

  document.getElementById('contador').innerHTML = contador;

}

function agregar() {

  actualizarContador(++contador);
  
}

async function apiUrl() {
  try { //si promesa se resuelve, https status 200
    const response = await fetch('http://localhost:3000/api/task');
    const data = await response.json(); //Await pausa la ejecución de una función hasta que la promisa sea resuelva
    console.log(data);
    //capturar pokemon
  } catch (error) { //si promesa no se resuelve, https status 400-499 y 500-599
    console.error(error);
  }
}

agregarTareas.addEventListener("click",function () {
  postTask()
})

///puedo importar a posttask para hacerlo modular y compactar el codigo



 const postTask= async () => {

 try {

     const response = await fetch('http://localhost:3000/api/task', {

       method: 'POST',

       headers: {

         'Content-Type': 'application/json'
       },

       body: JSON.stringify({

         task: txt.value,

       })

     });

     const data = await response.json();

     let div = document.createElement('div')

     div = data

     cuadroInformacion.appendChild(div)

 }catch(error) {

   console.log(error)
 }

 } 
 postTask()





