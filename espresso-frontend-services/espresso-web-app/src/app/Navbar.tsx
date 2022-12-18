import styled from 'styled-components'
import Logo from './Logo'

const Section = styled.section`
    width: 100vw;
    background-color: ${props => props.theme.body }
`
const Navigation = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 85%;
    height: ${props => props.theme.navHeight };
    margin: 0 auto;
`

const Menu = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
`

const MenuItem = styled.li`
    margin: 0 1rem;
    color: ${props => props.theme.text};
    cursor: pointer;
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
            </Navigation>
        </Section>
    )
}

export default Navbar;