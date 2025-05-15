import { useState } from "react";

export default function App() {
  const [addedProducts, setAddedProducts] = useState([]);



  const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];


 
   /*const addToCart = (e) => {
    const product = e.target.parentElement.innerText.split(' - ')[0];
    const price = e.target.parentElement.innerText.split(' - ')[1].split(' €')[0];
     const quantity = 1;
     const newProduct = { name: product, price: price , quantity: quantity };
    const existingProduct = addedProducts.find(item => item.name === product);
    if(newProduct.name !== existingProduct?.name){
       setAddedProducts([...addedProducts, newProduct]);
    }*/

       const addToCart = (product) => {
        
        const productQuantity = 1;
        const newProduct = {...product, quantity: productQuantity };
        const existingProduct = addedProducts.find(item => item.name === product.name);
        if(!existingProduct){
       setAddedProducts([...addedProducts, newProduct]);

       }
      
     

    
   
   
   }
   
 

 console.log(addedProducts);
  return (
    <div>
    <div className="lista-spesa">
      <h1>Lista della spesa</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.price} €
            <button onClick={() =>  addToCart(product)} className="add">Aggiungi al carrello</button>
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
    </div>
  );
}