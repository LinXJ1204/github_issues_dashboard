
export function Newtask(){

    return(
        <div className="newtask">
            <form action="" method="post" className="basic-grey"> 
                <label>
                <span>Task Title</span>
                <input id="name" type="text" name="name" placeholder="Your Full Name" />
                </label>
                <label>
                <span>Body</span>
                <input id="email" type="email" name="email" placeholder="Valid Email Address" />
                </label>
                <label>
                <input type="button" className="button" value="Send" />
                </label>
            </form>
        </div>
    )
}

