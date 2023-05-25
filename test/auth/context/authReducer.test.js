import { render, screen } from "@testing-library/react";
import { authReducer } from "../../../src/auth/context/authReducer";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { types } from "../../../src/auth/types/types";

describe('Pruebas en el authReducer', () => { 
    const initialState = {
        logged: false,
    };
    test('debe retornar el estado por defecto', () => { 
        const state = authReducer( initialState, {} );
        expect(state).toBe(initialState);
        expect(state).toEqual(initialState);
     });


    test('debe de (login )llamar el login autenticar y establecer el user', () => {

        const action = {
            type: types.login,
            payload: {
                name: 'Juan', 
                id: '123'
            }
        }
        const state = authReducer(  initialState, action  );
        expect( state ).toEqual({
                logged: true, 
                user: action.payload
        });


        //expect( mockIncrement ).toHaveBeenCalled();

    });

    test('debe de (logout) borrar el name del usuario y logged en false', () => { 

        const state1 = {
            loggef: true, 
            user: {id: '123', name: 'Juan'}
        }

        const action = {
            type: types.logout,
            
        };

        const newState = authReducer( state1, action);
        console.log(newState);
        expect( newState ).toEqual({logged:false}); 

        
     })


 });