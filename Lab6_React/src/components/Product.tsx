import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { GiMilkCarton, GiShinyApple, GiSlicedBread } from "react-icons/gi";
import { Product } from "../App";

export default function Product({
    product,
    onDelete,
}: {
    product: Product;
    onDelete: (id: number) => void;
}) {
    const [isChecked, setIsChecked] = useState(false);

    const productIcons: { [key: string]: React.JSX.Element } = {
        diary: <GiMilkCarton className="category"></GiMilkCarton>,
        bread: <GiSlicedBread className="category"></GiSlicedBread>,
        "fruit&vegetables": <GiShinyApple className="category"></GiShinyApple>,
    };

    return (
        <div className="product">
            {productIcons[product.category]}
            <div className="product-info">
                <div className="input-name">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        value={isChecked + ""}
                        onChange={() => setIsChecked(!isChecked)}
                        required
                    />
                    <p className={isChecked ? "checked" : ""}>{product.name}</p>
                </div>
                <p>{product.quantity}</p>
            </div>
            <div className="product-icons">
                <FiX onClick={() => onDelete(product.id ?? -1)}></FiX>
            </div>
        </div>
    );
}
