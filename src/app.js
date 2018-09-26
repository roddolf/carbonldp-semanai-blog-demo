import { CarbonLDP } from "carbonldp";
import { AccessPoint } from "carbonldp/AccessPoint";
import { Event } from "carbonldp/Messaging/Event";


import "./styles.css";

console.log( CarbonLDP.version );

const carbonldp = new CarbonLDP( "http://localhost:8083" );
carbonldp.extendObjectSchema( "Post", {
    "tags": {
        "@id": "https://schema.org/tags",
        "@container": "@set",
        "@type": "@id",
     },
     "title": {
        //  "@id": "title",
        "@type": "string",
     },
     "content": {
         "@type": "string",
     },
     "published": {
         "@id": "publishDate",
         "@type": "dateTime",
     },
} );
carbonldp.extendObjectSchema( {
    "name": {
        "@type": "string",
     },
} );

// - "@type"
//     - "@id" // Referencia a recursos
//     - "string"
//     - "int" / "integer" / "long"
//     - "boolean"
//     - "float" / "double"
//     - "date" / "time" / "dateTime"

// - "@container"
//     - "@set" // Arreglo (sin orden)
//     - "@list" // Arreglo (con orden)


carbonldp.documents;
console.log( carbonldp.documents );
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
//             types: [ "Post" ]
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

function getAllTags() {
    return carbonldp.documents
        .$getChildren( "tags/" );
}

let postsDocuments;
function getAllPosts() {
    return carbonldp.documents
        .$getChildren( "posts/" )
        .then( function( posts ) {
            postsDocuments = posts;
            console.log( posts );
        } );
}

// Promise.all( [
//     getAllTags(),
//     getAllPosts(),
// ] )
//     .then( function() {
//         postsDocuments.forEach( function( post ) {
//             renderPost( post );
            
//             // post.types.push( "Post" );
//             // post.$addType( "Post" )
//             // post.$removeType( "Post" )
//             // post.$save();
//         } );
//         // for( const post of postsDocuments ) {
//         //     renderPost( post );
//         // }
//     } )

carbonldp.documents
    // .$getMembers( "posts/", function( builder ) {
    .$getChildren( "posts/", function( builder ) {
        // builder.withType( "Post" );
        // builder.properties( { /* ... */ } );
        // return builder;

        return builder
            .withType( "Post" )
            .properties( {
                title: builder.inherit,
                content: builder.inherit,
                published: builder.inherit,
                tags: {
                    query: function( builderTags ) {
                        return builderTags
                            .properties( {
                                name: {
                                    query: function( builderName ) {
                                        return builderName
                                            .values( builderName.value( "Comida" ), builderName.value( "Juegos Olimpicos" ) );
                                    }
                                },
                            } );
                    }
                },
            } )
            .orderBy( "title", "DESC" )
            .offset( 0 )
            .limit( 10 )
            ;
    } )
    .then( function( posts ) {
        for( const post of posts ) {
            console.log( post );
            renderPost( post );
        }
    } );


function renderPost( post ) {
    const container = document.querySelector( "#posts" );

    let tags = "";
    if( post.tags ) {
        // <label class="tag">Tag1</label>
        for( const tag of post.tags ) {
            tags += `<label class="tag">${ tag.name }</label>`
        }
    }

    container.innerHTML += `
    <div class="post">
        <h2 class="title">${ post.title }</h2>
        <div class="subTitle">
            <label class="publishDate">${ post.published }</label>
        </div>

        <p class="content">${ post.content }</p>

        <div class="tags">
            ${ tags }
        </div>
    </div>
    `;
}


// carbonldp.documents
//     .$create( "posts/c2fada9d-3af0-4a1b-9a48-5fb731ea0398/",
//      AccessPoint.create( {
//         hasMemberRelation: "tags",
//         isMemberOfRelation: "posts"
//     } ), "tags/" )
//     .then( function ( document ) {
//         console.log( document );
//         console.log( "AccessPoint created!" );
//     } );


// carbonldp.documents
//     .$create(
//         "posts/c2fada9d-3af0-4a1b-9a48-5fb731ea0398/",
//         AccessPoint.create( {
//             hasMemberRelation: "https://schema.org/tags",
//             isMemberOfRelation: "posts"
//         } ),
//         "tags/"
//     )
//     .then( function ( document ) {
//         console.log( document );
//         console.log( "AccessPoint created!" );
//     } );

// carbonldp.documents
//     .$create( "posts/c2fada9d-3af0-4a1b-9a48-5fb731ea0398/", {
//         types: [ "https://carbonldp.com/ns/v1/platform#AccessPoint" ],
//         hasMemberRelation: "comments",
//         isMemberOfRelation: "posts"
//     }, "comments/" )
//     .then( function ( document ) {
//         console.log( document );
//         console.log( "AccessPoint created!" );
//     } );

// carbonldp.documents
//     .$get( "posts/c2fada9d-3af0-4a1b-9a48-5fb731ea0398/" )
//     .then( function ( postDocument ) {
//         // postDocument.$addMember(s)
//         // postDocument.$removeMember(s)
//         return postDocument
//             .$addMembers( "tags/", [ "http://localhost:8083/tags/comida/" ] );
//     } )
//     .then( function() {
//         console.log( "Tags added!" );
//     } );


// Real time
// import { Event } from "carbonldp/Messaging/Event";

carbonldp.documents
    .$on( Event.DOCUMENT_DELETED, "posts/**", function ( message ) {
        console.log( message );
    }, function ( error ) {
        console.log( error );
    } );

carbonldp.documents
    .$onDocumentDeleted( "posts/**", function ( message ) {
        console.log( message );
    }, function ( error ) {
        console.log( error );
    } );


function onDocumentDeletedMessageEvent( message ) {
    console.log( message );
}

carbonldp.documents
    .$onDocumentDeleted( "posts/**", onDocumentDeletedMessageEvent )

carbonldp.documents
    .$offDocumentDeleted( "posts/**", onDocumentDeletedMessageEvent )



