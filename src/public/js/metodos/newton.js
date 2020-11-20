const button = document.getElementById('start');
const table = document.getElementById('table');

var table_created = false;
var num_decimals = 4;

if (window.screen.availWidth > 900) {
    num_decimals = 6;
}

button.addEventListener('click', () => {
    newton();
});

function create_table(data, tbody) {
    data.forEach(row => {
        let trow = document.createElement('tr');

        let i = document.createElement('th');
        let i_text = document.createTextNode(row[0]);
        i.appendChild(i_text);
        trow.appendChild(i);

        let xi = document.createElement('th');
        let xi_text = document.createTextNode(row[1],num_decimals);
        xi.appendChild(xi_text);
        trow.appendChild(xi);

        let f = document.createElement('th');
        let f_text = document.createTextNode(row[2],num_decimals);
        f.appendChild(f_text);
        trow.appendChild(f);

        let e = document.createElement('th');
        let e_text = document.createTextNode(row[3],num_decimals);
        e.appendChild(e_text);
        trow.appendChild(e);

        tbody.appendChild(trow);
        table_created = true;
    });
}

function newton() {
    /*var mathjs = require('mathjs');
    let str = 'log(sin(x)^2+1)-(1/2)';//esta es la funcion
    var dfx = math.derivative(str,'x');
    let data = [];
    x0 = 0.5;//entrada
    tol = 0.0000001;//entrada
    niter = 100;*/
    let data = [];
    let str = document.getElementById('function').value;
    let x0 = document.getElementById('x0').value;
    let niter = document.getElementById('iterations').value;
    let tol = document.getElementById('tolerance').value;
    //let data = new Array();
    var dfx = math.derivative(str,'x');
    if(niter < 0){
        console.log("El numero de iteraciones debe ser positivo");
        return("Error");
    }
    if(tol < 0){
        console.log("La tolerancia debe ser positiva");
        return("Error");
    }

    fx0 = math.evaluate(str,{x:x0});
    dfx0= dfx.evaluate({x:x0});
    contador = 0;
    var error = tol + 1;
    data.push([contador, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(fx0).toExponential(1), '']);
    while ((error > tol) && (fx0 != 0) && (dfx0 != 0) && (contador < niter)) {
        xn = x0 - (fx0 / dfx0);
        fx0 = math.evaluate(str,{x:xn});
        dfx0= dfx.evaluate({x:xn});
        error = Math.abs(xn - x0);
        x0 = xn;
        contador = contador + 1;
        data.push([contador, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(fx0).toExponential(1), Number.parseFloat(error).toExponential(1)]);

    
        if (fx0 == 0) {
            console.log("Se encontro una aproximacion de la raiz en " + x0);
            create_table(data,document.getElementById('table-body'));
            console.table(data);
        } else if (error < tol) {
            console.log("Se encontro una aproximacion de la raiz en " + xn);
            create_table(data,document.getElementById('table-body'));
            console.table(data);
        } else if (dfx0 == 0) {
            console.log("Acá se pueden presenta casos de raices  multiples");
        } else {
            console.log("El  metodo no encontro el resultado, intente de nuevo");
        }
    
    }
    
}
newton()