---
marp: true
---

# `fetch`

---

## What is `fetch`?

- `fetch` is a JavaScript Promise-based function (more on Promises later in the course).
- It's mainly used to send and/or receive data.
- It allows the website to communicate with the server.

---

Basic `fetch` template: 

```js
fetch("<SERVER_ENDPOINT_URL>") // fetches on server address
    .then((res) => res.json()) // converts a json response to JS object
    .then((data) => {
        // do something with the data from the server
        console.log(data);
    });
```

Documentation for [res.json()](https://developer.mozilla.org/en-US/docs/Web/API/Body/json)

---

## What is `.then()`?

- `.then()` is a Promise-based method! (more on Promises later in the course)
- For now, all you need to know is that `.then()` automatically waits for, and receives, the results of whatever the line above it returns.
- Also, it takes a function inside it.
- In our template above for example: 

```js
fetch("<SERVER_ENDPOINT_URL>")
    .then((res) => res.json()) // receives the results of the fetch above it.
    .then((data) => { // receives the result of the .then() above it.
        console.log(data);
    });
```

❗ Because the first `.then()` is a one line function, it automatically returns the single line of code it executes.

---

## JSON (or JavaScript Object Notation)

- It is a minimal, readable format for structuring data.
- It is mainly used to transmit data between servers and web applications.
- It looks A LOT like a JS Object, and can be accessed using `dot` notation.
- Derived from JS but supported by pretty much all other languages.
- It is very easy to convert JSON to JS object and vice versa.

---

### Example

JSON Object:

```json
{
    "name": "Peter",
    "alterego": "Spider-man",
    "villainsDefeated": 303,
    "car": null,
    "friends": ["Mary Jane", "Gwen", "Miles"]
}
```

JS Object:

```js
{
    "name": "Peter",
    'alterego': "Spider-man",
    `villainsDefeated`: 303,
    car: null,
    friends: ["Mary Jane", "Gwen", "Miles"],
}
```

❗ Spot the differences! (There are 5 differences)

---

To keep things clean and simple,

- the frontend will always expect `json` from the server (backend).
- the backend will always send data as a `json`.

---

## `fetch` in React

Using `fetch` in React is often necessary, but it must be handled carefully!

If handled improperly, the `fetch` will cause an infinite loop; meaning it will ping the server infinitely, several times per second. Incidentally, this is know as a DDOS (distributed denial of service) attack and it is considered an act of cyber-terrorism and is very frowned upon (and illegal).

So how do you handle a `fetch` properly?

---

## `fetch`'s Best Friend: `useEffect`

A lot of the times, your `fetch` will be enclosed inside a `useEffect` with an empty dependency array.

```jsx
useEffect(() => {
    fetch("<URL>")
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
}, [])
```

When we're loading data, we want to always make sure the `fetch` runs **only once**.

❗ Do not forget the dependency array. This will prevent an infinite loop!

---

## `fetch`'s Other Best Friend: Event Handlers

If a `fetch` is not in a `useEffect`, it will be inside an event handler. Those are the only 2 places a `fetch` is allowed to exist in React. Anything else will cause infinite loops (and we want to avoid those).

This fetch will only be called when a specific event is triggered:

```jsx
const handleFetchMenu = () => {
    fetch("URL")
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
}
```

---

## `fetch` and `useState`

Now because a `.then()` takes a function and we receive the data inside that function, if we don't save it, the data will disappear when the `.then()` is finished running.

So how do we do save the data? With `useState`!

```jsx
const [state, setState] = useState(null);

useEffect(() => {
    fetch("<URL>")
        .then(res => res.json())
        .then((data) => {
            setState(data.data);
        })
}, [])
```

---

Sometimes we want to re-run a `fetch`. So we'll just put a variable inside the `useEffect`'s dependency array.

```jsx
const [state, setState] = useState(null);
const [anotherState, setAnotherState] = useState(null);

useEffect(() => {
    fetch("<URL>")
        .then(res => res.json())
        .then((data) => {
            setState(data.data);
        })
}, [anotherState])
```

❗ If you use a state in the dependency array, **do not** use the one being modified by the `fetch`. This will cause an infinite loop!

---

## Rendering after Fetching

React is a very impatient language. It does not like to wait, so it doesn't. 

What I mean by this is if you need to render a page with a state variable that is set by a `fetch`, you'll need to conditionally render a "Loading state". `fetch` can take up to a few seconds to set the state, React operates on speeds of of 1/1000 of a second. (1/1000 of a second is muuuuuch faster than a few seconds).

If you don't conditionally render, you'll **always** run into errors.

---

## Rendering after Fetching


```jsx
const Component = () => {
    const [state, setState] = useState(null);

    useEffect(() => {
        fetch("<URL>")
            .then(res => res.json())
            .then((data) => {
                setState(data.data);
            })
    }, [])

    return (
        <>
            {
                !state 
                    ? <h1>Loading...</h1> 
                    : <h1>Number of cookies left: {state}</h1>
            }
        </>
    )
}
```

---

## When the `fetch` Fails

- Using `fetch` can sometimes go wrong. 
- Either you pinged an invalid address, sent the wrong data, or maybe the server fell apart.
- Typically, a server responds with a status of `200`, meaning everything is ok.
- When things go wrong, it will respond with a status of `400` or `500`, meaning something failed.
- We need to ble able to handle these responses appropriately (rather than panic).

---

## Catching Errors

- There's another method we can add to the `fetch` chain!
- That method is `.catch()`:

```js
fetch("URL")
    .then(res => res.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    })
```

The `.catch()` method automatically detects errors and executes code instead of crashing the whole website and coming to a screeching hault. Pretty handy if you ask me 😋.

---

## Catching Error Responses

- There's a bit of a catch (no pun intended) when receiving error responses from a server.
- The status `400` and `500` are not technically seen as errors by the `fetch`, just as a status.
- To get around this, we need to handle the error ourselves so that the `.catch()` can trigger.

```js
fetch("URL")
    .then(res => res.json())
    .then((data) => {
        if(data.status === 400 || data.status === 500) {
            throw new Error(data.message);
        }
        else {
            console.log(data);
        }
    })
    .catch((error) => {
        console.log(error);
    })
```

---

## `fetch` is Local

- A `fetch` is considered a local operation. 
- Only the component that needs the information should `fetch` the information.
- You should not make a `fetch` available globally to your application / site.
    - Unless it's data that is required to be global, like a login for example.
