import { useState } from "react";

export default function App() {
  // useState per gestire lo stato del carrello
  const [addedProducts, setAddedProducts] = useState([]);

  // array di oggetti per i prodotti
   const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

     // funzione per modificare la quantità di un prodotto
     const updateProductQuantity = (product, event ) => {
      const newQuantity = event.target.value;
        const updateProducts = addedProducts?.map(item => {
          if(item.name === product.name && newQuantity > 0 && !newQuantity.includes(".")){ 
             item.quantity = newQuantity;
          }
           return item;
          
        })
        setAddedProducts([...updateProducts]);
       }



      // Funzione per aggiungere un prodotto al carrello
       const addToCart = (product) => {  
        const productQuantity = 1;
        const newProduct = {...product, quantity: productQuantity };
        const existingProduct = addedProducts.find(item => item.name === product.name);
        if(!existingProduct){
           return setAddedProducts([...addedProducts, newProduct]);
       }else{
        return updateProductQuantity(product);
       }
   
   }

  // Funzione per rimuovere un prodotto dal carrello
  const removeFromCart = (product) => {
    const  productToRemove = addedProducts.find(item => item.name === product.name);
    if(productToRemove){
      const updatedProducts = addedProducts.filter(item => item.name !== product.name);
      setAddedProducts(updatedProducts);
  }
}
 
 let total = 0;
 console.log(addedProducts);
  return (
    <div>
    <div className="lista-spesa">
      <h1>Lista della spesa</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.price} €
            <div>
              <input 
              type="number" 
              min="1"
              value={product.quantity}
              
              onChange={(e) => updateProductQuantity(product, e)}
               />
            <button onClick={() =>  addToCart(product)} className="add">Aggiungi al carrello</button>
            <button onClick={() =>  removeFromCart(product)} className="add">Rimuovi dal carrello</button>
            </div>
           
          </li>
        ))}
      </ul>
    </div>

    {addedProducts && (
      <div className="carrello">
        <h2>Carrello</h2>
        <ul>
          {addedProducts.map((product, index) => (
            <li key={index}>
              {product.name} - {product.price} € - Quantità: {product.quantity}
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
            total = acc + product.price * product.quantity;
            
            return total 
          
          }, 0.)} €
        </p>
      </div>
    )}
    </div>
    
  );
}