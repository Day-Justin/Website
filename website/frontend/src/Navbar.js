import React, {useState, useEffect } from 'react';
import { Link, useMatch, useResolvedPath} from 'react-router-dom';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';


function Navbar(){

    return( 
        <nav className="nav">
            <Link to='/' className='siteName'>Justin's Site</Link>
            <ul className='nav-ul'>
                    <NavItem to="/" icon={HomeIcon} name="Home">
                        <DropDownMenu>
                            <NavItem to="music/create" icon={AddIcon} name="Create"></NavItem>
                            <NavItem to="music/join" icon={MeetingRoomIcon} name="Join"></NavItem>
                        </DropDownMenu>
                    </NavItem>
                    
                    <NavItem to="music/" icon={MusicNoteIcon} name="Music">
                        <DropDownMenu>
                            <NavItem to="music/create" icon={AddIcon} name="Create"></NavItem>
                            <NavItem to="music/join" icon={MeetingRoomIcon} name="Join"></NavItem>
                        </DropDownMenu>
                    </NavItem>

            </ul>

        </nav>
    );
}

const NavIcon = (props) => {
    const {icon: Icon} = props;
    return(
        <>
        {Icon && <Icon />}
        </>
    );
}

function NavItem({ to, icon, name, children,  ...props }){
    const [open, setOpen] = useState(false);  // state for dropdown 
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true});

    return(
        <li id={isActive ? "active" : ""} 
        className="nav-item"
        onMouseEnter={() => setOpen(!open)}
        onMouseLeave={() => setOpen(!open)}        
        >
            <Link to={to} 
            {...props} 
            className='icon-button' >
                <NavIcon icon={icon} />{name}

                {open && children}
            </Link>
        </li>
    );
}

function DropDownMenu(props){
    const children = React.Children.toArray(props.children);
    
    return(
        <div className='dropdown'>
            {children.map((child, key) => {
                return(
                    <div className="menu-item" key={key}>
                        {child}
                    </div>
                );
            })}
        </div>
    );
}




export default Navbar;