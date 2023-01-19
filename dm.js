///////////////////////////////////////////////////////////////////////////////////////
var applicationKey = "";
var clientKey = "";
var ncmb = new NCMB(applicationKey, clientKey);
////////////////////////////////ニフクラ////////////////////////////////////////////////
function sleep(waitMsec) {
  var startMsec = new Date();
  while (new Date() - startMsec < waitMsec);
}

var now = new Date
var lastTime = 0;

var currentUser = ncmb.User.getCurrentUser();
//var data = location.href.split("?")[1];
//var partner = data.split("=")[1];

//【テスト用】相手のID設定
var partner = "";

//相手の名前初期化
var partnerName = "";


/*  var lookUser = ncmb.User();  //ユーザー名前の確認
  lookUser.fetchAll()
    .then(function(result){
      for(var i = 0;i < result.length; i++){
        if(partner = result[i].get("objectId")){
          partnername = result[i].get("userName");
        }
      }
    });*/


//同期処理
function onloadOne() {
  return new Promise(function(resolve, reject) {  //同期処理させるためのコード
    console.log("one");
    var flg = 0;

    var sta = ncmb.DataStore("MatchingStatus");
    sta.equalTo("user1", currentUser.get("objectId"))
      .fetchAll()
      .then(function(results) {
        console.log(results.length);
        //if (results.length != 0) {
          console.log("one if");
          partner = results[0].get("user2");
          flg = 1;
          resolve([flg, partner]);
        //}
        
      })
      .catch(function(err){
        resolve([flg, partner]);
      });
  });
}

function onloadTwo(arr) {
  return new Promise(function(resolve, reject) { //同期処理させるためのコード
    console.log("two" + arr[0]);
    var flg = arr[0];
    partner = arr[1];
    
    if (flg != 1) {
      console.log("two if");
      var sta = ncmb.DataStore("MatchingStatus");
      sta.equalTo("user2", currentUser.get("objectId"))
        .fetchAll()
        .then(function(results) {
          //if (results.length != 0) {
            flg = 1;
            partner = results[0].get("user1");
            console.log("取得：" + partner + ":flg:" + flg);
            console.log("flg" + flg);
            resolve([flg, partner]);
          //}
        })
      .catch(function(err){
        console.log("err" + err);
        //resolve();
      });
    }else{
      resolve([flg, partner]);
    }
  });
}

function onloadThree(arr) {
  return new Promise(function(resolve, reject) { //同期処理させるためのコード
  console.log("three partner:" + arr[1]);
  var flg = arr[0];
  partner = arr[1];

  if (flg == 1) {
    console.log("thr if + partner:" + partner);
    ncmb.User.equalTo("userId", partner)
      .fetch()
      .then(function(result) {
        partnerName = result.get("name");
      });
  }
    resolve(0);
});
}

//ロード時の処理
window.onload = function() {  //onloadOne => Two => Threeの順で動かす
  onloadOne()
  .then(onloadTwo)
  .then(onloadThree)
  .then(function () {
    var myid = currentUser.get("objectId");
    var myname = currentUser.get("name");
    var lookDm = ncmb.DataStore("Dm");
    var subquery1 = lookDm.equalTo("SENDER", myid);
    var subquery2 = lookDm.equalTo("PARTNER", partner);
    var subquery3 = lookDm.equalTo("SENDER", partner);
    var subquery4 = lookDm.equalTo("PARTNER", myid);
    console.log("自分：" + myid + " 相手:" + partner);
    lookDm.or([subquery1, subquery3], [subquery2, subquery4])
    .order("TIME", true)
    .fetchAll()
    .then(function(results) {
      var result = results[0];
      var nowTime = result.get("TIME");
      if (lastTime < nowTime) {
        console.log("取得する");
        Display(nowTime);
      } else {
        console.log("取得しない");
      }
    })
    .catch(function(err) {
      console.log("エラー" + err);
    });
  });
}

//line-A:自分側の表示,line-B:相手側の表示(classによるcss)

//view();


//partnernameに変数partnerのIDをもとに名前を入れてほしい"
/*function nameko(){
  var partner = "tSzS7dXTtmPZ1Fl4";
  ncmb.User.equalTo("userId", partner)
  .fetch()
  .then(function(result){
    partnername = result.get("name");
    console.log(partnername);
  })
  .catch(function(err){
    alert("失敗：" + err);
  });
}*/

