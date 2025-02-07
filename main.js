"use strict";

// EJERCICIO AJEDREZ

// declaracion de tablero
// cambio de archivo
let tablero = [];
for(let i=0;i<8;i++){
    tablero.push([]);
    for(let j=0;j<8;j++){
        tablero[i].push("[ ] ");
    }
}
let piezas = ["[T] ","[C] ","[A] ","[P] ","[K] ","[Q] "];

// printeado de tablero añadiendo numeracion en bordes
function printTablero(tabl){
    console.log("\n");
    console.log("    [1] [2] [3] [4] [5] [6] [7] [8]")
    for(let i=0; i<8;i++){
        console.log(`[${i+1}] `+tabl[i].join(""));      
    }
    console.log("\n"); 
}

// generador de numeros aleatorios rango 0-7
function getRandomNumber_0a7() {
    return Math.floor(Math.random()*8);
}

// colocacion de fichas en casilla aleatorias
function ponerPiezas(piezas,tablero){
    let marcadorPiezasColocadas=0;  // variable para romper bucle al acabar de poner las fichas
    let listaPiezas = piezas;   // copiamos a variable local la lista de piezas
    let flagBucle=true; // booleano para el bucle
    while(flagBucle){
        let columna = getRandomNumber_0a7();
        let fila = getRandomNumber_0a7();

        // si la casilla aleatoria no tiene ya otra ficha, pone la primera ficha que haya en la lista y borra esa primera posicion
        // el bucle se repite hasta que no haya fichas en la lista
        if(tablero[fila][columna]==="[ ] "){
            tablero[fila][columna]=listaPiezas.shift();
            marcadorPiezasColocadas++;
        }
        if(marcadorPiezasColocadas==6){
            flagBucle=false;
        }
    }
    
}

function rey(tablero,fila,columna){
    // booleano en caso de que no se pueda comer fichas
    let noHayMovimientos=true;

    // registra las casillas a las que puede llegar la ficha
    let movimientos = [0,0,0,0,0,0,0,0];

    // registra las coordenadas de la casilla en que se puede comer una ficha
    let coordenadas = [[],[],[],[],[],[],[],[]];

    // restricciones de los movimientos limite al estar en los bordes del tablero
    if(fila==0){
        movimientos[0]=undefined;
        movimientos[1]=undefined;
        movimientos[2]=undefined;
        
    }
    if(fila==7){
        movimientos[5]=undefined;
        movimientos[6]=undefined;
        movimientos[7]=undefined;
    }
    if(columna==0){
        movimientos[0]=undefined;
        movimientos[3]=undefined;
        movimientos[5]=undefined;
    }
    if(columna==7){
        movimientos[2]=undefined;
        movimientos[4]=undefined;
        movimientos[7]=undefined;
    }
    // repasa la lista de los movimientos, y si en la posicion actual no es undefined (restringida) pone el caracter de esa posicion 
    for(let i=0;i<8;i++){
            if(movimientos[i]!==undefined){
                switch(i){
                    case 0:
                        // registro de la ficha
                        movimientos[0] = tablero[fila-1][columna-1];
                        // registro de sus coordenadas
                        coordenadas[0].push(fila-1);
                        coordenadas[0].push(columna-1);
                        break;
                    case 1:
                        movimientos[1] = tablero[fila-1][columna];
                        coordenadas[1].push(fila-1);
                        coordenadas[1].push(columna);
                        break;
                    case 2:
                        movimientos[2] = tablero[fila-1][columna+1];
                        coordenadas[2].push(fila-1);
                        coordenadas[2].push(columna+1);
                        break;
                    case 3:
                        movimientos[3] = tablero[fila][columna-1];
                        coordenadas[3].push(fila);
                        coordenadas[3].push(columna-1);
                        break;
                    case 4:
                        movimientos[4] = tablero[fila][columna+1];
                        coordenadas[4].push(fila);
                        coordenadas[4].push(columna+1);
                        break;
                    case 5:
                        movimientos[5] = tablero[fila+1][columna-1];
                        coordenadas[5].push(fila+1);
                        coordenadas[5].push(columna-1);
                        break;
                    case 6:
                        movimientos[6] = tablero[fila+1][columna];
                        coordenadas[6].push(fila+1);
                        coordenadas[6].push(columna);
                        break;
                    case 7:
                        movimientos[7] = tablero[fila+1][columna+1];
                        coordenadas[7].push(fila+1);
                        coordenadas[7].push(columna+1);
                        break;
                }
            }
        }
        
    
    for(let i=0;i<8;i++){
        if(movimientos[i]!==undefined && movimientos[i]!=="[ ] " && movimientos[i]!==0){
            console.log(`El rey puede comer a la pieza ${movimientos[i]}, (fila ${coordenadas[i][0]+1}, columna ${coordenadas[i][1]+1})`);
            noHayMovimientos=false;
        }
    }
    if(noHayMovimientos){
        console.log("El rey no puede comer fichas");
    }
    

}

