//ncmbとの連携----------------------------------------------------------------------------
var applicationKey = "";
var clientKey = "";
var ncmb = new NCMB(applicationKey, clientKey);
//---------------------------------------------------------------------------------------

let currentUser = ncmb.User.getCurrentUser();

function sleep(waitMsec) {
  var startMsec = new Date();
  while (new Date() - startMsec < waitMsec) {
  };
}


//アンダーメニューの表示を変える機能-----------------------------------------------------------------------

window.onload = function() {
  var currentUser = ncmb.User.getCurrentUser();
  var call = document.getElementById("Call");
  call.innerHTML = "";
  var MatchingStatus = ncmb.DataStore("MatchingStatus");  //DataStoreのMatchingStatus取得

  MatchingStatus.equalTo("user1", currentUser.get("objectId"))
    .fetch()
    .then(function(resultsZero) {
      //if(resultsZero.length != 0){   //matchingStatusのuser1の中に相手のIDがあったとき<a href=dm.html><i class=fa-solid fa-comment></i></br><span class=mini-text>メッセージ</span></a>
      //alert("user1にいます！");
      var progress = resultsZero.get("progress");
      if (progress == "1") {
        //alert("会話が進行中です！");
        call.innerHTML = "<ul class=bottom-menu><li><a href=mainPage.html><i class=fa-solid fa-house></i></br><span class=mini-text>ホーム</span></a></li><li><a href=dm.html><i class=fa-solid fa-comment></i></br><span class=mini-text>メッセージ</span></a></li><li><a href=favlist.html><i class=fa-sharp fa-solid fa-heart></i></br><span class=mini-text>おきにいり</span></a></li><li class=menu-width-max><a href=update.html><i class=fa-solid fa-address-card></i></br><span class=mini-text>プロフィール</span></a></li></ul>";
      } else {
        //alert("会話が終了しています！");
        call.innerHTML = "<ul class=bottom-menu><li><a href=mainPage.html><i class=fa-solid fa-house></i></br><span class=mini-text>ホーム</span></a></li><li><a href=match.html><i class=fa-sharp fa-solid fa-people-pants-simple></i></br><span class=mini-text>マッチング</span></a></li><li><a href=favlist.html><i class=fa-sharp fa-solid fa-heart></i></br><span class=mini-text>おきにいり</span></a></li><li class=menu-width-max><a href=update.html><i class=fa-solid fa-address-card></i></br><span class=mini-text>プロフィール</span></a></li></ul>";
      }
    })
    .catch(function(err) {
      call.innerHTML = "<a href=dm.html><i class=fa-solid fa-comment></i></br><span class=mini-text>メッセージ</span></a>";
    })

  MatchingStatus.equalTo("user2", currentUser.get("objectId"))
    .fetch()
    .then(function(resultsZero) {
      //if(resultsZero.length != 0){   //matchingStatusのuser1の中に相手のIDがあったとき
      //alert("user1にいます！");
      var progress = resultsZero.get("progress");
      if (progress == "1") {
        alert("会話が進行中です！");
        call.innerHTML = "<a href=dm.html><i class=fa-solid fa-comment></i></br><span class=mini-text>メッセージ</span></a>";
      } else {
        alert("会話が終了しています！");
        call.innerHTML = "<a href=match.html><i class=fa-sharp fa-solid fa-people-pants-simple></i></br><span class=mini-text>マッチング</span></a>";
      }
    })
    .catch(function(err) {
      call.innerHTML = "<a href=dm.html><i class=fa-solid fa-comment></i></br><span class=mini-text>メッセージ</span></a>";
    })
}

//---------------------------------------------------------------------------------------------------

function tempo() {

  alert("相手の名前はhoge_002さんです。");
}

//マッチング相手の状態を確認する機能-----------------------------------------------------------------------
var flgCheck = 0;


function searchZero1(opponentId) {
  return new Promise(function(resolve, reject) {  //同期処理させるためのコード
    var MatchingStatus = ncmb.DataStore("MatchingStatus");  //DataStoreのMatchingStatus取得

    MatchingStatus.equalTo("user1", opponentId)
      .fetchAll()
      .then(function(resultsZero) {
        if (resultsZero.length != 0) {   //matchingStatusのuser1の中に相手のIDがあったとき
          var resultsOne = resultsZero.length - 1;
          //alert("user1にいます！");
          var progress = resultsZero[resultsOne].get("progress");
          if (progress == "1") {
            //alert("会話が進行中です！");
            flgCheck = 1;
          } else {
            //alert("会話が終了しています！");
          }
        } else {  //会話が終わっていた場合
          //alert("user1にいません！");
        }
      });
    resolve(opponentId);
  });
}