//気に入ったボタンの実行
function gotta() {

  //alert("はい！");

  var sta = ncmb.DataStore("MatchingStatus");
  sta.equalTo("user1", currentUser.get("objectId"))
    .fetch()
    .then(function(results) {
      if (results.get("user1fav") == "0") {
        alert("お気に入り登録をしました");
        results.set("user1fav", "1");
        return results.update();
      } else {
        alert("お気に入り登録を解除しました");
        results.set("user1fav", "0");
        return results.update();
      }
    });

  sta.equalTo("user2", currentUser.get("objectId"))
    .fetch()
    .then(function(results) {
      if (results.get("user2fav") == "0") {
        alert("お気に入り登録をしました");
        results.set("user2fav", "1");
        return results.update();
      } else {
        alert("お気に入り登録を解除しました");
        results.set("user2fav", "0");
        return results.update();
      }
    });


  //var Sta = new dm();

  /*sta.fetchAll()
    .then(function(result){
      for(var i = 0; i < result.length; i++){
        if(currentUser.get("objectId") == result[i].get("user1")&&partner == result[i].get("user2")){
          result[i].get("user1fav") = "1";
        }else if(currentUser.get("objectId") == result[i].get("user2")&&partner == result[i].get("user1")){
          result[i].get("user2fav") = "1";
        }
      }
    })*/

  //Sta.set("user1fav","1");


}


//名前の確認
function karent() {
  alert("あなたの名前は「" + currentUser.get("name") + "」相手の名前は「" + partnerName + "」です");
}

//送信ボタンの実行
function send() {
  //alert("メール送っちゃうよー");
  var dm = ncmb.DataStore("Dm");
  var Dm = new dm();
  var content = document.getElementById("content").value;

  alert(content);


  var Year = now.getFullYear();
  var Month = now.getMonth() + 1;
  var Date = now.getDate();
  var Hour = now.getHours();
  var Min = now.getMinutes();
  var Sec = now.getSeconds();
  switch (Hour) {
  case 1:
    Hour = 01;
    break;
  case 2:
    Hour = 02;
    break;
  case 3:
    Hour = 03;
    break;
  case 4:
    Hour = 04;
    break;
  case 5:
    Hour = 05;
    break;
  case 6:
    Hour = 06;
    break;
  case 7:
    Hour = 07;
    break;
  case 8:
    Hour = 08;
    break;
  case 9:
    Hour = 09;
    break;
  }
  switch (Min) {
  case 1:
    Min = 01;
    break;
  case 2:
    Min = 02;
    break;
  case 3:
    Min = 03;
    break;
  case 4:
    Min = 04;
    break;
  case 5:
    Min = 05;
    break;
  case 6:
    Min = 06;
    break;
  case 7:
    Min = 07;
    break;
  case 8:
    Min = 08;
    break;
  case 9:
    Min = 09;
    break;
  }
  switch (Sec) {
  case 1:
    Sec = 01;
    break;
  case 2:
    Sec = 02;
    break;
  case 3:
    Sec = 03;
    break;
  case 4:
    Sec = 04;
    break;
  case 5:
    Sec = 05;
    break;
  case 6:
    Sec = 06;
    break;
  case 7:
    Sec = 07;
    break;
  case 8:
    Sec = 08;
    break;
  case 9:
    Sec = 09;
    break;
  }
  var Time = "" + Year + Month + Date + Hour + Min + Sec;
  var Time2 = "_" + Hour + ":" + Min;
  Time = Number(Time);


  //送信情報の登録　マッチjsに移行

  Dm.set("SENDER", currentUser.get("objectId"))
    .set("PARTNER", partner)
    .set("CONTENT", content)
    .set("TIME", Time)
    .set("TIME2", Time2)
    .save()
    .then(function(){
      document.getElementById("content").value = "";
    });

  //メッセージの表示
  //alert("メールを表示させちゃうよ");
  var resultOut = document.getElementById("dmresult");
  var lookDm = ncmb.DataStore("Dm");

  resultOut.innerHTML = "";

  lookDm.fetchAll()
    .then(function(result) {
      //alert("取得成功：" + JSON.stringify(result));
      for (var i = 0; i < result.length; i++) {
        if (currentUser.get("objectId") == result[i].get("SENDER") && partner == result[i].get("PARTNER")) {

          resultOut.innerHTML += "<div class=line-A>" + currentUser.get("name") + ":" + result[i].get("CONTENT") + "</div><br>";
        } else if (currentUser.get("objectId") == result[i].get("PARTNER") && partner == result[i].get("SENDER")) {

          resultOut.innerHTML += "<div class=line-B>" + partnerName + ":" + result[i].get("CONTENT") + "</div><br>";
        }
      }
      resultOut.innerHTML += "<div class=line-A>" + currentUser.get("name") + ":" + content + "</div><br>";
    });
}


