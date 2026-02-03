import React from 'react'
import parse from "html-react-parser"
import {Link, useParams} from "react-router-dom";

function Article( {title, content} ) {

    return (

        <div className= "article-container">
            <article>
            <h3  className= "day-title"> Title: {title} </h3>
              {parse(content)}
            </article>
            <Link  className="edit-entry"  to={{pathname: `edit/`}} state = {{edit_title: title , edit_content: content}}>
            <button  className= "button-38">
         
      Edit (Ctrl + E)
             </button>
             </Link>
             </div>

    )


}

export default Article;


