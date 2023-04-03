import styled from 'styled-components'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import RegisterBlock from './RegisterBlock';
import Button from './Button';
import { usePkSystemHook } from '../state/pk-system-hook';
import { If } from './If';
var console = require("console-browserify")
const Section = styled.section`
    background-color: ${props => props.theme.navBackground}
`

const NavWrapper = styled.div`
    padding-bottom: 3rem;
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

    position: relative;
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

    &::after{
    display: none;
    }
}
`


var console = require("console-browserify")

const Navbar = () => {
    const [state, action] = usePkSystemHook()

    useEffect(() => {
    }, [state.modalOpen]);

    const showModal = () => {
        action.setModelOpen(true);
    };

    return (
        <NavWrapper>
            <Section id="navigation">
                <Navigation>
                    <Logo />
                    <Menu>
                        <MenuItem><Link to={"/"} className="nav-link">主页</Link></MenuItem>
                        <MenuItem><Link to={"/pk"} className="nav-link">匹配</Link></MenuItem>
                        <MenuItem><Link to={"/chat"} className="nav-link">聊天</Link></MenuItem>
                        <MenuItem><Link to={"/forum"} className="nav-link">探索</Link></MenuItem>
                        <MenuItem><Link to={"/chat"} className="nav-link">我的</Link></MenuItem>
                    </Menu>
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