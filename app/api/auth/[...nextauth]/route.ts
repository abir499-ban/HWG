import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module 'next-auth' {
    interface Session {
        accessToken: string;
        user: {
            username: string;
        };
    }
    interface User {
        username: string;
        accessToken: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id : 'farmer_login',
            name: 'DigitalFarmerID',
            credentials: {
                digitalID: { name: 'Digital farmer Id', type: "text" },
                password: { name: 'Password', type: 'password' },
            },
            authorize: async (credentials: Record<string, string> | undefined, req) => {
                if (!credentials) return null
                const { digitalID, password } = credentials

                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/farmer/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        digitalID, password
                    })
                })

                const data = await res.json()
                if (res.ok && data?.username && data?.accessToken) {
                    return data
                }
                return null;

            },
        }),
        CredentialsProvider({
            id : 'loan_shark_login',
            name: 'LoanSharkLogin',
            credentials:{
                aadharCard : {name : 'Aadhaar Card Number' , type : 'text'},
                password : { name : 'Password' , type : 'password'}
            },
            authorize: async(credentials : Record<string , string> | undefined , req)=>{
                if(!credentials) return null
                const {aadharCard , password} = credentials

                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/loanshark/login` , {
                    method : 'POST',
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        aadharCard , password
                    })
                })

                const data = await res.json()
                if(res?.ok && data) return data
                return null
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            //Store accessToken and name in the JWT on initial login
            if (user) {
                token.username = user.username
                token.accessToken = user.accessToken
            }
            return token
        },

        async session({ session, token }) {
            // Pass accessToken and name to the session
            session.accessToken = token.accessToken as string
            session.user = {
                username: token.username as string
            }
            return session
        }
    },

    session: {
        strategy: 'jwt'
    },

    pages: {
        signIn: '/auth/signin', 
    },
    secret: process.env.NEXTAUTH_SECRET,

}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }