const API_KEY = "2e8763f257bc488c923a48de9d059f2c";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  try {
    const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }
    const data = await res.json();
    bindData(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

function bindData(articles) {
  const cardContainer = document.getElementById("cards_container");
  const newscardTemplate = document.getElementById("template_news_card");
  cardContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newscardTemplate.content.cloneNode(true);
    fillDatainCard(cardClone, article);
    cardContainer.appendChild(cardClone);
  });
}

function fillDatainCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news_img");
  const newsTitle = cardClone.querySelector("#news_title");
  const newsSource = cardClone.querySelector("#news_source");
  const newsDesc = cardClone.querySelector("#news_desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} . ${date} `;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let currSelectedNav = null;

function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  currSelectedNav?.classList.remove("active");
  currSelectedNav = navItem;
  currSelectedNav.classList.add("active");
}

const searchBtn = document.getElementById("search_button");
const searchText = document.getElementById("search-text");

searchBtn.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  currSelectedNav?.classList.remove("active");
  currSelectedNav = null;
});

// https://newsapi.org/v2/everything
// https://newsapi.org/v2/everything?q=tesla&from=2024-03-17&sortBy=publishedAt&apiKey=2e8763f257bc488c923a48de9d059f2c
