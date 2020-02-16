document.getElementById('archive').style.display="none";
var rand_no;
var url;
var temp = 0;
var count = 0;
var rowCount = 0;
var val = new Array();
var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var pid = ["title1", "title2", "title3", "title4"];
var imgid = ["pic1", "pic2", "pic3", "pic4"];
var key = JSON.parse(Window.localStorage.getItem("randomNumber")) || [];
function loadDoc() {
  for(var i=0; i<4; i++){
    rand_no = Math.floor((Math.random()*999)+1);
    check(rand_no);
    temp = 1;
  }
}
function check(rand_no){
  if(temp == 1){
    val = JSON.parse(Window.localStorage.getItem("randomNumber"));
    for(var i=0; i<val.length; i++){
      var x = val[i];
      if(x == rand_no){
        loadDoc();
        return;
      }
    }
  }

  let lastViewed = new Date();
  let d = lastViewed.getDate();
  let m = lastViewed.getMonth();
  let y = lastViewed.getFullYear();
  let h = lastViewed.getHours();
  let min = lastViewed.getMinutes();
  let s = lastViewed.getSeconds();
  let date = d + " " + month[m] + " " +y;
  let time = h + ":" + min + ":" + s;
  let obj = {
    num: rand_no,
    dat: date,
    tim: time,
  };
  key.push(obj);
  Window.localStorage.setItem("randomNumber", JSON.stringify(key));
  url = "https://xkcd.now.sh/?comic=" + rand_no;
  var xhttp = new XMLHttpRequest();

  xhttp.open("GET", url, true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let xyz = JSON.parse(this.responseText);
      let index = (key.indexOf(obj)+1) + ". COMIC TITLE";
      document.getElementById(imgid[count]).src = xyz.img;
      document.getElementById(pid[count]).innerHTML = index;
      count++;
    }
  };
}

function archivePage(){
  document.getElementById("mc").style.display="none";
  document.getElementById("comic").style.display="none";
  document.getElementById("abc").style.display="none";
  document.getElementById("archive").style.display="flex";
  val = JSON.parse(Window.localStorage.getItem("randomNumber"));
  if(rowCount < val.length){
    for(var i=rowCount; i<val.length; i++){
      let divElement = document.createElement("div");
      let pElement = document.createElement("p");
      let cTitle = document.createTextNode((rowCount+1)+""+". Comic Title");
      pElement.appendChild(cTitle);
      divElement.appendChild(pElement);
      pElement.setAttribute('id', rowCount);
      divElement.setAttribute('class', 'cTitle');
      let details = document.createElement("div");
      let p1 = document.createElement("p");
      let p2 = document.createElement("p");
      let p3 = document.createElement("p");
      let text1 = document.createTextNode("Last Viewed:");
      let text2 = document.createTextNode(val[rowCount].dat);
      let text3 = document.createTextNode(val[rowCount].tim);
      p1.appendChild(text1);
      p2.appendChild(text2);
      p3.appendChild(text3);
      details.appendChild(p1);
      details.appendChild(p2);
      details.appendChild(p3);
      details.setAttribute('class', 'viewed');
      let block = document.createElement("div");
      block.appendChild(divElement);
      block.appendChild(details);
      block.setAttribute('class', 'block');
      let archive = document.getElementById('archive');
      archive.setAttribute('class','archivePage');
      archive.appendChild(block);
      rowCount++;
    }
  }
}

function generatePage(){
    document.getElementById("mc").style.display = "flex";
    document.getElementById("comic").style.display = "block";
    document.getElementById("abc").style.display = "block";
    document.getElementById("archive").style.display = "none";
}
