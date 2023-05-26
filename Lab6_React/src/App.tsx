import { useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import "./App.css";
export interface Product {
    id: number;
    name: string;
    category: string;
    quantity: number;
}

function App() {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "mleko",
            category: "diary",
            quantity: 1,
        },
        {
            id: 2,
            name: "chleb",
            category: "bread",
            quantity: 1,
        },
        {
            id: 3,
            name: "jabłka",
            category: "fruit&vagetables",
            quantity: 2,
        },
    ]);

    const deleteProduct = (id: number) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    return (
        <div className="App">
            <Header title="Lista zakupów" />
            <Products products={products} onDelete={deleteProduct} />
        </div>
    );
}

export default App;
