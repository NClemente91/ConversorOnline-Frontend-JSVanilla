let montoEnDolares = parseInt(prompt("Ingrese la cantidad de dolares que quiere comprar:"));

let conversor = (monto) => {
    let cantidadCambiada = monto*90*1.3*1.3;
    return cantidadCambiada;
}

let montoEnPesos = conversor(montoEnDolares);

setTimeout(() => {
    alert(`Para comprar USD${montoEnDolares} se necesitan $${montoEnPesos}`);
}, 2000);