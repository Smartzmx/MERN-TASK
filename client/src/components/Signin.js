import React, {useState} from 'react';
import { Link } from 'react-router-dom'

const Signin = () => {

    // State Login
    const[user, setUser] = useState({
        fullName:'',
        email:'',
        password:'',
        passwordConfirm:''
    })

    // Desestructuring user
    const {fullName, email, password, passwordConfirm} = user

    // Function to handle on change 
    const handleChange = (e) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    // Function to handle on submit
    const handleSubmit = (e) =>{
        e.preventDefault()

        // Validate blank info

        //password validation

            //min lenght 6 characteres

            //equal password and password confirm fields

        // pasarlo al action???

    }

    return (  
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Crear Cuenta</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="fullName">Nombre Completo</label>
                        <input
                            type='text'
                            id='fullName'
                            name='fullName'
                            placeholder='Tu Nombre completo'
                            onChange={handleChange}
                            value={fullName}
                        />    
                    </div>   
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Tu email'
                            onChange={handleChange}
                            value={email}
                        />    
                    </div>   
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Tu password'
                            onChange={handleChange}
                            value={password}
                        />    
                    </div>   
                    <div className="campo-form">
                        <label htmlFor="passwordConfirm">Confirma tu Password</label>
                        <input
                            type='password'
                            id='passwordConfirm'
                            name='passwordConfirm'
                            placeholder='Confirma tu password'
                            onChange={handleChange}
                            value={passwordConfirm}
                        />    
                    </div>   

                    <div className="campo-form">
                        <input
                            type='submit'
                            value='Crear Cuenta'
                            onSubmit={handleSubmit}
                            className='btn btn-primario btn-block'
                        />
                    </div>
                </form>

                <Link to={'/'} className='enlace-cuenta'>Volver a Iniciar sesión</Link>
            </div>
        </div>
    );
}
 
export default Signin;