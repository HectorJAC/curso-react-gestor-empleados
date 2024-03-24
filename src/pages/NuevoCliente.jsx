import { useNavigate, Form, useActionData, redirect } from 'react-router-dom';
import Formulario from '../components/Formulario';
import { Error } from '../components/Error';
import { AgregarCliente } from '../data/clientes';

export async function action({request}) {
    const formData = await request.formData();
    const datos = Object.fromEntries(formData);
    const email = formData.get('email');

    // Errores
    const errores = [];

    // Validacion formulario
    if (Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios');
    }

    // eslint-disable-next-line no-useless-escape, no-control-regex
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    if (!regex.test(email)) {
        errores.push('El email no es valido');
    } 

    // Retornar datos si hay errores 
    if (Object.keys(errores).length) {
        return errores;
    }

    await AgregarCliente(datos);

    return redirect('/');
} 

export const NuevoCliente = () => {
    
    const navigate = useNavigate();
    const errores = useActionData();
    
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900"> Nuevo Cliente </h1>
            <p className="mt-3"> Registrar un nuevo cliente </p>

            <div className="flex justify-end">
                <button
                    className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded hover:bg-blue-700 uppercase font-bold text-xs"
                    onClick={() => navigate('/')}
                >
                    Volver
                </button>
            </div>

            <div className='bg-white shadow rounded-md md:w3/4 mx-auto px-5 py-10 mt-3'>
                
                {errores?.length && errores.map((error, i) => (
                    <Error key={i}> {error} </Error>
                ))}

                <Form
                    method='POST'
                    noValidate
                >
                    <Formulario />

                    <input 
                        type='submit'
                        className='mt-5 w-full bg-blue-800 hover:bg-blue-700 text-white uppercase font-bold py-2 px-4 rounded cursor-pointer'
                        value='Registrar Cliente'
                    />
                </Form>
            </div>
        </>
    );
};