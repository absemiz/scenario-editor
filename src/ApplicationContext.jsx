import React from "react";
import { createContext, useState } from "react";
import ApplicationState from "./utility/state/state";

const ApplicationContext = createContext();


const ApplicationStateProvider = ({ children }) => {
    const [_ApplicationState, SetApplicationState] = useState(ApplicationState.INITIALIZATION);

    const getApplicationState = () => {
        return _ApplicationState;
    }

    const setApplicationState = (newState) => {
        SetApplicationState(newState);
    }

    return (
        <ApplicationContext.Provider value={{ getApplicationState, setApplicationState }}>
            { children }
        </ApplicationContext.Provider>
    );
}

export { ApplicationContext, ApplicationStateProvider }