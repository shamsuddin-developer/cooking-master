const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal-list");
const mealItem = document.getElementById("meal-item");

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
                      <div id= "meal-item" class="card border-radius shadow my-3">
                          <img class=" card-img-top" src="${meal.strMealThumb}" alt="food">
                        <div class="card-body">
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
