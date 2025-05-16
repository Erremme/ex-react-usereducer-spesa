
import { useReducer } from "react";

 function cartReducer(addedProducts, action) {
    switch (action.type){
      case 'ADD_TO_CART':
        const existingProduct = addedProducts.find(item => item.name === action.payload.name);
        if(existingProduct){
          action.payload.quantity = existingProduct.quantity + 1;
        }else{
          return [
            ...addedProducts,
            { ...action.payload, quantity: 1 }
          ]
        }
       

    case 'UPDATE_PRODUCT_QUANTITY':{
      if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
        return addedProducts
      }else {
        return addedProducts.map((item) => item.name === action.payload.name ? 
        { ...item, quantity: action.payload.quantity } : item);
      }
      
    }
      
    case 'REMOVE_FROM_CART':
      return addedProducts.filter(product => product.name !== action.payload);
    default:
      return addedProducts;
  }   
       
  }


export default function App() {
  
  
  const [addedProducts, dispatch] = useReducer(cartReducer, []);

 

  // array di oggetti per i prodotti
   const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];


 
 let total = 0;
 
  return (
    <div>
    <div className="lista-spesa">
      <h1>Lista della spesa</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.price.toFixed(2)} €
            <div>
       
            <button onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}>Aggiungi al carrello</button>
           <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: product.name })}>Rimuovi dal carrello</button>
            </div>
           
          </li>
        ))}
      </ul>
    </div>

    {addedProducts && (
      <div className="carrello">
        <h2>Carrello</h2>
        <ul>
          {  addedProducts.map((product, index) => (
            <li key={index}>
              {product.name}  {product.price.toFixed(2)}  
                <input
                   type="number"
                   min="1"
                   value={product.quantity }
                   onChange={e => dispatch({
                    type: 'UPDATE_PRODUCT_QUANTITY',
                    payload: { name: product.name, quantity: parseInt(e.target.value) }
  })}
/>
            </li>
          ))}
        </ul>
      </div>
    )}
    {addedProducts && (
      <div className="totale">
        <h2>Totale</h2>
        <p>
          {addedProducts.reduce((acc, product) => {
            total = acc + (product.price * product.quantity);
          ;
            return total; 
          
          }, 0)} €
        </p>
      </div>
    )}
    </div>
    
  );
}