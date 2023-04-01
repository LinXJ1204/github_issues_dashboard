import { edit_task } from "./github"
import { delete_task } from "./github";

export function Taskedit(props){
    const task = props.task;
    return(
        <div className="taskedit">
            <form action="" method="post" className="taskeditform"> 
                <div>
                    <span>Task Title</span>
                    <input id="taskedittitle" type="text" name="taskedittitle" />
                </div>
                <div>
                    <span>Body</span>
                    <input id="taskeditbody" type="text" name="taskeditbody"/>
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