const button = document.getElementById('start');
const table = document.getElementById('table');

var table_created = false;
var num_decimals = 4;

if (window.screen.availWidth > 900) {
    num_decimals = 6;
}

button.addEventListener('click', () => {
    incrementales();
});

function addTable(dataArray) {
    for(let i = 0; i < dataArray.length; i++){
        var foforro = document.createElement('p');
        foforro.innerHTML = dataArray[i];
        document.body.append(foforro);
    }
}

function incrementales(){
    //var mathjs = require('mathjs');
    /*str = 'log(sin(x)^2 + 1) - (1/2)';
    x0 = -3;
    delta = 0.5;
    niter = 100;*/
    let str = document.getElementById('function').value;
    let x0 = document.getElementById('x0').value;
    let delta = document.getElementById('delta').value;
    let niter = document.getElementById('niter').value;
    let data = [];
    x0 = parseFloat(x0);
    delta = parseFloat(delta);
    if(niter < 0){
        alert("El numero de iteraciones debe ser positivo");
        return("Error");
    }
    fx0 = math.evaluate(str,{x:x0});
    if (fx0 == 0){
        data.push(x0 + " es una raiz");
        //console.table(data);
        //console.log(x0 + " es una raiz");
    } else {
        x1 = x0 + delta;
        cont = 0;
        fx1 = math.evaluate(str,{x:x1});
        while (cont < niter){
            if (fx0 * fx1 < 0){
                if (fx1 == 0){
                    str1 = x1 + " es una raiz";
                    data.push(str1);
                    console.log(x1 + " es una raiz");
                    //addTable(str1);
                }
                else {
                    str1 = "Hay una raiz entre " + x0 + " y " + x1;
                    data.push(str1);
                    console.log("Hay una raiz entre " + x0 + " y " + x1);
                    //addTable(str1);
                }
            }
            x0 = x1;
            fx0 = fx1;
            x1 = x0 + delta;
            fx1 = math.evaluate(str,{x:x1});
            cont = cont + 1;
        }
    }
    addTable(data);

}

incrementales()