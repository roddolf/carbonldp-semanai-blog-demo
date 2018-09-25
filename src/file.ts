import { CarbonLDP } from "carbonldp";

const carbonldp = new CarbonLDP( "https://localhost:8080" );
carbonldp.documents;




interface Post {
    title: string;
    content: string;
    published: Date;
    tags?: Tags[];
}

interface Tags {
    name: string;
}


function renderPost( post:Post ):"Hola" {
    const container = document.querySelector( "#posts" )!;

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

    return "Hola";
}


