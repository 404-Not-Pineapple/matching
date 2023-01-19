//ncmbとの連携----------------------------------------------------------------------------
var applicationKey = ";
var clientKey = "";
var ncmb = new NCMB(applicationKey, clientKey);
//------------------------------------------------------------------------------------
//sleep関数-------------------------
function sleep(waitMsec) {
  var startMsec = new Date();
  while (new Date() - startMsec < waitMsec);
}
//----------------------------------
//window.onload = 
var name = document.getElementById("name");
var gender = document.getElementById("gender");
var old = document.getElementById("old");
var A = document.getElementById("ganreA");
var B = document.getElementById("ganreB");
var C = document.getElementById("ganreC");
var D = document.getElementById("ganreD");
var E = document.getElementById("ganreE");
var F = document.getElementById("ganreF");
var G = document.getElementById("ganreG");
var H = document.getElementById("ganreH");
var I = document.getElementById("ganreI");
var J = document.getElementById("ganreJ");
var K = document.getElementById("ganreK");
var f = document.getElementById("ganref");
var free = document.getElementById("free");
var message = document.getElementById("message");
var Iid = document.getElementById("Iid");
var Fid = document.getElementById("Fid");
var Tid = document.getElementById("Tid");
var currentUser = ncmb.User.getCurrentUser();
let ganre = [];

function thethe() {
  document.getElementById("runArea").className = 'runNoDisp';
}

function pushSaveButton() {
  document.getElementById("runArea").className = 'runBg';
  var name = document.getElementById("name");
  var gender = document.getElementById("gender");
  var old = document.getElementById("old");
  var A = document.getElementById("ganreA");
  var B = document.getElementById("ganreB");
  var C = document.getElementById("ganreC");
  var D = document.getElementById("ganreD");
  var E = document.getElementById("ganreE");
  var F = document.getElementById("ganreF");
  var G = document.getElementById("ganreG");
  var H = document.getElementById("ganreH");
  var I = document.getElementById("ganreI");
  var J = document.getElementById("ganreJ");
  var K = document.getElementById("ganreK");
  var f = document.getElementById("ganref");
  var free = document.getElementById("free");
  var message = document.getElementById("message");
  var Iid = document.getElementById("Iid");
  var Fid = document.getElementById("Fid");
  var Tid = document.getElementById("Tid");
  var currentUser = ncmb.User.getCurrentUser();
  if (!f.value || !f.value.match(/\S/g)) {} else {
    var aaa = f.value;
    ganre = aaa.split(",");
  }
  if (K.checked == true) {
    ganre.push("K");
  } else {}
  if (J.checked == true) {
    ganre.push("J");
  } else {}
  if (I.checked == true) {
    ganre.push("I");
  } else {}
  if (H.checked == true) {
    ganre.push("H");
  } else {}
  if (G.checked == true) {
    ganre.push("G");
  } else {}
  if (F.checked == true) {
    ganre.push("F");
  } else {}
  if (E.checked == true) {
    ganre.push("E");
  } else {}
  if (D.checked == true) {
    ganre.push("D");
  } else {}
  if (C.checked == true) {
    ganre.push("C");
  } else {}
  if (B.checked == true) {
    ganre.push("B");
  } else {}
  if (A.checked == true) {
    ganre.push("A");
  } else {}
  var removals = ['\n', ''];
  ganre = ganre.filter(function (v) {
    return !removals.includes(v);
  });
  if (name.value == 0) {
    alert("ユーザネームを入力してください。");
    thethe();
  } else if (gender.value == "選択してください") {
    alert("性別を選択してください。");
  } else if (ganre.length <= 2) {
    alert("3つ以上選択してください");
    ganre.length = 0;
    thethe();
  } else if (old.value == "" || old.value.includes("e") == true || old.value.includes("-") == true) {
    alert("正しい年齢を入力してください。");
    thethe();
  } else if (free.value == "") {
    alert("自己紹介欄を入力してください");
    thethe();
  } else if (message.value == "") {
    alert("マッチング後相手に送るメッセージを入力してください");
    thethe();
  } else {
    var free = document.getElementById("free");
    var hairetu = []; //形態素解析を行い抽出した名詞を入れる配列
    const DICT_PATH = "./dict"; //変数DICT_PATHに自然言語処理を行うための辞書のパスを代入
    kuromoji.builder({ //自然言語処理に使う辞書を指定
      dicPath: DICT_PATH 
    }).build((err, tokenizer) => { //build関数の実行。この関数が自然言語処理を行うメインの関数
      //tokenizer.tokenize(解析する自然言語が入った変数)。
      const tokens = tokenizer.tokenize(free.value); //右辺が形態素解析を行う関数の呼び出し。形態素解析をした結果をtokensに入れている
      //変数.forEachで繰り返し処理
      tokens.forEach((token) => { //解析結果を順番に取得する
        if (token.pos == "名詞" && token.pos_detail_1 != "数" && token.pos_detail_1 != "接尾" && token.pos_detail_1 != "副詞可能" && token.pos_detail_1 != "非自立" && token.pos_detail_1 != "地域" && token.pos_detail_1 != "代名詞" && token.pos_detail_1 != "記号" && token.pos_detail_1 != "英語") {//今回はマッチングに用いるための名詞が欲しいので品詞が名詞かつ数詞ではなく接尾詞でもなく・・・というように条件分岐を行ってマッチングに使える名詞のみ抽出している
          hairetu.push(token.surface_form);//配列.pushで配列の後ろに抽出した言葉を入れている
        }
      });
    });
    store(hairetu).then(function () {
      var unk = document.getElementById("untitti");
      unk.innerHTML = "保存完了";
    });
  }
}

function locate() {
  sleep(3000);
  location.href = "mainPage.html";
}

function store(arr) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      var name = document.getElementById("name");
      var gender = document.getElementById("gender");
      var old = document.getElementById("old");
      var A = document.getElementById("ganreA");
      var B = document.getElementById("ganreB");
      var C = document.getElementById("ganreC");
      var D = document.getElementById("ganreD");
      var E = document.getElementById("ganreE");
      var F = document.getElementById("ganreF");
      var G = document.getElementById("ganreG");
      var H = document.getElementById("ganreH");
      var I = document.getElementById("ganreI");
      var J = document.getElementById("ganreJ");
      var K = document.getElementById("ganreK");
      var f = document.getElementById("ganref");
      var free = document.getElementById("free");
      var message = document.getElementById("message");
      var Iid = document.getElementById("Iid");
      var Fid = document.getElementById("Fid");
      var Tid = document.getElementById("Tid");
      console.log(arr);
      var currentUser = ncmb.User.getCurrentUser();
      currentUser
        .set("userId", currentUser.objectId)
        .set("name", name.value)
        .set("gender", gender.value)
        .set("old", old.value)
        .set("ganre", ganre)
        .set("free", free.value)
        .set("message", message.value)
        /*.set("Iid", Iid.value)
        .set("Fid", Fid.value)
        .set("Tid", Tid.value)*/
        .set("ary", arr)
        .update()
        .then(function (obj) {
        // 更新成功時
        alert("2.更新成功+" + arr);
        sleep(1000);
        locate();
      }).catch(function (error) {
        // 更新失敗時
        alert("更新失敗" + error);
      }); //mainPageに移動
      sleep(1000);
      resolve(); // 処理完了
      // reject();  // 処理失敗
    }, 5000);
  });
}
