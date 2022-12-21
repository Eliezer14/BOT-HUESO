
/* requerimiento de pago */

const requeridacantida = 10000;

const cantida_hp = 10;

const cantida_base = 10;

const cantida_uso = 2;

/* configuracion del bot */

const comando = '!HUESO';

const simbolo = 'HUESO';


/* mensajes del bot */

const lista_comandos = ['!LOL', '!LUV', '!PGM', '!PIZZA'];

let rotacion_comandos = -1;


function commentario() {

rotacion_comandos++

if (rotacion_comandos >= lista_comandos.length) {
	rotacion_comandos = 0
}

return `<center>[![](https://images.ecency.com/DQmY8vU597ERJKxMvjNmYpTfmxViGC1faE1ZB8XkPsVFd1d/2.png)](https://discord.gg/uEt4nYbsmw)</center>

<center>Saludos desde la Comunidad Mundo Virtual. Te enviamos token Hueso para apoyar tu trabajo.
Haz click sobre el banner, para ser dirigido al Discord de Mundo Virtual y conocer más sobre nuestro proyecto de curación.</center>

---

<center>Greetings from the Virtual World Community. We send you Hueso token to support your work.
Click on this banner, to be directed to the Virtual World Discord and learn more about the curation project.</center>

<center>${lista_comandos[rotacion_comandos]}</center>`;
}

const commentario_sin_hueso_suficiente = `<center>LO SENTIMOS, en este momento no tienes Hueso suficiente para usar el comando 😦
Conoce el Proyecto Big Dog Bone [lee su White Paper aquí.](https://mundo-virtual.gitbook.io/untitled/)
Si deseas ganar Tokens del Proyecto Big Dog Bone, usa en tus post las etiquetas #hueso y #mundovirtual
Apoya nuestro trail de votación aquí [mv-curacion](https://hive.vote/dash.php?trail=mv-curacion&i=1)
Por cada 10k de hueso en tu cartera puedes usar 2 veces al día el comando !HUESO en los comentarios de los post.</center>


---


<center>SORRY, at this time you don't have enough BONE to use the command 😦
Learn about the Big Dog Bone  Project [read their White Paper here.](https://mundo-virtual.gitbook.io/untitled/)
If you want to win Big Dog Bone Project Tokens, use the hashtags #hueso and #mundovirtual in your posts.
Support our voting trail here [mv-curation](https://hive.vote/dash.php?trail=mv-curacion&i=1)
For every 10k of hueso in your wallet you can use 2 times a day the command !HUESO in the comments of the posts.</center>`

const commentario_sin_usos = `<center>LO SENTIMOS, ya has agotado todos los usos que tenias para hoy, intentalo nuevamente mañana.
Conoce el Proyecto Big Dog Bone [lee su White Paper aquí.](https://mundo-virtual.gitbook.io/untitled/)
Si deseas ganar Tokens del Proyecto Big Dog Bone, usa en tus post las etiquetas #hueso y #mundovirtual
Apoya nuestro trail de votación aquí [mv-curacion](https://hive.vote/dash.php?trail=mv-curacion&i=1)
Por cada 10k de hueso en tu cartera puedes usar 2 veces al día el comando !HUESO en los comentarios de los post.</center>


---


<center>SORRY, you have exhausted all the uses you had for today, try again tomorrow.
Learn about the Big Dog Bone  Project [read their White Paper here.](https://mundo-virtual.gitbook.io/untitled/)
If you want to win Big Dog Bone Project Tokens, use the hashtags #hueso and #mundovirtual in your posts.
Support our voting trail here [mv-curation](https://hive.vote/dash.php?trail=mv-curacion&i=1)
For every 10k of hueso in your wallet you can use 2 times a day the command !HUESO in the comments of the posts.</center>`

const commentario_autovoto = `<center>¡CUIDADO! SOLO PUEDES USAR EL COMANDO UNA VEZ AL DÍA EN TU PROPIA CUENTA
Conoce el Proyecto Big Dog Bone [lee su White Paper aquí.](https://mundo-virtual.gitbook.io/untitled/)
Si deseas ganar Tokens del Proyecto Big Dog Bone, usa en tus post las etiquetas #hueso y #mundovirtual
Apoya nuestro trail de votación aquí [mv-curacion](https://hive.vote/dash.php?trail=mv-curacion&i=1)
Por cada 10k de hueso en tu cartera puedes usar 2 veces al día el comando !HUESO en los comentarios de los post.</center>


---


<center>CAREFUL! YOU CAN ONLY USE THE COMMAND ONCE A DAY ON YOUR OWN ACCOUNT
Learn about the Big Dog Bone  Project [read their White Paper here.](https://mundo-virtual.gitbook.io/untitled/)
If you want to win Big Dog Bone Project Tokens, use the hashtags #hueso and #mundovirtual in your posts.
Support our voting trail here [mv-curation](https://hive.vote/dash.php?trail=mv-curacion&i=1)
For every 10k of hueso in your wallet you can use 2 times a day the command !HUESO in the comments of the posts.</center>`


module.exports = {
	requeridacantida: requeridacantida,
	cantida_hp: cantida_hp,
	cantida_base: cantida_base,
	cantida_uso: cantida_uso,
	comando: comando,
	simbolo: simbolo,
	commentario: commentario,
	commentario_sin_hueso_suficiente: commentario_sin_hueso_suficiente,
	commentario_sin_usos: commentario_sin_usos,
	commentario_autovoto: commentario_autovoto
}