import { Link, Outlet } from "react-router-dom"
import { Task } from "./task"
import { search_issue } from "./github"
import { useInView, InView } from 'react-intersection-observer';
import { store } from "./store";
import { task } from "./taskSlice";
import { getissues } from "./github";


export function Home(){
    function autoloader(){
      const lock = store.getState()['task'].lock;
      var pageloader = store.getState()['task'].page;
      if(pageloader==1){
        store.dispatch(task.actions.nextpage());
      }else if(!lock){
        store.dispatch(task.actions.nextpage());
        console.log(pageloader);
        getissues(pageloader, 'desc');
      }
    }
    function logout(){
      sessionStorage.removeItem("token");
      window.location = ('/')
    }
    const { ref, inView } = useInView();
    return (
        <div id="home">
            <section id="sidebar">
          <ul className="side-menu top">
            <li>
              <span className="tasklistbtn"><Link to="/task">Tasklist</Link></span>
            </li>
            <li>
              <a href="#" className="logout">
                <i className='bx bxs-log-out-circle' ></i>
                <span className="text" onClick={logout}>Logout</span>
              </a>
            </li>
          </ul>
        </section>
        <section id="content">
          <nav>
            <i className='bx bx-menu' ></i>
            
            <form action="#">
              <div className="form-input">
                <input id="search_keyword" type="search" placeholder="Search..."/>
                <Link to='/searchtask'>Search</Link>
              </div>
            </form>
          </nav>

          <main>
            <div className="head-title">
              <div className="left">
                <h1>Dashboard</h1>
              </div>
              <div className="btn-newtask">
                  <span className="text"><Link to='/newtask'>New Task</Link></span>
              </div>
            </div>
            <Outlet />
            <div className="buffer"></div>
            <div ref={ref}>{inView?(autoloader()):(console.log(0))}</div>
          </main>
          
        </section>
        </div>
    )
}