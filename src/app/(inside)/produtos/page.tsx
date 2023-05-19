"use client"

import { ProductEditDialog } from "@/components/ProductEditDialog";
import { ProductTableItem } from "@/components/ProductTableItem";
import { ProductTableSkeleton } from "@/components/ProductTableSkeleton";
import { api } from "@/libs/api";
import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

const Page = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>();
    const [categories, setCategories] = useState<Category[]>([]);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product>();
    const [loadingDelete, setLoadingDelete] = useState(false);

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product>();
    const [loadingEditDialog, setLoadingEditDialog] = useState(false);

    const getProducts = async () => {
        setLoading(true);
        setProducts(await api.getProducts());
        setCategories(await api.getCategories());
        setLoading(false);
    }

    useEffect(() => {
        getProducts();
    }, [])

    //Delete
    const handleDeleteProduct = (product: Product) => {
        setProductToDelete(product);
        setShowDeleteDialog(true);
    }

    const handleConfirmDelete = async () => {
        if (productToDelete) {
            setLoadingDelete(true);
            await api.deleteProduct(productToDelete.id);
            setLoadingDelete(false);
            setShowDeleteDialog(false);
            getProducts();
        }
    }


    //New

    const handleNewProduct = () => {
        setProductToEdit(undefined);
        setEditDialogOpen(true);
    }
    const handleEditProduct = (product: Product) => {
        setProductToEdit(product);
        setEditDialogOpen(true);
    }

    const handleSaveEditDialog = async (event: FormEvent<HTMLFormElement>) => {
        let form = new FormData(event.currentTarget);

        setLoadingEditDialog(true);
        if (productToEdit) {
            form.append('id', productToEdit.id.toString());
            await api.updateProduct(form);
        } else {
            await api.createProduct(form);
        }
        setLoadingEditDialog(false);
        setEditDialogOpen(false);

        getProducts();
    }

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

                    <Dialog open={showDeleteDialog} onClose={() => !loadingDelete ? setShowDeleteDialog(false) : null}>
                        <DialogTitle>Tem certeza que deseja deletar esse produto?</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Não é possivel voltar atrás após confirmar essa ação.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button disabled={loadingDelete} onClick={() => setShowDeleteDialog(false)}>Não</Button>
                            <Button disabled={loadingDelete} onClick={handleConfirmDelete}>Sim</Button>
                        </DialogActions>
                    </Dialog>

                    <ProductEditDialog
                        open={editDialogOpen}
                        onClose={() => setEditDialogOpen(false)}
                        onSave={handleSaveEditDialog}
                        disabled={loadingEditDialog}
                        product={productToEdit}
                        categories={categories}
                    />
                </Box>
            </Box >
        </>
    )
}

export default Page;