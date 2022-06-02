import {useState} from 'react'

function ApprovedRental({rental, user, rerender, setRerender}) {

    const [showReviewForm, setShowReviewForm] = useState(false)
    const [content, setContent] = useState('')
    const [rating, setRating] = useState('')
    const [error, setError] = useState(null)
    //data needed for reviews: reviewee_id(User that review is about), reviewer_id (review author), rating, content

    function handleReceivedByOwner() {
        if(!rental.was_received_by_owner) {
            setShowReviewForm(true)
        } else {
            setError('You have already submitted a review for this experience.')
        }
    }

    if(rental.was_returned_to_owner && rental.was_received_by_owner) {
        fetch(`/rentals/${rental.id}`, {method: 'DELETE'})
        .then(() => setRerender(!rerender))
    }

    function handleSubmitReview(e) {
        e.preventDefault()
        fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                reviewer_id: user.id,
                reviewee_id: rental.renter.id,
                rating,
                content
            })
        })

        fetch(`/rentals/${rental.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({was_received_by_owner: true})
        })

        setShowReviewForm(false)
        setRerender(!rerender)
    }

    return (
        <div key={rental.id}>
            <h2>{rental.item.name}</h2>
            <h3>{rental.start_date} - {rental.end_date}</h3>
            <h3>Rental Requestor: {rental.renter.first_name} {rental.renter.last_name} </h3>
            <h3>Avg. Renter Rating: {(Math.round(rental.renter.rating * 100) / 100).toFixed(2)}/5</h3>
            <button onClick={() => handleReceivedByOwner()}>Received Item Back from Renter</button>
            <div>
                {showReviewForm ? 
                    <form onSubmit={(e) => handleSubmitReview(e)}>
                        <label htmlFor='rating'>Rate the Renter (out of 5):</label>
                        <input name='rating' type='number' min='1' max='5' onChange={(e) => setRating(e.target.value)}required></input>
                        <input type='text' placeholder='Provide any additional feedback about the renter here.' onChange={(e) => setContent(e.target.value)}required></input>
                        <input type='submit'></input>
                    </form> : null}
                    {error ? <p>{error}</p>: null}
            </div>
        </div>
    )
}

export default ApprovedRental