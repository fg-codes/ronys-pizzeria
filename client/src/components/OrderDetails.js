import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

export const OrderDetails = () => {
  const { orderId } = useParams();

  const [ order, setOrder ] = useState(null);
  const [ menu, setMenu ] = useState(null);
  const [ price, setPrice ] = useState(null);                               // Price state is determined when we match menu.pizza and order.pizza
  const [ isDisabled, setIsDisabled ] = useState(true);                     // Toggle between "Update orders" and all other handles
  const [ deleteConfirmation, setDeleteConfirmation ] = useState(false)     // Toggle between Delete btn and Delete Confirmation btns.
  const navigate = useNavigate();

  /*
  Exercise 5 - Super Secret Admin Page
  To find the right price list, I had to match the pizza name from the Order with the pizzas in the menu.
  Each of them required a fetch. The thing is, with the useState delay, I could not compare both without
  having a null value/error.
  
  I tried to play with the dependecies: no success.
  I tried to nest my 2nd fetch in the first: not the expected behaviour but works fine (and allows me to use a temporary variable)
  I know I could have fetch only once and use Context to pass the data to all my components but wasn't
  confortable with this yet and did not want to risk to mess up my code.
  
  This is why I had to set a temporary variable (called orderPizzaType)
  I think this is correct the way I did but I would like to know if there is something
  I could have done to optimise my code besides using Context? Thanks!


  By the way, Exercise 8 (stretch) asks us to add a 3rd button to rewrite the full order.
  I prefered to use the "Update button" to do all modifications we want. I think this is more efficient
  and userfriendly. I understand that it makes us practice but making UX optimized design is a +++
  */

  useEffect(() => { 
    fetch(`/orders/${orderId}`)                     // on mount, we GET the specific order
    .then(res => res.json())
    .then(data => {
      setOrder(data.data);
      let orderPizzaType = data.data.pizza;         // we set a 'pizza type' temporary variable as we will need to match it with a pizza from the menu

      fetch('/menu')                                // then we GET the full menu
      .then(res => res.json())
      .then(data => {
        setMenu(data.data);
        data.data.forEach((pizza) => {
          if (pizza.id === orderPizzaType) { setPrice(pizza.price) }      // while mapping, we test if we match the temporary variable and pizza x from the menu
        })                                                                // if yes, we set the right prices matching the right topping
      })
    })
    .catch(error => console.log(error.message))
  }, []);

  const selectChange = (event) => {
    setOrder({...order, [event.target.id]: event.target.value})           // we want to update the state of our order as we change the data in the form
  }

  const handleSubmit = (event) => {                     // on submit (Save Changes) button click, we PUT our new order : overwrite all our stuff
    event.preventDefault();
    fetch(`/orders/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({newOrder: order}),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.message)             // WS asks us to alert() the user but I am not a big fan of alerts :p
      navigate('/admin')
    })
    .catch((error) => console.log(error.message))
  }

  const deleteOrder = (event) => {          // on delete confirmation (Delete order > Yes) buttons click,
    event.preventDefault();                 // we DELETE the order. yes.
    fetch(`/orders/${orderId}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.message);            // WS asks us to alert() the user but I am not a big fan of alerts :p
      navigate('/admin')
    })
    .catch(error => console.log(error.message))
  }

  return (
  <>
    <H2>Order #{orderId}</H2>
    {!order || !menu                          // The form is visible only when order state and menu state are set
    ? <H2>Loading...</H2>
    : <Form onSubmit={handleSubmit}>
      <Label>First Name: <InputField value={order.fname} disabled={isDisabled}
        name="fname" id="fname" onChange={selectChange}></InputField></Label>

      <Label>Last Name: <InputField value ={order.lname} disabled={isDisabled}
        name="lname" id="lname" onChange={selectChange}></InputField></Label>

      <Label>Address: <InputField value={order.address} disabled={isDisabled}
        name="address" id="address" onChange={selectChange}></InputField></Label>

      <Label>E-mail: <InputField type="email" value={order.email} disabled={isDisabled}
        name="email" id="email" onChange={selectChange}></InputField></Label>

      <Label>Phone Number: <InputField type="tel" value={order.phone} disabled={isDisabled}
        name="phone" id="phone" onChange={selectChange}></InputField></Label>

      <Label>Pizza:
        <Select                                 // Pizza topping selection section
          name="selectPizza"
          id="pizza" 
          disabled={isDisabled}
          value={order.pizza}
          onChange={selectChange}>
            <Option value="">Pick your pizza</Option>
            {menu.map(pizza => {
              return (
                <Option
                  key={`orderDetails${pizza.id}`}
                  value={pizza.id}>
                  {pizza.name}
              </Option> )
          })}
        </Select>
      </Label>

      {price && (<PriceWrapper>                       {/* Price div section (auto updated when user select a different topping) */}
        {Object.keys(price).map((size, i) => {        {/* Visible only when price state is set */}
          return (
            <RadioLabel key={`pizzaPrice${i}`} >
              <input 
                type="radio"
                name="size"
                value={size}
                id="price"
                disabled={isDisabled}
                checked={size === order.price}
                onChange={selectChange}/>
              {size}: {price[size]}
            </RadioLabel>
          )
        })}
        </PriceWrapper>)}

        {!isDisabled && (                 // Section with all the handles: [Save Changes] | [Delete order] > [Yes] and [No]
          !deleteConfirmation             // visible only when user clicks "Update Order" button.
          ? <>
            <Button type="submit">Save Changes</Button>       {/* PUT fetch trigger is here */}
            <DeleteBtn onClick={(event) => {                  {/* Asking for a delete confirmation trigger is here */}
              setDeleteConfirmation(true);
              event.preventDefault();
            }}>Delete order</DeleteBtn>
          </>
          : <>
            <DeleteDiv>
            <Button onClick={deleteOrder}>Yes</Button>        {/* if user clicks Delete order btn, we ask for a confirmation */}
            Are you sure?
            <Button onClick={(event) => {event.preventDefault(); setDeleteConfirmation(false)}}>No</Button>
            </DeleteDiv>
          </>
        )}

        {price && isDisabled && (             // This is for the First, main btn, that can update the order.
          <Button onClick={(event) => {       // visible only when price is set (Price state is the last state to be updated/run) ...
            event.preventDefault();           // and will disapear when user clicks Update Order (because then we don't need it anymore)
            setIsDisabled(false);
          }}>Update Order</Button>)}
      </Form>}
    </>
  )
}

const H2 = styled.h2`
  margin-top: 70px;
  text-align: center;
`;

const Form = styled.form`
  text-align: center;
  padding: 20px;
  background-color: wheat;
  border-radius: 20px;
  width: fit-content;
  margin: 70px auto 100px;
`;

const Label = styled.label`
  margin: 10px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
`;

const InputField = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
  width: 200px;
  text-align: center;
  &::placeholder {
    text-align: center;
  }
`;

const Select = styled.select`
  width: 200px;
  padding: 5px;
  box-sizing: content-box;
  border-radius: 5px;
  color: black;
  border: 1px solid black;
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
  border: none;
  margin: 20px 10px 0px 10px;
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
`;