// declare variables
const healthBtn = document.getElementById("Trends");
const techBtn = document.getElementById("technology");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const searchBtn = document.getElementById("Search");

const newsQuery = document.getElementById("queryNews");
const newsType = document.getElementById("newType");
const newsDetails = document.getElementById("newsdetails");


// const API_KEY = "BTjwcYfPejtgwfZ1z3mdC5tzGHUexeynpd40Qmc5Vlw";
const DEFAULT_IMAGE_PATH = "path/to/default/image.jpg";
const BASE_URL = "https://saurav.tech/NewsAPI/";
const HEADLINE_NEWS = "https://saurav.tech/NewsAPI/top-headlines/category/general/us.json";
const HEALTH_NEWS =  "https://saurav.tech/NewsAPI/top-headlines/category/health/us.json";
const TECH_NEWS = "https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json";
const BUSINESS_NEWS = "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json";
const SPORTS_NEWS = "https://saurav.tech/NewsAPI/top-headlines/category/sports/us.json";
const ENTERTAINMENT_NEWS = "https://saurav.tech/NewsAPI/top-headlines/category/entertainment/us.json";
const SEARCH_NEWS = `${BASE_URL}search?q=`;

window.onload = function(){
    newsType.innerHTML="<h4 class='text-center my-4 text-uppercase font-weight-bold'>Headlines<h4>";
    fetchHeadlines();
};


let newsDataArr = [];

healthBtn.addEventListener("click", function() {
    newsType.innerHTML="<h4 class='text-center my-4 text-uppercase font-weight-bold' >Health News<h4>";
    fetchHealthNews();
});

techBtn.addEventListener("click", function() {
    newsType.innerHTML="<h4 class='text-center my-4 text-uppercase font-weight-bold' >Tech News<h4>";
    fetchTechNews();
});

businessBtn.addEventListener("click", function() {
    newsType.innerHTML="<h4 class='text-center my-4 text-uppercase font-weight-bold' >Busines News<h4>";
    fetchBusinesNews();
});

sportsBtn.addEventListener("click", function() {
    newsType.innerHTML="<h4 class='text-center my-4 text-uppercase font-weight-bold' >Sports<h4>";
    fetchSportsNews();
});

entertainmentBtn.addEventListener("click", function() {
    newsType.innerHTML="<h4 class='text-center my-4 text-uppercase font-weight-bold' >Entertainment<h4>";
    fetchEntertainmentNews();
});

searchBtn.addEventListener("click", function() {
    newsType.innerHTML="<h4>Search : "+newsQuery.value+"<h4>";
    fetchQueryNews();
});


// fetch

const fetchHeadlines = async () => {
    const response = await fetch(HEADLINE_NEWS);
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

const fetchHealthNews = async () => {
    const response = await fetch(HEALTH_NEWS);
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
    const response = await fetch(TECH_NEWS);
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
    const response = await fetch(BUSINESS_NEWS);
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
    const response = await fetch(SPORTS_NEWS);
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
    const response = await fetch(ENTERTAINMENT_NEWS);
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

    const response = await fetch(SEARCH_NEWS + encodeURIComponent(newsQuery.value));
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
        if (news.urlToImage) {
            image.src = news.urlToImage;
          } else {
            // Set the default image source here
            image.src = "path/to/default/image.jpg";
          }

        // image.src=news.image_url;

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

