import React from 'react';
import { Link, useMatch, useResolvedPath} from 'react-router-dom';

export const Navbar = () =>{
return( 
    <nav className="nav">
        <Link to='/' className='siteName'> Site Name</Link>
        <ul>
                <CustomLink to="/">homepage</CustomLink>
                <CustomLink to="/create">about</CustomLink>
                <CustomLink to="/join">contact</CustomLink>
        </ul>

    </nav>
);
}

function CustomLink({ to, children, ...props }){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})

    return(
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}