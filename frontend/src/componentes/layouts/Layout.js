import React, { Fragment, useState } from 'react';

// componentes
import NavBar from './NavBar.js';
import Footer from './Footer.js';

export default function Layout({children}){
    const [ bar, setBar ] = useState(true);
    let childrenWithProps = React.Children.map(children, child => {
        const props = { bar }
        if(React.isValidElement(child)){
            return React.cloneElement(child, props)
        }
        return child
    })
    return(
        <Fragment >
            <div style={{display: 'flex'}}>
                <NavBar bar={bar} setBar={setBar} />
                <div style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <main className="content-main"  >
                        {childrenWithProps}
                    </main> 
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}