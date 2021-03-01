// let montoEnDolares = parseInt(prompt("Ingrese la cantidad de dolares que quiere comprar:"));

// let conversor = (monto) => {
//     let cantidadCambiada = monto*90*1.3*1.3;
//     return cantidadCambiada;
// }

// let montoEnPesos = conversor(montoEnDolares);

class Conversor {
    
    constructor(cantidad, deMoneda, aMoneda) {
        this.cantidad = cantidad;
        this.deMoneda = deMoneda;
        this.aMoneda = aMoneda;
    }
    
    conversorDeMoneda = () => {
        if (this.deMoneda === "Dolar" & this.aMoneda === "Peso") {
            this.cantidadConvertida = this.cantidad*90*1.3*1.3;
        } else {
            alert("Hubo un error");
        }
        return this.cantidadConvertida;
    }
}

let montoEnDolares = parseInt(prompt("Ingrese la cantidad de dolares que quiere comprar:"));
let primeraConversion = new Conversor(montoEnDolares, "Dolar", "Peso");

setTimeout(() => {
     alert(`Para comprar USD${montoEnDolares} se necesitan $${primeraConversion.conversorDeMoneda()}`);
}, 2000);