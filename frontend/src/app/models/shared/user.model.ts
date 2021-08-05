export interface User {
    id: number;
    userName: string;
    iconURL?: string;
    email: string;
    description: string;
    gender: boolean;
    birthday: Date;
    country: string;
    password: string;
}
