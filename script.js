const filter = document.getElementById("filter");
const postContainer = document.querySelector(".post-container");
const loader = document.querySelector(".loader");

let limit = 5;
let page = 0;

async function fetchAndDisplayPosts() {
  page++;
  loader.classList.add("show");
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`,
  );

  const posts = await response.json();

  loader.classList.remove("show");

  for (const post of posts) {
    const newPost = document.createElement("div");
    newPost.classList.add("post");
    newPost.innerHTML = `<div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </div>`;
    postContainer.append(newPost);
  }
}

function filterPosts(e) {
  const queryTerm = e.target.value.toLowerCase();
  const posts = document.querySelectorAll(".post");
  for (const post of posts) {
    const title = post.querySelector(".post-title").textContent.toLowerCase();
    const body = post.querySelector(".post-body").textContent.toLowerCase();
    if (!title.includes(queryTerm) || !body.includes(queryTerm)) {
      post.style.display = "none";
    } else {
      post.style.display = "flex";
    }
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fetchAndDisplayPosts();
      }
    });
  },
  { threshold: 1.0 },
);
const sentinel = document.querySelector("#footer-sentinel");
observer.observe(sentinel);

fetchAndDisplayPosts();

filter.addEventListener("input", filterPosts);
