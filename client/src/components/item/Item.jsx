import './item.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import Delete from '../delete/Delete';
export default function Item({ item, id }) {
    const [deleteOpen, setDeleteOpen] = useState(false)
    return (
        <div className="delete">

            <div className='item'>
                <div className="left">
                    <h3>{item}</h3>
                </div>
                <div className="right">
                    <div onClick={() => setDeleteOpen(!deleteOpen)}>
                        <DeleteIcon className='delete' />
                    </div>
                </div>
            </div>
            {deleteOpen && <Delete id={id} setDeleteOpen={setDeleteOpen} />}
        </div>
    )
}
