import React from 'react';

const NavBar = () => {
    return ( 
        <header className="app-header">
            <p className="nombre-usuario">Hola <span>Alejandro Suarez M.</span></p>

            <nav className="nav-principal">
                <a href="#!" >Cerrar sesión</a>
            </nav>
        </header>
     );
}
 
export default NavBar;