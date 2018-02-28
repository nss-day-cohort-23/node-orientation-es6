// ********* How hoisting is handled. *********
// Outputs 'undefined' with var because var declarations get hoisted, but their values do not
// It logs an error that name is not defined with a let/const declararion, because lets are not hoisted
console.log(name);

var name = "Fred";
let name = "Fred";
const name = "Fred";
///

// ********* How assignments and declarations are handled *********
const name = { first: "Fred" };
name = "Fred"; //Throws error because you can't reassign a value
const name = "Doug"; // also errors. Can't redefine a const
// BUT
name.first = "Larry"; //works, because we're changing a value on the object that is the value of name, not the value of name itself

let name = "Mona";
name = "Barb"; // no error, beacuse let allows reassignment
let name = "Skippy"; // errors, kust like const

var name = "Whatever, dude";
name = "Something cool"; // no problem;
var name = 23456; //again, no problem
///

// ********* Differences in how variables handle block scope *********
const position = "outside";
{
  const position = "inside"; // no error
  console.log("position", position); // logs "inside". Const and let treat each "position" as separate variables because they are in two different scopes
}
console.log("position outside", position); //logs "outside"
// Using var in the above example would result in position being redefined as a variable holding the value of "inside"

// ********* object literal shorthand
const wow = "Cool!";
const ES6 = "ES6";
const printMyNum = () => "my num is 6";

// ES5 way
let myOldObj = {
  wow: wow,
  ES6: ES6,
  printMyNum: printMyNum
};
console.log("old stuff", myOldObj.wow, myOldObj.printMyNum());

// ES6 way
let myNewObj = { wow, es6, printMyNum };
console.log("myNew Obj wow", myNewObj.wow);
///

// ********* destructuring assignment *********
const dog = {
  color: "multi",
  name: { firstName: "Murph" },
  breed: "Aussie mix",
  speak: () => "Woof"
};

cat = {
  name: { firstName: "Dummy" }
};

// old way (still works fine)
var myDogColor = dog.color;
var myDogBreed = dog.breed;
console.log("dog", myDogBreed, myDogColor);

// new Way
const { name: { firstName }, speak, color } = dog;
// same as:
const firstName = dog.name.firstName;
console.log("first name", name);
const { name: { firstName } } = cat;
console.log(firstName);

// old way
function dogStuff(dogObj) {
  console.log(
    `My dog's name is ${dogObject.name.firstName}, and he is an ${
      dogObject.breed
    }`
  );
}
dogStuff(dog);

// new way
function dogStuff({ name: { firstName }, breed }) {
  console.log(`My dog's name is ${firstName}, and he is an ${breed}`);
}
dogStuff(dog);

const myArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const cloneArr = myArr.slice(); //makes a copy of myArr
cloneArr[3] = "Hello";
console.log("clone", cloneArr); //no effect on the original array
console.log("orig", myArr);

// destructuring an array's values
const [a, b] = myArr;
console.log(a, b); // logs 1 2

// wat?
const [c, ...d] = myArr;
// above is a lot like this...
const c = myArr[0];
const d = myArr.slice(1);
console.log(c, d);

// comma is an operator. Here we create no variables for the first four declarations
const [, , , , fred] = myArr;
console.log(fred); // logs 5

// spread operator
const countries = ["Moldova", "USA"];
const otherCountries = ["France", "Japan"];

// one way to combine arrays
// const meldedCountries = countries.concat(otherCountries);
// The spread operator way
const meldedCountries = [...countries, ...otherCountries];
console.log("happy world", meldedCountries);
///

// ********* A look at linking objects and the prototype chain *********
const dog = {
  color: "multi",
  name: { firstName: "Murph" },
  breed: "Aussie mix",
  speak: () => "Woof"
};

const cat = {
  name: { firstName: "Dummy" },
  lives: 9
};

// The only way to make a copy of an object without retaining a prototypal link at all depths
let soloDog = JSON.parse(JSON.stringify(dog));
soloDog.name = "Barky";
console.log("OG dog", dog, "\n", "newDog", soloDog);

// Makes a object out of the two, with shallow unique properties. But nested props still maintain prototypal relationship
const unholyBlend = { ...cat, ...dog };
unholyBlend.color = "red";
unholyBlend.name.firstName = "Demon Pet";
// same as:
const unholy = Object.assign({}, cat, dog);

console.log("poor pup", dog);
console.log("kitty cries", cat);

// This makes a new Object and then adds dog's properties to it
const newDog = Object.assign({}, dog);
console.log("ubholy blend", unholyBlend);
console.log("new dog", newDog);
newDog.color = "purple";
console.log("dog", dog);

// Define an object that can assign properties directly to any new object that links to it
const animal = {
  init: function(name) {
    this.name = name;
  },
  legs: 4,
  color: "red"
};

const newAnimal = Object.create(animal);
console.log(newAnimal.legs, "Props?");
newAnimal.init("Fred");
console.log(newAnimal, "I have a name!");
///

// *********  Looping over objects and array props. Some stuff to consider
const junkBox = [{ value: 1 }, { name: "Fred" }, { bool: true }];

const funkyObj = junkBox.entries(); // makes an "interable array"
console.log(funkyObj); //  Logs out as empty-looking object brackets

for (let elem of funkyObj) {
  console.log("for-of", elem, elem.length);
}

for (let elem in funkyObj) {
  console.log("for-in", elem, elem.length);
}

for (let elem of junkBox) {
  console.log("for-of junkbox", elem);
}

for (let elem in junkBox) {
  console.log("for-in junkbox", elem);
}
////

// ************************************************
// Map and Set kinda like Object and Array
// Set
const awesomeSet = new Set();

awesomeSet.add(10);
awesomeSet.add(6);
awesomeSet.add("Back or front?");
// console.log('awesomeSet', awesomeSet.has(10));
// console.log('awesomeSet size', awesomeSet.size );
awesomeSet.delete(6);

let JasonArr = [6, 10];
awesomeSet.add([6, 10]);
// console.log('Awesome set', awesomeSet);

// console.log('awe', awesomeSet.has(JasonArr));
JasonArr.push(20);
// console.log('Awesome set', awesomeSet);

let hungrySet = new Set();
hungrySet.add("Lunch");

awesomeSet.add(hungrySet);
console.log("awesome nest", awesomeSet);

// Map
let user = {
  name: "Linda",
  age: 34,
  height: "short",
  happy: true,
  saymyName: () => "My name is user.name"
};

function sayMyLastName() {
  return "Shep";
}

let myMap = new Map();
myMap.set("name", "Larry");
console.log("myMap", myMap.values());
console.log("myMap", myMap.keys());
