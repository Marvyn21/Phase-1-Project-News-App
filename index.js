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

const BASE_URL = "http://api.mediastack.com/v1/";
const ACCESS_KEY = "b62f88b4e1f80329330e71fbebf91b98";

const HEADLINE_NEWS = BASE_URL + "news?access_key=" + ACCESS_KEY;
const TRENDING_NEWS = BASE_URL + "news?access_key=" + ACCESS_KEY + "&sort=trend";
const TECH_NEWS = BASE_URL + "news?access_key=" + ACCESS_KEY + "&categories=technology";
const BUSINESS_NEWS = BASE_URL + "news?access_key=" + ACCESS_KEY + "&categories=business";
const SPORTS_NEWS = BASE_URL + "news?access_key=" + ACCESS_KEY + "&categories=sport";
const ENTERTAINMENT_NEWS = BASE_URL + "news?access_key=" + ACCESS_KEY + "&categories=entertainment";
const SEARCH_NEWS = BASE_URL + "news?access_key=" + ACCESS_KEY + "&q=";



window.onload = function(){
    newsType.innerHTML="<h4 class='text-center my-4 text-uppercase font-weight-bold'>Headlines<h4>";
    fetchHeadlines();
};


let newsDataArr = [];

trendBtn.addEventListener("click", function() {
    newsType.innerHTML="<h4 class='text-center my-4 text-uppercase font-weight-bold' >Current Trends<h4>";
    fetchTrendingNews();
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
    const response = await fetch(BASE_URL + "news" + "?access_key=" + ACCESS_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        console.log(myJson)
        newsDataArr = myJson.data;
    } else{
        console.log(response.status, response.statusText);
    }


    displayNews();
}

const fetchTrendingNews = async () => {
    const response = await fetch(BASE_URL + "news" + "?access_key=" + ACCESS_KEY + "&sort=popularity&countries=us");
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        console.log(myJson)
        newsDataArr = myJson.data;
    } else{
        console.log(response.status, response.statusText);
    }


    displayNews();
}

const fetchTechNews = async () => {
    const response = await fetch(BASE_URL + "news" + "?access_key=" + ACCESS_KEY + "&categories=technology");
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.data;
    } else{
        console.log(response.status, response.statusText);
    }


    displayNews();
}

const fetchBusinesNews = async () => {
    const response = await fetch(BASE_URL + "news" + "?access_key=" + ACCESS_KEY + "&categories=business");
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.data;
    } else{
        console.log(response.status, response.statusText);
    }


    displayNews();
}

const fetchSportsNews = async () => {
    const response = await fetch(BASE_URL + "news" + "?access_key=" + ACCESS_KEY + "&categories=sport");
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.data;
    } else{
        console.log(response.status, response.statusText);
    }


    displayNews();
}


const fetchEntertainmentNews = async () => {
    const response = await fetch(BASE_URL + "news" + "?access_key=" + ACCESS_KEY + "&categories=entertainment");
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        console.log(myJson)
        newsDataArr = myJson.data;
    } else{
        console.log(response.status, response.statusText);
    }


    displayNews();
}

const fetchQueryNews = async () => {

    if (newsQuery.value == null) {
        return;
    }

    const response = await fetch(BASE_URL + "news" + "?access_key=" + ACCESS_KEY + "&q=" + encodeURIComponent(newsQuery.value));
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.data;
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

        let date = news.published_at.split("T");

        let col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        let card = document.createElement('div');
        card.className = "p-2";

        let image = document.createElement('img');
        image.setAttribute("height", "matchparnt");
        image.setAttribute("width", "100%");
        if (news.image) {
            image.src = news.image;
          } else {
            // Set the default image source here
            image.src = "path/to/default/image.jpg";
          }

        // image.src=news.image;

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
