import { fireEvent, render, screen } from "@testing-library/react";
import { AuthContext } from "../../../src/auth";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { PrivateRoute } from "../../../src/router/PrivateRoute";
import { Navbar } from "../../../src/ui/components/Navbar";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));


describe('Pruebas en el componente de NavBar', () => {

    const contextValue = {
        logged: true,
        user: {
            name: 'Juan Carlos'
        },
        logout: jest.fn()
    };

    beforeEach(() => jest.clearAllMocks() );

    test('Debe de mostrar el nombre del usuario', () => {
        Storage.prototype.setItem = jest.fn();


        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>     
                        <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        //screen.debug();
        expect( screen.getByText('Juan Carlos')).toBeTruthy();
        //expect( localStorage.setItem ).toHaveBeenCalledWith("lastPath", "/search?q=batman");


    });

    test('Debe de llamar el logout y navigate cuando se hace click en el botón', () => {

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>     
                        <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalled();
    });




})