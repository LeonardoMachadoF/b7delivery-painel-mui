import { Skeleton, TableCell, TableRow } from "@mui/material";

export const ProductTableSkeleton = () => (
    <TableRow>
        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
            <Skeleton variant="text" />
        </TableCell>
        <TableCell>
            <Skeleton variant="circular" width={50} height={50} />
        </TableCell>
        <TableCell>
            <Skeleton variant="text" />
        </TableCell>
        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
            <Skeleton variant="text" />
        </TableCell>
        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
            <Skeleton variant="text" />
        </TableCell>
        <TableCell >Ações</TableCell>
    </TableRow>
)