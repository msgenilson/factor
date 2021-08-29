console.log("MAIN");
const main = document.querySelector("main");

// Example 01
main.appendChild(
  new Factor("app-hot", {
    child: [
      new Factor("h1", {
        class: "title",
        text: "Title",
      }),
      new Factor("div", {
        child: new Factor("h2", {
          text: "Subtitle",
          style: {
            color: "red",
          },
        }),
      }),
    ],
  })
);

// Example 02 - event click incremente variable
let count = 1;

let h3Fac = new Factor("h3", { text: count });

main.appendChild(
  new Factor("div", {
    style: { color: "orange" },
    child: [
      h3Fac,
      new Factor("button", {
        text: "increment",
        click: () => {
          count++;
          h3Fac.reload({ text: count });
        },
      }),
    ],
  })
);
