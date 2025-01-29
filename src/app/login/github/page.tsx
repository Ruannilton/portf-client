'use client'
import { JwtToken } from '@/lib/models/jwtToken';
import { User } from '@/lib/models/user';
import { GetServerSideProps } from 'next';

export default function Home() {
    return (
        <div>
            <p>Redirecting...</p>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const code = context.query.code as string;

    if (!code) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const getJwtToken = async (code: string): Promise<JwtToken> => {
        const response = await fetch("http://localhost:3030/auth/github/callback?code=" + code);
        const data: JwtToken = await response.json() as JwtToken;
        return data;
    };

    const getUser = async (token: string): Promise<User> => {
        const response = await fetch("http://localhost:3030/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const user = await response.json() as User;
        return user;
    };

    try {
        const token = await getJwtToken(code);
        const user = await getUser(token.acces_token);

        context.res.setHeader('Set-Cookie', [
            `token=${token.acces_token}; Path=/; HttpOnly`,
            `user=${JSON.stringify(user)}; Path=/; HttpOnly`,
        ]);

        return {
            redirect: {
                destination: `/dashboard/${user.id}`,
                permanent: false,
            },
        };
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
};