import Item from '../item/Item'
import './list.scss'
export default function List({ todo }) {

    return (
        <div className='list'>
            <Item item={todo.items} id={todo.id} />
        </div>
    )
}
