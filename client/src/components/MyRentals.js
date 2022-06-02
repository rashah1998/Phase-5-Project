import {useEffect, useState} from 'react'
import ApprovedRental from './ApprovedRental'
import RequestedRental from './RequestedRental'
import Rental from './Rental'
import '../styles/MyRentals.css'

function MyRentals({user}) {

    const [userData, setUserData] = useState([])
    const [myRentals, setMyRentals] = useState([])
    const [rentingFromMe, setRentingFromMe] = useState(false)
    const [myItems, setMyItems] = useState([])
    const [rerender, setRerender] = useState(false)


    useEffect(() => {
        fetch(`/users/${user.id}`)
        .then(res => res.json())
        .then(userInfo => {
            setUserData(userInfo)
            setMyRentals(userInfo.rentals)
            setMyItems(userInfo.items)
            if(userInfo.items.some(item => item.rentals.length > 0)){
                setRentingFromMe(true)
            }
        })
    }, [user.id, rerender])

    const renderMyRentals = myRentals.map(rental => {
        return(<Rental key={rental.id} rental={rental} rerender={rerender} setRerender={setRerender} user={user}/>)
    })

    let rentingFromMeArray = []
    myItems.forEach(item => {
        console.log('rentals: ')
        console.log(rentingFromMeArray)
        if(item.rentals) {
            item.rentals.forEach(rental => {
                if(!rentingFromMeArray.includes(rental)) {
                    rentingFromMeArray.push(rental)
                }
            })
        }
    })

    const renderRentingFromMe = rentingFromMeArray.map(rental => {
        if(rental.pending_approval || rental.pending_approval === null) {
            return(
                <RequestedRental key={rental.id} rental={rental} rerender={rerender} setRerender={setRerender}/>
            )
        } else {
            return(
                <ApprovedRental key={rental.id} rental={rental} rerender={rerender} setRerender={setRerender} user={user}/>
            )
        }
    })

    return(
        <div id='rentals-page'>
            <h1>My Rentals:</h1>
            <div className='rentals-container'>
                {myRentals.length === 0 ? <p className='no-rentals'>No rentals yet! Rent something to get started!</p> : renderMyRentals}
            </div>
            <h1>Rentals for My Items:</h1>
            <div className='rentals-container'>
                {myItems.length === 0 ? <p className='no-rentals'>{"You don't have any items available to rent."}</p>
                : (rentingFromMe ?  renderRentingFromMe : <p className='no-rentals'>No rentals for your items yet.</p>)}
            </div>
        </div>
    )
}

export default MyRentals;