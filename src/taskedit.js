import { edit_task } from "./github"
import { delete_task } from "./github";

export function Taskedit(props){
    const task = props.task;
    return(
        <div className="taskedit">
            <form action="" method="post" className="taskeditform"> 
                <div id="taskedittitled">
                    <p>Task Title</p>
                    <input id="taskedittitle" type="text" name="taskedittitle" />
                </div>
                <div id="taskeditbodyd">
                    <p>Body</p>
                    <textarea id="taskeditbody" rows={20} cols={35}></textarea>
                </div>
                <div>
                    <input type="button" className="button" value="Edit" onClick={()=>edit_task(task)}/>
                </div>
                <div>
                    <input type="button" className="button" value="Delete" onClick={()=>delete_task(task)} />
                </div>
            </form>
        </div>
    )
}