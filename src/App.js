import logo from './logo.svg';
import './App.css';


//66eee27c3dc589965d1ba93481703481af57199e

const client_id = "b34fb685156a7e9fee22"

function loginwithgithuub(){
  window.location.assign("https://github.com/login/oauth/authorize?"+"client_id="+client_id+"&scope=repo")
}


function App() {
  return (
    <div className="App">
      <main>
        <button onClick={loginwithgithuub}>login</button>
      </main>
    </div>
  );
}

export default App;
