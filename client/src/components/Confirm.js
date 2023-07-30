import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";

export const Confirm = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [pizza, setPizza] = useState(null);
  const [time, setTime] = useState(null);                   // we need this to calculate order time + 30 mins

  useEffect(() => {
    fetch(`/orders/${orderId}`)                             // on mount, GET all the orders in order state
      .then((res) => res.json())
      .then((data) => setOrder(data.data))
      .catch((error) => console.log(error.message))
  }, [])

  useEffect(() => {
    fetch("/menu")                                      // on order change, GET the menu
      .then(res => res.json())
      .then(data => {
        let date = new Date();                          // add a temp variable as a new Date
        date.setMinutes(date.getMinutes() + 30);          // add 30 mins to the minutes
        setTime(date.toLocaleTimeString())              // change our time state
        data.data.forEach(e => {
          e.id === order.pizza && (setPizza(e))       // we map throught our menu to find the pizza matching the choosen topping 
        })
      })
      .catch(error => console.log(error.message))
  }, [order])

  return (
    <>
      {!order || !pizza
        ? <H2>Loading ...</H2>
        : <Wrapper>
          <H2>Order confirmed!</H2>
          <B>Name:</B><P> {order.fname} {order.lname}</P>
          <B>Phone number:</B><P> {order.phone}</P>
          <B>Address:</B><P> {order.address}</P>
          <B>Pizza:</B><P>{pizza.name} ({order.price})</P>
          <B>TOTAL:</B><P> {pizza.price[order.price]}</P>
          <I>Pizza will arrive before {time} or it's free!</I>        {/* TO DO: add date and time of order to the order obj before POST */}
        </Wrapper>}
    </>
  )
}

const H2 = styled.h2`
  text-align: center;
  margin-top: 20px;
`;

const Wrapper = styled.div`
  text-align: center;
  padding: 20px;
  background-color: wheat;
  border-radius: 20px;
  width: 30%;
  margin: 70px auto;
`;

const B = styled.p`
  font-weight: bold;
  margin: 0px;
`;
const P = styled.p`
  margin: 3px 0px 20px 0px;
`;

const I = styled.p`
  font-style: italic;
`;