function ejemplo(value) {
    return value;
}
const num = ejemplo(5);
const str = ejemplo('hola');
console.log(typeof num); // -> any
console.log(typeof str); // -> any
function ejemplo2(value) {
    return value;
}
const num2 = ejemplo2(10);
const str2 = ejemplo2('string');
console.log(typeof num2); // -> number
console.log(typeof str2); // -> string
