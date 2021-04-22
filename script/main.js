/*----------------------- LLAMADA -----------------------*/
let misDatos = [];
$.getJSON('https://nclemente91.github.io/ProyectoJavaScriptClemente/finalData.json',(respuesta,estado)=>{
    if(estado=="success"){
        misDatos = respuesta;
        generarOptionSelect(misDatos);
        generarCambioReal(misDatos[0]);
    } else {
        console.log(estado);
    }
})

/*----------------------- PARTE REALIZADA CON JS PURO -----------------------*/
function mostrarQuitar1() {
    pestania1.classList.remove("pestaniaConversor");
    pestania2.classList.add("pestaniaHistorial");
}
function mostrarQuitar2() {
    pestania1.classList.add("pestaniaConversor");
    pestania2.classList.remove("pestaniaHistorial");
}

const botonPestaniaConversor = document.getElementById("btnConversor");
const botonPestaniaHistorial = document.getElementById("btnHistorial");
const pestania1 = document.getElementById("pestaniaUno");
const pestania2 = document.getElementById("pestaniaDos");
botonPestaniaConversor.addEventListener("click", mostrarQuitar1);
botonPestaniaHistorial.addEventListener("click", mostrarQuitar2);

/*----------------------- FUNCIONES -----------------------*/
function generarOptionSelect(listado) {
    for (const moneda of listado) {
        $("#deMoneda").append(`<option>${moneda.id} - ${moneda.denominacion}</option>`);
        $("#aMoneda").append(`<option>${moneda.id} - ${moneda.denominacion}</option>`);
    }
}

function generarCambioReal(monedaPpal) {
    //let monedaPpal = listado[0];
    $("#segundaParte").empty();
    $("#segundaParte").append(`<div class="encabezadoTiposDeCambio alturaEncabezado">
                                        <div>
                                            <span>Moneda</span>
                                        </div>
                                        <div>
                                            <span>Cantidad</span>
                                        </div>
                                    </div>`);
    for (const subValor in monedaPpal) {
        buscarBandera(misDatos,subValor);
        buscarNombreBandera(misDatos,subValor);
        if(subValor=="id"){
            $("#segundaParte").append(`<div class="primariaTiposDeCambio bordesRedondos">
                                            <div class="encabezadoMonedaPpal">
                                                <span>${monedaPpal.denominacion}</span>
                                                <img src="${monedaPpal.logo}" class="imgLogo">
                                            </div>                    
                                            <div class="encabezadoMonedaPpal">
                                                <span>1</span>
                                            </div>
                                        </div>`);
        } else if(subValor!="id" && subValor!="denominacion" && subValor!="logo") {
            $("#segundaParte").append(`<div class="secundariaTiposDeCambio">
                                            <div class="seccionMoneda">
                                                <span class="cambioDeUbicacion" id="${nombreMoneda}">${nombreMoneda}</span>
                                                <img src="${bandera}" class="imgLogo">
                                            </div>
                                            <div>
                                                <span>${monedaPpal[subValor]}</span>
                                            </div>
                                        </div>`);
        }
    }
}

let bandera;
function buscarBandera(listado,codigo){
    for (const moneda of listado) {
        if(codigo == moneda.id){
            bandera = moneda.logo;
            return bandera;
        }
    }
}

let nombreMoneda;
function buscarNombreBandera(listado,codigo){
    for (const moneda of listado) {
        if(codigo == moneda.id){
            nombreMoneda = moneda.denominacion;
            return nombreMoneda;
        }
    }
}

function cambiarTipoDeCambioTR(e){
    denominacionMoneda = e.target.id;
    for (const key in misDatos) {
        if(misDatos[key].denominacion==denominacionMoneda){
            objetoMoneda = misDatos[key]
            $("#segundaParte").empty();
            generarCambioReal(objetoMoneda);
            $(".cambioDeUbicacion").click(cambiarTipoDeCambioTR);
        }
    }
}

function Conversion() {
    let result = iniciarConversion();
    if(result!=undefined){
        $("#pestaniaDos").append(result);
        $(".contenidoModal").append(result);
        $(".conversorContainer").animate({"opacity":0.3});
        $(".conversorModal").show();
        $("#resetFormulario")[0].reset();
    }
}

function iniciarConversion() {
    let cantidad = $("#Name")[0].value;
    let deMoneda = $("#deMoneda")[0].value;
    let aMoneda = $("#aMoneda")[0].value;
    if(cantidad === "0" || cantidad === "") {
        alert("Para convertir debe ingresar una cantidad");
    } else if(deMoneda === aMoneda) {
        alert("Ingrese dos monedas distintas");
    } else if(deMoneda === "Seleccione" || aMoneda === "Seleccione"){
        alert("Falta ingresar alguna moneda");
    } else {
        deMoneda = deMoneda.substr(0,3);
        let banderaDeMoneda = buscarBandera(misDatos,deMoneda);
        aMoneda = aMoneda.substr(0,3);
        let banderaAMoneda = buscarBandera(misDatos,aMoneda);
        let resultado;
        let monedaACambiar;
        let valorMult;
        for (const objetoM of misDatos) {
            if(objetoM.id==deMoneda){
                monedaACambiar = objetoM;
            }
        }
        for (const key in monedaACambiar) {
            if(key==aMoneda){
                valorMult = (monedaACambiar[key]*parseInt(cantidad)).toFixed(2);
            }
        }
        resultado = `<h3 class="conversiones"><img src="${banderaDeMoneda}" class="imgLogoConversion">${cantidad} ${deMoneda} equivalen a <img src="${banderaAMoneda}" class="imgLogoConversion">${valorMult} ${aMoneda}</h3>`;
        return resultado;
    }
}

function revertir(){
    let valorA = $("#deMoneda")[0].value;
    let valorB = $("#aMoneda")[0].value;
    $("#aMoneda")[0].value = valorA;
    $("#deMoneda")[0].value = valorB;
}

/*----------------------- EVENTOS -----------------------*/
$(document).ready(function () {
    $(".cambioDeUbicacion").click(cambiarTipoDeCambioTR);
    $("#convertir").click(Conversion);
    $("#cerrarModal").click(()=>{
        $(".contenidoModal h3").remove();
        $(".conversorContainer").animate({"opacity":1});
        $(".conversorModal").hide("fast");
    });
    $("#revertir").click(revertir);
});