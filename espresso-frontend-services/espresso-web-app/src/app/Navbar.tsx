import styled from 'styled-components'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import RegisterBlock from './RegisterBlock';
import Button from './Button';
import { usePkSystemHook } from '../state/pk-system-hook';
import { If } from './If';
import { useAuth } from './AuthContext';

var console = require("console-browserify");
const Section = styled.section`
    background-color: ${props => props.theme.navBackground};
`

const Navigation = styled.nav`
    position: relative;
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
interface MenuProps {
    click: boolean;
}

const Menu = styled.ul<MenuProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style:none;

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

    transform: ${props => props.click ? 'translateY(0)' : `translateY(1000%)`};
    transition: all 0.3s ease;
    flex-direction: column;
    justify-content: center;
    touch-action: none;
} 
`

const MenuItem = styled.li`
    margin: 0 2rem;
    padding-top: 1rem;
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

    &::after {
      display: none;
    }
    }
`
const HamburgerWrapper = styled.div`
    display: none;

    @media (max-width: 64em) {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    &:hover {
        text-decoration: none;
        color: inherit;
  }
`;

interface HamburgerMenuProps {
    click: boolean;
}

const HamburgerMenu = styled.span<HamburgerMenuProps>`
    width:  ${props => props.click ? '2rem' : '1.5rem'};

    height: 2px;
    background: ${props => props.theme.text};

    position: absolute;
    top: 2rem;
    left: 50%;
    transform: ${props => props.click ? 'translateX(-50%) rotate(90deg)' : 'translateX(-50%) rotate(0)'};

    display: none;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    transition: all 0.3s ease;

    @media (max-width: 64em) {
    /* 1024 px */
    display: flex;

    }

    &::after, &::before{
      content: ' ';
      width:  ${props => props.click ? '1rem' : '1.5rem'};
      height: 2px;
      right: ${props => props.click ? '-2px' : '0'};
    background: ${props => props.theme.text};
    position: absolute;
    transition: all 0.3s ease;

  }

  &::after{
    top: ${props => props.click ? '0.3rem' : '0.5rem'};
    transform: ${props => props.click ? 'rotate(-40deg)' : 'rotate(0)'};

  }
  &::before{
    bottom: ${props => props.click ? '0.3rem' : '0.5rem'};
    transform: ${props => props.click ? 'rotate(40deg)' : 'rotate(0)'};
  }
`

var console = require("console-browserify")

const Navbar = () => {
    const [state, action] = usePkSystemHook();
    const [menuOpen, setMenuOpen] = useState(false);
    const [click, setClick] = useState(false);
    const { isLoggedIn, userId } = useAuth();

    useEffect(() => {
    }, [state.modalOpen]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const showModal = () => {
        action.setModelOpen(true);
    };

    const handleCancel = () => {
        action.setModelOpen(false);
    };
    return (
        <Section id="navigation">
            <Navigation>
                <Logo />
                <HamburgerMenu click={click} onClick={() => setClick(!click)}>
                    &nbsp;
                </HamburgerMenu>
                <Menu click={click}>
                    <MenuItem><StyledLink to={"/"} >主页</StyledLink></MenuItem>
                    <MenuItem><StyledLink to={"/pk"} >洽洽</StyledLink></MenuItem>
                    <MenuItem><StyledLink to={"/chat"} >聊天</StyledLink></MenuItem>
                    <MenuItem><StyledLink to={"/forum"} >探索</StyledLink></MenuItem>
                    <MenuItem><StyledLink to={"/mybot"}>自洽</StyledLink></MenuItem>
                    <MenuItem>
                        <If condition={!isLoggedIn}>
                            <div className="mobile">
                                <Button text='注册登录' onClick={showModal} />
                            </div>
                        </If>
                        <If condition={isLoggedIn}>
                            <div className="mobile">
                                <Button text={`用户${userId?.substring(0, 7)}`} disabled={true} />
                            </div>
                        </If>
                    </MenuItem>
                </Menu>

                <If condition={!isLoggedIn}>
                    <div className="desktop">
                        <Button text='注册登录' onClick={showModal} />
                    </div>
                </If>
                <If condition={isLoggedIn}>
                    <div className="desktop">
                        <Button text={`用户${userId?.substring(0, 7)}`} disabled={true} />
                    </div>
                </If>


                <Modal
                    centered
                    title="注册或登录"
                    open={state.modalOpen}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <RegisterBlock />
                </Modal>

            </Navigation>
        </Section>
    )
}
export default Navbar;