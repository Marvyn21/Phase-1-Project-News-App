// declare variables
const trendBtn = document.getElementById("Trends");
const techBtn = document.getElementById("technology");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const searchBtn = document.getElementById("Search");

const newsQuery = document.getElementById("queryNews");
const newsType = document.getElementById("newType");
const newsDetails = document.getElementById("newsdetails");

const API_KEY = "69b672556284457fb181df45c8369e53";
const HEADLINE_NEWS = "https://newsapi.org/v2/top-headlines?country=us&apiKey=";
const TRENDING_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=trending&apiKey=";
const TECH_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=sport&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload = function(){
    newsType.innerHTML="<h4 class="text-center"; >Headlines<h4>";
    fetchHeadlines();
};


let newsDataArr = [];

trendBtn.addEventListener("click", function() {
    newsType.innerHTML="<h4>Current Trends<h4>";
    fetchTrendingNews();
});

techBtn.addEventListener("click", function() {
    newsType.innerHTML="<h4>Tech News<h4>";
    fetchTechNews();
});

businessBtn.addEventListener("click", function() {
    newsType.innerHTML="<h4>Busines News<h4>";
    fetchBusinesNews();
});

sportsBtn.addEventListener("click", function() {
    newsType.innerHTML="<h4>Sports<h4>";
    fetchSportsNews();
});

entertainmentBtn.addEventListener("click", function() {
    newsType.innerHTML="<h4>Entertainment<h4>";
    fetchEntertainmentNews();
});

searchBtn.addEventListener("click", function() {
    newsType.innerHTML="<h4>Search : "+newsQuery.value+"<h4>";
    fetchQueryNews();
});



// fetch
const fetchHeadlines = async () => {
    const response = await fetch(HEADLINE_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        console.log(myJson)
        newsDataArr = myJson.articles;
    } else{
        console.log(response.status, response.statusText);
    }


    displayNews();
}

const fetchTrendingNews = async () => {
    const response = await fetch(TRENDING_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        console.log(myJson)
        newsDataArr = myJson.articles;
    } else{
        console.log(response.status, response.statusText);
    }


    displayNews();
}

const fetchTechNews = async () => {
    const response = await fetch(TECH_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else{
        console.log(response.status, response.statusText);
    }


    displayNews();
}

const fetchBusinesNews = async () => {
    const response = await fetch(BUSINESS_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else{
        console.log(response.status, response.statusText);
    }


    displayNews();
}

const fetchSportsNews = async () => {
    const response = await fetch(SPORTS_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else{
        console.log(response.status, response.statusText);
    }


    displayNews();
}


const fetchEntertainmentNews = async () => {
    const response = await fetch(ENTERTAINMENT_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        console.log(myJson)
        newsDataArr = myJson.articles;
    } else{
        console.log(response.status, response.statusText);
    }


    displayNews();
}

const fetchQueryNews = async () => {

    if (newsQuery.value == null) {
        return;
    }

    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else{
        console.log(response.status, response.statusText);
    }


    displayNews();
}


function displayNews(){

    newsDetails.innerHTML = "";

    if(newsDataArr.length == 0){
        newsDetails.innerHTML = "<h5>No Data Found.</h5>"
        return;
    }

    newsDataArr.forEach(news => {

        let date = news.publishedAt.split("T");

        let col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        let card = document.createElement('div');
        card.className = "p-2";

        let image = document.createElement('img');
        image.setAttribute("height", "matchparnt");
        image.setAttribute("width", "100%");
        image.src=news.urlToImage;

        let cardBody = document.createElement('div');

        let newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        let dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        let description = document.createElement('p');
        description.className="text-muted";
        description.innerHTML = news.description;

        let link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsDetails.appendChild(col);
    })
}