import { Class as Carbon } from "carbonldp";

console.log( Carbon.version );

let body = document.querySelector( "body" );
body.innerHTML = "<h1>It Works!</h1>";
body.innerHTML += `<p>Your Carbon version is: ${Carbon.version}</p>`;