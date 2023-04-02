import { redirect } from "react-router-dom";
import { store } from "./store";
import { task } from "./taskSlice";



export function loginwithgithub(){
    const client_id = "b34fb685156a7e9fee22";
    window.location.assign("https://github.com/login/oauth/authorize?"+"client_id="+client_id+"&scope=repo")
  }

export async function getissues(page=1,direct='desc'){
    if(page==1){
        store.dispatch(task.actions.initialtasklist());
    }
    var token = sessionStorage.getItem("token");
    if(token!=='undefined'&&token){
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
            if(data.length==0){
                store.dispatch(task.actions.setlock(true));
            }
            const tasklist = data.map(item=>{
                return {'id':item['number'],'title':item['title'], 'state':item['state'], 'created_at':item['created_at'], 'repository':item['repository']["name"],'owner_repository':item['repository']["full_name"],'label':item['labels'][0]['name'],"body":item['body']}
            })
            var repolist = tasklist.map(item=>{return item['owner_repository']})
            repolist = [...new Set(repolist)]
            console.log(repolist);
            store.dispatch(task.actions.addtask(tasklist));
            store.dispatch(task.actions.setrepo(repolist));
        })
    }else{
        window.alert("You have to login");
    }

}

async function getuser(){
    console.log('test')
    var token = sessionStorage.getItem("token");
    fetch("https://api.github.com/user",{
        method: "GET",
        headers: {
            'Authorization': "Bearer " + token,
            'accept': "application/json"
        }
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        sessionStorage.setItem('user', data['login'])
    })
}

export async function getaccesstoken(){
    var getUrlString = window.location.href;
    var url = new URL(getUrlString);
    var code = url.searchParams.get('code');
    var token = sessionStorage.getItem("token");
    if(token!=='undefined'&&token){
        console.log(token)
        getissues();
        return token;
    }else{
        token = await fetch("http://localhost:4000/gettoken?code="+code,{
            method: "GET"
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data);
            sessionStorage.setItem("token", data.access_token)
            getissues();
            getuser();
            return data.access_token
        })
        return token;
    }
    
}

export async function submit_new_task(){
    var title = document.getElementById("tasktitle").value;
    var body= document.getElementById("taskbody").value;
    var repo = document.getElementById("repolist").value;
    var token = sessionStorage.getItem("token");
    if(title===''){
        window.alert("Title can't be empty")
    }else if(body.split(' ').length<30){
        window.alert("The minimum amount of word is 30.")
    }else{
        fetch("https://api.github.com/repos/"+repo+"/issues",{
            method: "POST",
            headers: {
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                "title": title,
                "labels": ["Open"],
                "body": body
            })
        }).then((res)=>{
            window.alert("Adding is Successful.")
        })
    }
    
}

export async function edit_task(taskedit){
    var title = document.getElementById("taskedittitle").value;
    var body= document.getElementById("taskeditbody").value;
    var token = sessionStorage.getItem("token");
    if(title===''){
        window.alert("Title can't be empty")
    }else if(body.split(' ').length<30){
        window.alert("The minimum amount of word is 30.")
    }else{
        fetch("https://api.github.com/repos/"+taskedit['owner_repository']+"/issues/"+taskedit['id'],{
            method: "PATCH",
            headers: {
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                "title": title,
                "body": body
            })
        }).then((res)=>{
            window.alert("editing is Successful.")
            window.location = ('/task');
         })
    }
    
}

export async function delete_task(taskedit){
    var token = sessionStorage.getItem("token");
    fetch("https://api.github.com/repos/"+taskedit['owner_repository']+"/issues/"+taskedit['id'],{
        method: "PATCH",
        headers: {
            'Authorization': "Bearer " + token
        },
        body: JSON.stringify({
            "state": 'closed'
        })
    }).then((res)=>{
        window.alert("Delete is Successful.")
        window.location = ('/task');
    })
}

export async function search_issue(searchpage=1){
    if(searchpage==1){
        store.dispatch(task.actions.initialtasklist());
    }
    var keyword;
    try{
        keyword = document.getElementById("search_keyword").value;
    }
    catch{
        window.location = ('/task');
    }
    var user = sessionStorage.getItem("user");
    var token = sessionStorage.getItem("token");
    console.log(keyword)
    if(keyword==""||keyword==undefined){
        window.location = ('/task');
    }
    fetch("https://api.github.com/search/issues?q="+encodeURIComponent(keyword+' involves:'+user)+"&per_page=10"+"&page="+searchpage,{
        method: "GET",
        headers: {
            'Authorization': "Bearer " + token,
            'Accept': "application/vnd.github.text-match+json"
        }
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log(data['items']);
        data = data['items']
        const tasklist = data.map(item=>{
            return {'id':item['number'],'title':item['title'], 'state':item['state'], 'created_at':item['created_at'], 'repository':item['repository_url'].split('/')[5],'owner_repository':item['repository_url'].split('/')[4]+"/"+item['repository_url'].split('/')[5],'label':item['labels'][0]['name'],"body":item['body']}
        })
        var repolist = tasklist.map(item=>{return item['owner_repository']})
        repolist = [...new Set(repolist)]
        console.log(repolist);
        store.dispatch(task.actions.addtask(tasklist));
        store.dispatch(task.actions.setrepo(repolist));
    })
    return 1;
}
