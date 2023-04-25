"use client";
import { api } from "@/libs/api";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";

const Page = () => {
    const [info, setInfo] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [emailField, setEmailField] = useState<string>("");

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!emailField) {
            setError('Preencha e-mail e senha.');
            return;
        }

        setInfo("");
        setError("");
        setLoading(true);

        const result = await api.forgotPassword(emailField);

        setLoading(false);
        if (result.error) {
            setError(result.error);
        } else {
            setInfo("Enviamos um e-mail para a recuperação de sua senha.");
        }
    }

    return (
        <>
            <Typography component="p" sx={{ textAlign: 'center', mt: 2, color: '#555' }}>
                Deseja recuperar sua senha?
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

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                >
                    {loading ? 'Carregando...' : 'Recuperar a senha'}
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