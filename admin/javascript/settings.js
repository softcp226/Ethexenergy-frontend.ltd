const get_adminInfo = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  // return "";
  window.location.href = "/admin";
};

const setText = (data) => {};

const set_admin = async (data) => {
  document.querySelector("#save").value = "Proccessing...";

  try {
    const response = await fetch(
      // "http://localhost:5000/api/admin/setting",
      "https://ethexenergy-ltd.glitch.me/api/admin/setting",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      console.log(result.errMessage);
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#save").value = "Try again";
    } else {
      setText(result.message);
document.querySelector("#save").value = "Saved";
    }
  } catch (err) {
    console.log(err);
    document.querySelector(".errMessage").innerHTML = err.message;
    document.querySelector("#save").value = "Try again";
  }
};

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const email = document.querySelector("#admin_email");
const admin_area_charset = document.querySelector("#admin_area_charset");
const show_google_translator = document.querySelector(
  "#show_google_translator",
);

const show_input_error = (input) => {
  input.style.border = "2px solid red";
  input.style.color = "#fff";
  input.style.backgroundColor = "red";
};

document.querySelector("#save").onclick = () => {
  event.preventDefault();
  if (password.value != password2.value) {
    show_input_error(password);
    show_input_error(password2);
    return;
  }
  let token = get_adminInfo("admin_token");
  let admin = get_adminInfo("admin");

  set_admin({
    admin,
    token,
    username: username.value,
    password: password.value,
    email: email.value,
    admin_area_charset: admin_area_charset.value,
    show_google_translator: show_google_translator.value,
  });
};

document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () => {
    input.style.border = "1px solid gray";
    input.style.color = "#000";
    input.style.backgroundColor = "#fff";
  };
});
document.querySelectorAll("select").forEach((select) => {
  select.onchange = () => {
    select.style.border = "1px solid gray";
    select.style.color = "#000";
    select.style.backgroundColor = "#fff";
  };
});
