import { createSlice } from "@reduxjs/toolkit";

function sort(a, b) {
    var nameA = a.created_at.toUpperCase(); // ignore upper and lowercase
    var nameB = b.created_at.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }
    return 0;
    }

export const task = createSlice({
    name: "task",
    initialState: {page:1, tasklist:[], repo:[], lock:false},
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
            return {...state, tasklist: tasklist.concat(actions.payload).sort((a,b)=>sort(a,b))}
        },
        initialtasklist: (state)=>{
            return {...state, tasklist: [], page:1, lock:false}
        },
        setrepo: (state, actions)=>{
            return {...state, repo: [...new Set(state.repo.concat(actions.payload))]}
        },
        setlock: (state, actions)=>{
            return {...state, lock:actions.payload}
        }
    }
})