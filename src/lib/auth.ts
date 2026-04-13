/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      // ✅ FIXED authorize
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const response = await res.json();
          console.log("Backend login response:", response);

          if (!res.ok || !response?.status) {
            throw new Error(response?.message || "Login failed");
          }

          const user = response?.data?.user;
          const accessToken = response?.data?.accessToken;

          if (!user || !accessToken) {
            throw new Error("Invalid login response from server");
          }

          // ✅ Role check
          if (user.role !== "USER") {
            throw new Error("Only user are allowed to login here");
          }

          // ✅ MUST match User type
          return {
            id: user._id,
            name: user.email,
            email: user.email,
            role: user.role,
            accessToken: accessToken,
            profileImage: user.profileImage || "", // ✅ FIX
          };
        } catch (error) {
          console.error("Authentication error:", error);

          throw new Error(
            error instanceof Error ? error.message : "Authentication failed"
          );
        }
      },
    }),
  ],

  callbacks: {
    // ✅ JWT callback
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.profileImage = user.profileImage;
      }

      return token;
    },

    // ✅ Session callback
    async session({ session, token }: { session: any; token: JWT }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
        accessToken: token.accessToken,
        profileImage: token.profileImage,
      };

      return session;
    },
  },

  pages: {
    signIn: "/login", // optional custom login page
  },
};