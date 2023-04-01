import { store } from "../src/store";
import { task } from "../src/taskSlice";
import { useSelector } from "react-redux";


export function Reposelector(){
    var repolist = useSelector(()=>{ return store.getState()['task'].repo})
    
}