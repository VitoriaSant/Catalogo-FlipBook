import { api } from "@/services/api";

interface AuthResposta {
    token_Acesso: string;
    expiracao: string;
}

interface AuthError {
    idError: string;
    messageError: string;
    error: unknown;
}
export async function auth(){
    try {
        const autenticação = await api.post<AuthResposta>(
            import.meta.env.VITE_API_AUTH_URL,
            {
                token: import.meta.env.VITE_TOKEN_PESSOA,
                sistema: 1,
                quebra: 1,
            }
        );
        sessionStorage.setItem("auth_token", autenticação.data.token_Acesso);
    } catch (error) {
        throw {
            idError: "ERR_AUTH",
            messageError: "Falha na autenticação com a API",
            error,
        } as AuthError;
    }
}
