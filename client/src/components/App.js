import {useState, useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import Nav from './Nav';
import ItemList from './ItemList';
import '../styles/App.css';

function App() {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('/authorized_user')
    .then(res => {
      if(res.ok) {
        res.json()
        .then(user => {
          setIsAuthenticated(true)
          setUser(user)})
      }
    })

    fetch('/items')
    .then(res => res.json())
    .then(itemData => setItems(itemData))
  }, []);
  

  return (
    <div className='App'>
      <Nav/>
      <Switch>
        <Route exact path='/'>
          <ItemList items={items}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
