import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import { scryptSync } from "crypto";
import { MongooseAdapter } from "@choutkamartin/mongoose-adapter";
import User from "models/User";
import dbConnect from "lib/dbConnect";

export default NextAuth({
  adapter: MongooseAdapter(process.env.MONGODB_URI),
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await dbConnect();
        const salt = process.env.PASSWORD_SALT;
        const hashedPassword = scryptSync(
          credentials.password,
          salt,
          32
        ).toString("hex");
        const user = await User.findOne({
          email: credentials.email,
        }).exec();
        if (user !== null) {
          if (user.password === hashedPassword) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      await dbConnect();
      session.user = await User.findById(token.user.id || token.user._id);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    verifyRequest: "/auth/verify-request",
    newUser: null,
  },
  debug: false,
});
