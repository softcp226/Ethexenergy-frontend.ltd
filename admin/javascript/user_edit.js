const get_userID = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};
const full_name = document.querySelector("#full_name");
const user_status = document.querySelector("#status");
const user_name = document.querySelector("#full_name2");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const retype_password = document.querySelector("#retype_password");
const demo_account = document.querySelector("#demo_account");

const setText = (data) => {
  document.querySelector("#referral").innerHTML =
    data.referral || "UNSPECIFIED";
  full_name.value = data.full_name || "";
  user_status.value = data.status || "";
  user_name.value = data.username;
  email.value = data.email || "";
};

const fetch_edit_user = async (user_data) => {
  try {
    document.querySelector("#save").value = "Proccessing...";
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/user/edit",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user_data),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error)
      return (document.querySelector("#save").value = "Try again");
    document.querySelector("#save").value = "Success";

    // console.log(result);
    //     console.log(result);
  } catch (error) {
    console.log(error);
    document.querySelector("#save").value = "Try again";
  }
};

const show_input_error = (input) => {
  input.style.border = "2px solid red";
};

document.querySelector("#save").onclick = () => {
  event.preventDefault();
  if (password.value != retype_password.value) return show_input;
  fetch_edit_user({
    token: get_adminInfo("admin_token"),
    admin: get_adminInfo("admin"),
    user: get_userID(),
    full_name: full_name.value || "",
    user_status: user_status.value || "",
    user_name: user_name.value,
    email: email.value,
    password: password.value,
    demo_account: demo_account.checked,
  });
};

(async () => {
  let token = get_adminInfo("admin_token");
  let admin = get_adminInfo("admin");
  user = get_userID();
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/fetch_users/single_user",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, user }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      console.log(result.errMessage);
      //   return (document.querySelector(".errMessage").innerHTML =
      //     result.errMessage);
    } else {
      setText(result.message);
    }
  } catch (err) {
    console.log(err);
    document.querySelector(".errMessage").innerHTML = err.message;
  }
})();
