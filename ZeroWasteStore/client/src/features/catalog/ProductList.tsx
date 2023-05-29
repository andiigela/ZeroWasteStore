import { Grid, List } from "@mui/material";
import { Product } from "../../app/models/Product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[],
    color: string;
}
export default function ProductList(props: Props) {
    return (
        <Grid container spacing={4}>
            {props.products.map((product) => (
                <Grid item xs={4} key={product.id}>
                    <ProductCard color={props.color} product={product} />
                </Grid>
            ))}
        </Grid>
    );
}