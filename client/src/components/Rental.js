import { useState } from "react"


function Rental({rental}) {

    const [showReviewForm, setShowReviewForm] = useState(false)
    const [error, setError] = useState(null)
    const [rating, setRating] = useState('')
    const [content, setContent] = useState('')

    function handleReturnedToOwner() {

    }

    function handleSubmitReview() {

    }
    return(
        <div key={rental.id}>
            <h2>{rental.item.name}</h2>
            <h3>{rental.start_date} - {rental.end_date}</h3>
            <h3>Rental Owner: {rental.item.owner.first_name} {rental.item.owner.last_name} </h3>
            <h3>Avg. Renter Rating: {rental.item.owner.rating}/5</h3>
            <button onClick={() => handleReturnedToOwner()}>Returned Item Back to Owner</button>
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