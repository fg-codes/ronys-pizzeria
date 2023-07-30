---

marp: true

---

# The `POST` Method - Creating / Sending Data

---

A `POST` request is used when we want to send data or create new data on a server:

- Submitting a form to a server (i.e. logging in).
- Creating a new user in a database (i.e. signing up).
- Writing a status update.
- Online shopping.
- Etc...

---

## `POST` Structure

When writing a `fetch` method `POST`, we need to give the `fetch` an options object which **must** contain the following:

- A `method` `key`, who's `value` is `"POST"` (all in capital letters).
- A `headers` `key`, who's `value` is an object that contains:
    - `"Accept": "application/json"` - This tells the server the format of the data we expect to recieve. - **Optional but recommended**.
    - `"Content-Type": "application/json"` - This tells the server the format of the data we're sending. - **Required**.
- A `body` `key`, who's `value` is an object containing all the data we want to send.
    - The object must be turned into a `JSON` string with `JSON.stringify({...})`.
    - If we don't turn it into a `JSON` string, sending the data will fail (unless specified otherwise).


---


## `POST` Structure

```js
// GET request
fetch("/order-info")
    .then(res => res.json())
    .then((data) => {
        // Do something with the data.
    })

// POST request
fetch("/order", {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "Rony", age: 31 })
})
    .then(res => res.json())
    .then((data) => {
        // Do something with the data.
    })
```

---

## The Data - Where does it come from?

- The data comes from the `form`! 
- A post will almost always be used with a `form`.
- Why? Because the information the user inputs into the `form` is our data!
    - See slide 2 for examples

---

## The `form`

```jsx
const Component = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            firstName,
            lastName,
            email,
            address
        }

        fetch("/signup", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((data) => {
                // login logic
            })
            .catch((error) => {
                window.alert(error);
            })
    }

    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="fname">First Name: </label>
            <input type="text" id="fname" onChange={(e) => setFirstName(e.target.value)} />

            <label htmlFor="lname">Last Name: </label>
            <input type="text" id="lname" onChange={(e) => setLastName(e.target.value)} />

            <label htmlFor="email">Email: </label>
            <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />
            
            <label htmlFor="address">Address: </label>
            <input type="text" id="address" onChange={(e) => setAddress(e.target.value)} />

            <button type="submit">Submit</button>
            
        </form>
    )
}
```

❗ This works but... what if you had dozens of fields to fill?

---

## The `formData` Approach

```jsx
const Component = () => {

    const [formData, setFormData] = useState({});

    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("/signup", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then((data) => {
                // login logic
            })
            .catch((error) => {
                window.alert(error);
            })
    }

    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="fname">First Name: </label>
            <input type="text" id="fname" onChange={(e) => handleChange(e.target.id, e.target.value)} />

            <label htmlFor="lname">Last Name: </label>
            <input type="text" id="lname" onChange={(e) => handleChange(e.target.id, e.target.value)} />

            <label htmlFor="email">Email: </label>
            <input type="text" id="email" onChange={(e) => handleChange(e.target.id, e.target.value)} />
            
            <label htmlFor="address">Address: </label>
            <input type="text" id="address" onChange={(e) => handleChange(e.target.id, e.target.value)} />

            <button type="submit">Submit</button>

        </form>
    )
}
```

❗ Now we have one state that manages all the input fields of our form!

---

So if `GET` is for reading, and `POST` is for creating and sending... What other operations can we do with `fetch`?