import { loginwithgithub } from "./github"

export function Login(){
    return(
        <div className="login">
            <button onClick={loginwithgithub}>Login</button>
        </div>
    )
}