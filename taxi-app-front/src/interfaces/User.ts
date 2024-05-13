export enum State {
    None = '',
    Waiting = 'Čeka',
    Approved = 'Odobren',
    Rejected = 'Odbijen'
}

export interface User {
    userName: string;
    email: string;
    password: string;
    passwordCheck: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    address: string;
    userType: string;
    image: string;
    state: string;
}