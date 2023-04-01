import { useLocation } from "react-router-dom"
import { Taskedit } from "./taskedit";


export function Taskinfo(){
    const task = useLocation()['state'];
    return(
        <div className="table-data">
            <div className="taskinfo">
                <div>
                    <div className="taskinfoitem">
                        <span>Title</span>
                        <p style={{textAlign:'left'}}>{task['title']}</p>
                    </div>
                    <div className="taskinfoitem">
                        <span>Create Date</span>
                        <p style={{textAlign:'left'}}>{task['created_at'].slice(0,10)}</p>
                    </div>
                    <div className="taskinfoitem">
                        <span>Repository</span>
                        <p style={{textAlign:'left'}}>{task['repository']}</p>
                    </div>
                    <div className="taskinfoitem">
                        <span>Owner</span>
                        <p style={{textAlign:'left'}}>{task['owner_repository'].split('/')[0]}</p>
                    </div>
                    <div className="taskinfoitem">
                        <span>Status</span>
                        <p style={{textAlign:'left'}}>{task['label']}</p>
                    </div>
                    <div className="taskinfoitem">
                        <span>Conten</span>
                        <p style={{textAlign:'left'}}>{task['body']}</p>
                    </div>
                </div>
            </div>
            <Taskedit task={task}></Taskedit>
        </div>
        
    )
}