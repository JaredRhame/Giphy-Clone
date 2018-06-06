var gifView = document.querySelector('#main-canvas');
var searchForm = document.querySelector('#search-form');
var submitBtn = document.querySelector('#submit-btn');
const API_KEY = "KqtpJ4SvKLu2MmTh8QP5Ld6tA7FZnOU4";
var mainView = document.querySelector('#main');
var addGifs = document.querySelector('#add-gifs-btn');
var homeArrow = document.querySelector('#home-arrow');
var endPoint;
//let myURL = `//api.giphy.com/v1/gifs/search?q=&api_key=${API_KEY}&limit=5`;
var gifs;
let gifLimit = 12;

searchForm.addEventListener('submit', search);

function search(e){
  var searchTerm = document.querySelector('#search-bar').value;
  endPoint = "search";
  if(searchTerm == ""){
    searchTerm = "random";
  }
  let myURL = `//api.giphy.com/v1/gifs/${endPoint}?q=${searchTerm}&api_key=${API_KEY}&limit=${gifLimit}`;
  e.preventDefault();
  fetch(myURL).then(function(response){
    if(response.ok){
      response.json().then(function(json) {
        gifs = json.data;

        while (gifView.firstChild) {
                gifView.removeChild(gifView.firstChild);

              }
        for (var i = 0; i < gifs.length; i++) {
          displayGif(gifs[i]);
        }
      });
    } else{
      console.log("Response unsucessful due to " + response.status + " : " + response.statusText);
      }
    });
  }

var displayGif = gifs => {
  var div = document.createElement('div');
  var img = document.createElement('img');
  img.src = gifs.images.downsized_large.url;
  //gifView.appendChild(div);
  gifView.appendChild(img);
  img.classList.toggle("gif");
  addGifs.addEventListener('click', moreGifs);
  window.addEventListener('scroll', homeArrowReset);

}
function moreGifs(e) {
  gifLimit += 12;
  var aTag = document.createElement("A");

  if(gifLimit > 48){
    addGifs.style.display = "none";

  }else if(gifLimit <= 48){
    search(e);

  }
}

function homeArrowReset(e){
  homeArrow.style.display = "inline";
}
