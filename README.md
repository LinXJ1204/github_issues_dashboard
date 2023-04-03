# 前置作業

* 1. 前往 GitHub Developers 註冊Oauth應用程式
    * Homepage URL設定為 `http://locolhost:3000`
    * Authorization callback URL設定為 `http://localhost:3000/task`

* 2. 在註冊程式中取得ClientID 和Clientsecret

* 3. 修改github.js 參數.
    * github.js 路徑為 github_issues_dashboard/src/github.js.  
    * 修改第7行 `const client_id = 你的ClientID ;`
* 4. 修改server.js 參數 
    * server.js 路徑為 github_issues_dashboard/nodeserver/server.js
    * 修改第9行 `const client_id = 你的ClientID ;`
    * 修改第10行 `const client_secret = 你的Clientsecret ;`

# 開始使用

* 第一步：進入專案資料夾
## `cd github_issues_dashboard`

* 第二步：進入簡易後端資料夾
## `cd nodeserver`

* 第三步：下載後端所需套件
## `npm install`

* 第四步：啟動後端
## `npm start`

* 第五步：開啟新的CMD進入專案資料夾
## `cd github_issues_dashboard`

* 第六步：下載所需套件
## `npm install`

* 第七步：啟動React
## `npm start`