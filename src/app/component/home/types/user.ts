export interface User {
email : string;
name : string;
address: string;
state: string;
city: string;
pin: string;
phone_no : string;
password: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface LoggedInUser {
    name: string;
    email: string;
    address: string;
    pin: string;    
    phNumber: string;
    state: string;
    city: string;
}
export interface LoginToken {
    expires: number;
    token: string;
    user: LoggedInUser;
}
