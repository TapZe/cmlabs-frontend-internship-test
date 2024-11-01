$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const mealId = urlParams.get("meal-id");

  if (!mealId) {
    window.location.href = "index.html";
  }

  axios
    .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => {
      const meal = response.data.meals[0];
      $("#breadcrumb-category-name").text(meal.strCategory);
      $("#breadcrumb-category-name").html(
        `<a href="categoryDetail.html?category-name=${meal.strCategory}">${meal.strCategory}</a>`
      );
      $("#breadcrumb-meal-name").text(meal.strMeal);
      $("#meal-name").text(meal.strMeal);
      $("#meal-image").attr("src", meal.strMealThumb);
      $("#meal-instructions").text(meal.strInstructions);

      // Display Recipe Ingredients (only 20 because the object is max 20 from the API)
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          $("#meal-recipe").append(
            `<li class="list-group-item">
            ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
            </li>`
          );
        }
      }

      // Embed YouTube video if available
      if (meal.strYoutube) {
        const videoUrl = meal.strYoutube.replace("watch?v=", "embed/");
        $("#meal-video").html(
          `<iframe title="Tutorial Video" src="${videoUrl}" allowfullscreen></iframe>`
        );
      } else {
        $("#meal-video-main").hide();
      }
    })
    .catch((error) => console.error("Error:", error));
});
