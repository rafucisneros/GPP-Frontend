import React, { useState, useMemo } from 'react';

const MakeTestContext = React.createContext();

export function MakeTestProvider(props) {
    const [exam, setExam] = useState(null);

    const value = useMemo( () => {
        return({
            exam,
            setExam,
        })
    }, [exam, setExam]);

    return <MakeTestContext.Provider value = {value} {...props} />
}

export function useMakeTest() {
    const context = React.useContext(MakeTestContext);
    if (!context){
        throw new Error('useMakeTest debe estar dentro del proveedor MakeTestContext')
    }
    return context;
}