function torre(tablero,fila,columna){

    let noHayMovimientos=true;
    let movimientos = [0,0,0,0];
    let coordenadas = [[],[],[],[]];

    // checkeo de todas las direcciones en que se puede mover la ficha, en caso de contacto, registra la ficha y sus coordenadas, rompe bucle y continua con las demas posiciones
    for(let i = (fila-1);i>=0;){
        if(tablero[i][columna]=="[ ] "){
            // si en la posicion no hay ficha, busca en la siguiente
            i--;
        }else{
            movimientos[0]=tablero[i][columna];
            coordenadas[0].push(i);
            coordenadas[0].push(columna);
            break;
        }
    }

    for(let i = (fila+1);i<8;){
        if(tablero[i][columna]=="[ ] "){
            i++;
        }else{
            movimientos[1]=tablero[i][columna];
            coordenadas[1].push(i);
            coordenadas[1].push(columna);
            break;
        }
    }

    for(let i = (columna-1);i>=0;){
        if(tablero[fila][i]=="[ ] "){
            i--;
        }else{
            movimientos[2]=tablero[fila][i];
            coordenadas[2].push(fila);
            coordenadas[2].push(i);
            break;
        }
    }

    for(let i = (columna+1);i<8;){
        if(tablero[fila][i]=="[ ] "){
            i++;
        }else{
            movimientos[3]=tablero[fila][i];
            coordenadas[3].push(fila);
            coordenadas[3].push(i);
            break;
        }
    }

    for(let i=0;i<4;i++){
        if(movimientos[i]!==0 && movimientos[i]!=="[ ] "){
            console.log(`La torre puede comer a la pieza ${movimientos[i]}, (fila ${coordenadas[i][0]+1}, columna ${coordenadas[i][1]+1})`);
            noHayMovimientos=false;
        }
    }
    if(noHayMovimientos){
        console.log("La torre no puede comer fichas");
    }
    
}

function peon(tablero,fila,columna){
    let noHayMovimientos=true;
    let movimientos = [0,0,0,0];
    let coordenadas = [[],[],[],[]];

    if(fila==0){
        movimientos[0]=undefined;
        movimientos[1]=undefined;
        
    }
    if(fila==7){
        movimientos[2]=undefined;
        movimientos[3]=undefined;
    }
    if(columna==0){
        movimientos[0]=undefined;
        movimientos[2]=undefined;
    }
    if(columna==7){
        movimientos[1]=undefined;
        movimientos[3]=undefined;
    }
        
    for(let i=0;i<4;i++){
            if(movimientos[i]!==undefined){
                
                switch(i){
                    case 0:
                        movimientos[0] = tablero[fila-1][columna-1];
                        coordenadas[0].push(fila-1);
                        coordenadas[0].push(columna-1);
                        break;

                    case 1:
                        movimientos[1] = tablero[fila-1][columna+1];
                        coordenadas[1].push(fila-1);
                        coordenadas[1].push(columna+1);
                        break;

                    case 2:
                        movimientos[2] = tablero[fila+1][columna-1];
                        coordenadas[2].push(fila+1);
                        coordenadas[2].push(columna-1);
                        break;

                    case 3:
                        movimientos[3] = tablero[fila+1][columna+1];
                        coordenadas[3].push(fila+1);
                        coordenadas[3].push(columna+1);
                        break;
                }
            }
        }
    

    for(let i=0;i<4;i++){
        if(movimientos[i]!==undefined && movimientos[i]!=="[ ] " && movimientos[i]!==0){
            console.log(`El peon puede comer a la pieza ${movimientos[i]}, (fila ${coordenadas[i][0]+1}, columna ${coordenadas[i][1]+1})`);
            noHayMovimientos=false;
        }
    }
    if(noHayMovimientos){
        console.log("El peon no puede comer fichas");
    }
    
}

