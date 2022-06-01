import {useEffect} from 'react'

function MyRentals({user}) {

    useEffect(() => {
        fetch(`/users/${user.id}`)
        .then(res => res.json())
        .then(userData => {
            console.log(userData)
        })
    }, [])

    return(
        <div>
            <h1>Items I am Renting:</h1>
            <h1>Items People are Renting from Me:</h1>
        </div>
    )
}

export default MyRentals;