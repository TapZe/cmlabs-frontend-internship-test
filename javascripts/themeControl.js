$(document).ready(function () {
  // Function to apply the theme based on local storage
  function applyTheme() {
    let theme = localStorage.getItem("theme");
    if (theme === null) {
      theme = "";
      localStorage.setItem("theme", theme);
    }
    $("#html-page").attr("data-bs-theme", theme);
    $("#theme-toggle").prop("checked", theme === "dark");
  }

  applyTheme();

  // Theme toggle functionality
  $("#theme-toggle").change(function () {
    const newTheme = this.checked ? "dark" : "";
    $("#html-page").attr("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Save theme to local storage
  });
});
