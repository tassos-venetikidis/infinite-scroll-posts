const filter = document.getElementById("filter");
const postContainer = document.querySelector(".post-container");
const loader = document.querySelector(".loader");

let limit = 5;
let page = 0;

async function fetchAndDisplayPosts() {
  page++;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`,
  );

  const posts = await response.json();

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
    if (title.includes(queryTerm) || body.includes(queryTerm)) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  }
}

function infiniteScrollImplementer() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loader.classList.add("show");
    setTimeout(() => {
      loader.classList.remove("show");
      fetchAndDisplayPosts();
    }, 1000);
  }
}

fetchAndDisplayPosts();

filter.addEventListener("input", filterPosts);
window.addEventListener("scrollend", infiniteScrollImplementer);
