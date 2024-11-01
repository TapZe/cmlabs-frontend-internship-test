$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryName = urlParams.get("category-name");

  if (!categoryName) {
    window.location.href = "index.html";
  }

  $("#category-name").text(categoryName + " Meals");
  $("#breadcrumb-category-name").text(categoryName);

  axios
    .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    .then((response) => {
      const meals = response.data.meals;
      let htmlContent = "";
      meals.forEach((meal) => {
        htmlContent += `
                    <div class="col-md-4 mb-4 meal-item">
                      <div class="btn card text-bg-dark p-0" onclick="redirectToMeal('${meal.idMeal}')">
                        <img src="${meal.strMealThumb}" class="card-img" alt="${meal.strMeal}">
                        <div class="card-img-overlay d-flex align-items-center justify-content-center" style="background-color: rgba(0, 0, 0, 0.5);">
                          <h5 class="card-title text-capitalize">${meal.strMeal}</h5>
                        </div>
                      </div>
                    </div>
                    `;
      });
      $("#meal-list").html(htmlContent);
    })
    .catch((error) => console.error("Error:", error));
});

function redirectToMeal(mealId) {
  window.location.href = `mealDetail.html?meal-id=${mealId}`;
}

$(document).ready(function () {
  $("#search-input").on("input", function () {
    const query = $(this).val().toLowerCase();
    const meals = $("#meal-list .meal-item");

    meals.hide(); // Hide all meals initially
    meals
      .filter(function () {
        const mealName = $(this).text().toLowerCase();
        return mealName.includes(query);
      })
      .show(); // Show meals that match the search query
  });
});
