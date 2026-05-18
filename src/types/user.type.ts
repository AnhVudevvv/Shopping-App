export interface IUser {
    userid: number;
    email:string;
    password:string;
}

export const userList:IUser[]=[
    {
        userid:1,
        email:"tranvu051004@gmail.com",
        password:"123456"
    },
    {
        userid:2,
        email:"vu174657@gmail.com",
        password:"123456"
    }
]