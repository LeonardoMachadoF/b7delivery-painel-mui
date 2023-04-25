"use client";
import { api } from "@/libs/api";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";

const Page = () => {
    const [info, setInfo] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [passwordField, setPasswordField] = useState<string>("");
    const [passwordField2, setPasswordField2] = useState<string>("");

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!passwordField || !passwordField2) {
            setError('Preencha e-mail e senha.');
            return;
        }
        if (passwordField !== passwordField2) {
            setError("As senhas não batem.");
            return;
        }

        setInfo("");
        setError("");
        setLoading(true);

        const result = await api.redefinePassword(passwordField, 'tokenhere');

        setLoading(false);
        if (result.error) {
            setError(result.error);
        } else {
            setInfo("Senha redefinida, agora você pode fazer o login");
            setPasswordField("");
            setPasswordField2("");
        }
    }

    return (
        <>
            <Typography component="p" sx={{ textAlign: 'center', mt: 2, color: '#555' }}>
                Olá *USUARIO* defina sua nova senha abaixo
            </Typography>

            <Box component="form" sx={{ mt: 3, display: "flex", flexDirection: 'column', gap: 2, width: "100%" }} onSubmit={handleFormSubmit}>
                <TextField
                    label="Digite sua nova senha"
                    name="password"
                    type="password"
                    required
                    autoFocus
                    onChange={e => setPasswordField(e.target.value)}
                    value={passwordField}
                    disabled={loading}
                />
                <TextField
                    label="Digite sua nova senha novamente"
                    name="password2"
                    type="password"
                    required
                    autoFocus
                    onChange={e => setPasswordField2(e.target.value)}
                    value={passwordField2}
                    disabled={loading}
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                >
                    {loading ? 'Carregando...' : 'Definir nova senha'}
                </Button>

                {error &&
                    <Alert variant="filled" severity="error">{error}</Alert>
                }
                {info &&
                    <Alert variant="filled" severity="success">{info}</Alert>
                }
            </Box >

        </>
    );
}

export default Page;