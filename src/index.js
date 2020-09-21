console.log("hello word");

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
