
const Compiler = require('./Compiler.js');

function alert(e){
	console.log(e);
}

var compiler = new Compiler("C:/Users/ruilit/Desktop/catgame_CP_learnedprogrammingbeforeguy.aap",alert);

console.log(compiler.build(alert));
