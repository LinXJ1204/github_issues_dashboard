import { Reposelector } from "./reposelect"
import { submit_new_task } from "./github";

export function Newtask(){
    async function test(){
        var title = document.getElementById("tasktitle").value;
        var body= document.getElementById("taskbody").value;
        var repo = document.getElementById("repolist").value;
        console.log(title, body, repo)
        var token = sessionStorage.getItem("token");
        
    }

    return(
        <div className="newtask">
            <form action="" method="post" className="basic-grey"> 
                <div>
                    <span>Task Title</span>
                    <input id="tasktitle" type="text" name="tasktitle" />
                </div>
                <div>
                    <span>Body</span>
                    <input id="taskbody" type="email" name="taskbody"/>
                </div>
                <div>
                    <span>Repository</span>
                    <Reposelector/>
                </div>
                <div>
                    <input type="button" className="button" value="Send" onClick={submit_new_task} />
                </div>
            </form>
        </div>
    )
}

