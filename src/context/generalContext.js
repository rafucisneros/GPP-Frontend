import React, { useState, useMemo } from 'react';

const GeneralContext = React.createContext();

export function GeneralProvider(props) {
    const [contentMenu, setContentMenu] = useState('home');

    const value = useMemo( () => {
        return({
            contentMenu,
            setContentMenu
        })
    }, [contentMenu]);

    return <GeneralContext.Provider value = {value} {...props} />
}

export function useGeneral() {
    const context = React.useContext(GeneralContext);
    if (!context){
        throw new Error('useGeneral debe estar dentro del proveedor GeneralContext')
    }
    return context;
}