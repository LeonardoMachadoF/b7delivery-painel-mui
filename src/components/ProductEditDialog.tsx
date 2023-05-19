import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import { Box, Button, Dialog, DialogContent, DialogTitle, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FormEvent } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (event: FormEvent<HTMLFormElement>) => void;
    categories: Category[];
    product?: Product;
    disabled?: boolean;
}

export const ProductEditDialog = ({ open, categories, onClose, onSave, disabled, product }: Props) => {
    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave(event);
    }



    return (
        <Dialog open={open}>
            <DialogTitle>{product ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
            <DialogContent>
                <Box component="form" encType="multipart/form-data" onSubmit={handleFormSubmit}>
                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor="imgField">Imagem</InputLabel>
                        <Input
                            id="imgField"
                            name="image"
                            type="file"
                            fullWidth
                            disabled={disabled}
                            inputProps={{ accept: 'image/*' }}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor="nameField">Imagem</InputLabel>
                        <TextField
                            id="nameField"
                            variant='standard'
                            name="name"
                            defaultValue={product?.name}
                            required
                            fullWidth
                            disabled={disabled}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor="priceField">Preço (em R$)</InputLabel>
                        <TextField
                            id="priceField"
                            variant='standard'
                            name="price"
                            type="number"
                            defaultValue={product?.price}
                            required
                            fullWidth
                            disabled={disabled}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor="descField">Descrição</InputLabel>
                        <TextField
                            id="descField"
                            variant='standard'
                            name="description"
                            defaultValue={product?.description}
                            multiline
                            rows={4}
                            required
                            fullWidth
                            disabled={disabled}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor="catField">Categoria</InputLabel>
                        <Select
                            id="catField"
                            variant='standard'
                            name="category"
                            defaultValue={product?.category.id || categories[0]}
                            required
                            fullWidth
                            disabled={disabled}
                        >
                            {categories.map(item => (
                                <MenuItem key={item.id} value={item.id}>{item.id}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: "flex-end" }}>
                        <Button disabled={disabled} onClick={onClose}>Cancelar</Button>
                        <Button disabled={disabled} type="submit">Salvar</Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}