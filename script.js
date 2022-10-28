var nav=document.createElement("nav");
nav.setAttribute("class","navbar");


var div=document.createElement("div");
div.setAttribute("class","toggle-btn");
nav.append(div);

//bar code
for(var i=0;i<3;i++){
    var span=document.createElement("span");
    div.append(span);
    }

//logo
var img=document.createElement("img");
img.setAttribute("src","images/logo.png");
img.setAttribute("class","logo");
img.setAttribute("alt"," ");

//search box
var div1=document.createElement("div");
div1.setAttribute("class","search-box");

var input=document.createElement("input");
input.setAttribute("type","text");
input.setAttribute("class","search-bar");
input.setAttribute("placeholder","search");

var button=document.createElement("button");
button.setAttribute("class","search-btn");
button.innerHTML=`<img src="images/search.png" alt=" ">`

div1.append(input,button);

//user options
var div3=document.createElement("div");
div3.setAttribute("class","user-options");
div3.innerHTML=`
         <img src="images/video.png" alt="">
         <img src="images/grid.png" alt=""> 
         <img src="images/bell.png" alt="">
         <div class="user-dp">
           <img src="images/profile-pic.png" alt="">
         </div>  `

nav.append(div,img,div1,div3);


document.body.append(nav);

//sidebar
var divS=document.createElement("div");
divS.setAttribute("class","side-bar");

divS.innerHTML=`
<a href="#" class="links active"><img src="images/home.png" alt="">home</a>
<a href="#" class="links "><img src="images/explore.png" alt="">explore</a>
<a href="#" class="links "><img src="images/subscription.png" alt="">subscription</a>
<hr class="seperator">
<a href="#" class="links "><img src="images/library.png" alt="">library</a>
<a href="#" class="links "><img src="images/history.png" alt="">history</a>
<a href="#" class="links "><img src="images/your-video.png" alt="">your video</a>
<a href="#" class="links "><img src="images/watch-later.png" alt="">watch video</a>
<a href="#" class="links "><img src="images/liked video.png" alt="">like video</a>
<a href="#" class="links "><img src="images/show more.png" alt="">show more</a>


`

document.body.append(divS);

//FILTERS:

var divF=document.createElement("div");
divF.setAttribute("class","filters");
divF.innerHTML=`
   <button class="filter-options">all</button>
   <button class="filter-options">java</button>
   <button class="filter-options">c++</button>
   <button class="filter-options">javascript</button>
   <button class="filter-options">python</button>
   <button class="filter-options">html</button>
   <button class="filter-options">css cinima</button>
   <button class="filter-options">gaming</button>
   <button class="filter-options">entertainment</button>
   <button class="filter-options">diwali</button>
   <button class="filter-options">live</button>
   <button class="filter-options">free fire</button>
   <button class="filter-options">ymd army</button>
   <button class="filter-options">forza horizon 5</button>
   <button class="filter-options">gta</button>
`
document.body.append(divF);

//video

var divV=document.createElement("div");
divV.setAttribute("class","video-container");

document.body.append(divV);


//api kye
//const videoCardContainer = document.querySelector('');

let api_key="AIzaSyBnk_upiKn2v3GddXfimoN-Kh8vs2G64uM";
let video_http="https://www.googleapis.com/youtube/v3/videos?";
let channel_http="https://www.googleapis.com/youtube/v3/channels?";
fetch(video_http + new URLSearchParams({
  key: api_key,
  part:'snippet',
  chart:'mostPopular',
  maxResult: 10,
  regionCode:'IN'
}))
.then(res=> res.json())
.then(data=>{
  
  data.items.forEach(item => {
    getChannelIcon(item);
  })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
       fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
       }))
       .then(res => res.json())
       .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
       })
}

const makeVideoCard = (data) => {
  divV.innerHTML  +=`
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'"> 
    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
    <div class="cdontent">
          <img src="${data.channelThumbnail}" class="channel-icon" alt"">
       <div class="info">
         <h4 class="title">${data.snippet.title}</h4>
         <p class="channel-name"${data.snippet.channelTitle}></p>      
       </div>
    </div> 
    </div>    
`

}

const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', ()=>{
  if(searchInput.value.length){
    location.href = searchLink + searchInput.value;
  }
})
