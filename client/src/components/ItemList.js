import ItemCard from "./ItemCard";
import '../styles/ItemList.css'

function ItemList({items, filterItemType}) {

    const renderItems = items
        .filter(item => {
            if(filterItemType === ''){
                return true;
            } else {
                return item.item_type === filterItemType
            }
        })
        .map(item => <ItemCard key={item.id} className='main-item-card' item={item}/>)

    return(
        <div id='main-item-list'>
            {renderItems}
        </div>
    )
}

export default ItemList;