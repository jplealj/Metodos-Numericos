const button = document.getElementById('start');
const table = document.getElementById('table');

var table_created = false;
var num_decimals = 4;

if (window.screen.availWidth > 900) {
    num_decimals = 6;
}

button.addEventListener('click', () => {
    puntoFijo();
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

        let g = document.createElement('th');
        let g_text = document.createTextNode(row[2],num_decimals);
        g.appendChild(g_text);
        trow.appendChild(g);

        let f = document.createElement('th');
        let f_text = document.createTextNode(row[3],num_decimals);
        f.appendChild(f_text);
        trow.appendChild(f);

        let e = document.createElement('th');
        let e_text = document.createTextNode(row[4],num_decimals);
        e.appendChild(e_text);
        trow.appendChild(e);

        tbody.appendChild(trow);
        table_created = true;
    });
}

function puntoFijo(){
    /*var mathjs = require('mathjs');
    let strf = 'log(sin(x)^2+1)-(1/2)-(x)';//esta es la funcion f
    let strg = 'log(sin(x)^2+1)-(1/2)';//esta es la funcion g
    let data = [];
    x0 = -0.5;
    tol = 0.0000001;
    niter = 100;*/
    let strf = document.getElementById('function-f').value;
    let strg = document.getElementById('function-g').value;
    let x0 = document.getElementById('x0').value;
    let niter = document.getElementById('iterations').value;
    let tol = document.getElementById('tolerance').value;
    let data = [];
    contador = 0;
    var error = tol+1;
    fx= math.evaluate(strf,{x:x0});
    if(niter < 0){
        console.log("El numero de iteraciones debe ser positivo");
        return("Error");
    }
    if(tol < 0){
        console.log("La tolerancia debe ser positiva");
        return("Error");
    }

    data.push([contador, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(math.evaluate(strg,{x:x0})).toPrecision(17),Number.parseFloat(fx).toExponential(1), '']);
    while((fx!=0) && (error>tol )&& (contador<niter)){
        xn= math.evaluate(strg,{x:x0});
        fx= math.evaluate(strf,{x:xn});
        error= Math.abs(xn-x0);
        x0= xn;
        contador= contador+1;
        data.push([contador, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(math.evaluate(strg,{x:x0})).toPrecision(17),Number.parseFloat(fx).toExponential(1),Number.parseFloat(error).toExponential(1)]);
    }
    if (fx == 0) {
        console.log("se encontro una aproximación en: " +x0);
        create_table(data, document.getElementById('table-body'));
    } else if (error < tol) {
        console.log( "se encontro una aproximacion en: " +x0);
        create_table(data, document.getElementById('table-body'));
    } else {
        console.log("El  metodo no encontro el resultado, intente de nuevo");
    }
    console.table(data);
}
puntoFijo()