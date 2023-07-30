# Exercise 6 - Oops I made a mistake with my order!

This happens a lot. A customer makes an order while distracted, and suddenly they need to edit the order. But they can't edit their order so they call the restaurant and the manager edits the order in the system.

So now you have to allow the manager to edit orders in the system! I hope you recycled the `Order` component as was recommended in the last exercise! 😋

Underneath the form, add a little update button that will un-disable (enable) the pizza and its size / price. This is just a **partial change** after all. Oh, and a new button should show up in the form! 

Once all the changes are done, hit the `Save Changes` button and send it to the server through a `fetch`!

`Alert` the admin with the results of the fetch. If the update worked, redirect them back to the admin pannel with the [useNavigate](https://reactrouter.com/en/main/hooks/use-navigate) hook.

> **HINT**: To get the pizza to be pre-selected, use the `selected` attribute. For the prices, use `defaultChecked`.

![ex6_demo](../__lecture/assets/ex6.gif)

---

Remember to look at the [API Documentation](../server/API_DOC.md) to figure out what address you need to `fetch`!

[Back to README](../README.md)