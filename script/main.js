class Conversor {
    
    constructor(cantidad, deMoneda, aMoneda) {
        this.cantidad = cantidad;
        this.deMoneda = deMoneda;
        this.aMoneda = aMoneda;
    }

    multiplicador = () => {
        let cant = this.cantidad;
        let deM = this.deMoneda;
        let aM = this.aMoneda;
        let cantidadConvertida;
        let valorMultiplicador;
        
        for (const cambios of misDatos) {
            if(deM === cambios.id ){
                let claves = Object.keys(cambios);
                let valores = Object.values(cambios);
                let cont = 0;
                for (const clave of claves) {
                    if(aM==clave){
                        break;
                    };
                    cont++;
                };
                valorMultiplicador = valores[cont];
            }
        }
        
        cantidadConvertida = (cant*valorMultiplicador).toFixed(1);
        this.resultado = `${cant} ${deM} equivalen a ${cantidadConvertida} ${aM}`
        return this.resultado;
    }
    
    /*conversorDeMoneda = () => {
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
    }*/
};

let generarConversion = () => {
    let cantidad = (($("#Name"))[0].value);
    let deMoneda = ($("#deMoneda"))[0].value;
    let aMoneda = ($("#aMoneda"))[0].value;
    const URL = "https://jsonplaceholder.typicode.com/posts";
    if(cantidad === "0" || cantidad === "") {
        alert("Para convertir debe ingresar una cantidad");
    } else if(deMoneda === aMoneda) {
        alert("Ingrese dos monedas distintas");
    } else if(deMoneda === "Seleccione" || aMoneda === "Seleccione"){
        alert("Falta ingresar alguna moneda");
    } else {
        let conversionX = new Conversor(parseInt(cantidad), deMoneda, aMoneda);
        //let resultadoFinal = conversionX.conversorDeMoneda();
        let resultadoFinal = conversionX.multiplicador();
        $("#pestaniaDos").append(`<h3>${resultadoFinal}</h3>`);
        $(".contenidoModal").append(`<h4>${resultadoFinal}</h4>`);
        $(".conversorContainer").animate({"opacity":0.3});
        $(".conversorModal").show();
        $.post(URL,resultadoFinal,(respuesta,estado) =>{
            if(estado==="success"){
                //Podría agregar un elemento al html pero lo veo innecesario ya que ya lo hice en otros desafios y en este caso no tiene relevancia
                console.log("El cambio ha sido guardado");
            }
        });
    }
};

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

$("#cerrarModal").click(()=>{
    $(".contenidoModal h4").remove();
    $(".conversorContainer").animate({"opacity":1});
    $(".conversorModal").hide("fast");
});


const botonPestaniaConversor = document.getElementById("btnConversor");
const botonPestaniaHistorial = document.getElementById("btnHistorial");
const pestania1 = document.getElementById("pestaniaUno");
const pestania2 = document.getElementById("pestaniaDos");
botonPestaniaConversor.addEventListener("click", mostrarQuitar1);
botonPestaniaHistorial.addEventListener("click", mostrarQuitar2);


const URLJSON = "../data.json";
let misDatos;
$.getJSON(URLJSON, function (respuesta,estado) {
    if(estado === "success"){
        misDatos = respuesta;
    }
});