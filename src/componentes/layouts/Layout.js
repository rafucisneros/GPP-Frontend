import React, { Fragment } from 'react';

// componentes
import NavBar from './NavBar.js';
import Footer from './Footer.js';

export default function Layout({children}){

    return(
        <Fragment >
            <div style={{display: 'flex'}}>
                <NavBar/>
                <div style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <main className="content-main"  >
                        {children}
                    </main> 
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}