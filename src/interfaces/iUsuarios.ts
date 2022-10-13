export interface iUsuarios {
    id: string;
    name: string;
    avatar?: string | null;
    email: string;
    password: string;
    token: string | null;
    created_at: Date;
    updated_at: Date;
}

export interface iUserDTO{
    id: string;
    name: string;
    avatar?: string
}