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
	
			if (items.delegator != 'blocktrades.com') {
			usuarios.push({'cuenta': items.delegator, 'cantidad': hueso_pago.toString(), 'hp': hivePower.toString()})
			}
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
			
			hive.broadcast.customJson(activeKey, [username], [], "ssc-mainnet-hive", JSON.stringify(pago))
			
			i++
			
			setTimeout(pagos, 3000);
			
		} else {
			
			const hora = obtener_tiempo();
	
			tiempo_restante(hora);
			
			setTimeout(iniciar_pagos, hora);
			
		}
	}
	
		/* falta filtado */
	
	/* hive.api.getAccountHistory('bot-bdbhueso', -1, 250, function(err, result) {
	
		let date = new Date();

		date.setDate(date.getDate() - 1);

		let dates = date.toJSON().split('.');

		const date_locate = new Date(dates[0]).toLocaleDateString();
		
		let pagos = 0;
					
		result.forEach((items) => {
	
			let op = items[1].op[1];
	
			const fecha = new Date(items[1].timestamp).toLocaleDateString();
	
			if (items[1].op[0] === "custom_json" && date_locate === fecha) {
							
				pagos++		
			}
						
			});
			
			const comision = {
				"contractName": "tokens",
				"contractAction": "transfer",
				"contractPayload": {
					"symbol": simbolo,
					"to": 'eliezer65',
					"quantity": parseInt(pagos * 2).toString(),
					"memo": `Se han hecho ${pagos} transferencias el dia de anterior`
					}
				}

			console.log(comision)
	}); */
	
	
}


if (username != "Not found" && activeKey != "Not found") {
	const hora = obtener_tiempo();
	
	tiempo_restante(hora);
	
	setTimeout(iniciar_pagos, hora);
	
} else {
	console.log('Error en las variables del entorno')
}