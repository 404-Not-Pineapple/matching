///////////////////////////////////////////////////////////////////////////////////////
var applicationKey = "";
var clientKey = "";
var ncmb = new NCMB(applicationKey, clientKey);
////////////////////////////////ニフクラ////////////////////////////////////////////////

var currentUser = ncmb.User.getCurrentUser();


/*window.onload = function() {

}*/

function karent() {
  alert(currentUser.get("name"));
}

function view() {
  
  alert("はい");
  var resultOut = document.getElementById("content");
  resultOut.innerHTML = "";
  resultOut.innerHTML += "<div>やぁ</div><br>";

  var looksta = ncmb.DataStore("MatchingStatus");
  looksta.fetchAll()
    .then(function(sta) {

      alert(sta.length);
      
      var sign = 0;
      for (var i = 0; i < sta.length; i++) {

        if(sta[i].get("user1") == currentUser.get("objectId")&&sta[i].get("user1fav") == "1"&&sta[i].get("user2fav") == "1"){
          ncmb.User.equalTo("objectId", sta[i].get("user2"))
          .fetch()
          .then(function(result){
            //console.log(result.get("name"));
            resultOut.innerHTML += "<div>" + result.get("name") + "</div><br>";
          })
        } else if (sta[i].get("user2") == currentUser.get("objectId")&&sta[i].get("user1fav") == "1"&&sta[i].get("user2fav") == "1"){
          ncmb.User.equalTo("objectId", sta[i].get("user1"))
          .fetch()
          .then(function(result) {
            //console.log(result.get("name"));
            resultOut.innerHTML += "<div>" + result.get("name") + "</div><br>";
          })
          
        }
      }
    })
  
  
  }

//var partner = ;//ここに会員IDを入れる
//  location.href = "dm.html?data=" + encodeURIComponent(partner);
