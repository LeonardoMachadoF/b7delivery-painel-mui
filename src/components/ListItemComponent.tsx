import { Link, ListItem, ListItemButton, ListItemText } from "@mui/material"

interface Props {
    disablePadding?: boolean;
    href?: string;
    color: string;
    primaryText: string;
    onClick?: () => void;
}

export const ListItemComponent = ({ disablePadding, href, color, primaryText, onClick }: Props) => {
    return (
        <ListItem disablePadding={disablePadding || true}>
            <ListItemButton>
                {href ?
                    <Link href={href} style={{ color, textDecoration: 'none' }}>
                        <ListItemText primary={primaryText} />
                    </Link>
                    :
                    <ListItemText primary={primaryText} onClick={onClick} />
                }
            </ListItemButton>
        </ListItem>
    )
}