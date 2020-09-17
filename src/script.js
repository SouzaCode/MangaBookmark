document.addEventListener("DOMContentLoaded", function () {
  let a = document
    .querySelector("button.op")
    .addEventListener("click", function () {
      alert("oi");
    });

  /*
  document.querySelector("#btnadd1").addEventListener("click", function () {
    let text = document.querySelector("#ncap1").textContent;
    let capn = parseInt(text.split(" ")[1]) ? parseInt(text.split(" ")[1]) : 0;
    capn += 1;
    document.querySelector("#ncap1").innerHTML = "Cap. " + capn;
  });
  document.querySelector("#btnsub1").addEventListener("click", function () {
    let text = document.querySelector("#ncap1").textContent;
    let capn = parseInt(text.split(" ")[1]) ? parseInt(text.split(" ")[1]) : 0;
    capn = capn - 1 > 0 ? capn - 1 : 0;
    document.querySelector("#ncap1").innerHTML = "Cap. " + capn;
  });
  */
});
