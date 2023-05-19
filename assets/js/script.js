// ----------------------------------------ID GEN----------------------------------------------------- 
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


// -----------------------------------VARIABLES GLOBALES---------------------------------
let presupuesto;
let arrayObjetos = []


// ----------------------------------------BOTONES-----------------------------------:
// Boton presupuesto
$('#botonPresupuesto').click(function (evento) {
    evento.preventDefault()
    presupuesto = capturarPresupuesto()
})
// Boton gastos
$('#botonGasto').click(function (evento) {
    evento.preventDefault()
    let objetoAInsertar = capturarGasto()
    pintarTabla(objetoAInsertar)
    sumarGastos(presupuesto)
})
// Boton eliminar 
$('#tbody').on("click","#basurero", function(){
    $(this).parent().remove()
    eliminar($(this).prev().text())
    console.log($(this))
})


// ---------------------------------------FUNCIONES-----------------------------------------
// funcion constructora de objeto


class Gastos {
    constructor(nombre, cantidad, id) {
        this.nombre = nombre
        this.cantidad = cantidad
        this.id = id
    }
}

// funcion capturarpresupuesto
const capturarPresupuesto = () => {
    $('#valorPresupuesto').text($('#inputPresupuesto').val())
    $('#valorSaldo').text($('#inputPresupuesto').val())
    let presupuesto = $('#inputPresupuesto').val()
    return presupuesto
}

// funcion capturar nombre gasto y valor gasto
const capturarGasto = () => {
    let ids = uuidv4().slice(0,6)
    let nombreGasto = $('#inputNombreGasto').val()
    let cantidadGasto = $('#inputCantidadGasto').val()
    let objeto = new Gastos(nombreGasto, cantidadGasto, ids)

    arrayObjetos.push(objeto);
    return (objeto)
} 

// funcion eliminar
const eliminar = (producto) =>{
    
    arrayObjetos = arrayObjetos.filter(item => {
        if (item.id != producto){
            return item
        }
    })
    let total;
    let totalGastos = [];
    
    arrayObjetos.forEach(item => {
        totalGastos.push(item.cantidad)
        total = totalGastos.reduce((a, b) => {
            return parseInt(a)+parseInt(b);
        })
    })
    $('#valorGastos').text(total)
    if(total >= 0){
        $('#valorSaldo').text(parseInt(presupuesto) - total)
    }else{
        $("#valorGastos").text(0)
        $("#valorSaldo").text($("#valorPresupuesto").text())
    }
}

// Funcion completar tabla
const pintarTabla = (gasto) => {
        $('#tbody').append(
            `
            <tr>
                <td>${gasto.nombre}</td>
                <td>${gasto.cantidad}</td>
                <td class="d-none">${gasto.id}</td>
                <td id="basurero"><img src="./assets/img/basurero.png" width="15px"></td>

            </tr>
            `
        )
}

// funcion sumar gastos 
const sumarGastos = (presupuesto) => {
    let totalGastos = [];
    let total;
    arrayObjetos.forEach(item => {
        totalGastos.push(item.cantidad)
        total = totalGastos.reduce((a, b) => {
            return parseInt(a)+parseInt(b);
        })
    })
    $('#valorGastos').text(total)
    $('#valorSaldo').text(parseInt(presupuesto) - total)
    }

    // funcion eliminar valores agregados en el array 
