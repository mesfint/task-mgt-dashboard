import React, { createContext, useReducer } from "react";
import { tasksReducer } from "../reducers/TasksReducer";
import { Action, State } from "../types/types";


const initialState: State = {tasks: []};

export const TasksContext = createContext<{ state: State;dispatch: React.Dispatch<Action>;} | undefined>(undefined);


export const TasksProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
const [ state, dispatch] = useReducer(tasksReducer,initialState)



return (
      <TasksContext.Provider value= {{ state, dispatch }}>
        {children}
      </TasksContext.Provider>
    )
};