import { User } from "../types/User";

export const saveToken =  (token: string)=>{
    localStorage.setItem(
        process.env.NEXT_PUBLIC_TOKEN_KEY || "token",
        token
    );
};

export const saveUser = (user: User)=>{
    localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): User | null =>{
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const getToken = ()=>{
    return localStorage.getItem(
        process.env.NEXT_PUBLIC_TOKEN_KEY || "token"
    );
}

export const removeToken = ()=>{
    localStorage.removeItem(
        process.env.NEXT_PUBLIC_TOKEN_KEY || "token"
    );
};
