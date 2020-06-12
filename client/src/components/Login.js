import React, {useState} from 'react';
import { Link } from 'react-router-dom'

const Login = () => {

    // State Login
    const[user, setUser] = useState({
        email:'',
        password:''
    })

    // Desestructuring user
    const {email, password} = user

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

        // pasarlo al action???

    }

    return (  
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesión</h1>

                <form
                    onSubmit={handleSubmit}
                >
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
                        <label htmlFor="password">Tu Password</label>
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
                        <input
                            type='submit'
                            value='Iniciar sesión'
                            onSubmit={handleSubmit}
                            className='btn btn-primario btn-block'
                        />
                    </div>
                </form>

                <Link to={'/signin'} className='enlace-cuenta'>Crear Cuenta</Link>
            </div>
        </div>
    );
}
 
export default Login;