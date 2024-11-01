$(document).ready(() => {
  axios
    .get("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((response) => {
      const categories = response.data.categories;
      let htmlContent = "";
      categories.forEach((category) => {
        htmlContent += `
                    <div class="col-md-4 mb-4 category-item">
                      <div class="btn card text-bg-dark p-0" onclick="redirectToCategory('${category.strCategory}')">
                        <img src="${category.strCategoryThumb}" class="card-img" alt="${category.strCategory}">
                        <div class="card-img-overlay d-flex align-items-center justify-content-center" style="background-color: rgba(0, 0, 0, 0.5);">
                          <h5 class="card-title">${category.strCategory}</h5>
                        </div>
                      </div>
                    </div>
                    `;
      });
      $("#category-list").html(htmlContent);
    })
    .catch((error) => console.error("Error:", error));
});

function redirectToCategory(categoryName) {
  window.location.href = `categoryDetail.html?category-name=${categoryName}`;
}

$(document).ready(function () {
  $("#search-input").on("input", function () {
    const query = $(this).val().toLowerCase();
    const categories = $("#category-list .category-item");

    categories.hide(); // Hide all categories initially
    categories
      .filter(function () {
        const categoryName = $(this).text().toLowerCase();
        return categoryName.includes(query);
      })
      .show(); // Show categories that match the search query
  });
});
