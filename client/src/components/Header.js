import styled from "styled-components";
import { NavLink } from "react-router-dom";

import bannerSrc from "../assets/pizza_banner.png";

const Header = () => {

    return (
        <Wrapper>
            <Banner src={bannerSrc} alt="pizza banner" />
            <NavBar>
                <NavItem to="/">Menu</NavItem>
                <NavItem to="/order">Order</NavItem>
            </NavBar>
        </Wrapper>
    )
}

export default Header

const NavItem = styled(NavLink)`
    text-decoration: none;
    border: solid 3px black;
    padding: 5px;
    font-weight: bold;
    color: black;
    background-color: white;

    &.active {
        background: rgb(66,133,91);
    }
`;

const NavBar = styled.div`
    position: absolute;
    z-index: 1;
    top: 85%;
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    font-size: 2em;
`

const Banner = styled.img`
    width: 50%;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    background: rgb(66,133,91);
    background: linear-gradient(71deg, rgba(66,133,91,1) 35%, rgba(226,29,29,1) 100%);
    margin-bottom: 25px;
`