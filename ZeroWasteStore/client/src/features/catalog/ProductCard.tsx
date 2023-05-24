import {
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


interface Props {
    product: Product;
    color: string
}
export default function ProductCard({product}:Props) {
    // @ts-ignore
    return (
        <Card>
            <CardHeader sx={{ height: 50 }}
                avatar={
                    <Avatar sx={{width: 30,height: 30}}>{product.name.charAt(0).toUpperCase()}</Avatar>

                }
                title={product.name}
                titleTypographyProps={{
                    style: {
                        fontSize: '14px', fontWeight: 'bold', color: 'primari.main'}
                }}
            />
            <CardMedia
                component="img"
                alt="green iguana"
                height="290"
                
                image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnLhiIch4qYn_lyWcxagcgJjYAcGb9EdcueA&usqp=CAU"}
                title={product.name}
            />
            <CardContent sx={{position: 'relative', bottom: 10,height:80}}>
                <Typography gutterBottom color='third' variant="h6" >
                    ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{position: 'relative', bottom: 8}}>
                    {product.brand} / { product.type }
                </Typography>
            </CardContent>
            <CardActions sx={{ height: 40, position: 'relative', bottom: 15, left: 5 }}>
                <Button size="small" sx={{ backgroundColor: 'rgb(1,1,1)', fontSize: '11px', padding: '10px', color: 'white', fontWeight: 'bold', ":hover": { backgroundColor: 'rgb(102, 161, 255)' } }}>Add to Cart</Button>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">view</Button>
                
            </CardActions>
        </Card>
    );
}