import { useEffect, useState } from "react";
import { Product } from "../../app/models/Product";
import ProductList from "./ProductList";

interface Props {
    color: string;
}

export default function Catalog(props: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    

    useEffect(() => {
        fetch('http://localhost:5280/api/Products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, [])

    
    return (
        <>  
            <h1>Catalog</h1>
            <ProductList color={ props.color } products={products} />
        </>
    );
}