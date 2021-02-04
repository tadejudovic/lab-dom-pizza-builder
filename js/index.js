// Write your Pizza Builder JavaScript in this file.

// Constants
let basePrice = 10;
let ingredients = {
  pepperoni: { name: "pepperoni", price: 1 },
  mushrooms: { name: "Mushrooms", price: 1 },
  greenPeppers: { name: "Green Peppers", price: 1 },
  whiteSauce: { name: "White sauce", price: 3 },
  glutenFreeCrust: { name: "Gluten-free crust", price: 5 },
};

// Initial value of the state (the state values can change over time)
let state = {
  pepperoni: true,
  mushrooms: true,
  greenPeppers: true,
  whiteSauce: false,
  glutenFreeCrust: false,
};

// This function takes care of rendering the pizza based on the state
// This function is triggered once at the beginning and every time the state is changed
function renderEverything() {
  renderPepperoni();
  renderMushrooms();
  renderGreenPeppers();
  renderWhiteSauce();
  renderGlutenFreeCrust();

  renderButtons();
  renderPrice();
}

function renderPepperoni() {
  document.querySelectorAll(".pep").forEach((onePep) => {
    if (state.pepperoni) {
      onePep.style.visibility = "visible";
    } else {
      onePep.style.visibility = "hidden";
    }
  });
}

function renderMushrooms() {
  // Iteration 1: set the visibility of `<section class="mushroom">`
  const allMushrooms = document.querySelectorAll(".mushroom");

  allMushrooms.forEach((mushroom) => {
    if (state.mushrooms) {
      mushroom.style.visibility = "visible";
    } else {
      mushroom.style.visibility = "hidden";
    }
  });
}

function renderGreenPeppers() {
  // Iteration 1: set the visibility of `<section class="green-pepper">`
  const allPeps = document.querySelectorAll(".green-pepper");

  allPeps.forEach((pep) => {
    if (state.greenPeppers) {
      pep.style.visibility = "visible";
    } else {
      pep.style.visibility = "hidden";
    }
  });
}

function renderWhiteSauce() {
  // Iteration 2: add/remove the class "sauce-white" of `<section class="sauce">`
  const whiteSauce = document.querySelector(".sauce");
  if (state.whiteSauce) {
    whiteSauce.classList.add("sauce-white");
  } else {
    whiteSauce.classList.remove("sauce-white");
  }
}

function renderGlutenFreeCrust() {
  // Iteration 2: add/remove the class "crust-gluten-free" of `<section class="crust">`
  const gluten = document.querySelector(".crust");
  if (state.glutenFreeCrust) {
    gluten.classList.add("crust-gluten-free");
  } else {
    gluten.classList.remove("crust-gluten-free");
  }
}

const ingredientClasses = {
  pepperoni: "pepperoni",
  mushrooms: "mushrooms",
  greenPeppers: "green-peppers",
  whiteSauce: "sauce",
  glutenFreeCrust: "crust",
};

function renderButtons() {
  // Iteration 3: add/remove the class "active" of each `<button class="btn">`
  for (const key in ingredientClasses) {
    const currentButton = querySelect(`.btn-${ingredientClasses[key]}`);
    // 1st loop
    // pepperoni : left side
    // state[key] : true -> state.pepperoni
    // ingredientClasses[key] -> pepperoni : right side

    // 3rd loop
    // key: greenPeppers: left side
    // state[key]: true -> state.greenPeppers: whenever we use the (.) or the [] we are accessing the right side
    // ingredientClasses[key] => green-peppers
    if (state[key]) {
      currentButton.classList.add("active");
    } else {
      currentButton.classList.remove("active");
    }
  }
}

function renderPrice() {
  // Iteration 4: change the HTML of `<aside class="panel price">`
  document.querySelector(".price ul").innerHTML = "";
  let newText = "";
  let sum = basePrice;
  for (let ingredient in state) {
    // let state = {
    //   pepperoni: true, state[ingredient] -> state[pepperoni] -> state.pepperoni
    //   mushrooms: true,
    //   greenPeppers: true,
    //   whiteSauce: false,
    //   glutenFreeCrust: false,
    // };
    if (state[ingredient]) {
      sum += ingredients[ingredient].price;
      newText += `<li>$${ingredients[ingredient].price} ${ingredients[ingredient].name}</li>`;
    }
  }
  querySelect(".price ul").innerHTML = newText;
  querySelect(".price strong").innerText = `$${sum}`;
}

renderEverything();

// Iteration 1: Example of a click event listener on `<button class="btn btn-pepperoni">`
document.querySelector(".btn-pepperoni").addEventListener("click", () => {
  state.pepperoni = !state.pepperoni;
  renderEverything();
});

// Iteration 1: Add click event listener on `<button class="btn btn-mushrooms">`
const mushroomButton = document.querySelector(".btn-mushrooms");
mushroomButton.addEventListener("click", () => {
  state.mushrooms = !state.mushrooms;
  renderEverything();
});

// Iteration 1: Add click event listener on `<button class="btn btn-green-peppers">`
const greenPepButton = document.querySelector(".btn-green-peppers");

greenPepButton.addEventListener("click", () => {
  state.greenPeppers = !state.greenPeppers;
  renderEverything();
});

// Iteration 2: Add click event listener on `<button class="btn btn-sauce">`
const sauceBtn = document.querySelector(".btn-sauce");

sauceBtn.onclick = () => {
  state.whiteSauce = !state.whiteSauce;
  // const sauce = document.querySelector(".sauce");
  // sauce.classList.toggle("sauce-white");
  renderEverything();
};

// Iteration 2: Add click event listener on `<button class="btn btn-crust">`
const crutBtn = querySelect(".btn-crust");
crutBtn.onclick = () => {
  state.glutenFreeCrust = !state.glutenFreeCrust;
  // const gluten = querySelect(".crust");
  // gluten.classList.toggle("crust-gluten-free");
  renderEverything();
};

function querySelect(selector) {
  return document.querySelector(selector);
}