function searchZero2(arr) {
  return new Promise(function(resolve, reject) {  //同期処理させるためのコード

    var opponentId = arr;

    var MatchingStatus = ncmb.DataStore("MatchingStatus");  //DataStoreのMatchingStatus取得

    MatchingStatus.equalTo("user2", opponentId)
      .fetchAll()
      .then(function(resultsZero) {
        if (resultsZero.length != 0) {   //matchingStatusのuser2の中に相手のIDがあったとき
          var resultsOne = resultsZero.length - 1;
          //alert("user2にいます！");
          var progress = resultsZero[resultsOne].get("progress");
          if (progress == "1") {
            //alert("会話が進行中です！");
            flgCheck = 1;
            alert(flg0);
          } else {
            //alert("会話が終了しています！");
          }
        } else {  //会話が終わっていた場合
          //alert("user2にいません！");
        }
      })
      .catch(function(err) {
        alert(err);
      });
    resolve();
  });
}

function searchZeroRun(opponentId) {  //実際動かすときの関数

  searchZero1(opponentId)
    .then(searchZero2)
    .then();

  //flgCheck = 2
}

//-----------------------------------------------------------------------------------------



//最初のメッセージを送る関数-----------------------------------------------------------------
function firstMessage(opponentId) {

    var dm = ncmb.DataStore("Dm");  //DataStoreのDM取得
    var Dm = new dm();

    var today = new Date();  //日付取得

    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    var hour = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var time = "" + year + month + date + hour + min + sec;
    var time2 = "_" + hour + ":" + min;
    timeNum = Number(time);

    Dm.set("SENDER", currentUser.get("objectId"))  //DMに最初のメッセージ保存
      .set("PARTNER", opponentId)
      .set("CONTENT", currentUser.get("message"))
      .set("TIME", timeNum)
      .set("TIME2", time2)
      .save();

  
}

//-----------------------------------------------------------------------------------------



//自然言語処理の要素でマッチングする関数-----------------------------------------------------------------------------


//自然言語処理の要素でマッチングする関数-----------------------------------------------------------------------------
function languageMatching() {
    var currentUserId = currentUser.get("objectId");  //自分のユーザーID取得

    var MatchingStatus = ncmb.DataStore("MatchingStatus");  //DataStoreのMatchingStatus取得
    var matchingStatus = new MatchingStatus;

    var myElement = currentUser.get("ary");  //自分の要素を取得
    //alert("自分の要素は"+ myElement + "です");

    ncmb.User.inArray("ary", myElement)  //会員の"ary"の中から、自分の要素と同じものを持ってる人を探す
      .fetchAll()
      .then(function(results) {  //取得成功時の処理
        if (results.length != 0) {  //自分の要素を持ってる人が他にいた場合
          while (true) {  //自分とマッチングすることを防ぐ処理↓

            var random = Math.floor(Math.random() * results.length);  //ランダムな数を設定

            var opponent = results[random];  //自分と同じ要素を持っているユーザーの中からランダムに一人選ぶ

            var opponentId = opponent.get("objectId");  //相手のID取得
            var opponentName = opponent.get("name");  //相手の名前取得


            searchZeroRun(opponentId);

            sleep(2000);

            if (currentUserId != opponentId && flgCheck != 1) {
              //マッチングしたのが自分以外かつ、相手がスタンバイ状態ならループを抜け出す
              break;
            }//相手の状態を確認
          }

          sleep(2000);
          
          alert('相手の名前は' + opponentName + 'さんです。');
          
          matchingStatus.set("user1", currentUserId)  //MatchingStatusに自分と相手のID保存
            .set("user2", opponentId)
            .set("progress", "1")
            .set("user1fav", "0")
            .set("user2fav", "0")
            .save();
          firstMessage(opponentId);  //最初のメッセージ送る
          alert("DM画面に移行します");
          //location.href = "dm.html"//ページ遷移
        } else {  //自分の要素を持ってる人が他にいなかった場合
          ganreMatching();  //新しい相手を探す
        }
      })
      .catch(function(error) {  //取得失敗時の処理
        console.log(error);
        alert("検索失敗" + JSON.stringify(error));
      });
}

//-----------------------------------------------------------------------------------------------------------
//選択した要素でマッチングする機能-------------------------------------------------------------------------------------------
var count = 0;

