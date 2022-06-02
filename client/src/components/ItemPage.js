import {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import '../styles/ItemPage.css'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';

function ItemPage({user}) {

    const {id} = useParams()
    const history = useHistory()

    const [error, setError] = useState(null)
    const [item, setItem] = useState({})
    const [availabilities, setAvailabilities] = useState([])
    const [rentals, setRentals] = useState([])
    const [owner, setOwner] = useState({})
    const [rentalDates, setRentalDates] = useState({
        from: null,
        to: null
    })
    //item attributes: id, owner(has_one), availabilities(has_many, array), rentals(has_many, array), name, image, item_type, price_per_day, description
    //owner attributes: id, city, state, first_name, last_name, username, rating
    //availability attributes: id, start_date, end_date
    //rental attributes: item, renter, start_date, end_date, was_returned_to_owner, was_received_by_owner, pending_approval

    useEffect(() => {
        fetch(`/items/${id}`)
        .then(res => res.json())
        .then(itemData => {
            setItem(itemData)
            setAvailabilities(itemData.availabilities)
            setRentals(itemData.rentals)
            setOwner(itemData.owner)
        })
    }, [id])

    function redirectLogin(){
        history.push('/login')
    }

    function handleNewRentalRequest() {
        const start_date = rentalDates.from.year+'-'+rentalDates.from.month+'-'+rentalDates.from.day
        const end_date = rentalDates.to.year+'-'+rentalDates.to.month+'-'+rentalDates.to.day

        if(item.availabilities.some(availability => new Date(availability.start_date) <= new Date(start_date) && new Date(availability.end_date) >= new Date(end_date))){
            if(!item.rentals.some(rental => {
                return((new Date(start_date) >= new Date(rental.start_date) && new Date(start_date) <= new Date(rental.end_date)) || 
                (new Date(end_date) >= new Date(rental.start_date) && new Date(end_date) <= new Date(rental.end_date)) ||
                (new Date(start_date) < new Date(rental.start_date) && new Date(end_date) > new Date(rental.end_date)))
             })) {
                setError(null)
                const configObject = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        start_date,
                        end_date,
                        item_id: item.id,
                        renter_id: user.id,
                        pending_approval: true,
                        was_returned_to_owner: false,
                        was_received_by_owner: false
                    })
                }

                fetch('/rentals', configObject)
                .then(res => {
                    if(res.ok) {
                        res.json()
                        .then(() => {
                            history.push("/my_rentals")
                        })
                    } else {
                        res.json()
                        .then(json => {setError(json.error)})
                    }
                })

            } else {
                setError("Error: The requested dates conflict with an existing rental.")
            }
        } else {
            setError("Error: The requested dates do not match the User's availability.")
        }
    }

    const renderAvailabilities = availabilities.sort((a,b) => {
        if(new Date(a.start_date) < new Date(b.start_date)) {
            return -1
        } else if(new Date(a.start_date) > new Date(b.start_date)) {
            return 1
        } else {
            return 0
        }
    }).map(availability => <li key={availability.id}>From {availability.start_date} to {availability.end_date}</li>)

    const renderRentals = rentals.sort((a,b) => {
        if(new Date(a.start_date) < new Date(b.start_date)) {
            return -1
        } else if(new Date(a.start_date) > new Date(b.start_date)) {
            return 1
        } else {
            return 0
        }
    }).map(rental => <li key={rental.id}>From {rental.start_date} to {rental.end_date}</li>)

    return(
        <div id='item-page'>
            <div id='item-page-image'>
                <img src={item.image} alt={item.name}></img>
            </div>
            <div id='item-page-content'>
                <h1>{item.name}</h1>
                <p>{item.description}</p>
                <p>Owner: {owner.first_name} {owner.last_name}, Located in: {owner.city}, {owner.state}</p>
                {owner.rating === 0 ? <p>Owner Rating: {owner.first_name} has not been rated yet.</p> 
                    : <p>Owner Rating: {(Math.round(owner.rating * 100) / 100).toFixed(2)}/5</p>
                }
                <h3>User's Availability to Rent this Item:</h3>
                <ul>
                    {availabilities.length === 0 ? <li>Sorry, this item is unavailable right now.</li> : renderAvailabilities}
                </ul>
                <h3>Existing Rentals for this Item:</h3>
                <ul>
                    {rentals.length === 0 ? <li>No active rentals. Be the first to rent this item!</li> : renderRentals}
                </ul>
            </div>
            <div id='item-page-booking'>
                <h2>Rent Now:</h2>
                <DatePicker value={rentalDates} onChange={setRentalDates} inputPlaceholder={'Select Dates for Rental'} colorPrimary={'rgb(92, 209, 238)'} colorPrimaryLight={'rgb(92, 209, 238,0.3)'}/>
                {user ? <button id='item-page-rent-button' onClick={handleNewRentalRequest}>Request Rental</button>
                : <button id='item-page-cannot-rent-button' onClick={redirectLogin}>Log In to Rent</button>}
                {error ? <p>{error}</p> : null}
            </div>
        </div>
    )
}

export default ItemPage;