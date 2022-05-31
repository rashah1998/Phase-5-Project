import {useState} from 'react'
import {Link} from 'react-router-dom'


function Nav() {
    const [showMenu, setShowMenu] = useState(false)

    function setShowMenuTrue() {
        setShowMenu(true)
        document.addEventListener('mousedown', (e) => setShowMenuFalse(e))
    }

    function setShowMenuFalse(e) {
        const dropdown = document.getElementById('dropdown')
        if(dropdown) {
            if(!dropdown.contains(e.target)) {
                setShowMenu(false)
                document.removeEventListener('mousedown', (e) => setShowMenuFalse(e))
            }
        }
    }

    return(
        <nav>
            <Link to='/'><h1>Rent a Snow Day</h1></Link>
            <button onClick={setShowMenuTrue}>☰</button>
            {showMenu ? 
            <div id='dropdown'>
                <ul>
                    <Link to='/login'><li>Login</li></Link>
                    <Link to='/signup'><li>Sign up</li></Link>
                </ul>
            </div> : null}
        </nav>
    )
}

export default Nav;