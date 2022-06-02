

function RequestedRental({rental, rerender, setRerender}) {

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
    return(
        <div key={rental.id} className='my-rental-item'>
            <h2>{rental.item.name}</h2>
            <h3>Requested Dates: {rental.start_date} - {rental.end_date}</h3>
            <h3>Requestor: {rental.renter.first_name} {rental.renter.last_name} </h3>
            <h3>Renter Rating: {(Math.round(rental.renter.rating * 100) / 100).toFixed(2)}/5</h3>
            <button onClick={() => handleApproval(rental.id)} className='approve-reject-button'>Approve Request</button>
            <button onClick={() => handleRejection(rental.id)}className='approve-reject-button'>Reject Request</button>
        </div>
    )
}

export default RequestedRental