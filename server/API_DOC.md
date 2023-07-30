# API Documentation

In here you'll find all the information you need to run your fetches properly. You'll be able to read up on the endpoints, the information they require, and the information they send back.

You'll also get some valuable information on setting up your application correctly so that your frontend and backend can communicate properly.

---

## Setup

Before you do anything, you need to hook up your frontend to your backend. The `client` (A.K.A. frontend / website) and the `server` (A.K.A. backend / server) are two totally separate entities. Just because they exist in the same repo doesn't mean they communicate. The `client` only handles it's files, and the `server` only handles it's files. 

In order to get them to communicate, you need to create a channel between the front and back ends of your application. This is what `fetch` does. Its basically a tool that allows the two ends to talk to each other and send information. 

Now because the server runs on port 8000, we'll want to add the following line in the `package.json` of the `client`. Add it just under the `"name"` key on the first line.

```json
"proxy": "http://localhost:8000"
```

> **PS: If you already had React running before doing this step, restart it so the changes can take effect.**

This will help us be lazier when writing our `fetch`es 😉. Why? Well normally a `fetch` requires the full address of the server so that it can communicate with it. The `proxy` basically automatically forwards all our fetches to the address specified. Now we don't have to write the full address, and we can focus on the specific endpoints we want to commicate with on the server instead.

---

## Data

The data is all conveniently located inside the file `data.js` found in the `server` folder. You can take a look if you'd like but you **CANNOT** modify the data in there at all. Out in the real world you're never allowed to change the data (unless you're specifically asked to update something). Same rules apply here!

> If you want to challenge yourself, don't even look in the `data.js` file; only look at the data returned by your `fetch`es!

---

## Endpoints

You'll notice that some of the endpoints have something that look a lot like URL parameters, just like we've seen in React. That's because they do, and they are; they work exactly the same as in React! 

Whenever you see a URL parameter, you need to send in the correct information. In React, the `Route` component receives the URL parameter, and the `Link` component sends it. When it comes to backend, the `server` receives the URL parameter, and the `fetch` sends it from the frontend.


| Endpoint              | Method    | Description                                       | Expected Body         |
|---------------------- | --------- | ------------------------------------------------- | --------------------- |
| `"/menu"`             | `GET`     | Returns an array of all the pizzas on the menu.   | `N/A`                 |
| `"/menu/:pizzaId"`    | `GET`     | Returns a single pizza based on it's ID.          | `N/A`                 |
| `"/orders"`           | `GET`     | Returns an array of all the orders on the menu.   | `N/A`                 |
| `"/orders/:orderId"`  | `GET`     | Returns a single order based on it's ID.          | `N/A`                 |
| `"/orders"`           | `POST`    | Creates an order and assigns the order an ID.     | `{ order: {...} }`    |
| `"/orders/:orderId"`  | `PATCH`   | Updates an order based on it's ID.                | `{ newOrder: {...} }` |
| `"/orders/:orderId"`  | `PUT`     | Updates an order based on it's ID.                | `{ newOrder: {...} }` |
| `"/orders/:orderId"`  | `DELETE`  | Deletes an order based on it's ID.                | `N/A`                 |

---

## Responses

Each of these endpoint will return information. What is returned depends on if it succeeded or failed. Here are the formats of the responses you can expect from the server.

### Requesting Data Response

Will respond with the status and the requested data.

```js
{
    "status": 200,
    "data": {...}
}
```

### Sending Data Response

Will respond with the status, a message, and the data that was sent.

```js
{
    "status": 200,
    "message": "...",
    "data": {...}
}
```

### Deleting Data Response

Will respond with the status and a message.

```js
{
    "status": 200,
    "message": "...",
}
```

### Error Response

Will respond with the status and a message.

```js
{
    "status": 400,
    "message": "...",
}
```