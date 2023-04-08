import { Link, Outlet } from "react-router-dom"
import { search_issue } from "./github"
import { useInView} from 'react-intersection-observer';
import { store } from "./store";
import { task } from "./taskSlice";
import { getissues } from "./github";


export function Home(){
    var mode = store.getState()['task'].mode;
    var windowheight = window.innerHeight;
    
    function autoloader(){
      const lock = store.getState()['task'].lock;
      var pageloader = store.getState()['task'].page;
      if(pageloader==1){
        store.dispatch(task.actions.nextpage());
      }else{
        if(!lock){
          getissues(pageloader, 'desc');
          store.dispatch(task.actions.nextpage());
        }
      }
      
    }

    function search_autoloader(){
      const lock = store.getState()['task'].lock;
      var pageloader = store.getState()['task'].searchpage;
      if(pageloader==1){
        store.dispatch(task.actions.searchnextpage()); 
      }else{
        if(!lock){
          search_issue(pageloader);
          store.dispatch(task.actions.searchnextpage()); 
        }
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
                <span className="logouttext" onClick={logout}>Logout</span>
              </li>
            </ul>
            
          </section>
          <section id="content">
            <nav>
              <i className='bx bx-menu' ></i>
              
              <form action="#">
                <div className="form-input">
                  <input id="search_keyword" type="search" placeholder="Search..."/>
                  <div className="searchbtn"><Link to='/searchtask'>Search</Link></div>
                </div>
              </form>
            </nav>

            <main>
              <div className="head-title">
                <div className="left">
                  <h1>Dashboard</h1>
                </div>
                <div className="btn-newtask">
                    <span className="newtaskbtn"><Link to='/newtask'>New Task</Link></span>
                </div>
              </div>
              <Outlet />
              <div className="buffer" style={{height:windowheight/2.5}}></div>
              <div ref={ref}>{inView?(mode?autoloader():search_autoloader()):(1)}</div>
            </main>
          </section>
        </div>
    )
}