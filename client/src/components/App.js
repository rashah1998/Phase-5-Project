import {useState, useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import Nav from './Nav';
import ItemList from './ItemList';
import FilterBar from './FilterBar';
import Login from './Login';
import SignUp from './SignUp';
import ItemPage from './ItemPage';
import MyItems from './MyItems';
import MyRentals from './MyRentals';
import '../styles/App.css';

function App() {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [items, setItems] = useState([])
  const [filterItemType, setFilterItemType] = useState('')

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
          <FilterBar setFilterItemType={setFilterItemType}/>
          <ItemList items={items} filterItemType={filterItemType}/>
        </Route>
        <Route path='/login'>
          <Login user={user} setUser={setUser} setIsAuthenticated={setIsAuthenticated}/>
        </Route>
        <Route path='/signup'>
          <SignUp setUser={setUser} setIsAuthenticated={setIsAuthenticated}/>
        </Route>
        <Route path='/items/:id'>
          <ItemPage user={user}/>
        </Route>
        <Route path='/my_items'>
          <MyItems />
        </Route>
        <Route path='/my_rentals'>
          <MyRentals user={user}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
