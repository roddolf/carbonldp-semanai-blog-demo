import { CarbonLDP } from "carbonldp";

console.log( CarbonLDP.version );

let body = document.querySelector( "body" );
body.innerHTML = "<h1>It Works!</h1>";
body.innerHTML += `<p>Your Carbon SDK version is: ${CarbonLDP.version}</p>`;