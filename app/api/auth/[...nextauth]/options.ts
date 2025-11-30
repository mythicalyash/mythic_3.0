import connectDB from "@/db/connectDB";
import User from "@/models/user.model";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                identifier: {
                    label: "Email",
                    type: "text",
                    placeholder: "Email"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "••••••••"
                }
            },
            async authorize(credentials: Record<"identifier" | "password", string> | undefined) {
                await connectDB();
                try {
                    const user = await User.findOne({
                        email: credentials?.identifier
                    });
                    if (!user) {
                        throw new Error("No user found!");
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials?.password || "", user.password);
                    if (!isPasswordCorrect) {
                        throw new Error("Incorrect password!");
                    }
                    return user;
                } catch (error) {
                    throw new Error("Error while logging in the user: " + error);
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
        signOut: "/logout",
        error: "/error"
    },
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token._id = user._id;
                token.accessGranted = user.accessGranted;
                token.avatar = user.avatar;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.collegeId = user.college;
            }
            return token;
        },
        async session({ session, user, token }) {
            if (token.email) {
                session.user.email = token.email;
                session.user._id = token._id;
                session.user.avatar = token.avatar;
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
                session.user.accessGranted = token.accessGranted;
                session.user.collegeId = token.collegeId;
            }
            return session;
        }
    }
}