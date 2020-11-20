const button = document.getElementById('start');
const table = document.getElementById('table');

var table_created = false;
var num_decimals = 4;

if (window.screen.availWidth > 900) {
    num_decimals = 6;
}

button.addEventListener('click', () => {
    gaussianaSimple();
});

function addTable(dataArray) {
    var myTable = document.createElement('table');
        
    document.body.appendChild(myTable);

    var y = document.createElement('tr');
    myTable.appendChild(y);

    for(var i = 0 ; i < dataArray.length ; i++) {
        var row = dataArray[i];
        var y2 = document.createElement('tr');
        for(var j = 0 ; j < row.length ; j++) {
            myTable.appendChild(y2);
            var th2 = document.createElement('td');
            var date2 = document.createTextNode(row[j]);
            th2.appendChild(date2);
            y2.appendChild(th2);
        }
    }
}

function formarMatrizA(aso){
    var A = [];
    filaN = new Array();
    i = 0;
    while(!aso[i].includes(']]')){
        j = i;
        while(!aso[j].includes(']')){
            if(aso[j].includes('[')){
                aso[j] = aso[j].replace('[','');
                if(aso[j].includes('[')){
                    aso[j] = aso[j].replace('[','');
                }
            }
            filaN.push(parseFloat(aso[j]));
            j = j + 1;
        }
        filaN.push(parseFloat(aso[j]));
        if(filaN.length == Math.sqrt(aso.length)){
            A.push(filaN);
        }
        filaN = [];
        i = i + 1;
    }
    return A;
}

function formarMatrizb(blaso){
    var b = [];
    filaN = new Array();
    j = 0;
    while(!blaso[j].includes(']')){
        if(blaso[j].includes('[')){
            blaso[j] = blaso[j].replace('[','');
            if(blaso[j].includes('[')){
                blaso[j] = blaso[j].replace('[','');
            }
        }
        filaN.push(parseFloat(blaso[j]));
        j = j + 1;
    }
    filaN.push(parseFloat(blaso[j]));
    b.push(filaN);
    return b;
}

function gaussianaSimple(){
    var aso = [];
    //const readline = require('readline');
    
    /*const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });*/
      
    //l.question('Ingrese la matriz A de la forma [[a, b, c], [d, e, f]] y luego de un : la matriz B de la forma [g, h, i] -> \n', (answer) =>
    let strA = document.getElementById('A').value;
    let strB = document.getElementById('b').value;
    var A = [];
    var b = [];
    aso = strA.split(',');
    blaso = strB.split(',');
    if(Number.isNaN(Math.sqrt(aso.length))){
        console.log("La matriz A no es cuadrada");
    } else if (Math.sqrt(aso.length) != blaso.length){
        console.log("La matriz A no es compatible con la matriz b");
    } else {
        A = formarMatrizA(aso);
        b = formarMatrizb(blaso);
        let data = [];
        var M = [];
        M = A;
        for(i = 0; i < M.length; i++){
            for(j = 0; j < M[i].length; j++){
                M[i][j] = M[i][j].toPrecision(8);
            }
        }
        for(i = 0; i < A.length; i++) {
            data.push(M[i]);
            M[i].push(b[0][i].toPrecision(8));
        }
        for(i = 0; i < M.length; i++){
            for(j = i + 1; j < M.length; j++){
                divisor = M[j][i] / M[i][i];
                for(k = i; k < M.length + 1; k++){
                    M[j][k] = (M[j][k] - (divisor * M[i][k])).toPrecision(8);
                }
            }
            console.log("ETAPA " + i);
            /*create_table(data, document.getElementById('table-body'));
            console.table(data);*/
            //document.getElementById('table-body').innerHTML = M;
            let etapa = "Etapa " + i;
            //document.write('<br>');
            addTable(data);
        }
        x = new Array(A.length);
        for(i = 0; i < x.length; i++){
            x[i] = 0;
        }
        for(i = M.length - 1; i >= 0; i--){
            sum = 0;
            for(j = i + 1; j < M[i].length; j++){
                sum = sum + (M[i][j - 1] * x[j - 1]);
            }
            x[i] = new Array(((M[i][M.length] - sum) / (M[i][i])).toPrecision(6));
        }
        /*console.log("x: ");
        create_table2(x,document.getElementById('table-x'));
        console.table(x);*/
        addTable(x);
        //document.getElementById('table-body').innerHTML = M;
    }
}

gaussianaSimple()