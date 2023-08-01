import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

export const OrderDetails = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [menu, setMenu] = useState(null);
  const [price, setPrice] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/orders/${orderId}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data.data);
        let orderPizzaType = data.data.pizza;         // temporary pizza type
        fetch('/menu')
          .then(res => res.json())
          .then(data => {
            setMenu(data.data);
            data.data.forEach((pizza) => {
              // while mapping, we test if we match the temporary variable and pizza x from the menu
              // if yes, we set the right prices matching the right topping
              if (pizza.id === orderPizzaType) { setPrice(pizza.price) }
            })
          })
      })
      .catch(error => console.log(error.message))
  }, []);

  // we want to update the state of our order as we change the data in the form
  const selectChange = (event) => {
    setOrder({ ...order, [event.target.id]: event.target.value })
  }

  // on submit (Save Changes button), we PUT our new order : overwrite all our stuff
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/orders/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({ newOrder: order }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(() => navigate('/admin'))
      .catch((error) => console.log(error.message))
  }

  const deleteOrder = (event) => {
    event.preventDefault();
    fetch(`/orders/${orderId}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => navigate('/admin'))
      .catch(error => console.log(error.message))
  }

  return (
    <>
      <H2>Order #{orderId}</H2>
      {!order || !menu
        ? <H2>Loading...</H2>
        : <Form onSubmit={handleSubmit}>
          <Label>First Name: <InputField value={order.fname} disabled={isDisabled}
            name="fname" id="fname" onChange={selectChange}></InputField></Label>

          <Label>Last Name: <InputField value={order.lname} disabled={isDisabled}
            name="lname" id="lname" onChange={selectChange}></InputField></Label>

          <Label>Address: <InputField value={order.address} disabled={isDisabled}
            name="address" id="address" onChange={selectChange}></InputField></Label>

          <Label>E-mail: <InputField type="email" value={order.email} disabled={isDisabled}
            name="email" id="email" onChange={selectChange}></InputField></Label>

          <Label>Phone Number: <InputField type="tel" value={order.phone} disabled={isDisabled}
            name="phone" id="phone" onChange={selectChange}></InputField></Label>

          {/* Pizza topping selection section */}
          <Label>Pizza:
            <Select name="selectPizza" id="pizza" disabled={isDisabled} value={order.pizza} onChange={selectChange}>
              <Option value="">Pick your pizza</Option>
              {menu.map(pizza => {
                return <Option key={`orderDetails${pizza.id}`} value={pizza.id}> {pizza.name}</Option>
              })}
            </Select>
          </Label>

          {/* Pizza size selection section */}
          {price && (<PriceWrapper>
            {Object.keys(price).map((size, i) => {
              return (
                <RadioLabel key={`pizzaPrice${i}`} >
                  <input type="radio" name="size" value={size} id="price"
                    disabled={isDisabled}
                    checked={size === order.price}
                    onChange={selectChange} />
                  {size}: {price[size]}
                </RadioLabel>
              )
            })}
          </PriceWrapper>)}

          {!isDisabled && (       // Section with the handles: [Save Changes] | [Delete order] > [Yes] and [No]
            !deleteConfirmation       // visible only when user clicks "Update Order" button.
              ? <DeleteDiv>
                <Button type="submit">Save Changes</Button>
                <DeleteBtn onClick={(event) => {
                  setDeleteConfirmation(true);    // delete confirmation trigger
                  event.preventDefault();
                }}>Delete order</DeleteBtn>
              </DeleteDiv>

              : <DeleteDiv>
                <Button onClick={deleteOrder}>Yes</Button>
                Are you sure?
                <Button onClick={(event) => { event.preventDefault(); setDeleteConfirmation(false) }}>No</Button>
              </DeleteDiv>
          )}

          {price && isDisabled && (
            <Button onClick={(event) => {
              event.preventDefault();
              setIsDisabled(false);
            }}>Update Order</Button>)}
        </Form>}
    </>
  )
}

const H2 = styled.h3`
  margin-top: 50px;
  text-align: center;
`;

const Form = styled.form`
  text-align: center;
  padding: 20px;
  background-color: wheat;
  border-radius: 20px;
  width: fit-content;
  margin: 30px auto 100px;
`;

const Label = styled.label`
  margin: 10px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
`;

const InputField = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: 240px;
  text-align: center;
  &:focus {
    outline: 1px solid gray;
  }
  &::placeholder {
    text-align: center;
    font-style: italic;
    }
`;

const Select = styled.select`
  width: 240px;
  padding: 10px;
  box-sizing: content-box;
  border-radius: 5px;
  color: black;
  border: none;
  &:focus {
    outline: 1px solid gray;
  }
  &:hover {
    cursor: ${props => !props.disabled && 'pointer'};
  }
`;

const Option = styled.option`
  text-align: center;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  margin: 20px auto;
`;

const RadioLabel = styled.label`
  padding: 5px 10px;
  border-radius: 5px;
  transition: all 200ms ease;
  &:hover {
    cursor: pointer;
    background-color: LemonChiffon;
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  background-color: LemonChiffon;
  transition: all 200ms ease-in-out;
  &:hover {
    background-color: orange;
    color: white;
    cursor: pointer;
  }
`;

const DeleteBtn = styled(Button)`
  &:hover {
    background-color: black;
  }
`;

const DeleteDiv = styled.div`
  font-weight: 600;
  font-style: italic;
  color: Crimson;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;