///////////////////////////////////////////////////////////////////////////////////////
var applicationKey = "b101366add9d639994615eab7abef980313249593396a053d475ad1fdc64d61e";
var clientKey = "9148fb43b9f68cab53ecd4c21af07ea3744a0b290373e8970c1a80bed6ca9927";
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
