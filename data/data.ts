export const users: User[] = [
    {
        name: 'Cafetería La CLABE',
        email: 'contacto@laclabecafeteria.com',
        nombre_de_la_cuenta: 'Carlos Eduardo García Ramírez',
        clabe: '0321800001183597',
        path: 'cafeteria-clabe',
        whatsapp: '8343040283',
        banco: 'STP'
    }
]

export interface User {
    name: string
    email: string
    nombre_de_la_cuenta: string
    clabe: string
    path: string
    whatsapp: string
    banco: string
}