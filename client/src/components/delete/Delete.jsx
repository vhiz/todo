import { useState } from 'react'
import { makeRequest } from '../../axios'
import './delete.scss'

export default function Delete({ id, setDeleteOpen }) {
    const [error, setError] = useState(null)

    const handleDelete = async () => {
        try {
            await makeRequest.delete(`/todos/${id}`)
            window.location.reload()
        } catch (error) {
            setError(error)
        }
    }
    return (
        <div className='deletei'>
            <div className="left">
                <h2>Are you sure you want to delete</h2>
            </div>
            <div className="right">
                <button className='yes' onClick={handleDelete}>yes</button>
                <button className='no' onClick={() => setDeleteOpen(false)}>no</button>
            </div>
            {error && error}
        </div>
    )
}
