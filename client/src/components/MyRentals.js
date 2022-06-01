import {useEffect, useState} from 'react'

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

    function handleApproval(id) {
        fetch(`/rentals/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({pending_approval: false})
        }).then(res => res.json())
        .then(() => setRerender(!rerender))
    }

    function handleRejection(id) {
        fetch(`/rentals/${id}`, {method: 'DELETE'})
        .then(() => setRerender(!rerender))
    }

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
                <div key={rental.id}>
                    <h2>{rental.item.name}</h2>
                    <h3>{rental.start_date} - {rental.end_date}</h3>
                    <h3>Rental Requestor: {rental.renter.first_name} {rental.renter.last_name} </h3>
                    <h3>Avg. Renter Rating: {rental.renter.rating}/5</h3>
                    <button onClick={() => handleApproval(rental.id)}>Approve Request</button>
                    <button onClick={() => handleRejection(rental.id)}>Reject Request</button>
                </div>
            )
        } else {
            return(
                <div key={rental.id}>
                    <h2>{rental.item.name}</h2>
                    <h3>{rental.start_date} - {rental.end_date}</h3>
                    <h3>Rental Requestor: {rental.renter.first_name} {rental.renter.last_name} </h3>
                    <h3>Avg. Renter Rating: {rental.renter.rating}/5</h3>
                    <button onClick={() => handleReceivedByOwner(rental.id)}>Received Item Back from Renter</button>
                </div>
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