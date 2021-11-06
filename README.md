# factor
Factor class lib

```js
    new Factor("div", {
        child: new Factor("h2", {
            text: "Title",
            style: {
                color: "blue",
            },
        }),
    })
```

```html
    <div>
        <h2 style="color: blue;">
            Title
        </h2>
    </div>