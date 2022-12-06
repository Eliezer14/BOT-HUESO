const hive = require('@hiveio/hive-js');

const axios = require('axios').default;

require('dotenv').config()

const constantes = require('./constantes.js');

/* datos de la cuenta del bot */

const username = process.env.account || "Not found";
const activeKey = process.env.activeKey || "Not found";

const simbolo = constantes.simbolo;

/* configuracion del pago */

		/* HUESO */
const cantidad_base = 1;

const cantidad_por_bono = 1;

		/* HP */
const hp_requerido = 10;

const bono_por_hp = 100;

/* funciones de tiempo de ejecucion */

function obtener_tiempo() {
let currentdate = new Date();
let fecha = currentdate.getTime()
currentdate.setDate(currentdate.getDate() + 1);
currentdate.setUTCHours(0,5,0,0)
return currentdate - fecha
}

function tiempo_restante(mini) {
let tiempo = new Date(mini)
console.log(`Falta ${tiempo.getUTCHours()} horas con ${tiempo.getUTCMinutes()} minutos y ${tiempo.getUTCSeconds()} segundos para el siguiente pago`)
}

/* funcion que inicia los pagos */

function iniciar_pagos() {
	
	let i = 0;
	
	let usuarios = [];
	
	hive.api.getDynamicGlobalProperties(function(err, result) {
		
	if (result) {

	axios.get('https://api.hive-keychain.com/hive/delegators/mv-curacion')
	.then(function (response) {
    
		const data = response.data
	
		data.forEach((items) => {
	
		var hivePower = parseInt(hive.formatter.vestToHive(items.vesting_shares, result.total_vesting_shares, result.total_vesting_fund_hive));
	
		if (hivePower > 0) {
			
			let hueso_pago = 0
			
			let hueso = parseInt(hivePower / hp_requerido);
	
			if (hivePower >= 100) {
				
				hueso_pago = parseInt(hueso * 2)
				
			} else {
				
				hueso_pago = parseInt(hueso * 1)
				
			}
	
			usuarios.push({'cuenta': items.delegator, 'cantidad': hueso_pago.toString(), 'hp': hivePower.toString()})
	
		}
	
		});
		
		console.log('Iniciando el pago');
		
		pagos();

	})
	.catch(function (error) {
    // handle error
		console.log(error);
	})
	} else {
		console.log('Ha ocurrido un error')
	}
	});

	function pagos() {
		if (i < usuarios.length) {
			
			const pago = {
				"contractName": "tokens",
				"contractAction": "transfer",
				"contractPayload": {
					"symbol": simbolo,
					"to": usuarios[i].cuenta,
					"quantity": usuarios[i].cantidad,
					"memo": `Pago por tener ${usuarios[i].hp} HP delegado a mv-curacion`
					}
				}
			
			console.log(pago)
			
			i++
			
			setTimeout(pagos, 3000);
			
		} else {
			
			const hora = obtener_tiempo();
	
			tiempo_restante(hora);
			
			setTimeout(iniciar_pagos, hora);
			
		}
	}
}


if (username != "Not found" && activeKey != "Not found") {
	const hora = obtener_tiempo();
	
	tiempo_restante(hora);
	
	setTimeout(iniciar_pagos, hora);
	
} else {
	console.log('Error en las variables del entorno')
}