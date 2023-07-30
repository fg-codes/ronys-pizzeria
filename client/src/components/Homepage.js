import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Homepage = () => {
    const [ menu, setMenu ] = useState(null);

    useEffect(() => {
        fetch("/menu")
        .then((res) => res.json())
        .then((data) => setMenu(data.data))
        .catch((error) => console.log(error))
    }, [])
    return (
        <>
        <H1>Pizza Time!</H1>
        {
            !menu 
            ? <H2>Loading ...</H2> 
            : <Container> {
                menu.map((pizza) => {
                    return (
                        <Card key={`menu${pizza.id}`} to={`/pizza/${pizza.id}`}>
                            <Thumbnail><Image src={pizza.src} alt={pizza.name}></Image></Thumbnail>
                            <Content>
                                <h3>{pizza.name}</h3>
                                <p>{pizza.description}</p>
                                <p><Span>Toppings: </Span>{pizza.toppings}</p>
                                <p>{`Starting at ${pizza.price["Small"]}`}</p>
                            </Content>
                        </Card>
                    )
                })
                }
            </Container>
        }
        </>
    )
}

const H1 = styled.h1`
    text-align: center;
    margin: 60px 0px
`;

const H2 = styled.h2`
    text-align: center;
`;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 80%;
    margin: 0px auto;
`;

const Card = styled(Link)`
    background-color: wheat;
    display: flex;
    width: 48%;
    height: 250px;
    margin: 0px auto 20px;
    border: 2px solid peachpuff;
    border-radius: 20px;
    overflow: hidden;
    color: black;
    text-decoration: none;
    transition: all 200ms ease-in-out;
    &:hover {
        transform: translate(0, -3px);
        box-shadow: 4px 4px 12px gainsboro;
    }

`;
const Thumbnail = styled.div`
    height: 100%;
`;

const Image = styled.img`
    width: 200px;
    height: 100%;
    object-fit: cover;
`;

const Content = styled.div`
    padding: 10px 20px;
`;

const Span = styled.span`
    font-weight: 700;
    font-size: 18px;
`;