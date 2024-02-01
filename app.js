

/**
 * inicialmente teniamos una forma primitiva para asignar texto a
 * determinada etiqueta
 * 
 * let titulo = document.querySelector('h1');
   titulo.innerHTML = "Juega al numero secreto";
   let parrafo = document.querySelector('p');
   parrafo.innerHTML = "Indica un número entre 1 y 10";

 * hemos hecho la funcion mas generica para no repetir codigo
 * @param {*} etiqueta 
 * @param {*} texto 
 * 
 */
function asignarTextoAlElemento(etiqueta, texto){
    let elementoHtml = document.querySelector(etiqueta);
    elementoHtml.innerHTML = texto;
}

let numeroSecreto = 0;
let intentos=0;
let numerosSorteados= [];
let numMaximo= 10;

function verificarIntento(){
    let numeroUsuario= parseInt(document.getElementById('valorUsuario').value);
    // console.log(numeroUsuario); 
    // // para ver en consola que tipo de dato es ->
    // console.log(typeof(numeroUsuario));
    // console.log(numeroSecreto);
    // console.log(typeof(numeroSecreto));
    // console.log(numeroSecreto===numeroUsuario);
    if(numeroSecreto===numeroUsuario){
        asignarTextoAlElemento('p', `Acertaste el número en ${intentos} ${(intentos===1)?"vez": "veces"}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else {
        //cuando el usuario no acierta
        if(numeroUsuario>numeroSecreto){
            asignarTextoAlElemento('p', "El número secreto es menor");
        }else{
            asignarTextoAlElemento('p', "El número secreto es mayor");
        }
        intentos++;
        limpiar();
    }
    return;
} 

function limpiar() {
    // una opcion es->
    // let valorCaja=document.querySelector('#valorUsuario');
    // valorCaja.value='';

    document.querySelector('#valorUsuario').value='';
}
 
function generarNumeroAleatorio() {
    let numeroGenerado = Math.floor(Math.random()*numMaximo)+1;  
    
    console.log(numeroGenerado);
    console.log(numerosSorteados);
    //si ya sorteamos todos 
    if(numerosSorteados.length == numMaximo){
        asignarTextoAlElemento('p','Ya se sorteron los numeros posibles');
    }else{

        //si el numero generado está en la lista
        if(numerosSorteados.includes(numeroGenerado)){
        return generarNumeroAleatorio();
        }else{
        numerosSorteados.push(numeroGenerado);
        return numeroGenerado;
        }
    }
}




function condicionesIniciales() {
    asignarTextoAlElemento('h1', "Juega al numero secreto");
    asignarTextoAlElemento('p',`Indica un número entre 1 y ${numMaximo} `);
    numeroSecreto=generarNumeroAleatorio();
    intentos=1;
}

function reiniciarJuego() {
    //limpiar caja 
    limpiar();
    //indicar mensaje de inicio
    //inicializar número de intentos
    //generar el aleatorio
    condicionesIniciales();
    //deshabilitar el boton
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();