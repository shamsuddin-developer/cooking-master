const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal-list");
const singleMeal = document.getElementById("single-meal");

// CLick event Listener for search button
searchBtn.addEventListener("click", function () {
  let searchResult = document.getElementById("input-value").value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchResult}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.meals);
      let createHtml = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          createHtml += `
                  <div class = "col-lg-3" data-id = "${meal.idMeal}">
                      <div class="card border-radius shadow my-3">
                          <img class=" card-img-top" src="${meal.strMealThumb}" alt="food">
                        <div class="card-body meal-head">
                          <h3 class="text-center card-title">${meal.strMeal}</h3>
                        </div>
                       </div>
                  </div>
              `;
        });
      } else {
        alert("Sorry, we didn't find any meal that you are looking for!");
      }

      mealList.innerHTML = createHtml;
    });
});

//Fetch Meal By Id

function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      let meal = data.meals[0];
      addMealToDOM(meal);
    });
}

//fetch Meal
function randomMeal() {
  //Clear Meals and Heading

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

//Add meal to DOM

function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMeal.innerHTML = `
  <div class="single-meal">
  <h1>${meal.strMeal}</h1>
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
  <div class="single-meal-info">
  ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
  ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
  </div>
  <div class="main">
  <p>${meal.strInstructions}</p>
  <h2>Ingredients</h2>
  <ul>
  ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
  </ul>
  </div>
  </div>
  `;
}

//Event Listener

mealList.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-head");
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-id");
    getMealById(mealID);
  }
});
