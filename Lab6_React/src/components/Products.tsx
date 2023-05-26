import * as types from "../App";
import Product from "./Product";

export default function Products({
    products,
    onDelete,
}: {
    products: types.Product[];
    onDelete: (id: number) => void;
}) {
    return (
        <div className="products">
            {products.length > 0 ? (
                products.map((product) => (
                    <Product
                        key={product.id}
                        product={product}
                        onDelete={onDelete}
                    />
                ))
            ) : (
                <p>Brak produktów</p>
            )}
        </div>
    );
}
