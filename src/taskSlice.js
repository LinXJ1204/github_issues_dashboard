import { createSlice } from "@reduxjs/toolkit";

export const task = createSlice({
    name: "task",
    initialState: {page:1, tasklist:[], repo:[]},
    reducers: {
        nextpage: (state)=>{
            const page = state.page;
            return {...state, page: page+1}
        },
        pageinitial: (state)=>{
            return {...state, page:1}
        },
        addtask: (state,actions)=>{
            const tasklist = state.tasklist
            return {...state, tasklist: tasklist.concat(actions.payload)}
        },
        initialtasklist: (state)=>{
            return {...state, tasklist: []}
        },
        setrepo: (state, actions)=>{
            return {...state, repo:actions.payload}
        }
    }
})