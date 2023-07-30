import styled from "styled-components";
import { NavLink } from "react-router-dom";
import bannerSrc from "../assets/pizza_banner.png";

export const Header = () => {
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

const NavItem = styled(NavLink)`
  text-decoration: none;
  border-radius: 10px;
  border: solid 2px black;
  padding: 10px 20px;
  font-weight: bold;
  font-size: 24px;
  color: black;
  background-color: white;
  transition: all 200ms ease;
  &:hover {
    scale: 1.04;
  }
  &.active {
    background: rgb(66,133,91);
  }
`;

const NavBar = styled.div`
  position: absolute;
  z-index: 1;
  top: 90%;
  width: 40%;
  display: flex;
  justify-content: space-evenly;
  font-size: 2em;
`;

const Banner = styled.img`
  width: 40%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  background: rgb(66,133,91);
  background: linear-gradient(71deg, rgba(66,133,91,1) 35%, rgba(226,29,29,1) 100%);
  margin-bottom: 25px;
`