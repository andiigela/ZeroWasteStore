﻿import {
    ListItemAvatar,
    ListItemText,
    ListItem,
    Avatar,
    Button,
    Card,
    CardContent,
    Typography,
    CardMedia,
    CardActions,
    CardHeader,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/Product";
import {useState} from "react";
import agent from "../../app/api/agent";
import {useStoreContext} from "../../app/context/StoreContext";
import {currencyFormat} from "../../app/util/util";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, setBasket } from "../basket/basketSlice";


interface Props {
    product: Product;
    color: string
}
export default function ProductCard(props: Props) {

    const { status } = useAppSelector(state => state.basket);

    const dispatch = useAppDispatch();

    
 
    
    return (
        <Card>
            <CardHeader sx={{ height: 50 }}
                avatar={
                    <Avatar sx={{width: 30,height: 30}}>{props.product.name.charAt(0).toUpperCase()}</Avatar>

                }
                title={props.product.name}
                titleTypographyProps={{
                    style: {
                        fontSize: '14px', fontWeight: 'bold', color:props.color}
                }}
            />
            <CardMedia
                component="img"
                alt="green iguana"
                height="290"

                image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnLhiIch4qYn_lyWcxagcgJjYAcGb9EdcueA&usqp=CAU"}
                title={props.product.name}
            />
            <CardContent sx={{ position: 'relative', bottom: 10, height: 80 }}>
                <Typography gutterBottom color='third' variant="h6" >
                    {currencyFormat(props.product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{position: 'relative', bottom: 8}}>
                    {props.product.brand} / { props.product.type }
                </Typography>
            </CardContent>
            <CardActions sx={{ height: 40, position: 'relative', bottom: 15, left: 5 }}>
                <LoadingButton loading={status.includes('pendingAddItem' + props.product.id)} onClick={() => dispatch(addBasketItemAsync({ productId: props.product.id}))} size="small" sx={{ backgroundColor: props.color, fontSize: '11px', padding: '10px', color: 'white', fontWeight: 'bold', ":hover": { backgroundColor: 'rgb(102, 161, 255)' } }}>Add to Cart</LoadingButton>
                <Button component={Link} to={`/catalog/${props.product.id}`} size="small" sx={{ color: 'rgb(69, 139, 255)', ":hover": { backgroundColor: 'rgb(245, 245, 245)' } }}>View</Button>
            </CardActions>
        </Card>
    );
}