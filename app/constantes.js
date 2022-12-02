
/* requerimiento de pago */

const requeridacantida = 10000;

const cantida_hp = 10;

const cantida_base = 10;

const cantida_uso = 2;

/* configuracion del bot */

const comando = '!HUESO';

const simbolo = 'HUESO';


/* mensajes del bot */

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
For every 10k of hueso in your wallet you can use 2 times a day the command !HUESO in the comments of the posts.</center>`;

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