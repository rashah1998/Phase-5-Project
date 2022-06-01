

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
        <div key={rental.id}>
            <h2>{rental.item.name}</h2>
            <h3>{rental.start_date} - {rental.end_date}</h3>
            <h3>Rental Requestor: {rental.renter.first_name} {rental.renter.last_name} </h3>
            <h3>Avg. Renter Rating: {rental.renter.rating}/5</h3>
            <button onClick={() => handleApproval(rental.id)}>Approve Request</button>
            <button onClick={() => handleRejection(rental.id)}>Reject Request</button>
        </div>
    )
}

export default RequestedRental