function ganreMatching() {
  var currentUserId = currentUser.get("objectId");  //自分のユーザーID取得

  var MatchingStatus = ncmb.DataStore("MatchingStatus");  //DataStoreのMatchingStatus取得
  var matchingStatus = new MatchingStatus;

  var myGanre = currentUser.get("ganre");

  ncmb.User.inArray("ganre", myGanre)
    .fetchAll()
    .then(function(results) {
      if (results.length != 0) {  //自分の要素を持ってる人が他にいた場合
        while (true) {  //自分とマッチングすることを防ぐ処理↓

          var random = Math.floor(Math.random() * results.length);  //ランダムな数を設定

          var opponent = results[random];  //自分と同じ要素を持っているユーザーの中からランダムに一人選ぶ

          var opponentId = opponent.get("objectId");  //相手のID取得
          var opponentName = opponent.get("name");  //相手の名前取得
          //alert(flgCheck);


          searchZeroRun(opponentId);//相手の状態を確認

          sleep(2000);

          if (currentUserId != opponentId && flgCheck != 1) { break; }  //マッチングしたのが自分以外かつ、相手がスタンバイ状態ならループを抜け                  
          //alert("ループ中");
          //alert(flgCheck);
        }

        sleep(2000);

        alert('相手の名前は' + opponentName + 'さんです。');

        matchingStatus.set("user1", currentUserId)  //MatchingStatusに自分と相手のID保存
          .set("user2", opponentId)
          .set("progress", "1")
          .set("user1fav", "0")
          .set("user2fav", "0")
          .save();

        firstMessage(opponentId);  //最初のメッセージ送る

        alert("DM画面に移行します");
        location.href = "dm.html"//ページ遷移

      } else {  //自分の要素を持ってる人が他にいなかった場合



        alert("共通のジャンルを持つ相手が見つかりませんでした。プロフィールに記入する情報を多くすると、相手が見つかりやすくなります");

      }
    })
    .catch(function(error) {  //取得失敗時の処理
      console.log(error);
      alert("検索失敗" + JSON.stringify(error));
    });
}

//----------------------------------------------------------------------------------------------------------------------



//自分の状態確認 => マッチング-----------------------------------------------------------------------------------------------

function search1() {  //user1の中に自分がいるか探す処理
  return new Promise(function(resolve, reject) {  //同期処理させるためのコード
    var flg1 = 0;  //会話が進行中の時１、それ以外0

    var currentUserId = currentUser.get("objectId");  //自分のユーザーID取得

    var MatchingStatus = ncmb.DataStore("MatchingStatus");  //DataStoreのMatchingStatus取得


    MatchingStatus.equalTo("user1", currentUserId)
      .fetchAll()
      .then(function(resultsZero) {
        if (resultsZero.length != 0) {   //matchingStatusのuser1の中に自分のIDがあったとき
          var resultsOne = resultsZero.length - 1;
          //alert("user1にいます！");
          var progress = resultsZero[resultsOne].get("progress");
          if (progress == "1") {
            //alert("会話が進行中です！");
            flg1 = 1;
          } else {
            //alert("会話が終了しています！");
          }
        } else {  //会話が終わっていた場合
          //alert("user1にいません！");
        }
        resolve(flg1);  //search1 => search2
      })
      .catch(function(err) {
        console.log(err);
      });
  });
}


function search2(flg1) {  //user2の中に自分がいるか探す処理
  return new Promise(function(resolve, reject) {  //同期処理させるためのコード
    var currentUserId = currentUser.get("objectId");  //自分のユーザーID取得

    var MatchingStatus = ncmb.DataStore("MatchingStatus");  //DataStoreのMatchingStatus取得


    MatchingStatus.equalTo("user2", currentUserId)
      .fetchAll()
      .then(function(resultsZero) {
        if (resultsZero.length != 0) {   //matchingStatusのuser2の中に自分のIDがあったとき
          var resultsOne = resultsZero.length - 1;
          //alert("user2にいます！");
          var progress = resultsZero[resultsOne].get("progress");
          if (progress == "1") {
            //alert("会話が進行中です！");
            flg1 = 1;
          } else {  //会話が終わっていた場合
            //alert("会話が終了しています！");
          }
        } else {  //user2にいなかった場合
          //alert("user2にいません！");
        }
        resolve(flg1);  //search2 => search3
      })
      .catch(function(err) {
        console.log(err);
      });
  });
}


function search3(flg1) {  //最終判定処理
  if (flg1 != 1) {  //matchingStatusの中に自分のIDが見つからない↓
    languageMatching();
  } else {  //matchingStatusの中にじぶんのIDが見つかった↓
    alert("会話が進行中です！");
    alert("DM画面に移行します");
    location.href = "dm.html";  //DM画面へ移動
  }
}


function run() {  //同期処理のやつ
  search1()
    .then(search2)
    .then(search3);
}

function match() {  //ボタン押したときの処理
  if (currentUser) {
    run();
  } else {
    alert("ログインしてください");
  }
}

//--------------------------------------------------------------------------------------------
