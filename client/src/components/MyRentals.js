import {useEffect, useState} from 'react'
import ApprovedRental from './ApprovedRental'
import RequestedRental from './RequestedRental'

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

    const renderMyRentals = 0

    function handleReceivedByOwner(id) {

    }

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
                <ApprovedRental key={rental.id} rental={rental} rerender={rerender} setRerender={setRerender}/>
            )
        }
    })

    return(
        <div>
            <h1>Items I am Renting:</h1>
            <div>
                {renderMyRentals}
            </div>
            <h1>Items People are Renting from Me:</h1>
            <div>
                {myItems.length === 0 ? <p>{"You don't have any items available to rent."}</p>
                : (rentingFromMe ?  renderRentingFromMe : <p>No rentals for your items yet.</p>)}
            </div>
        </div>
    )
}

export default MyRentals;