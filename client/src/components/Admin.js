import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Admin = () => {
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    fetch("/orders")
      .then(res => res.json())
      .then(data => setOrders(data.data))
      .catch(error => console.log(error.message))
  }, [])

  return (
    <>
      {!orders
        ? <H2>Loading...</H2>
        : <div>
          {orders.length > 0 ? <H2>Orders</H2> : <H2>No orders yet :(</H2>}
          {orders.map((order) => {
            return (
              <OrderLink key={`order${order.id}`} to={`/order/${order.id}`}>
                <P>
                  <span>Order No: <B>{order.id}</B></span>
                  <span>Name: <B>{order.fname} {order.lname}</B></span>
                  <span>Pizza: <B>{order.pizza}</B></span>
                </P>
              </OrderLink>
            )
          })}
        </div>}
    </>
  )
}

const B = styled(Span)`
  font-weight: 600;
`;

const P = styled.p`
  display: flex;
  margin: 0 auto;
  gap: 20px;
  width: fit-content;
  padding: 10px 20px;
  border-radius: 5px;
  color: black;
  transition: all 200ms ease;
  border: 1px solid transparent;
  &:hover {
    background-color: lightyellow;
    border: 1px solid lightgray;
  }
`;

const OrderLink = styled(Link)`
  display: block;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
`;

const H2 = styled.h2`
  text-align: center;
  margin: 60px 0px;
`;