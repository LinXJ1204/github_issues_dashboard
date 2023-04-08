import { store } from "./store";
import { task } from "./taskSlice";



export function loginwithgithub(){
    const client_id = "ff036409fb179ec54d04";
    window.location.assign("https://github.com/login/oauth/authorize?"+"client_id="+client_id+"&scope=repo")//利用github oauth登入
  }

export function directionwrite(tasklist){//利用state中direction狀態判斷排序由新到舊還是相反
    const direction = store.getState()['task'].direction;
    if(direction){
        store.dispatch(task.actions.addtask(tasklist));
    }else{
        store.dispatch(task.actions.addtaskreverse(tasklist));
    }
}

export async function getissues(page=1){
    if(page==1){
        store.dispatch(task.actions.initialtasklist());
    }
    var label = store.getState()["task"].label;
    var token = sessionStorage.getItem("token");
    if(token!=='undefined'&&token){//確認是否登入
        await fetch("https://api.github.com/issues?filter=repos"+"&per_page=10"+"&page="+page.toString()+"&labels="+label,{
            method: "GET",
            headers: {
                'Authorization': "Bearer " + token,
                'accept': "application/json"
            }
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            if(data.length==0){//如果回傳空矩陣代表到最後一頁，利用lock狀態停止持續fetch
                store.dispatch(task.actions.setlock(true));
            }
            const tasklist = data.map(item=>{
                return {'id':item['number'],'title':item['title'], 'state':item['state'], 'created_at':item['created_at'], 'repository':item['repository']["name"],'owner_repository':item['repository']["full_name"],'label':item['labels'][0]['name'],"body":item['body']}
            })
            var repolist = tasklist.map(item=>{return item['owner_repository']})
            directionwrite(tasklist);//儲存到state中
            store.dispatch(task.actions.setrepo(repolist));//儲存使用者的repo
        })
    }else{
        window.alert("You have to login");
    }

}

async function getrepo(user){//取得使用者的repo
    const token = sessionStorage.getItem("token");
    fetch("https://api.github.com/users/"+user+"/repos",{
        method: "GET",
        headers: {
            'Authorization': "Bearer " + token,
            'accept': "application/json"
        }
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        const repolist = data.map(item=>{
            return user+"/"+item['name'];
        })
        store.dispatch(task.actions.setrepo(repolist));
    })
}


async function getuser(){//取得使用者名字並取得其repo
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
        sessionStorage.setItem('user', data['login']);
        getrepo(data['login']);//取得repo
    })
}

export async function getaccesstoken(){
    var getUrlString = window.location.href;
    var url = new URL(getUrlString);
    var code = url.searchParams.get('code');//取得oauth api回傳的code
    var token = sessionStorage.getItem("token");
    sessionStorage.setItem("code", code)
    code = sessionStorage.getItem("code");
    if(code==""||code==undefined){//檢查使用者是否透過oauth登入並回傳code
        window.location = ('/');
    }
    if(token!=='undefined'&&token){//檢查使用者是否已有token，若無則向後端請求
        getissues()
        store.dispatch(task.actions.setmode(true));
        store.dispatch(task.actions.setlock(false));
        store.dispatch(task.actions.setlabel(''));
        return token;
    }else{
        token = await fetch("http://localhost:4000/gettoken?code="+code,{
            method: "GET"
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            sessionStorage.setItem("token", data.access_token)
            getissues()
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
    if(title===''){//檢查輸入條件是否滿足
        window.alert("Title can't be empty")
    }else if(body.length<30){
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
            window.location = ('/task');
        })
    }
    
}

export async function edit_task(taskedit){
    var title = document.getElementById("taskedittitle").value;
    var body= document.getElementById("taskeditbody").value;
    var token = sessionStorage.getItem("token");
    if(title===''){//檢查輸入條件是否滿足
        window.alert("Title can't be empty")
    }else if(body.length<30){
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
    whether_login();
    if(searchpage==1){//初始化相關state
        store.dispatch(task.actions.initialtasklist());
        store.dispatch(task.actions.setmode(false));
        store.dispatch(task.actions.searchpageinitial());
    }
    var keyword;
    var label = store.getState()["task"].label;//使用者設定要看的label，默認是全部
    if(label!=""){
        label = " label:"+label;
    }
    try{
        keyword = document.getElementById("search_keyword").value;
    }
    catch{
        window.location = ('/task');
    }
    var user = sessionStorage.getItem("user");
    var token = sessionStorage.getItem("token");
    if(keyword==""||keyword==undefined){//如果搜尋欄位是空則導回/task
        window.location = ('/task');
    }
    fetch("https://api.github.com/search/issues?q="+encodeURIComponent(keyword+' user:'+user+label)+"&per_page=10"+"&page="+searchpage,{
        method: "GET",
        headers: {
            'Authorization': "Bearer " + token,
            'Accept': "application/vnd.github.text-match+json"
        }
    }).then((res)=>{
        return res.json()
    }).then((data)=>{//將結果儲存進state
        if(data['items'].length==0){
            store.dispatch(task.actions.setlock(true));
        }
        data = data['items']
        const tasklist = data.map(item=>{
            return {'id':item['number'],'title':item['title'], 'state':item['state'], 'created_at':item['created_at'], 'repository':item['repository_url'].split('/')[5],'owner_repository':item['repository_url'].split('/')[4]+"/"+item['repository_url'].split('/')[5],'label':item['labels'][0]['name'],"body":item['body']}
        })
        var repolist = tasklist.map(item=>{return item['owner_repository']})
        repolist = [...new Set(repolist)]
        directionwrite(tasklist);
        store.dispatch(task.actions.setrepo(repolist));
    })
    return 1;
}

export function whether_login(){
    var token = sessionStorage.getItem("token");
    if(!token){
    window.location = ('/');
    }
    return token;
}