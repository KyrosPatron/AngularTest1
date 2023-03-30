export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;

}

export interface UserFromJson {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}