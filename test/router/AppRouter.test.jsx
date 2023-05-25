import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en el < AppRouter />', () => {

    test('Debe de mostrar el login si no está autenticado', () => {
        const contextValue = {
            logged: false, 
        }
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue }>
                    <AppRouter />
                </AuthContext.Provider>

            </MemoryRouter>

        );
        expect( screen.getAllByText('Login')).toBeTruthy();
        expect( screen.getAllByText('Login').length).toBe(2);
    });

    test('debe de mostrar el componente de Marvel si está autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                id: 'abc',
                name: 'Juan Carlos',
            } 
        }
        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>

        );
       // screen.debug();
        expect( screen.getAllByText('Marvel')).toBeTruthy();
        expect( screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);


    });



});
