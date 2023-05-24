import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/Product";
import ProductList from "./ProductList";

interface Props {
    color: string;
}

export default function Catalog(props: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    

    useEffect(() => {
        agent.Catalog.list()
            .then(products => setProducts(products));
    }, [])

    
    return (
        <>  
            <h1>Catalog</h1>
            <ProductList color={ props.color } products={products} />
        </>
    );
}