document.querySelector("button").addEventListener("click", () => {
  const div = document.getElementById("content");
  div.textContent = "";
  const loader = document.createElement("div");
  loader.setAttribute("class", "lds-ripple");
  loader.appendChild(document.createElement("div"));
  loader.appendChild(document.createElement("div"));
  div.appendChild(loader);
  fetch("http://whatthecommit.com/index.txt")
    .then((r) => {
      if (!r.ok) throw r;
      return r.text();
    })
    .then((data) => {
      div.textContent = data;
    })
    .catch((err) => {
      div.textContent = JSON.stringify(err);
    });
});
