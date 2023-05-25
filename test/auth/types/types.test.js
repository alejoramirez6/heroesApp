import { types } from "../../../src/auth/types/types";

describe('Pruebas en el types', () => { 

    test('Debe de regresar estos stypes', () => { 

        expect( types ).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        });
     })


 });