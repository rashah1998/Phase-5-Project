import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

function ItemPage({user}) {

    const {id} = useParams()
    const [item, setItem] = useState({})
    const {rentalDates, setRentalDates} = useState({
        start_date: null,
        end_date: null
    })
    //item attributes: id, owner(has_one), availabilities(has_many, array), name, image, item_type, price_per_day, description
    //owner attributes: id, city, state, first_name, last_name, username, rating
    //availability attributes: id, start_date, end_date

    useEffect(() => {
        fetch(`/items/${id}`)
        .then(res => res.json())
        .then(itemData => setItem(itemData))
    }, [])

    return(
        <div id='item-page'>
            <div id='item-page-image'>
                <img src={item.image}></img>
            </div>
            <div id='item-page-content'>
                <h1>{item.name}</h1>
                <p>{item.description}</p>
            </div>
            <div id='item-page-booking'>
                <h2>Rent Now:</h2>
                {user ? <button id='item-page-rent-button'>Submit Request for Rental</button>: <button id='item-page-cannot-rent-button'>Log In to Rent</button>}
            </div>
        </div>
    )
}

export default ItemPage;