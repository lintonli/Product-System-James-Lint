export interface IUser {
    ID: string,
    UNAME: string,
    EMAIL: string,
    UPASSWORD: string,
    isDeleted: number,
    isEmailSent: number
}

export interface Payload {

    SUB: string,
    UNAME: string,

}

