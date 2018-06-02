var gifView = document.querySelector('#main-canvas');
var searchForm = document.querySelector('#search-form');
var submitBtn = document.querySelector('#submit-btn');
const API_KEY = "KqtpJ4SvKLu2MmTh8QP5Ld6tA7FZnOU4";

// var categoryName = 'search';
//let myURL = `//api.giphy.com/v1/gifs/search?q=&api_key=${API_KEY}&limit=5`;
var gifs;

// Can use for trending on load
//fetch(myURL).then(function(response) {
  //if(response.ok){

searchForm.addEventListener('submit', search);

//   } else {
//     console.log("Response unsucessful due to " + response.status + " : " + response.statusText);
//   }
// });

function search(e){
  var searchTerm = document.querySelector('#search-bar').value;
  if(searchTerm == ""){
    searchTerm = "random";
  }
  let myURL = `//api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API_KEY}&limit=6`;
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
  img.src = gifs.images.original.url;
  //gifView.appendChild(div);
  gifView.appendChild(img);
  img.classList.toggle("gif");
}