/*function view() {

  var resultOut = document.getElementById("dmresult");
  var lookDm = ncmb.DataStore("Dm");

  resultOut.innerHTML = "";

  lookDm.fetchAll()
    .then(function(result) {
      //alert("取得成功：" + JSON.stringify(result));
      for (var i = 0; i < result.length; i++) {
        if (currentUser.get("objectId") == result[i].get("SENDER") && partner == result[i].get("PARTNER")) {
          //resultOut.innerHTML += "<div class=line-A>" + result[i].get("SENDER") + "to" + result[i].get("PARTNER") +":" + result[i].get("CONTENT") + "</div><br>";
          resultOut.innerHTML += "<div class=line-A>" + currentUser.get("name") + ":" + result[i].get("CONTENT") + "</div><br>";

        } else if (currentUser.get("objectId") == result[i].get("PARTNER") && partner == result[i].get("SENDER")) {
          //resultOut.innerHTML += "<div class=line-B>" + result[i].get("PARTNER") + "to" + result[i].get("SENDER") +":" + result[i].get("CONTENT") + "</div><br>";
          resultOut.innerHTML += "<div class=line-B>" + partnername + ":" + result[i].get("CONTENT") + "</div><br>";
        }
      }
    });
}*/

window.addEventListener('DOMContentLoaded', function(){
  // 10秒ごとに実行
  setInterval(() => {
    var myid = currentUser.get("objectId");
    var myname = currentUser.get("name");
    var lookDm = ncmb.DataStore("Dm");
    var subquery1 = lookDm.equalTo("SENDER", myid);
    var subquery2 = lookDm.equalTo("PARTNER", partner);
    var subquery3 = lookDm.equalTo("SENDER", partner);
    var subquery4 = lookDm.equalTo("PARTNER", myid);
    console.log("自分：" + myid + " 相手:" + partner);
    lookDm.or([subquery1, subquery3], [subquery2, subquery4])
      .order("TIME", true)
      .fetchAll()
      .then(function(results) {
        var result = results[0];
        var nowTime = result.get("TIME");
        if (lastTime < nowTime) {
          console.log("取得する");
          Display(nowTime);
        } else {
          console.log("取得しない");
        }
      })
      .catch(function(err) {
        console.log("エラー" + err);
      });
  }, 10000);
});

function Display(c) {
  var myid = currentUser.get("objectId");
  var myname = currentUser.get("name");
  var resultOut = document.getElementById("dmresult");
  var lookDm = ncmb.DataStore("Dm");
  resultOut.innerHTML = "";
  var subquery1 = lookDm.equalTo("SENDER", myid);
  var subquery2 = lookDm.equalTo("PARTNER", partner);
  var subquery3 = lookDm.equalTo("SENDER", partner);
  var subquery4 = lookDm.equalTo("PARTNER", myid);
  lookDm.or([subquery1, subquery3], [subquery2, subquery4])
    .order("TIME")
    .fetchAll()
    .then(function(results) {
      for (var i = 0; i < results.length; i++) {
        var a = results[i].get("SENDER");
        if (a == myid) {
          resultOut.innerHTML += "<div class=line-A>" + myname + results[i].get("TIME2") + ":" + results[i].get("CONTENT") + "</div><br>";
        } else if (a == partner) {
          resultOut.innerHTML += "<div class=line-B>" + partnerName + results[i].get("TIME2") + ":" + results[i].get("CONTENT") + "</div><br>";
        } else {
          alert("err")
        }
      }
      lastTime = c;
      return (c);
    })
    .catch(function(err) {
      alert(err);
    });
}

function block() {
  let checkSaveFlg = window.confirm('');
  if (checkSaveFlg) {
    alert("保存を実行しました。");
  } else {
    alert("保存をキャンセルしました");
  }
}
