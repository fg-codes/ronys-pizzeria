import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

export const PizzaDetails = () => {
  const [pizza, setPizza] = useState(null);
  const { pizzaId } = useParams();
  useEffect(() => {
    fetch(`/menu/${pizzaId}`)
      .then((res) => res.json())
      .then((data) => setPizza(data.data))
      .catch((error) => console.log(error))
  }, [])

  return (
    <>
      <H1>Pizza Time!</H1>
      {!pizza
        ? <H2>Loading ...</H2>
        : <Container>
          <Image src={pizza.src} alt={pizza.name}></Image>
          <Content>
            <h3>{pizza.name}</h3>
            <p>{pizza.description}</p>
            <H4>Toppings:</H4>
            <p>{pizza.toppings}</p>
            <H4>Price:</H4>
            <PriceWrapper>
              {Object.keys(pizza.price).map((price) => {
                return (
                  <PriceDiv key={`pizzPrice${price}`}>
                    <BoldSpan>{price}</BoldSpan>
                    <span>{pizza.price[price]}</span>
                  </PriceDiv>
                )
              })}
            </PriceWrapper>
            <ButtonDiv><Button to="/order">Order Now!</Button></ButtonDiv>
          </Content>
        </Container>}
    </>
  )
}
const H1 = styled.h1`
  text-align: center;
  margin: 60px 0px;
`;
const H2 = styled.h2`
  margin-top: 30px;
  text-align: center;
`;
const H4 = styled.h4`
  margin-bottom: 0px;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 80%;
  height: 350px;
  margin: 0px auto;
  border: 2px solid gray;
  border-radius: 20px;
  overflow: hidden;
  background-color: wheat;
`;
const Image = styled.img`
  width: 40%;
`;
const Content = styled.div`
  padding: 0px 20px;
`;
const PriceWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0px 50px;
`;
const PriceDiv = styled.div`
  background-color: LemonChiffon;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  text-align: center;
`;
const BoldSpan = styled.span`
  font-weight: bold;
`;
const ButtonDiv = styled.div`
  text-align: center;
`;
const Button = styled(Link)`
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  background-color: LemonChiffon;
  transition: all 200ms ease-in-out;
  text-decoration: none;
  &:hover {
    background-color: orange;
    color: white;
    cursor: pointer;
  }
`;