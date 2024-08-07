import {signUpMember, signInMember} from "./signin_signup_function.js"
// import{listenEmail} from "./signin_signup_function.js"
const body = document.body;

export function appendMask() {
  const pageMask = document.createElement("div");
  pageMask.className = "page-mask";
  body.appendChild(pageMask);
  pageMask.style.display="block";
}

export  function appendMemberPage() {
  const memberPage = document.createElement("section");
  memberPage.className = "member_in_page";
  body.appendChild(memberPage);
}

export async function insertSignUpPage() {
  const memberInPage = document.querySelector(".member_in_page");
  memberInPage.innerHTML = '<div class="decorator-bar"></div>'+
    '<div class="page-container">'+
       '<button class="member-close-btn"><img class="close" src="/static/img/icon_close.png" alt=""></button>'+
      '<p class="member-in-page-title">註冊會員帳號</p>'+
        '<div class="input-container">'+
          '<input id="name" class="member-input" type="text" name="name" placeholder="輸入姓名">'+
          '<input id="email" class="member-input" type="text" name="email" placeholder="輸入電子郵件">'+
          '<input id="password" class="member-input" type="password" name="password" placeholder="輸入密碼">'+
          '<input type="button" class="signup-submit submit-btn" value="註冊新帳戶">'+
          '<div class = "response-message"></div>'+
        '</div>'+
      '<div class="switch-line">'+
        '<div>已經有帳戶?</div>'+
        '<div class="switch-signin switch-btn">點此登入</div>'+
      '</div>'+
    '</div>';
    const email = await document.querySelector("#email");
    email.addEventListener("input",(e)=>{
      const reEmail = /[A-Za-z0-9]+@+[A-Za-z0-9]+\.+com/;
      if(!reEmail.test(email.value)){
        email.style.color = "	#AE0000"
      }else{
        email.style.color = "	#000000"
      }
    })
        const password = await document.querySelector("#password");
    password.addEventListener("input",(e)=>{
      const rePassword = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}/;
      if(!rePassword.test(password.value)){
        password.style.color = "	#AE0000"
      }else{
        password.style.color = "	#000000"
      }
    })
};

export async function insertSignInPage() {
  const memberInPage = document.querySelector(".member_in_page");
  memberInPage.innerHTML = '<div class="decorator-bar"></div>'+
    '<div class="page-container">'+
      '<button class="member-close-btn"><img class="close" src="/static/img/icon_close.png" alt=""></button>'+
      '<p class="member-in-page-title">登入會員帳號</p>'+
        '<div class="input-container">'+
          '<input id="email" class="member-input" type="text"  name="email" placeholder="輸入電子信箱">'+
          '<input id="password" class="member-input" type="password"  name="password" placeholder="輸入密碼">'+
          '<input type="button" class="signin-submit submit-btn" value="登入帳戶">'+
          '<div class = "response-message"></div>'+
        '</div>'+
      '<div class="switch-line">'+
        '<div>還沒有帳戶?</div>'+
        '<div class="switch-signup switch-btn">點此註冊</div>'+
      '</div>'+
    '</div>';
    const email = await document.querySelector("#email");
    email.addEventListener("input",(e)=>{
      const reEmail = /[A-Za-z0-9]+@+[A-Za-z0-9]+\.+com/;
      if(!reEmail.test(email.value)){
        email.style.color = "	#AE0000"
      }else{
        email.style.color = "	#000000"
      }
    })

};

export function BtnEvent() {
  const memberInPage = document.querySelector(".member_in_page");
  memberInPage.addEventListener("click",(e)=>{  
    let content = e.target.classList;
    switch (true){
      case content.contains("switch-signup"):
        insertSignUpPage();
        break;
      case content.contains("switch-signin"):
        insertSignInPage();
        break;
      case content.contains("close"):
        closeMemberPage ();
        break;
      case content.contains("signin-submit"):
            signInMember();
        break;
      case content.contains("signup-submit"):
            signUpMember();
        break;
    };
  });
};

function closeMemberPage() {
  const pageMask = document.querySelector(".page-mask");
  const memberInPage = document.querySelector(".member_in_page");
  pageMask.remove();
  memberInPage.remove();
};

export function submitEvent(){
  const memberInPage = document.querySelector(".member_in_page");
  memberInPage.addEventListener("keydown",(e)=>{  
    const submitBtnClass = document.querySelector(".submit-btn").classList;
    if(e.key === "Enter"){
      switch (true){
        case submitBtnClass.contains("signin-submit"):
            signInMember();
          break;
        case submitBtnClass.contains("signup-submit"):
            signUpMember();
          break;
      };
    }
  });
};

export function addListenerOnBooking(){
  const tripBtn = document.querySelector("#trip-btn");
  tripBtn.addEventListener("click", (e)=>{
    if(localStorage["userState"]){
      location.assign("/booking");
    }else{
      appendMask();
      appendMemberPage();
      insertSignInPage();
      BtnEvent();
      submitEvent();
    }; 
  });
};

export function addMemberInPageListener(){
  const memberInBtn = document.querySelector("#member-in-btn")
  memberInBtn.addEventListener("click", (e)=>{
  let memberInBTNclassList = memberInBtn.classList
  if(memberInBTNclassList.contains("signed")){
      localStorage.removeItem("userState");
      location.reload();
    }else{
      appendMask();
      appendMemberPage();
      insertSignInPage();
      BtnEvent();
      submitEvent();
    };
  });
}
