function ListItem({item, deleteItProp}){

    console.log(deleteItProp);

    const purchaseIt = () => {
        console.log('purchaseIt CLICKED');
    }

    const deleteIt = () => {
        console.log('deleteIt CLICKED');
        deleteItProp(item.id);
    }

    return(
        <li >
            {item.quantity} {item.unit} of {item.name} 
            <button onClick={() => { purchaseIt() }}>Purchased</button>
            <button onClick={() => { deleteIt() }}>Delete</button>
        </li>
    )
}


export default ListItem;