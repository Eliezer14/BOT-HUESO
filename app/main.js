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

const cantida_base = 10;

const cantida_uso = 2;


bot.onComment((data, responder)=> {

	if (data.body.includes('!HUESO') && data.author != username) {
		
		let autovotos = 0;

		let user = data.author;	
		
		console.log(`Comando detectado del usuario ${user}`)
		
		ssc.findOne("tokens", "balances",  { "symbol": 'HUESO', "account": user }, (err, res) => {
			
		if (res) {
			
			let balance = parseFloat(res.balance);
				
			let cantida = parseInt(parseInt(balance / requeridacantida) * cantida_uso)
				
			if (cantida === 0) {
					
				responder.comment(`testeo del Bot Hueso, ${data.author} no tiene suficiente token HUESO, ${cantida_uso} uso por cada ${requeridacantida} token HUESO en tu cuenta`);
					
				console.log(`El usuario ${user} no tiene hueso suficiente`)
			} else {
				
				hive.api.getAccountHistory(user, -1, 250, ...walletOperationsBitmask, function(err, result) {
	
					const date = new Date().toJSON().split('.');

					const date_locate = new Date(date[0]).toLocaleDateString();
		
					let json = 0;
					
					result.forEach((items) => {
	
						let op = items[1].op[1];
	
						const fecha = new Date(items[1].timestamp).toLocaleDateString();
	
						if (items[1].op[0] === "comment" && op.author === user && (op.body).includes("!HUESO") && date_locate === fecha) {
							
							json++
							
							if (op.parent_author === user) {
								autovotos++
							}
							
						}
						
					});
					
					console.log(`El usuario ${user} ha ejecutado ${json} veces el Comando !HUESO y tiene ${cantida} usos maximos por día y se autovoto ${autovotos} veces `)
					
					let usos =  cantida - json;				
						
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

				const commentario = `![1.png](https://files.peakd.com/file/peakd-hive/nahueldare3627/23wgKh4Rm5uw2BHNEvtU7VbJp45qU2im4Sbw4zZt1AayJpEV9WN1y3XeUaH26WKNGLvyD.png)

<center>Se te han entregado 10 TOKEN HUESO
Conoce el Proyecto Big Dog Bone [lee su White Paper aquí.](https://mundo-virtual.gitbook.io/untitled/)
Si deseas ganar Tokens del Proyecto Big Dog Bone, usa en tus post las etiquetas #hueso y #mundovirtual
Apoya nuestro trail de votación aquí [mv-curacion](https://hive.vote/dash.php?trail=mv-curacion&i=1)
Por cada 10k de hueso en tu cartera puedes usar 2 veces al día el comando !HUESO en los comentarios de los post.</center>


---


<center>You have been given 10 TOKEN HUESO.
Learn about the Big Dog Bone  Project [read their White Paper here.](https://mundo-virtual.gitbook.io/untitled/)
If you want to win Big Dog Bone Project Tokens, use the hashtags #hueso and #mundovirtual in your posts.
Support our voting trail here [mv-curation](https://hive.vote/dash.php?trail=mv-curacion&i=1)
For every 10k of hueso in your wallet you can use 2 times a day the command !HUESO in the comments of the posts.</center>`

				if (data.parent_author != username) {
				
					if (user === data.parent_author) {
						
						/* repuesta de autovoto */
						
						if (autovotos <= 1) {	
							
						responder.comment(commentario)
						
						hive.broadcast.customJson(activeKey, [username], [], "ssc-mainnet-hive", JSON.stringify(pago))
				
				        console.log(`El usuario ${user} tiene ${usos} usos, y se transfirieron ${cantida_base} HUESO a ${data.parent_author}`)
							
							
						} else {
							
							responder.comment(`testeo del Bot Hueso, no te puedes autovotar mas de una vez al día`);
							
							console.log(`El usuario ${user} tiene ${usos} usos, y alcanzo el limite de autovoto`)
							
						}
							
					} else {
						
						/* respuesta normal */
						
						responder.comment(commentario)
						
						hive.broadcast.customJson(activeKey, [username], [], "ssc-mainnet-hive", JSON.stringify(pago))
				
				        console.log(`El usuario ${user} tiene ${usos} usos, y se transfirieron ${cantida_base} HUESO a ${data.parent_author}`)
						
					}

				} else {		
					
					/* respuesta si se vota al bot */
					
					responder.comment(commentario)
					
					pago.contractPayload.to = 'eliezer65'
					
					hive.broadcast.customJson(activeKey, [username], [], "ssc-mainnet-hive", JSON.stringify(pago))
					
					console.log(`El usuario ${user} tiene ${usos} usos, y se transfirieron ${cantida_base} HUESO a ${pago.contractPayload.to}`)
					
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