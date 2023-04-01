import { store } from "./store";
import { Task } from "./task";
import { task } from "./taskSlice";



export function loginwithgithub(){
    const client_id = "b34fb685156a7e9fee22";
    window.location.assign("https://github.com/login/oauth/authorize?"+"client_id="+client_id+"&scope=repo")
  }

export async function getissues(page){
    store.dispatch(task.actions.initialtasklist);
    var token = sessionStorage.getItem("token");
    if(token!='undefined'&&token){
        await fetch("https://api.github.com/issues?filter=repos"+"&per_page=10"+"&page="+page.toString(),{
            method: "GET",
            headers: {
                'Authorization': "Bearer " + token,
                'accept': "application/vnd.github+json"
            }
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data);
            const tasklist = data.map(item=>{
                return {'id':item['id'],'title':item['title'], 'state':item['state'], 'created_at':item['created_at'], 'repository':item['repository']["name"],'label':item['labels'][0]['name']}
            })
            var repolist = tasklist.map(item=>{return item['repository']})
            repolist = [...new Set(repolist)]
            console.log(repolist);
            store.dispatch(task.actions.addtask(tasklist));
            store.dispatch(task.actions.setrepo(repolist));
        })
    }else{
        window.alert("You have to login");
    }

}

export async function getaccesstoken(){
    var getUrlString = window.location.href;
    var url = new URL(getUrlString);
    var code = url.searchParams.get('code');
    var token = sessionStorage.getItem("token");
    if(token!='undefined'&&token){
        console.log(token)
        getissues(1);
        return token;
    }else{
        token = await fetch("http://localhost:4000/gettoken?code="+code,{
            method: "GET"
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data);
            sessionStorage.setItem("token", data.access_token)
            getissues(1);
            return data.access_token
        })
        return token;
    }
    
}

