import { Box, Divider, Drawer, List, Typography } from "@mui/material";
import { ListItemComponent } from "./ListItemComponent";

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    onLogout: () => void;
}

export const HeaderDrawer = ({ open, onClose, title, onLogout }: Props) => {
    return (
        <Drawer
            variant='temporary'
            open={open}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
            sx={{
                display: {
                    xs: 'block',
                    sm: 'none'
                },
                '& .MuiDrawer-paper': { width: '70%' }
            }}
        >
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h6' sx={{ my: 2 }}>{title}</Typography>
                <Divider />
                <List>
                    <ListItemComponent href="/pedidos" color='#000' primaryText="Pedidos" />
                    <ListItemComponent href="/produtos" color='#000' primaryText="Produtos" />
                    <ListItemComponent href="/categorias" color='#000' primaryText="Categorias" />
                    <ListItemComponent color='#000' primaryText="Sair" onClick={onLogout} />
                </List>
            </Box>
        </Drawer>
    );
}