"use client";

import { api } from "@/libs/api";
import { Alert, Box, Button, Link as MuiLink, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { FormEvent, useState } from "react";

const Page = () => {
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [emailField, setEmailField] = useState<string>("");
    const [passwordField, setPasswordField] = useState<string>("");

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!emailField || !passwordField) {
            setError('Preencha e-mail e senha.');
            return;
        }

        setError("");
        setLoading(true);

        const result = await api.login(emailField, passwordField);
        setLoading(false);

        if (result.error) {
            setError(result.error);
        }
    }

    return (
        <>
            <Typography component="p" sx={{ textAlign: 'center', mt: 2, color: '#555' }}>
                Digite seus dados para entrar no painel administrativo do estabelecimento e gerenciar produtos/pedidos.
            </Typography>

            <Box component="form" sx={{ mt: 3, display: "flex", flexDirection: 'column', gap: 2, width: "100%" }} onSubmit={handleFormSubmit}>
                <TextField
                    label="Digite seu e-mail"
                    name="email"
                    required
                    autoFocus
                    onChange={e => setEmailField(e.target.value)}
                    value={emailField}
                    disabled={loading}
                />
                <TextField
                    label="Digite sua senha"
                    name="password"
                    type="password"
                    required
                    onChange={e => setPasswordField(e.target.value)}
                    value={passwordField}
                    disabled={loading}
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                >
                    {loading ? 'Carregando...' : 'Entrar'}
                </Button>

                {error &&
                    <Alert variant="filled" severity="error">{error}</Alert>
                }

                <Box>
                    <MuiLink href="/login/forgot" variant="body2" component={Link}>Esqueceu sua senha?</MuiLink>
                </Box>
            </Box >

        </>
    );
}

export default Page;