import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const Order = () => {
  const [pizza, setPizza] = useState(null);
  const [formData, setFormData] = useState({});
  const [price, setPrice] = useState(null);
  const navigate = useNavigate();

  // Get the menu on mount
  useEffect(() => {
    fetch("/menu")
      .then((res) => res.json())
      .then((data) => setPizza(data.data))
      .catch((error) => console.log(error))
  }, []);

  // POST then redirect the client to /confirm/:orderId
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/orders", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ order: formData })
    })
      .then((res) => res.json())
      .then((data) => navigate(`/confirm/${data.data.id}`))
      .catch((error) => console.log(error.message))
  }

  // when something changes in the form, we update our state
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  }

  // when a topping is selected, we update the formData with this topping
  // and set the prices for this specific item / display the prices
  const selectChange = (target) => {
    pizza.forEach((pizza) => {
      if (pizza.id === target.value) {
        setFormData({ ...formData, [target.id]: target.value });
        setPrice(pizza.price);
      }
    })
  }

  return (
    <>
      {!pizza
        ? <H2>Loading ...</H2>
        : <Form onSubmit={handleSubmit}>

          <Label>First Name: <InputField
            placeholder="John" name="fname" id="fname" autoFocus
            onChange={handleChange}></InputField></Label>

          <Label>Last Name: <InputField
            placeholder="Deer" name="lname" id="lname"
            onChange={handleChange}></InputField></Label>

          <Label>Address: <InputField
            placeholder="123 Street" name="address" id="address"
            onChange={handleChange}></InputField></Label>

          <Label>Email: <InputField type="email"
            placeholder="example@email.com" name="email" id="email"
            onChange={handleChange}></InputField></Label>

          <Label>Phone Number: <InputField type="tel"
            placeholder="Phone number" name="phone" id="phone"
            onChange={handleChange}></InputField></Label>

          {/* Dropdown menu of toppings section */}
          <Label>Pizza: <Select name="selectPizza" id="pizza"
            onChange={(event) => selectChange(event.target)}>
            <Option value="">Pick your pizza</Option>
            {
              pizza.map((pizza) => {
                return (
                  <Option key={`formPizza${pizza.id}`} value={pizza.id}>{pizza.name}</Option>)
              })
            }
          </Select></Label>

          {
            // Radio buttons of prices/pizza size selection section
            price && <PriceWrapper>
              {Object.keys(price).map((size, i) => {
                return (
                  <RadioLabel key={`pizzaPrice${i}`}>
                    <input type="radio" name="size"
                      value={size} id="price" onClick={handleChange}
                    />{size}: {price[size]}
                  </RadioLabel>
                )
              })}
            </PriceWrapper>
          }
          <Button type="submit">Give me my pizza!!</Button>
        </Form>}
    </>
  )
}
const H2 = styled.h2`
  text-align: center;
  margin-top: 10vh;
`;

const Form = styled.form`
  text-align: center;
  padding: 30px;
  background-color: wheat;
  border-radius: 10px;
  width: fit-content;
  margin: 70px auto;
  box-shadow: 5px 5px 12px lightgray;
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
    cursor: pointer;
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
  margin: 20px auto 0px;
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
  margin-top: 20px;
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