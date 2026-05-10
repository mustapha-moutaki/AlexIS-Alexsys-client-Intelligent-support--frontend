"use client";

import { User } from "@/src/types/User";

interface Props {
    user: User;
}
export default function ClientEditForm({user}: Props) {
    return (
        <div>
            <h1>Client Edit Form</h1>
            <p>{user.firstName} {user.lastName}</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <p>{user.phoneNumber}</p>
            
        </div>
    );
}