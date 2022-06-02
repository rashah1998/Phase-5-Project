import {useState} from 'react'
import { useHistory, Link } from 'react-router-dom'
import '../styles/SignUp.css'

function SignUp({setUser, setIsAuthenticated}) {

    const history = useHistory()
    const [signUpParams, setSignUpParams] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        city: '',
        state: '',
    })
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null) 

    function submitHandler(e) {
        e.preventDefault()

        const configObject = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUpParams)
        }

        if(signUpParams.password === confirmPassword) {
            setError(null)
            fetch('/users', configObject)
            .then(res => {
                if(res.ok) {
                    res.json()
                    .then(() => {
                        history.push("/login")
                        e.target.reset()
                    })
                } else {
                    res.json()
                    .then(json => {setError(json.error)})
                }
            })
        } else {
            setError('Passwords do not match. Please enter matching passwords')
        }
    }
    return(
        <div id="signup-container">
            <h1 id='signup-title'>Create an Account</h1>
                <form onSubmit={(e) => submitHandler(e)} id='signup-form'>
                    <div>
                        <label htmlFor='first_name'>First Name</label>
                        <input type="text" id="firstname-signup" name='first_name' onChange={e => setSignUpParams({...signUpParams, [e.target.name]: e.target.value})} required></input>
                        <label htmlFor='last_name'>Last Name</label>
                        <input type="text" id="lastname-signup" name='last_name' onChange={e => setSignUpParams({...signUpParams, [e.target.name]: e.target.value})} required></input>
                        <label htmlFor='city'>City</label>
                        <input type="text" id="city-signup" name='city' onChange={e => setSignUpParams({...signUpParams, [e.target.name]: e.target.value})} required></input>
                        <label htmlFor='state'>State</label>
                        <input type="text" id="state-signup" name='state' onChange={e => setSignUpParams({...signUpParams, [e.target.name]: e.target.value})} required></input>
                        <label htmlFor='username'>Username</label>
                        <input type="text" id="username-signup" name='username' onChange={e => setSignUpParams({...signUpParams, [e.target.name]: e.target.value})} required></input>
                        <label htmlFor='password'>Password</label>
                        <input type="password" className="password-signup" name='password' onChange={e => setSignUpParams({...signUpParams, [e.target.name]: e.target.value})} required></input>
                        <label htmlFor='password-confirmation'>Re-enter Password</label>
                        <input type="password" className="password-signup" name='password-confirmation' onChange={e => setConfirmPassword(e.target.value)} required></input>
                        <br></br>
                        <input type="submit" id="submit-signup" value="Sign Up"></input>
                        <br/>
                        {error ? <p id='signup-error'>{error}</p> : null}
                        <Link to='/login' id='signup-to-login-link'>Have an account? Click here to log in!</Link>
                    </div>
                </form>
        </div>
    )
}

export default SignUp;