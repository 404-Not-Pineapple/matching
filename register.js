function passwordCheck(checked) {
  var pwd = document.getElementById("password");
  var pwd1 = document.getElementById("password1");
    if (checked) {
      pwd1.setAttribute("type", "text");
      pwd.setAttribute("type", "text");
    } else {
      pwd1.setAttribute("type", "password");
      pwd.setAttribute("type", "password");
    }
}
var applicationKey = "";
var clientKey = """;
var ncmb = new NCMB(applicationKey, clientKey);

function signUp() {
      var userName = document.getElementById("userName").value;
  //ログインする垢名を定義
      var password = document.getElementById("password").value;
      var password1 = document.getElementById("password1").value;//パスワードを定義

  if(userName==""){
    alert("ユーザネームを入力してください");
  }else if(password==""){
    alert("パスワードを入力してください");
  }else if(password1==""){
    alert("確認用のパスワードを入力してください");
  }else if(password1!=password){
    alert("パスワードが一致しません");
  }else{
      var acl = new ncmb.Acl(); //書き込み、読み取り権限作成
      acl.setPublicReadAccess(true)
         .setPublicWriteAccess(true)
  
      var user = new ncmb.User();
    user.set("userName", userName)
        .set("password", password)
        .set("acl", acl)//権限set
      
    user.signUpByAccount()
        .then(function(user) {
            alert("新規ユーザー登録成功");
            return ncmb.User.login(user);
        })
        .then(function(user) {
            alert("ログイン成功:" + JSON.stringify(user));
            window.location.href = "./profile.html";
        })
        .catch(function(error) {
            alert("認証処理失敗:" + error + ", " + JSON.stringify(error));
        });
}
}

function login() {
location.href="login.html";
}
