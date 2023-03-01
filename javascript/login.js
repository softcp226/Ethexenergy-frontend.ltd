function setCookie(user, token) {
  // alert("called")
  console.log(user);
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  // document.cookie=`username=${username} ; ${expires}`
  document.cookie = `user=${user} ; ${expires}`;
  document.cookie = `token=${token} ; ${expires}`;
 
  window.location.replace("/dashboard.html");
}
const show_input_error = (input) => {
  input.style.border = "2px solid red";
};

// function setCookie_01(user, token) {
//   // alert("called")
//   console.log(user);
//   const d = new Date();
//   d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
//   let expires = "expires=" + d.toUTCString();
//   // document.cookie=`username=${username} ; ${expires}`
//   document.cookie = `user=${user} ; ${expires}`;
//   document.cookie = `token_01=${token} ; ${expires}`;
//   // let navigate;
//   // const params = new URLSearchParams(window.location.search)
//   // for (const param of params) {
//   //     navigate=param[0]
//   // }
//   // if(navigate)return window.location.replace(navigate)
//   window.location.replace("/complete-registration.html");
// }

const loginUser = async (username, password) => {
  try {
    document.querySelector("#login").innerHTML = "proccessing...";
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/user/login",
      // "http://localhost:5000/api/user/login",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#login").innerHTML = "try again";
      return;
    }
    document.querySelector("#login").innerHTML = "success";
    setCookie(result.message.user, result.token);
    window.location.replace("/dashboard.html");
  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
    document.querySelector("#login").innerHTML = "try again";
  }
};




document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#login").onclick = () => {
    event.preventDefault();
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    if (!username.value)
      return show_input_error(username)
    if (!password.value)
      return show_input_error(password)
    if (password.value.length < 8)
      return (document.querySelector(".errMessage").innerHTML =
        "Password must be greater than 8 characters");

    document.querySelector(".errMessage").innerHTML = "";

    loginUser(username.value, password.value);
  };

  document.querySelectorAll("input").forEach((input) => {
    document.querySelector(".errMessage").innerHTML = "";
    input.onkeyup = () => (input.style.border = "0.1px solid #fff");
  });
})

