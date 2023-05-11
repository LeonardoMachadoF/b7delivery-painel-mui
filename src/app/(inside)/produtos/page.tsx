"use client"

import { ProductTableItem } from "@/components/ProductTableItem";
import { ProductTableSkeleton } from "@/components/ProductTableSkeleton";
import { api } from "@/libs/api";
import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Page = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>();
    const [categories, setCategories] = useState<Category[]>();

    const getProducts = async () => {
        setLoading(true);
        setProducts(await api.getProducts());
        setCategories(await api.getCategories());
        setLoading(false);
    }

    const handleEditProduct = (product: Product) => { }
    const handleDeleteProduct = (product: Product) => { }

    useEffect(() => {
        getProducts();
    }, [])

    const handleNewProduct = () => { }

    return (
        <>
            <Box sx={{ my: 3 }}>
                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                        <Typography component='h5' variant="h5" sx={{ color: '#555', mr: 2 }}>
                            Produtos
                        </Typography>
                        <Button onClick={handleNewProduct}>Novo Produto</Button>
                    </Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: 50, display: { xs: 'none', md: 'table-cell' } }}>ID</TableCell>
                                <TableCell>Imagem</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Preço</TableCell>
                                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Categoria</TableCell>
                                <TableCell sx={{ width: { xs: 50, md: 130 } }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ?
                                <>
                                    <ProductTableSkeleton />
                                    <ProductTableSkeleton />
                                    <ProductTableSkeleton />
                                </>
                                :
                                products?.map(product => (
                                    <ProductTableItem
                                        key={product.id}
                                        item={product}
                                        onEdit={handleEditProduct}
                                        onDelete={handleDeleteProduct}
                                    />
                                ))
                            }
                        </TableBody>
                    </Table>
                </Box>
            </Box >
        </>
    )
}

export default Page;