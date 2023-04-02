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
        <div className="table-data">
            <div className="newtask">
                <form action="" method="post" className="basic-grey">
                    <table>
                        <tbody>
                            <tr>
                                <td>Task Title</td>
                                <td><input id="tasktitle" type="text" name="tasktitle" /></td>
                            </tr>
                            <tr>
                                <td><span>Body</span></td>
                                <td><textarea id="taskbody" rows={10} cols={35}></textarea></td>
                            </tr>
                            <tr>
                                <td><span>Repository</span></td>
                                <td><Reposelector/></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><input type="button" className="button" value="Send" onClick={submit_new_task} /></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
              
        </div>
        
    )
}

