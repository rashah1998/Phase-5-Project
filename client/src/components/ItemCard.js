
function ItemCard({item}) {
    const {owner, name, image, price_per_day, availabilities} = item;
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
        <div id='main-item-card'>
            <img src={image} alt={name}/>
            <h1>{name}</h1>
            <h2>Owner's Location: {city}, {state}</h2>
            <h3>Availability: {nextAvailableDate(availabilities)}</h3>
            <h2>${price_per_day}/day</h2>
        </div>
    )
}

export default ItemCard;