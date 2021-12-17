import React from "react"
import { useParams } from "react-router"

const generatePage = (pageName) => {
    const component = () => require(`../pages/${pageName}`).default

    try {
        return React.createElement(component())
    } catch (err) {
        console.log(err.message)
    }
}
const PageRender = () => {
    
    const {page, id} = useParams();

    let pageName = '';
    if(id){
        pageName = `${page}/message`
    }else{
        pageName = `${page}/message`
    }
    return generatePage(pageName)
}

export default PageRender