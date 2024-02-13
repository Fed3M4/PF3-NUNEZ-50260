export interface Profesor{
    id: number;
    firstName: string;
    lastName: string;
    phone: number;
    email: string;
    password: string;
    curso: Cursos;
    isActive: boolean;
}

export interface Cursos {
    id: number;
    name: string;
    description: string;
    img: string;
}

export interface Alumnos {
    id: number;
    firstName: string;
    lastName: string;
    phone: number;
    email: string;
    password: string;
}