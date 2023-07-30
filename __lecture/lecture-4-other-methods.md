--- 

marp: true

---

# Other `fetch` Methods

---

# The `PUT` Method - Updating / Rewriting Data

---

`PUT` is yet another `fetch` method we can make use of, and it's purpose is to update by overwriting the data.

It is shockingly similar to `POST` and it updates the data by overwriting existing fields. Basically it's goal is to replace the original ressource with a totally new one:

```js
// original data
{
    name: "Rony",
    age: 31
}

// after PUT
{
    name: "George",
    age: 35
}
```

We replaced all the values of the original object with new ones, updating it into a "new" object.

---

Just like `POST`, `PUT` also sends information through the `body`. In fact even the fetch is similar, with one key difference. See if you can spot it!

```js
// POST method
fetch("/order", {
    method: "POST",
    body: JSON.stringify({ name: "Rony", age: 31 }),
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

// PUT method
fetch("/order", {
    method: "PUT",
    body: JSON.stringify({ name: "George", age: 35 }),
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});
```

---

# The `PATCH` Method - Updating Data... again?

---

`PATCH` is another `fetch` method that updates data!

It is also really similar to `POST` but unlike `PUT`, it updates the data partially by replacing some of the fields and / or by adding new ones.

```js
// original data
{
    name: "Rony",
    age: 31
}

// after PATCH
{
    name: "Rony",
    age: 31,
    hobby: "Video games"
}
```

We updated the data by adding a new field to it.

---

Just like the last two methods, `PATCH` also sends information through the `body` and follows the same structure

```js
// PATCH method
fetch("/order", {
    method: "PATCH",
    body: JSON.stringify({ hobby: "Video games" }),
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});
```

---

## `POST` vs `PUT` vs `PATCH`

If `PUT` exists, why also have `PATCH`? 

If they're all so similar which one do I use?

In terms of ability, they can each do what the others do. However, code is all about proper syntax! We should always use the appropriate method for the task at hand:

- `POST`: creating / submitting data.
- `PUT`: updating by replacing all fields (full overwrite).
- `PATCH`: updating data by replacing existing fields (just not all of them) and / or adding new ones (partial update).

---

# The `DELETE` Method - Deleting Data

---

As you can probably guess, the `DELETE` method erases data. 

However it's a little unique compared to the other methods...

```js
// DELETE request
fetch("/delete-order", {
    method: "DELETE"
});

// also a DELETE request
fetch("/delete-order", {
    method: "DELETE",
    body: JSON.stringify({ name: "Rony" }),
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});
```

---

That's right! While the previous 3 methods absolutely _**need**_ a `body`, the `DELETE` method doesn't need one!

So... should you send a `body`? It'll depend on what you're trying to do 🤷‍♂️.

Most of the time you can do what needs to be done without sending a `body`, but it might make your life easier to send one anyways. 

It comes down to preference (and also what the server expects).