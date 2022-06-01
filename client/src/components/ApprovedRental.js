import {useState} from 'react'

function ApprovedRental({rental}) {

    const [showReviewForm, setShowReviewForm] = useState(false)

    function handleReceivedByOwner(id) {

    }

    return (
        <div key={rental.id}>
            <h2>{rental.item.name}</h2>
            <h3>{rental.start_date} - {rental.end_date}</h3>
            <h3>Rental Requestor: {rental.renter.first_name} {rental.renter.last_name} </h3>
            <h3>Avg. Renter Rating: {rental.renter.rating}/5</h3>
            <button onClick={() => handleReceivedByOwner(rental.id)}>Received Item Back from Renter</button>
            <div>
                {showReviewForm ? 
                    <form>
                        
                    </form> : null}
            </div>
        </div>
    )
}

export default ApprovedRental