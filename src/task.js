import { store } from "./store"
import { task } from "./taskSlice"
import { useSelector } from "react-redux";


export function Task(){
    var tasklist = useSelector(()=>{return store.getState()['task'].tasklist})
    console.log(tasklist);
    return(
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
                    <th>Create Date</th>
                    <th>Repository</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {tasklist.map(item=>{
                    return (
                        <tr key={item['id']}>
                            <td><p>{item['title']}</p></td>
                            <td>{item['created_at'].slice(0,10)}</td>
                            <td>{item['repository']}</td>
                            <td>{item['label']}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
};