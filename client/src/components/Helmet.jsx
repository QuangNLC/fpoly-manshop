import React from 'react'



const Helmet = ({children, title}) => {

    if(title){
        document.title = "ManShop - " + title
    }

    return (
        <>
            {children}
        </>
    )
}

export default Helmet