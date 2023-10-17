import React from 'react';
import { Link, useMatch, useResolvedPath} from 'react-router-dom';

export const Navbar = () =>{
return( 
    <nav className="nav">
        <Link to='/' className='siteName'>Justin's Site</Link>
        <ul>
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="music/">Music</CustomLink>
                <CustomLink to="music/create">Create</CustomLink>
                <CustomLink to="music/join">Join</CustomLink>
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