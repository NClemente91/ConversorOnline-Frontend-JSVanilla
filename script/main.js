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

let historial = [];

alert("Para salir del conversor ingresar un monto de 0 (cero)");

let verificador;

do {
    let montoEnDolares = parseInt(prompt("Ingrese la cantidad de dolares que quiere comprar:"));
    if(montoEnDolares !==0){
        verificador = true;
        let primeraConversion = new Conversor(montoEnDolares, "Dolar", "Peso");
        historial.push(primeraConversion);
        alert(`Para comprar USD${montoEnDolares} se necesitan $${primeraConversion.conversorDeMoneda()}`);
    } else {
        verificador = false;
    }
} while (verificador);

console.log(historial);
let montosConvertidos = historial.map(historial => historial.cantidad);
alert(`Montos ingresados en USD: ${montosConvertidos}`);