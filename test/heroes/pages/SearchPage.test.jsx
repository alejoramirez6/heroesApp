const { render, screen, fireEvent } = require("@testing-library/react")
const { MemoryRouter } = require("react-router-dom")
const { SearchPage } = require("../../../src/heroes/pages/SearchPage")

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en el <SearchPage />', () => {

    beforeEach(() => jest.clearAllMocks() );

    test('Debe de mostrarse correctamente con valores por defecto', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        );
        //screen.debug();
        expect( container ).toMatchSnapshot();
    });

    test('Debe de mostrar a Batman y el input con el valor del querystring', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage/>
            </MemoryRouter>
        );
        
        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman');
        const img = screen.getByRole('img');
        expect( img.src ).toContain("/assets/heroes/dc-batman.jpg");
        const none = screen.getByLabelText('none');
        console.log(none.style.display);
        expect( none.style.display ).toBe("none");
        
        //screen.debug();
        
    });

    test('Debe de mostrar un error si no se encuentra el heroe (batman123)', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage/>
            </MemoryRouter>
        );
        const error = screen.getByLabelText('error');
        expect( error.style.display ).toBe("");
        //console.log(error);
        //expect(erorr).toBe('No hero with')
        //screen.debug();
    });

    test('debe de llamar el navigate a la pantalla nueva', () => {
        const inputValue = 'superman';
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target:{name: 'searchText', value: inputValue}});
        //console.log(input.value);

        const form = screen.getByLabelText('form');
        fireEvent.submit( form ); 

        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${ inputValue }`);



    });

});