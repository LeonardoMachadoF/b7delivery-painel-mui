"use client";
import { api } from "@/libs/api";
import { Alert, Link as MuiLink, Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { FormEvent, useState } from "react";

const Page = () => {
    return (
        <>
            <Alert variant="filled" severity="error" sx={{ mt: 3, mb: 3 }}>
                Este link expirou, refaça o procedimento.
            </Alert>

            <MuiLink href="/login/forgot" component={Link} variant="button">
                Esqueci minha senha
            </MuiLink>
        </>
    );
}

export default Page;