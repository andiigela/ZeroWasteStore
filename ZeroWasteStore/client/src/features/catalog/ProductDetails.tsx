﻿import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/Product";

export default function ProductDetails() {
    const { id } = useParams<{ id: string | string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5280/api/Products/${id}`) //  agent.Catalog.details(parseInt(id)) 
            .then(response => setProduct(response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <h3>Loading ...</h3>
    if (!product) return <h3>Product not found</h3>


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
            </Grid>
        </Grid>
    );
}