const { HiveBot } = require('hive-bot');

const hive = require('@hiveio/hive-js');

require('dotenv').config()

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

const requeridacantida = 10000;

const cantida_hp = 10;

const cantida_base = 1;



bot.onComment((data, responder)=> {

	if (data.body.includes('!HUESO') && data.author != username) {

		let user = data.author;	
		
		console.log(`Comando detectado del usuario ${user}`)
		
		ssc.findOne("tokens", "balances",  { "symbol": 'HUESO', "account": user }, (err, res) => {
			
		if (res) {
			
			let balance = parseFloat(res.balance);
				
			let cantida = parseInt(balance / requeridacantida)
				
			if (cantida === 0) {
					
				responder.comment(`testeo del Bot Hueso, ${data.author} no tiene suficiente token HUESO, un uso por cada ${requeridacantida} token HUESO en tu cuenta`);
					
				console.log(`El usuario ${user} no tiene hueso suficiente`)
			} else {
				
				hive.api.getAccountHistory(user, -1, 250, ...walletOperationsBitmask, function(err, result) {
	
					const date = new Date().toJSON().split('.');

					const date_locate = new Date(date[0]).toLocaleDateString();
		
					let json = []

					result.forEach((items) => {
	
						let op = items[1].op[1];
	
						const fecha = new Date(items[1].timestamp).toLocaleDateString();
	
						if (items[1].op[0] === "comment" && op.author === user && (op.body).includes("!HUESO") && date_locate === fecha) {
							json.push({'author': op.author, 'body': op.body, 'json_metadata': op.json_metadata, 'parent_author': op.parent_author, 'parent_permlink': op.parent_permlink, 'permlink': op.permlink, 'title': op.title,'timestamp': items[1].timestamp})
						}
						
					});
					
					console.log(`El usuario ${user} ha ejecutado ${json.length} veces el Comando !HUESO y tiene ${cantida} usos maximos por día`)
					
					let usos =  cantida - json.length;				
						
					if (usos >= 0) {
						realizar_pago(usos)
					} else {
						
						responder.comment(`testeo del Bot Hueso, ${data.author} no tiene suficiente usos del comando !HUESO`);
					
						console.log(`El usuario ${user} no tiene usos suficiente`)
						
					}

				})
				
				}
			
			function realizar_pago(usos) {
				
				
				
				let pago = {
				"contractName": "tokens",
				"contractAction": "transfer",
				"contractPayload": {
					"symbol": "HUESO",
					"to": data.parent_author.toString(),
					"quantity": cantida_base.toString(),
					"memo": ""
					}
				}
				
				responder.comment(`testeo del Bot Hueso, ${data.author} te a enviado ${cantida_base} token HUESO, te quedan ${usos} usos del comando !HUESO, pago ya hecho`);
				
				if (data.parent_author != username) {
				
				hive.broadcast.customJson(activeKey, [username], [], "ssc-mainnet-hive", JSON.stringify(pago))
				
				console.log(`El usuario ${user} tiene ${usos} usos, y se transfirieron ${cantida_base} HUESO a ${data.parent_author}`)
				
				} else {
					
					pago.contractPayload.to = 'eliezer65'
					
					hive.broadcast.customJson(activeKey, [username], [], "ssc-mainnet-hive", JSON.stringify(pago))
					
					console.log(`El usuario ${user} tiene ${usos} usos, y se transfirieron ${cantida_base} HUESO a ${pago.contractPayload.to}`)
					
				}
				
				
				
			}
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