import styled from 'styled-components'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import RegisterBlock from './RegisterBlock';
import Button from './Button';
import { usePkSystemHook } from '../state/pk-system-hook';
import { If } from './If';
import Hamburger from './Hamberger';
var console = require("console-browserify")
const Section = styled.section`
    background-color: ${props => props.theme.navBackground}
`

const NavWrapper = styled.div`
    padding-bottom: 3rem;
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
  menuOpen: boolean;
}

const Menu = styled.ul<MenuProps>`
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    
    @media (max-width: 64em) {
    /* 1024 px */
    position: relative;
    top: ${props => (props.menuOpen ? '265px' : '0')};
    left: 0;
    right: 0;
    bottom: 0;

    width: 200px;
    z-index:50;
    background-color: ${props => `rgba(${props.theme.bodyRgba},0.85)`};
    backdrop-filter: blur(2px);

    transform: ${props => (props.menuOpen ? 'translateY(0)' : 'translateY(-100%)')};
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


var console = require("console-browserify")

const Navbar = () => {
    const [state, action] = usePkSystemHook()
    const [menuOpen, setMenuOpen] = useState(false);

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
        <NavWrapper>
            <Section id="navigation">
                <Navigation>
                    <Logo />
                    <Menu menuOpen={menuOpen}>
                        <MenuItem><Link to={"/"} className="nav-link">主页</Link></MenuItem>
                        <MenuItem><Link to={"/pk"} className="nav-link">匹配</Link></MenuItem>
                        <MenuItem><Link to={"/chat"} className="nav-link">聊天</Link></MenuItem>
                        <MenuItem><Link to={"/forum"} className="nav-link">探索</Link></MenuItem>
                        <MenuItem><Link to={"/chat"} className="nav-link">我的</Link></MenuItem>
                    </Menu>
                    <HamburgerWrapper>
                        <Hamburger onClick={toggleMenu} isOpen={menuOpen} /> {/* 添加汉堡包按钮 */}
                    </HamburgerWrapper>
                    <If condition={state.userToken === "unknown"}>
                        <div className="desktop">
                            <Button text='注册登录' onClick={showModal} />
                        </div>
                    </If>
                    <If condition={state.userToken !== "unknown"}>
                        <div className="desktop">
                            <Button text={`用户${state.userId.substring(0, 7)}`} disabled={true}/>
                        </div>
                    </If>


                    <Modal
                        centered
                        title="注册或登录"
                        open={state.modalOpen}
                        footer={null}
                        onCancel={handleCancel}
                    /* 
                    okText={"登录"}
                    cancelText={"取消"}
                    onOk={handleOk}
                    okButtonProps={{style: {backgroundColor: "black"}}} */
                    >
                        <RegisterBlock />
                    </Modal>

                </Navigation>
            </Section>
        </NavWrapper>
    )
}
export default Navbar;