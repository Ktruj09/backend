'use strict'

var params = process.argv.slice(2);

var numer1 = parseFloat(params[0]);
var numer2 = parseFloat(params[1]);

var plantilla = `

        La suma es: ${numer1+numer2}
        La resta es: ${numer1-numer2}
        La multiplicación es: ${numer1*numer2}
        La división es: ${numer1/numer2}
`;

console.log("Los resultados son: ");
console.log(plantilla);
console.log("Practicando con NodeJs");