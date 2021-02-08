const resultHeading = document.getElementById("search-info");
const mealContain = document.getElementById("meal-container");
const mealDescription = document.getElementById("meal-description");
const searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", searchMeals);

function searchMeals(e) {
  e.preventDefault();
  document.getElementById("meal-description").innerHTML = "";
  const term = document.getElementById("input").value;
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2 class="text-uppercase text-center"> Search for "${term}" </h2>`;
        if (data.meals === null) {
          alert(`Sorry, ${term} is not available!`);
        } else {
          mealContain.innerHTML = data.meals
            .map(
              (meal) => `

                    <div class = "col-lg-4">
                    <div class="card border-radius shadow my-3 meals"  data-ID="${meal.idMeal}">
                        <img class="card-img-top" src="${meal.strMealThumb}" alt="food">
                      <div class="card-body ">
                        <h3 class="text-center card-title">${meal.strMeal}</h3>
                      </div>
                     </div>
                </div>
                    `
            )
            .join("");
        }
      });
  } else {
    alert("Please insert a value in search");
  }
}

// fetch meal by id

function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

//  add meal to dom

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

  mealDescription.innerHTML = `
  <div class = "col-lg-12">
  
 
    <div class="card border-radius shadow my-3 p-4">
    <h2 class ="text-center my-3 text-uppercase"> ${meal.strMeal} </h2>
    <img class="w-50 img-fluid m-auto rounded" src="${
      meal.strMealThumb
    }" alt="${meal.strMeal}">
    <div class="text-center my-3">
    ${meal.strCategory ? `<p class="fw-bold">${meal.strCategory}</p>` : ""}
    ${meal.strArea ? `<p class="fw-bold"> ${meal.strArea}</p>` : ""}
    </div>
    <h2 class="text-center my-3">Ingredients</h2>
    <ul style="list-style-type: none;" class="text-center p-0 m-0">
    ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
    </div>
    `;
}

mealContain.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meals");
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-id");
    getMealById(mealId);
  }
});
