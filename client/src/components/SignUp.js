import {useState} from 'react'
import { useHistory } from 'react-router-dom'
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
        <div id="signup-box">
            <h1>Sign Up</h1>
                <form onSubmit={(e) => submitHandler(e)}>
                    <div>
                        <p>First Name</p>
                        <input type="text" id="firstname-signup" name='first_name' placeholder="Enter First Name" onChange={e => setSignUpParams({...signUpParams, [e.target.name]: e.target.value})} required></input>
                        <p>Last Name</p>
                        <input type="text" id="lastname-signup" name='last_name' placeholder="Enter Last Name" onChange={e => setSignUpParams({...signUpParams, [e.target.name]: e.target.value})} required></input>
                        <p>City</p>
                        <input type="text" id="city-signup" name='city' placeholder="Enter Your City" onChange={e => setSignUpParams({...signUpParams, [e.target.name]: e.target.value})} required></input>
                        <p>State</p>
                        <input type="text" id="state-signup" name='state' placeholder="Enter Your State" onChange={e => setSignUpParams({...signUpParams, [e.target.name]: e.target.value})} required></input>
                        <p>Username</p>
                        <input type="text" id="username-signup" name='username' placeholder="Enter Username" onChange={e => setSignUpParams({...signUpParams, [e.target.name]: e.target.value})} required></input>
                        <p>Password</p>
                        <input type="password" id="password-signup" name='password' placeholder="Enter Password" onChange={e => setSignUpParams({...signUpParams, [e.target.name]: e.target.value})} required></input>
                        <p>Re-enter Password</p>
                        <input type="password" id="password-signup" placeholder="Enter Password" onChange={e => setConfirmPassword(e.target.value)} required></input>
                        <br></br>
                        <input type="submit" id="submit-signup" value="Sign Up"></input>
                        <br/>
                        {error ? <p>{error}</p> : null}
                    </div>
                </form>
        </div>
    )
}

export default SignUp;