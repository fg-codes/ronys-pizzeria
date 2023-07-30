import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const Order = () => {
    const [ pizza, setPizza ] = useState(null);
    const [ formData, setFormData ] = useState({});
    const [ price, setPrice ] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {                                       
        fetch("/menu")                                  // On mount, GET the menu
        .then((res) => res.json())
        .then((data) => setPizza(data.data))
        .catch((error) => console.log(error))
    }, []);

    const handleSubmit = (event) => {                       
        event.preventDefault();                         // no refresh
        fetch("/orders", {                              // On submit button click, POST the order
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({order: formData})
        })
        .then((res) => res.json())
        .then((data) => navigate(`/confirm/${data.data.id}`))       // then send the client to the order confirmation page
        .catch((error) => console.log(error.message))
    }

    const handleChange = (event) => {                               // when something changes in the form, we update our state
        setFormData({...formData, [event.target.id]: event.target.value});
    }

    const selectChange = (target) => {                                      // when a topping is selected...
        pizza.forEach((pizza) => { 
            if (pizza.id === target.value) {
                setFormData({...formData, [target.id]: target.value});      // ...we add this choice to our form and...
                setPrice(pizza.price);                                      // ...we add the prices linked to this exact topping
            }
        })
    }

    return (
        <>
        {!pizza
        ? <H2>Loading ...</H2>
        : <Form onSubmit={handleSubmit}>

        <Label>First Name: <InputField 
            placeholder="John" name="fname" id="fname" 
            onChange={handleChange}></InputField></Label>
            
        <Label>Last Name: <InputField
            placeholder="Deer" name="lname" id="lname"
            onChange={handleChange}></InputField></Label>

        <Label>Address: <InputField 
            placeholder="123 Street" name="address" id="address"
            onChange={handleChange}></InputField></Label>

        <Label>E-mail: <InputField type="email"
            placeholder="example@email.com" name="email" id="email"
            onChange={handleChange}></InputField></Label>

        <Label>Phone Number: <InputField type="tel"
            placeholder="Phone number" name="phone" id="phone"
            onChange={handleChange}></InputField></Label>

        <Label>Pizza: <Select name="selectPizza" id="pizza"                 // Dropdown menu of toppings section
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
                !price
                ? <></>                                                     // Radio buttons of prices/pizza size section
                : <PriceWrapper>                                            
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
            <Button type="submit">Gimme my pidZaA!!1</Button>
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
    padding: 20px;
    background-color: wheat;
    border-radius: 20px;
    width: fit-content;
    margin: 70px auto;
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