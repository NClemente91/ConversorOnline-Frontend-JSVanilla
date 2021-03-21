class Conversor {
    
    constructor(cantidad, deMoneda, aMoneda) {
        this.cantidad = cantidad;
        this.deMoneda = deMoneda;
        this.aMoneda = aMoneda;
    }
    
    conversorDeMoneda = () => {
        if (this.deMoneda === "ARG" & this.aMoneda === "USD") {
            this.cantidadConvertida = (this.cantidad*0.011).toFixed(1);
            this.resultado = `${this.cantidad} ARG equivalen a ${this.cantidadConvertida} USD`
            return this.resultado;
        } else if(this.deMoneda === "ARG" & this.aMoneda === "EUR") {
            this.cantidadConvertida = (this.cantidad*0.009).toFixed(1);
            this.resultado = `${this.cantidad} ARG equivalen a ${this.cantidadConvertida} EUR`
            return this.resultado;
        } else if(this.deMoneda === "USD" & this.aMoneda === "ARG") {
            this.cantidadConvertida = (this.cantidad*90.779).toFixed(1);
            this.resultado = `${this.cantidad} USD equivalen a ${this.cantidadConvertida} ARG`
            return this.resultado;
        } else if(this.deMoneda === "USD" & this.aMoneda === "EUR") {
            this.cantidadConvertida = (this.cantidad*0.834).toFixed(1);
            this.resultado = `${this.cantidad} USD equivalen a ${this.cantidadConvertida} EUR`
            return this.resultado;
        } else if(this.deMoneda === "EUR" & this.aMoneda === "ARG") {
            this.cantidadConvertida = (this.cantidad*108.756).toFixed(1);
            this.resultado = `${this.cantidad} EUR equivalen a ${this.cantidadConvertida} ARG`
            return this.resultado;
        } else if(this.deMoneda === "EUR" & this.aMoneda === "USD") {
            this.cantidadConvertida = (this.cantidad*1.198).toFixed(1);
            this.resultado = `${this.cantidad} EUR equivalen a ${this.cantidadConvertida} USD`
            return this.resultado;
        } else {
            return "Alguno de los datos ingresados es incorrecto"
        }
    }
}
let historialDeConversiones = [];
let generarConversion = () => {
    let cantidad = parseInt(document.getElementById("Name").value);
    let deMoneda = document.getElementById("deMoneda").value;
    let aMoneda = document.getElementById("aMoneda").value;
    if(cantidad === 0) {
        alert("Para convertir debe ingresar una cantidad");
    } else if(deMoneda === aMoneda) {
        alert("Ingrese dos monedas distintas");
    } else {
        let conversionX = new Conversor(cantidad, deMoneda, aMoneda);
        let resultadoFinal = conversionX.conversorDeMoneda();
        localStorage.setItem('Conversion', resultadoFinal);
        historialDeConversiones.push(resultadoFinal);
        const nodoPadre = document.getElementById("pestaniaDos");
        let h3 = document.createElement("h3");
        h3.className = "estiloH3Historial";
        let texto = document.createTextNode(resultadoFinal);
        nodoPadre.appendChild(h3);
        h3.appendChild(texto);
        alert(resultadoFinal);
    }
}

let mostrarQuitar1 = () => {
    pestania1.classList.remove("pestaniaConversor");
    pestania2.classList.add("pestaniaHistorial");
}
let mostrarQuitar2 = () => {
    pestania1.classList.add("pestaniaConversor");
    pestania2.classList.remove("pestaniaHistorial");
}

const botonConvertir = document.getElementById("convertir");
botonConvertir.addEventListener("click", generarConversion);

const botonPestaniaConversor = document.getElementById("btnConversor");
const botonPestaniaHistorial = document.getElementById("btnHistorial");
const pestania1 = document.getElementById("pestaniaUno");
const pestania2 = document.getElementById("pestaniaDos");
botonPestaniaConversor.addEventListener("click", mostrarQuitar1);
botonPestaniaHistorial.addEventListener("click", mostrarQuitar2);