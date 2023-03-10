import React from 'react';
import {useState, useEffect} from 'react';
import Header from '../Header/Header.jsx'
import './App.css';
import axios from 'axios';
import ShoppingList from '../ShoppingList/ShoppingList';
import ListItem from '../ListItem/ListItem';


    function App() {

    const [itemName, setItemName] = useState('');
    const [itemQty, setItemQty] = useState('');
    const [itemUnit, setItemUnit] = useState('');
    const [itemArray, setItemArray] = useState([]);

    useEffect(() => {
        fetchList();
    }, []);

const fetchList = () => {
    axios
      .get("/list")
      .then((response) => {
        console.log("response from fetchList", response.data);
        setItemArray(response.data);
      })
      .catch((error) => {
        console.log("Cannot get list", error);
      });
  };

  const deleteIt = () => {
    axios({
      method: 'DELETE',
      url: `/list/${id}`,
    }).then(function(){
      fetchList();
    }).catch(function(error){
      console.log('Delete ERROR:', error);
    });
  }

const purchaseIt = ()=>{
  axios({
    method: "PUT",
    url: `/list/${id}`,
  }).then(function() {
    fetchList();
     
    })
    .catch(function(error) {
      console.log('PUT error:', error);
    });
}

  const addItem = (evt) => {
    evt.preventDefault();
    console.log(`${itemQty} ${itemUnit} of ${itemName}`);
    axios({
      method: 'POST',
      url: '/list',
      data: {
        name: itemName,
        quantity: itemQty,
        unit: itemUnit,
        purchased: false,
      }
    })
    .then((response) => {
      console.log('POST response:', response);
      setItemName('');
      setItemQty('');
      setItemUnit('');
      fetchList();
    })
    .catch((error) => {
      console.log('POST ERROR:', error);
    });
  }

  <ListItem deleteItProp={deleteIt}/>

    return (
        <div className="App">
            <Header />
            <main>
                <br />
            <form onSubmit={addItem}>
                <label htmlFor="name-input">Name:</label>
                <input id="name-input" value={itemName} onChange={e => setItemName(e.target.value)} />
                <label htmlFor="quantity-input">Quantity:</label>
                <input id="qty-input" value={itemQty} onChange={e => setItemQty(e.target.value)} />
                <label htmlFor="unit-input">Units:</label>
                <input id="unit-input" value={itemUnit} onChange={e => setItemUnit(e.target.value)} />
                <button type="submit">Done</button>
            </form>
                <p>Under Construction...</p>
                <ShoppingList itemArrayProp={itemArray}/>
            </main>
        </div>
    );
}

export default App;

// Unordered list - PLURCHAsed, DELETE by id
//GET, POST, DELETE, UPDATE
//clear and reset button
