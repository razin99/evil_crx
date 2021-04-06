document.querySelector("button").addEventListener("click", () => {
  const div = document.getElementById("content");
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
