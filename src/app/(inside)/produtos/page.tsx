"use client"

import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Page = () => {
    const [loading, setLoading] = useState(true);

    const handleNewProduct = () => { }

    return (
        <>
            <Box sx={{ my: 3 }}>
                <Box sx={{ display: "flex", justifyContent: 'space-between', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                                <TableCell sx={{ xs: 50, md: 130 }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody></TableBody>
                    </Table>
                </Box>
            </Box >
        </>
    )
}

export default Page;