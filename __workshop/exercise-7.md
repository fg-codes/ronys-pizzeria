# Exercise 7 - I changed my mind!

Ever so rarely, someone decides they changed their mind and they don't want pizza! Terrible, I know! 😱

But "the customer is always right" as they say. So if they want the order deleted, you'll have to delete it.

Add a button under the form, next to the update button created in the last exercise. This one will let you delete the form.

When the button is pressed, it prompts the admin with a confirmation (because we **ALWAYS** confirm before deleting). If the admin presses `"No"`, the deleting process is cancelled. If the admin presses `"Yes"`, you'll have to send the delete order to the server with, you guessed it, a `fetch`!

Alert the admin of the result. If it was successful, redirect them back to the admin pannel with the [useNavigate](https://reactrouter.com/en/main/hooks/use-navigate) hook.

![ex7_demo](../__lecture/assets/ex7.gif)

---

Remember to look at the [API Documentation](../server/API_DOC.md) to figure out what address you need to `fetch`!

[Back to README](../README.md)