function reina(tablero,fila,columna){

    let noHayMovimientos=true;
    let filaL=fila,columnaL=columna;

    let movimientos = [0,0,0,0,0,0,0,0];
    let coordenadas = [[],[],[],[],[],[],[],[]];
    //columna parriba
    for(let i = (fila-1);i>=0;){
        if(tablero[i][columna]=="[ ] "){
            i--;
        }else{
            movimientos[0]=tablero[i][columna];
            coordenadas[0].push(i);
            coordenadas[0].push(columna);
            break;
        }
    }
    //columna pabajo
    for(let i = (fila+1);i<8;){
        if(tablero[i][columna]=="[ ] "){
            i++;
        }else{
            movimientos[1]=tablero[i][columna];
            coordenadas[1].push(i);
            coordenadas[1].push(columna);
            break;
        }
    }
    //fila izquierda
    for(let i = (columna-1);i>=0;){
        if(tablero[fila][i]=="[ ] "){
            i--;
        }else{
            movimientos[2]=tablero[fila][i];
            coordenadas[2].push(fila);
            coordenadas[2].push(i);
            break;
        }
    }
    //fila derecha
    for(let i = (columna+1);i<8;){
        if(tablero[fila][i]=="[ ] "){
            i++;
        }else{
            movimientos[3]=tablero[fila][i];
            coordenadas[3].push(fila);
            coordenadas[3].push(i);
            break;
        }
    }
    //diagonal abajo derecha
    for(let i = (columnaL+1);i<7;){
        if(filaL>6){
            break;
        }
        if(tablero[filaL+1][i]=="[ ] "){
            i++;
            filaL++;
        }else{
            movimientos[4]=tablero[filaL+1][i];
            coordenadas[4].push(filaL+1);
            coordenadas[4].push(i);
            break;
        }
        
    }
    filaL=fila;
    columnaL=columna;

    //diagonal arriba derecha
    for(let i = (columnaL+1);i<8 && filaL > 0;){ // '&& filaL > 0' para asegurar que no se salga de rango, al empezar con un -1
        if(filaL<1){
            break;
        }
        if(tablero[filaL-1][i]=="[ ] "){
            i++;
            filaL--;
        }else{
            movimientos[5]=tablero[filaL-1][i];
            coordenadas[5].push(filaL-1);
            coordenadas[5].push(i);
            break;
        }
        
    }
    filaL=fila;
    columnaL=columna;

    //diagonal abajo izquierda
    for(let i = (columnaL-1);i>=0  && filaL <7;){ // '&& filaL <7' para asegurar que no se salga de rango, al empezar con un +1
        if(filaL>6){
            break;
        }
        if(tablero[filaL+1][i]=="[ ] "){
            i--;
            filaL++;
        }else{
            movimientos[6]=tablero[filaL+1][i];
            coordenadas[6].push(filaL+1);
            coordenadas[6].push(i);
            break;
        }
        
    }
    filaL=fila;
    columnaL=columna;

    //diagonal arriba izquierda
    for(let i = (columnaL-1);i>1 && filaL>=0;){
        if(filaL<1){
            break;
        }
        if(tablero[filaL-1][i]=="[ ] "){
            i--;
            filaL--;
        }else{
            movimientos[7]=tablero[filaL-1][i];
            coordenadas[7].push(filaL-1);
            coordenadas[7].push(i);
            break;
        }
        
    }
    filaL=fila;
    columnaL=columna;

    for(let i=0;i<8;i++){
        if(movimientos[i]!==0 && movimientos[i]!=="[ ] "){
            console.log(`La reina puede comer a la pieza ${movimientos[i]}, (fila ${coordenadas[i][0]+1}, columna ${coordenadas[i][1]+1})`);
            noHayMovimientos=false;
        }
    }
    if(noHayMovimientos){
        console.log("La reina no puede comer fichas");
    }
    
}

