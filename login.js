//パスワードの表示非表示の切り替え----------------------------------------------------
function passwordCheck(checked) {
    var pwd = document.getElementById("password");
    if (checked) {
        pwd.setAttribute("type", "text");
    } else {
        pwd.setAttribute("type", "password");
    }
}
//-----------------------------------------------------------------------------------
//ncmbとの連携----------------------------------------------------------------------------
var applicationKey = "";
var clientKey = "";
var ncmb = new NCMB(applicationKey, clientKey);
//------------------------------------------------------------------------------------

//サインアップ--------------------------------------------------------------------------
function signUp() {
location.href="register.html";
}
//-----------------------------------------------------------------------------
//ログイン関数------------------------------------------------------------------
function login() {
    var userName = document.getElementById("userName").value;//上に同じく
    var password = document.getElementById("password").value;//上に同じく

    ncmb.User.login(userName, password)
        .then(function(user) {
            alert("ログイン成功:" + JSON.stringify(user));
            window.location.href = "./mainPage.html";
        })
        .catch(function(error) {
            alert("ログイン失敗:" + error + ", " + JSON.stringify(error));
        });
}
//----------------------------------------------------------------------------
window.addEventListener('load', (event) => {
  var currentUser = ncmb.User.getCurrentUser();
if (currentUser) {
    location.href="mainPage.html"
} else {}
});
