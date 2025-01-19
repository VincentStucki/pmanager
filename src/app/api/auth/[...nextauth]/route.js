import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const res = await fetch("http://localhost:4000/api/auth/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(credentials),
                    });

                    if (!res.ok) {
                        console.log("API error:", res.status, res.statusText);  // Fehlerprotokoll
                        throw new Error("Invalid login");
                    }

                    const user = await res.json();
                    console.log("User logged in:", user); // Erfolgreiche Antwort überprüfen
                    return user || null;
                } catch (error) {
                    console.error("Authorization error:", error);
                    return null;
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,  // Umgebungsvariable verwenden
    pages: {
        signIn: "/login", // Login-Seite
    },
    session: {
        strategy: "jwt", // Verwenden von JWT für die Sessions
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };