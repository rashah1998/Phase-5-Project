import {Link} from 'react-router-dom'
import '../styles/ItemCard.css'

function ItemCard({item}) {
    const {id, owner, name, image, price_per_day, availabilities} = item;
    const {city, state} = owner;

    const nextAvailableDate = function(availabilities) {
        let closest = new Date(availabilities[0].start_date)
        if(availabilities.length === 1) {
            return closest.toDateString()
        } else {
            for(const availability of availabilities) {
                if(new Date(availability.start_date) < closest) {
                    closest = new Date(availability.start_date);
                }
            }
            return closest.toString()
        }
    }

    return(
        <div className='main-item-card'>
            <Link to={`items/${id}`}>
                <img src={image} alt={name} className='main-item-card-img'/>
                <div className='main-item-card-text-container'>
                    <div className='main-item-card-text-container-justify-left'>
                        <h1>{name}</h1>
                        <p>Owner's Location: {city}, {state}</p>
                        <p>Next Availability: {nextAvailableDate(availabilities)}</p>
                        <p>${price_per_day}/day</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ItemCard;