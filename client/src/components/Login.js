import {useState} from "react"
import {useHistory, Link} from "react-router-dom"
import '../styles/Login.css'

function Login({user, setUser, setIsAuthenticated}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();

    const [error, setError] = useState(null)

    function submitHandler(e){
        e.preventDefault();

        const user = {
            username,
            password 
        }
        
        fetch("/login",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
        .then(res => {
            if(res.ok) {
                res.json()
                .then(user => {
                    setUser(user)
                    setIsAuthenticated(true)
                    history.goBack()                    
                    e.target.reset()
                })
            } else {
                res.json()
                .then(json => {setError(json.error)})
            }
        })        
    }

    function handleClick() {
        fetch('/logout', {method: 'DELETE'})
        .then(() => {
          setUser(null)
          setIsAuthenticated(false)
        })
    }

    return(
        <div id="login-container">
            <h1 id='login-title'>Log In</h1>
            {user ?
                <div> 
                    <h3>Login successful! Welcome, {user.first_name}</h3>
                    <Link to='/' onClick={handleClick}>
                        <h4>Click here to Log Out</h4>
                    </Link>
                </div> :
                <form onSubmit={(e) => submitHandler(e)} id='login-form'>
                    <label htmlFor="username">Username </label>
                    <input type="text" name='username' id="username-login" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} required></input>
                    <label htmlFor="password">Password </label>
                    <input type="password" name="password" id="password-login" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} required></input>
                    <br></br>
                    <input type="submit" id="submit-login" value="Log In"></input>
                    <br/>
                    {error ? <p id='login-error'>{error}</p> : null}
                    {/* {user ? <p>Login successful! Welcome, {user.first_name}</p> : null} */}
                    <Link to='/signup' id='login-to-signup-link'>Don't have an account? Click here to sign up!</Link>
                </form>
            }
        </div>
    )
}
export default Login;