import {useState} from 'react'
import {Link} from 'react-router-dom'
import '../styles/Nav.css'


function Nav({user, setUser, setIsAuthenticated}) {
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

    function handleLogout() {
        fetch('/logout', {method: 'DELETE'})
        .then(() => {
          setUser(null)
          setIsAuthenticated(false)
        })
    }

    return(
        <nav>
            <Link to='/' id='site-name' className='nav-link'><h1>Rent a Snow Day</h1></Link>
            {user ?
            <div>
                <Link to='/' onClick={handleLogout} className='nav-link' id='logout-link'><span>Log Out</span></Link>
                <button onClick={setShowMenuTrue} id='dropdown-button'>☰</button>
                {showMenu ? 
                <div id='dropdown'>
                    <ul>
                        <Link to='/my_items' className='nav-link'><li>My Items</li></Link>
                        <Link to='/my_rentals' className='nav-link'><li>My Rentals</li></Link>
                    </ul>
                </div> : null}
            </div>
            :
            <div>
                <Link to='/login' className='nav-link' id="log-in-link"><span>Log In</span></Link>
                <Link to='/signup' className='nav-link' id='sign-up-link'><span>Sign Up</span></Link>
            </div>
            }
        </nav>
    )
}

export default Nav;