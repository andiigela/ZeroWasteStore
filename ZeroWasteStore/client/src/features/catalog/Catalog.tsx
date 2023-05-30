import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/Product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

interface Props {
    color: string;
}

export default function Catalog(props: Props) {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded])

    return (
        <>  
            <h1>Catalog</h1>
            <ProductList color={ props.color } products={products} />
        </>
    );
}