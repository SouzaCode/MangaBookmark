document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#btnadd").addEventListener("click", function () {
    let text = document.querySelector("#ncap").textContent;
    let capn = parseInt(text.split(" ")[1]) ? parseInt(text.split(" ")[1]) : 0;
    capn += 1;
    document.querySelector("#ncap").innerHTML = "Cap. " + capn;
  });
});
