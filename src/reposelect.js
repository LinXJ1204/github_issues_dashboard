import { store } from "./store";
import { task } from "./taskSlice";
import { useSelector } from "react-redux";


export function Reposelector(){
    var repolist = useSelector(()=>{ return store.getState()['task'].repo})
    return(
        <select id="repolist" name="repo">
            {repolist.map(item=>{
                return (
                    <option key={item} value={item}>{item}</option>
                )
            })}
        </select>

    )
}