import { CarbonLDP } from "carbonldp";

import "./styles.css";

console.log( CarbonLDP.version );

const carbonldp = new CarbonLDP( "http://localhost:8083" );

carbonldp.documents;
    // .$get // Obtener un documento
    // .$create // Crear un documento
    // .$createAndRetrieve 
    // .$save  // Guardar los cambios de un documento
    // .$refresh // Actualiza los cambios de un document
    // .$saveAndRefresh
    // .$delete // Borrar un documento

// carbonldp.documents
//     .$get( "/" )
//     .then( function ( document ) {
//         console.log( document.$id );
//         console.log( document.created );
//     } );

// // Object
// const object = {
//     name: "Nombre",
//     getName() {
//         return this.name;
//     }
// };

// object.name; // Nombre

// carbonldp.documents
//     .$createAndRetrieve( "/", {
//         name: "Rodolfo",
//         lastName: "Aguirre",
//         edad: 26,
//         date: new Date(),
//     } )
//     .then( function( document ) {
//         console.log( document );
//         console.log( document.name )
//     } )
//     ;

// carbonldp.documents
//     .$get(  "0ecf6604-28f6-4960-9abb-a05a99b12b7b/"  )
//     .then( function ( document )  {
        
//         // return carbonldp.documents
//             // .$delete( document );
//         return document.$delete();
//     } )
//     .then( function(  document ) {
//         console.log( "Borrado! " );
//     }  )


// carbonldp.documents
//     .$create( "posts/", [
//         {
//             title: "Post - 1",
//             content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum alias est explicabo, qui repellendus praesentium perferendis rerum fugit eum voluptas doloremque quis harum accusantium deleniti temporibus suscipit provident possimus. Reiciendis!",
//             publishDate: new Date(),
//         },
//         {
//             title: "Post - 2",
//             content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad maxime reprehenderit non, aliquid omnis iusto quia suscipit nulla alias dolorum nihil voluptatum repellendus nisi corrupti. Facilis nihil iste reiciendis architecto!",
//             publishDate: new Date(),
//         }
//     ] )
//     .then( function( documents ) {
//         console.log( documents );
//     } );

carbonldp.documents
    // .$listChildren(); // Retorna los hijos vacíos
    .$getChildren( "posts/" ) // Los hijos resueltos
    .then( function( posts ) {
        console.log( posts );
        for( const post of posts ) {
            renderPost( post );
        }
    } );


function renderPost( post ) {
    const container = document.querySelector( "#posts" );

    container.innerHTML += `
    <div class="post">
        <h2 class="title">${ post.title }</h2>
        <div class="subTitle">
            <label class="publishDate">${ post.publishDate }</label>
        </div>

        <p class="content">${ post.content }</p>
    </div>
    `;
}