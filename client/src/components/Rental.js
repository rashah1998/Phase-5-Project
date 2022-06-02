import { useState } from "react"


function Rental({rental, user, rerender, setRerender}) {

    const [showReviewForm, setShowReviewForm] = useState(false)
    const [error, setError] = useState(null)
    const [rating, setRating] = useState('')
    const [content, setContent] = useState('')

    function handleReturnedToOwner() {
        if(!rental.was_returned_to_owner) {
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
                reviewee_id: rental.item.owner.id,
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
            body: JSON.stringify({was_returned_to_owner: true})
        })

        setShowReviewForm(false)
        setRerender(!rerender)
    }

    return(
        <div key={rental.id}>
            <h2>{rental.item.name}</h2>
            <h3>{rental.start_date} - {rental.end_date}</h3>
            <h3>Rental Owner: {rental.item.owner.first_name} {rental.item.owner.last_name} </h3>
            <h3>Avg. Renter Rating: {(Math.round(rental.item.owner.rating * 100) / 100).toFixed(2)}/5</h3>
            {rental.pending_approval || rental.pending_approval === null ?
            <button>Rental Pending Owner's Approval</button> : 
            <button onClick={() => handleReturnedToOwner()}>Returned Item Back to Owner</button>}
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

export default Rental