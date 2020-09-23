let str = require("./a.js");
require("./assets/base.less");
console.log(str);

class Person {
	constructor(name) {
		this.name = name;
	}
	getName() {
		console.log(this.name);
	}
}

let p = new Person("tom");
p.getName();

const func = (...rest) => {
	console.log(rest);
};
func(1, 23, 4);