function alfil(tablero,fila,columna){
    let noHayMovimientos=true;

    let filaL=fila,columnaL=columna;

    let movimientos = [0,0,0,0];
    let coordenadas = [[],[],[],[]];
    
    //diagonal abajo derecha
    for(let i = (columnaL+1);i<8 && filaL<7;){
        if(tablero[filaL+1][i]=="[ ] "){
            i++;
            filaL++;
        }else{
            movimientos[0]=tablero[filaL+1][i];
            coordenadas[0].push(filaL+1);
            coordenadas[0].push(i);
            break;
        }
        if(filaL>7){
            break;
        }
    }
    filaL=fila;
    columnaL=columna;

    //diagonal arriba derecha
    for(let i = (columnaL+1);i<8 && filaL > 0;){    // '&& filaL > 0' para asegurar que no se salga de rango, al empezar con un -1
        if(tablero[filaL-1][i]=="[ ] "){
            i++;
            filaL--;
        }else{
            movimientos[1]=tablero[filaL-1][i];
            coordenadas[1].push(filaL-1);
            coordenadas[1].push(i);
            break;
        }
        if(filaL<0){
            break;
        }
    }
    filaL=fila;
    columnaL=columna;

    //diagonal abajo izquierda
    for(let i = (columnaL-1);i>=0   && filaL <7;){  // '&& filaL <7' para asegurar que no se salga de rango, al empezar con un +1
        if(tablero[filaL+1][i]=="[ ] "){
            i--;
            filaL++;
        }else{
            movimientos[2]=tablero[filaL+1][i];
            coordenadas[2].push(filaL+1);
            coordenadas[2].push(i);
            break;
        }
        if(filaL>7){
            break;
        }
    }
    filaL=fila;
    columnaL=columna;

    //diagonal arriba izquierda
    for(let i = (columnaL-1);i>1 && filaL>=0;){
        if(filaL<1){
            break;
        }
        if(tablero[filaL-1][i]=="[ ] "){
            i--;
            filaL--;
        }else{
            movimientos[3]=tablero[filaL-1][i];
            coordenadas[3].push(filaL-1);
            coordenadas[3].push(i);
            break;
        }
        
    }
    filaL=fila;
    columnaL=columna;

    for(let i=0;i<4;i++){
        if(movimientos[i]!==0 && movimientos[i]!=="[ ] "){
            console.log(`El alfil puede comer a la pieza ${movimientos[i]}, (fila ${coordenadas[i][0]+1}, columna ${coordenadas[i][1]+1})`);
            noHayMovimientos=false;
        }
    }
    if(noHayMovimientos){
        console.log("El alfil no puede comer fichas");
    }
    
}

function caballo(tablero,fila,columna){
    let noHayMovimientos=true;
    let movimientos = [0,0,0,0,0,0,0,0];
    let coordenadas = [[],[],[],[],[],[],[],[]];

    // arriba derecha i(0)
    if(fila>=2 && columna<=6){
        movimientos[0]=tablero[fila-2][columna+1];
        coordenadas[0].push(fila-2);
        coordenadas[0].push(columna+1);
    }
    // arriba izquierda i(1)
    if(fila>=2 && columna>=1){
        movimientos[1]=tablero[fila-2][columna-1];
        coordenadas[1].push(fila-2);
        coordenadas[1].push(columna-1);
    }
    // izquierda arriba i(2)
    if(fila>=1 && columna>=2){
        movimientos[2]=tablero[fila-1][columna-2];
        coordenadas[2].push(fila-1);
        coordenadas[2].push(columna-2);
    }
    // izquierda abajo i(3)
    if(fila<=6&& columna>=2){
        movimientos[3]=tablero[fila+1][columna-2];
        coordenadas[3].push(fila+1);
        coordenadas[3].push(columna-2);
    }
    // abajo derecha i(4)
    if(fila<=5 && columna<=6){
        movimientos[4]=tablero[fila+2][columna+1];
        coordenadas[4].push(fila+2);
        coordenadas[4].push(columna+1);
    }
    // abajo izquierda i(5)
    if(fila<=5 && columna>=1){
        movimientos[5]=tablero[fila+2][columna-1];
        coordenadas[5].push(fila+2);
        coordenadas[5].push(columna-1);
    }
    // derecha arriba i(6)
    if(fila >=1 && columna<=5){
        movimientos[6]=tablero[fila-1][columna+2];
        coordenadas[6].push(fila)-1;
        coordenadas[6].push(columna+2);
    }
    // derecha abajo i(7)
    if(fila <=6 && columna<=5){
        movimientos[7]=tablero[fila+1][columna+2];
        coordenadas[7].push(fila+1);
        coordenadas[7].push(columna+2);
    }

    for(let i=0;i<8;i++){
        if(movimientos[i]!==0 && movimientos[i]!=="[ ] "){
            console.log(`El caballo puede comer a la pieza ${movimientos[i]}, (fila ${coordenadas[i][0]+1}, columna ${coordenadas[i][1]+1})`);
            noHayMovimientos=false;
        }
    }
    if(noHayMovimientos){
        console.log("El caballo no puede comer fichas");
    }
    
}

function checkearTablero(tablero){
    for(let fila=0; fila<8; fila++){
        for(let columna=0; columna<8; columna++){
            switch(tablero[fila][columna]){
                case "[T] ":
                    torre(tablero,fila,columna);
                    break;
                case "[C] ":
                    caballo(tablero,fila,columna);
                    break;
                case "[A] ":
                    alfil(tablero,fila,columna);
                    break;
                case "[P] ":
                    peon(tablero,fila,columna);
                    break;
                case "[K] ":
                    rey(tablero,fila,columna); 
                    break;
                case "[Q] ":
                    reina(tablero,fila,columna);
                    break;
                            
            }
        }
    }
}

ponerPiezas(piezas,tablero);
printTablero(tablero);
checkearTablero(tablero);