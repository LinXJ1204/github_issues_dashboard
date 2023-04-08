import { store } from "./store"
import { task } from "./taskSlice"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getissues, search_issue } from "./github";
import { directionwrite } from "./github";




export function Task(){
    var tasklist = useSelector(()=>{return store.getState()['task'].tasklist});
    var mode = store.getState()['task'].mode;
    function set_status(){
        var status = document.getElementById("status_select").value;
        if(status!="All"){
            store.dispatch(task.actions.setlabel(status));
        }else{
            store.dispatch(task.actions.setlabel(''));
        }
        if(mode){
            getissues();
        }else{
            search_issue();
        }
        
    }
    return(
        <div className="table-data">
            <div className="tasklist">
                <div className="head">
                    <h3>Task</h3>
                    <i className='bx bx-search' ></i>
                    <i className='bx bx-filter' ></i>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th><div>Create Date<img src={require("./img/angle-small-down.png")} onClick={()=>{
                                store.dispatch(task.actions.setdiretion());
                                directionwrite([]);
                                }}/></div></th>
                        <th>Repository</th>
                        <th>
                            Status
                            <select id="status_select" onChange={set_status}>
                                <option value="All">All</option>
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progess</option>
                                <option value="Done">Done</option>
                            </select>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasklist.map(item=>{
                        return (
                            <tr key={item['id']+item['repository']}>
                                <td><p className="tasktitle"><Link to={"/task/"+item['id']} state={item}>{item['title']}</Link></p></td>
                                <td>{item['created_at'].slice(0,10)}</td>
                                <td>{item['repository']}</td>
                                <td>{item['label']}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                    
                </table>
                
                
            </div>
            
        </div>
        
    )
};