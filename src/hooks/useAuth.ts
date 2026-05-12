import { useMutation } from "@tanstack/react-query"
import { logout } from "../features/auth/services/auth.service"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { removeToken } from "../lib/auth";


export const useLogout=()=>{
    const router = useRouter();
    
return useMutation({
    mutationFn: logout,



    onSuccess: () => {
        removeToken();
        // the refresh token is removed in the backend too
        toast.success("Logged out successfully");
        router.push("/login");
    },
    
    onError:(error:any)=>{
        toast.error(error.message);
    }
})
}