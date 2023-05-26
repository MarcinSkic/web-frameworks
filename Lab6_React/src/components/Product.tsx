import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { Product } from "../App";

export default function Product({
    product,
    onDelete,
}: {
    product: Product;
    onDelete: (id: number) => void;
}) {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="product">
            <div className="product-info">
                <div className="input-name">
                    <input type="checkbox" value="" required />
                    <p>{product.name}</p>
                </div>
                <p>{product.quantity}</p>
            </div>
            <div className="product-icons">
                <FiX onClick={() => onDelete(product.id)}></FiX>
            </div>
        </div>
    );
}
