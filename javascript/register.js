const show_input_error = (input) => {
  input.style.border = "2px solid red";
};
const hide_input_error = (input) => {
  input.style.border = "2px solid gray";
};


function setCookie(user, token) {
  // alert("called")
  console.log(user);
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  // document.cookie=`email=${email} ; ${expires}`
  document.cookie = `user=${user} ; ${expires}`;
  document.cookie = `token=${token} ; ${expires}`;

  window.location.replace("/dashboard.html");
}

// const display_given_error = (given_error) => {
//   if (window.innerWidth <= 500) {
//     document.querySelector("#errMessage_02").innerHTML = given_error;
//     document.querySelector("#errMessage_01").innerHTML = "";
//   } else {
//     document.querySelector("#errMessage_02").innerHTML = "";
//     document.querySelector("#errMessage_01").innerHTML = given_error;
//   }
// };

const getReferral = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};



const submit_userForm = async (form) => {
  try {
    document.querySelector("#register").innerHTML = "Proccessing...";
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/newuser/register",
      // "http://localhost:5000/api/newuser/register",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#register").innerHTML = "Try again";
      return;
    }
    document.querySelector("#register").innerHTML = "success";
    return setCookie(result.message.user, result.token);
  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
    document.querySelector("#register").innerHTML = "try again";
  }
};





document.querySelector("#register").onclick = () => {
  event.preventDefault()
  const full_name = document.querySelector("#full_name");
  const username = document.querySelector("#username");
  const Email = document.querySelector("#Email");
//   const phone_number = document.querySelector("#phone_number");
  const country = document.querySelector("#country");
  const password = document.querySelector("#password");
  const confirm_password = document.querySelector("#confirm_password");
//   const passport = document.querySelector("#passport");

  if (!full_name.value) return show_input_error(full_name);
  if (!username.value) return show_input_error(username);
  if (!Email.value) return show_input_error(Email);
//   if (!phone_number.value) return show_input_error(phone_number);
  if (!country.value) return show_input_error(country);
  if (!password.value) return show_input_error(password);
  if (!confirm_password.value) return show_input_error(confirm_password);
if (password.value.length < 8)
  return (document.querySelector(".errMessage").innerHTML =
    "Password must be greater than 8 characters");

    if(password.value !=confirm_password.value)return (document.querySelector(".errMessage").innerHTML =
      "Password must match !");
document.querySelector(".errMessage").innerHTML = "";
const referral=getReferral()
submit_userForm({
  full_name: full_name.value,
  username: username.value,
  email: Email.value,
  country: country.value,
  password: password.value,
  referral,
});
};

document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () => hide_input_error(input);
});

document.querySelector("#country").onchange = () =>{
    // alert("changed")
    hide_input_error(document.querySelector("#country"));

}
  