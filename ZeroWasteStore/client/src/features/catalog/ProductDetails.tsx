import {
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/Product";
import { LoadingButton } from "@mui/lab";
import { BasketItem } from "../../app/models/basket";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "../basket/basketSlice";

export default function ProductDetails() {
    const { basket,status } = useAppSelector(state => state.basket);
    const dispatch  = useAppDispatch();
    const { id } = useParams<{ id: string | string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items?.find(i => i.productId === product?.id);
    

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        axios.get(`http://localhost:5280/api/Products/${id}`) //  agent.Catalog.details(parseInt(id)) 
            .then(response => setProduct(response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id, item]);

    function handleInputChange(event: any) {
        if (event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));
        }
    }
    
    function handleUpdateCart() {
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }));
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }));
        }
    }

    if (!product) return <h1>Loading or Product not found ...</h1>;
    

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src="https://www.thisiscolossal.com/wp-content/uploads/2019/12/soapbottle-4.jpg" alt={product.name} style={{ width: '100%', height: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h6'>{product.name}</Typography>
                <Divider sx={{ mb: 2 }}></Divider>
                <Typography variant='h4' color='secondary'>${product.price.toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in Stock</TableCell>
                                <TableCell>{product.quantityStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleInputChange}
                            variant='outlined'
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity || !item && quantity === 0}
                            loading={status.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{ height: '55px' }}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}