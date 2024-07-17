let numeroSecreto = 0; //Se puede nombrar igual que la variable dentro de la función
let intentos = 1; //Variable para almacenar el número de intentos
let listaNumeros = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento); //Método para acceder a cada selector. Almacena un objeto en lugar de un valor

    elementoHTML.innerHTML = texto;  //innerHTML se usa para cambiar el contenido de un elemento del HTML. En este caso, se usa paara el selector que se almacena en la variable elementoHTML.

    return;
}

// --------- DECLARACIÓN DE LA FUNCIÓN PARA EL BOTÓN "INTENTAR" ---------
function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); //document.getElementById sirve específicamente para buscar al elemento por su ID, en este caso busca al input con ID valorUsuario. Esto sólo almacena el objeto, pero si se quiere el valor, se usa .value 
    console.log(numeroSecreto);
    if (numeroDeUsuario === numeroSecreto){ // El triple igual arroja true sólo si los valores coinciden, pero también si el tipo de dato coincide
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`); //Se llama a una función dentro de una función
        document.getElementById('reiniciar').removeAttribute('disabled');//removeAtribute() se usa para eliminar un atributo de cualquier elemento
        document.getElementById('intentar').setAttribute('disabled',true); //deshabilité el botón de intentar cuando termina el juego para que ya no sigan intentando en el mismo juego
    }

    else{
        if(numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p','El número es menor');
        }

        else{
            asignarTextoElemento('p','El número es mayor');
        }

        intentos++;
        limpiarCampo();
    }
    
    return;     
}

function mensajesIniciales(){
    // ------ CAMBIAR EL TÍTULO -----
    asignarTextoElemento('h1','Juego del Numero Secreto!'); //Se manda a llamar a la función con estos parámetros

    // ------ CAMBIAR EL PÁRRAFO -----
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;

}

function reiniciarJuego(){
    /*
    Para un nuevo juego, se debe:
     1 Limpiar la caja
     2 Indicar mensaje de 'Indica un número del 1 al 10'
     3 Generar un nuevo número aleatorio
     4 Reiniciar el número de intentos
     5 Deshabilitar nuevamente el botón de Nuevo Juego
    */ 
    limpiarCampo();
    mensajesIniciales(); //Los pasos 2, 3 y 4 se ejecutan en esta parte 
    document.getElementById('intentar').removeAttribute('disabled'); //Se vuelve a activar el botón de intentar
    document.getElementById('reiniciar').setAttribute('disabled',true); //setAtribute necesita dos parámetros. El primer parámetro es el nombre del atributo que quieres establecer (en este caso, disabled). El segundo parámetro es el valor que quieres asignar a ese atributo (en este caso, true).
    
}

function limpiarCampo(){
    document.getElementById('valorUsuario').value = '';
    //Con estas líneas se limpia la caja. 
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1; //Genera el número secreto y lo retorna. No se necesita crear una variable
    console.log(numeroGenerado); 
    console.log(listaNumeros);

    //Si ya se sortearon todos los números posibles
    // ----- CONDICIÓN DE SALIDA DE LA RECURSIVIDAD -----
    if (listaNumeros.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
        
    }

    else{

        if (listaNumeros.includes(numeroGenerado)){ //El método includes recorre toda la lista para verificar si algún elemento dado en la condición se incluye en esta lista o no 
            return generarNumeroSecreto(); //Se vuelve a llamar a la misma función para repetir este proceso cuantas veces sea necesario. Esto se llama recursividad
        }

        else{
            listaNumeros.push(numeroGenerado);
            return numeroGenerado;
        }

    }

    /*
    Debido a la recursividad, va a llegar un momento en el que ya no van a haber más números que cumplan con la condición, con lo cual el programa se va a crashear. Para arreglarlo, se debe de tener una condición de salida. 
    */
   
}

mensajesIniciales();