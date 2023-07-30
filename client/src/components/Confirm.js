import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";

export const Confirm = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [pizza, setPizza] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    fetch(`/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data.data))
      .catch((error) => console.log(error.message))
  }, [])

  useEffect(() => {
    fetch("/menu")
      .then(res => res.json())
      .then(data => {
        let date = new Date();
        date.setMinutes(date.getMinutes() + 30)
        setTime(date.toLocaleTimeString())
        data.data.forEach(e => {
          e.id === order.pizza && (setPizza(e))
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
          <I>Pizza will arrive before {time} or it's free!</I>
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