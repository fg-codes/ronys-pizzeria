---

marp: true

---

# The `GET` Method - Requesting Data

---

- `fetch` has several methods. `GET` is the default.
- `GET` requests are meant to `fetch` data from the server.
- `GET` requests are requests for data.
- `GET` request are usually used by a browser, or a website's page that needs data.

It is supposed to be _read-only_, meaning we don't send data through a `GET` method.

![monkey](assets/shifty_monkey.gif)

---

## Sending Data with `GET`

Sooooo... technically a `GET` can send data in 2 different ways:
- URL Parameters.
- URL Queries.

---

## URL Parameters (`param`)

```
http://www.my-site.com/search/cars/honda
```

- A `param` can be hard to spot. 
- Can you tell me where the `param` is in the above URL?
    - Its the word `honda`.
- A parameter is defined in the address on the server. 
- The fetch address for the above URL would look like this:
    -  `"http://www.my-site.com/search/cars/:make"`
    -  Do you see the `param` now?

A URL `param` is used to `fetch` a specific ressource / type / category of data. 

In this example, we're searching for all cars made by Honda.

---

## URL Queries (`query`)

```
http://www.my-site.com/search/cars/honda?price=25000-50000
```

- A `query` is created in the URL when a `?` is inserted in the address bar.
- The structure of the `query` is `key=value`.
- It's used to filter the requested data.
- You can separate multiple `queries` from each other with an `&`.
    - ```?price=25000-50000&color=blue&transmission=automatic```

A URL `query` is used to `fetch` data that falls within a certain specification. In other words, they're used to filter the results of the fetch.

In this example, we're searching for all cars made by Honda that are within the price range of 25 000$ to 50 000$

---

## Query vs URL param

What's the difference?

URL `params` are used to search for specific data. URL `queries` are used to search for data that meet a criteria. Often times they're used together.

Example:
- Search bar: water bottle.
- Filters: black, under 25$.

We're running a search for data that matches our `param` of water bottle, and the results should be filtered by the `queries` that specify the color black and is priced under 25$.

---

## Sending Data with `GET` ⚠

`GET` requests are not secure! Any data sent with the request is:

- Visible all the way to the server.
- Cached (saved) in browser history.

For these reasons, we **only** send trivial data through the URL. When we want to send sensitive data, we do it through the `body` of the `fetch`.

---

## Where is `GET`'s `body`?

It doesn't exist! The `GET` method cannot have a `body`. If you try to run a `fetch` with a method `GET` and a `body`, your website will be **_very_** unhappy with you!

---

So what do we do if we want to send important and / or sensitive data to the server?