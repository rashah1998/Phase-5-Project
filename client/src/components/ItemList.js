import ItemCard from "./ItemCard";

function ItemList({items}) {

    const renderItems = items.map(item => <ItemCard key={item.id} item={item}/>)

    return(
        <div id='main-item-list'>
            {renderItems}
        </div>
    )
}

export default ItemList;