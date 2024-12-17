import NextAuth from 'next-auth'
// import Keycloak from 'next-auth/providers/keycloak'
// import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth} = NextAuth({
    providers:[Google],
});