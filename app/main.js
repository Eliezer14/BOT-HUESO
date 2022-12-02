const { HiveBot } = require('hive-bot');

const hive = require('@hiveio/hive-js');

require('dotenv').config()

const constantes = require('./constantes.js');

const SSC = require('sscjs');

const ssc = new SSC('https://api.hive-engine.com/rpc');

const { ChainTypes, makeBitMaskFilter } = require('@hiveio/hive-js/lib/auth/serializer')
const op = ChainTypes.operations
const walletOperationsBitmask = makeBitMaskFilter([
  op.comment
]);

/* datos de la cuenta del bot */

const username = process.env.account || "Not found";
const activeKey = process.env.activeKey || "Not found";

const bot = new HiveBot({username, activeKey});

/* requerimiento de pago */

const requeridacantida = constantes.requeridacantida;

const cantida_hp = constantes.cantida_hp;

const cantida_base = constantes.cantida_base;

const cantida_uso = constantes.cantida_uso;

/* configuracion del bot */

const comando = constantes.comando;

const simbolo = constantes.simbolo;

/* mensajes del bot */

const commentario = constantes.commentario;

const commentario_sin_hueso_suficiente = constantes.commentario_sin_hueso_suficiente;

const commentario_sin_usos = constantes.commentario_sin_usos;

const commentario_autovoto = constantes.commentario_autovoto;



bot.onComment((data, responder)=> {

	if (data.body.includes(comando) && data.author != username) {
		
		let autovotos = 0;

		let user = data.author;	
		
		console.log(`Comando detectado del usuario ${user}`)
		
		ssc.findOne("tokens", "balances",  { "symbol": simbolo, "account": user }, (err, res) => {
			
		if (res) {
			
			let balance = parseFloat(res.balance);
				
			let cantida = parseInt(parseInt(balance / requeridacantida) * cantida_uso)
				
			if (cantida === 0) {
					
				responder.comment(commentario_sin_hueso_suficiente);
					
				console.log(`El usuario ${user} no tiene ${simbolo} suficiente`)
			} else {
				
				hive.api.getAccountHistory(user, -1, 250, ...walletOperationsBitmask, function(err, result) {
	
					const date = new Date().toJSON().split('.');

					const date_locate = new Date(date[0]).toLocaleDateString();
		
					let json = 0;
					
					result.forEach((items) => {
	
						let op = items[1].op[1];
	
						const fecha = new Date(items[1].timestamp).toLocaleDateString();
	
						if (items[1].op[0] === "comment" && op.author === user && (op.body).includes(comando) && date_locate === fecha) {
							
							json++
							
							if (op.parent_author === user) {
								autovotos++
							}
							
						}
						
					});
					
					console.log(`El usuario ${user} ha ejecutado ${json} veces el Comando ${comando} y tiene ${cantida} usos maximos por día y se autovoto ${autovotos} veces `)
					
					let usos =  cantida - json;				
						
					if (usos >= 0) {
						
						realizar_pago(usos)
						
					} else {
						
						responder.comment(commentario_sin_usos);
					
						console.log(`El usuario ${user} no tiene usos suficiente`)
						
					}

				})
				
				}
			
			function realizar_pago(usos) {
				
				let pago = {
				"contractName": "tokens",
				"contractAction": "transfer",
				"contractPayload": {
					"symbol": simbolo,
					"to": data.parent_author.toString(),
					"quantity": cantida_base.toString(),
					"memo": ""
					}
				}

				

				if (data.parent_author != username) {
				
					if (user === data.parent_author) {
						
						/* repuesta de autovoto */
						
						if (autovotos <= 1) {	
							
						responder.comment(commentario)
						
						hive.broadcast.customJson(activeKey, [username], [], "ssc-mainnet-hive", JSON.stringify(pago))
				
				        console.log(`El usuario ${user} tiene ${usos} usos, y se transfirieron ${cantida_base} ${simbolo} a ${data.parent_author}`)
							
							
						} else {
							
							responder.comment(commentario_autovoto);
							
							console.log(`El usuario ${user} tiene ${usos} usos, y alcanzo el limite de autovoto`)
							
						}
							
					} else {
						
						/* respuesta normal */
						
						responder.comment(commentario)
						
						hive.broadcast.customJson(activeKey, [username], [], "ssc-mainnet-hive", JSON.stringify(pago))
				
				        console.log(`El usuario ${user} tiene ${usos} usos, y se transfirieron ${cantida_base} ${simbolo} a ${data.parent_author}`)
						
					}

				} else {		
					
					/* respuesta si se vota al bot */
					
					responder.comment(commentario)
					
					pago.contractPayload.to = 'eliezer65'
					
					hive.broadcast.customJson(activeKey, [username], [], "ssc-mainnet-hive", JSON.stringify(pago))
					
					console.log(`El usuario ${user} tiene ${usos} usos, y se transfirieron ${cantida_base} ${simbolo} a ${pago.contractPayload.to}`)
					
				}	
			}
		} else {
			
			console.log(err)
			
		}
	});		
		
	}
	
	/* if (data.author === username) {

		
		responder.upvote();
		
	}
 */
});

if (username != "Not found" && activeKey != "Not found") {
	console.log('Bot Iniciado');
	bot.start();
} else {
	console.log('Error en las variables del entorno')
}