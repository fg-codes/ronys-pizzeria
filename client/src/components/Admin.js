import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Admin = () => {
  const [ orders, setOrders ] = useState(null)

  useEffect(() => {
    fetch("/orders")                                // on mount, GET all the orders
    .then(res => res.json())
    .then(data => setOrders(data.data))             // load orders in orders state
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
          {order.fname} {order.lname} - {order.pizza} - {order.id}
        </OrderLink>
      )})}
    </div>}
    </>
  )
}

const H2 = styled.h2`
    margin-top: 70px;
    text-align: center;
`;

const OrderLink = styled(Link)`
  text-align: center;
  margin: 20px auto;
  display: block;
  text-decoration: none;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 5px;
  transition: all 200ms ease;
  &:hover {
    background-color: LemonChiffon;
}
`;