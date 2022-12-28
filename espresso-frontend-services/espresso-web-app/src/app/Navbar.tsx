import styled from 'styled-components'
import Logo from './Logo'
import Button from './Button'
import { ConnectWallet } from "@thirdweb-dev/react";
import { Link } from '@web3uikit/icons';

const Section = styled.section`
    width: 100vw;
    background-color: ${props => props.theme.body}
`
const Navigation = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 85%;
    height: ${props => props.theme.navHeight};
    margin: 0 auto;
    
    .mobile{
       display: none;
    }

    @media (max-width: 64em) {
        .desktop{
        display: none;
    }
    .mobile{
        display: inline-block;
    }
}
`

const Menu = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;


    @media (max-width: 64em) {
    /* 1024 px */

    position: fixed;
    top: ${props => props.theme.navHeight};
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: ${props => `calc(100vh - ${props.theme.navHeight})`};
    z-index:50;
    background-color: ${props => `rgba(${props.theme.bodyRgba},0.85)`};
    backdrop-filter: blur(2px);

    transform: ${props => props.onClick ? 'translateY(0)' : `translateY(1000%)`};
    transition: all 0.3s ease;
    flex-direction: column;
    justify-content: center;

    touch-action: none;
    }    
`

const MenuItem = styled.li`
    margin: 0 1rem;
    color: ${props => props.theme.text};
    cursor: pointer;
    font-size: ${props => props.theme.fontlg};

    &::after{
    content: ' ';
    display: block;
    width: 0%;
    height: 2px;
    background: ${props => props.theme.text};
    transition: width 0.3s ease;
    }
    &:hover::after{
    width: 100%;
    }

    @media (max-width: 64em) {
    margin: 1rem 0;
    font-size: ${props => props.theme.fontmd};

    &::after{
    display: none;
    }
}
`

const Navbar = () => {
    return (
        <Section>
            <Navigation>
                <Logo />
                <Menu>
                    <MenuItem>Home</MenuItem>
                    <MenuItem>Create</MenuItem>
                    <MenuItem>PK</MenuItem>
                    <MenuItem>Hot Artwork</MenuItem>
                </Menu>
                {/* <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                        Login
                    </Link>
                    </li>

                    <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                        Create Account
                    </Link>
                    </li>
                </div> */}
                <ConnectWallet />

            </Navigation>
        </Section>
    )
}

export default Navbar;