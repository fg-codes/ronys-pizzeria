```jsx
// conditional rendering goes here
<div>
    <label>Price: </label>
    {
        Object.keys(selectedPizza.price).map((key) => {
            return (
                <div>
                    <input 
                        type="radio" 
                        name="price" 
                        id="price" 
                        value={selectedPizza.price[key]} 
                        onClick={handleClick} 
                    />
                    <label htmlFor="price">{key}</label>
                    <label htmlFor="price">{selectedPizza.price[key]}</label>
                </div>
            )
        })
    }
</div>
```

--- 

Back to [exercise-3.md](../exercise-3.md).