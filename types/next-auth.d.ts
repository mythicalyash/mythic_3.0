import { DefaultSession } from "next-auth";

declare module "next-auth"{
    interface Session{
        user: {
            _id?: string;
            avatar?: string;
            firstName?: string;
            lastName?: string;
            accessGranted?: boolean;
            collegeId?: string;
        } & DefaultSession["user"]
    }

    interface User{
        _id?: string;
        email?: string;
        avatar?: string;
        firstName?: string;
        lastName?: string;
        accessGranted?: boolean;
        college?: string;
    }
}

declare module "next-auth/jwt"{
    interface JWT{
        _id?: string;
        accessGranted?: boolean;
        email?: string;
        avatar?: string;
        firstName?: string;
        lastName?: string;
        collegeId?: string;
    }
}