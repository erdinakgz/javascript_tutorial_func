// THIS
var person = "Erdinc";
window.person
// "Erdinc"
this.person
// "Erdinc"


// THIS 2
function example(){
	var value = "data"
}
example();
// I can't reach the value because it is in the function scope's.
value
// Uncaught ReferenceError: value is not defined
//   at <anonymous>:1:1


// THIS 3
function example2(){
	this.value2 = "data2"
}
example2();
// I can't reach the value because it is in the function field.
// So here's how I reached "value2", we could use the keyword "this" because it was global (window) defined. But we should not actually need.
value2
// "data2"
window.value2
// "data2"
this.value2
// "data2"


// THIS 4
"use strict"
function example3(){
    this.value3 = "data3";
}
// I use "use strict", even though i have linked value3 wtih global this, X
// I will not be able to access it because we ran it in "strict" mode.


// THIS 5
var person2 = {
    name : "John",
    meeting : function(){
        return "Hi I'm " + this.name
    }
}

var person2_two = {
    name : "Jones",
    meeting : function(){
        return "Hi I'm " + this.name;
    }
}

// Proper use
// It may not be very important in a small project, 
// but using references becomes important in hundreds of lines of classes.
var person2_three = {
    name : "Molly",
    meeting : function(){
        return "Hi I'm " + this.name;
    }
}

var person2_four = {
    name : "Lilly"
}

person2_three.meeting();
// "Hi I'm Molly"

person2_three.meeting.call(person2_four);
// "Hi I'm Lilly"


// CALL(), APPLY(), BIND()

//  When using the Call () function, the arguments are sent to the function individually.
// Example: test (obj, arg1, arg2, arg3)
var ex1 = {num1:5, num2:10} 
var ex2 = {num1:15, num2:20}

function addNumbers(num){
	console.log(this.num1 + this.num2 + num);
}

addNumbers.call(ex1,50);
// 65
addNumbers.call(ex2,50);
// 85

//  When using the Apply () function, the arguments are sent to the function as an argument list.
// Example: test (obj, [arg1, arg2, arg3])
var ex3 = {num1:5, num2:10}
var ex4 = {num1:15, num2:20}
function addNumbers2(num) {
    console.log(this.num1 + this.num2 + num);
}

addNumbers2.apply(ex3,[50]);
// 65  
addNumbers2.apply(ex4,[50]);
// 85


// What if we apply it to a real project?
function User(name){
	this.name = name;
}

function Profile(name,age){
	User.call(this,name);
	this.age = age;
}

var ex5 = new Profile("John",15);
console.log(ex5.name);
// John
console.log(ex5.age);
// 15


//  Bind() function may logically resemble call and apply, but is different in use.
//  Bind() function creates a new copy according to the given object, and can use the object sent with the argument list.
var ex6 = {num1:5,num2:10};

function getTotal(num3,num4){
    return this.num1 + this.num2 + num3 + num4;
}

var copyFunc = getTotal.bind(ex6);
console.log(copyFunc(20,25));
// 60