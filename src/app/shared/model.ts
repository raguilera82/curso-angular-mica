import { Base } from "./state/crud/model";

export interface Libro extends Base {
    titulo: string;
    sinopsis: string;
}

export interface MessageState {
    msg: string;
}

export enum ActionForm {
    SAVE, EDIT, DELETE
}

export interface AuthToken {
    token: string;
}

export interface Credentials {
    username: string;
    password: string;
}