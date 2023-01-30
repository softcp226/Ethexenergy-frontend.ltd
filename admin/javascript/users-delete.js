//  <script> function confirm_action(act, msg) { if (confirm(msg)) { document.users.action.value = act; document.users.submit(); } return false; } </script>

const update_user_status = async (button,users, status) => {
  console.log("users nd status=", users, status);
  button.value = "Proccessing...";
  let token = get_adminInfo("admin_token");
  let admin = get_adminInfo("admin");
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/user/edit/update/user/status",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, users, status }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      alert(result.errMessage);
      button.value = "Try again";
      return;
    }

    button.value = "success";
  window.location.replace("/admin/users.html");
    // console.log(result);
    //     console.log(result);
  } catch (error) {
    console.log(error);
    button.value = "Try again";
  }
};

const handle_delete_user = async (users) => {
  document.querySelector("#delete_user").innerHTML = "Proccessing...";
  let token = get_adminInfo("admin_token");
  let admin = get_adminInfo("admin");
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/users/delete_user",
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, users }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      event.target.innerHTML = "Try again";
      //   document.querySelector(".errMessage").innerHTML = result.errMessage;
      alert(result.errMessage);
    } else {
      alert(result.message);
      window.location.replace("/admin/users.html");
      //   event.target.innerHTML = "Success";
      //   window.location.href = "/admin/dashboard.html";
    }
  } catch (err) {
    document.querySelector("#delete_user").innerHTML = "Try again";
    console.log(err);
    alert(err.message);
  }
};

document.querySelector("#delete_user").onclick = () => {
  let selected_users = [];
  event.preventDefault();
  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.checked
      ? selected_users.push(checkbox.id)
      : console.log(checkbox.id);
  });
  handle_delete_user(selected_users);
//   console.log("selected users=", selected_users);
  selected_users = [];
};

document.querySelector("#disable_user").onclick = () => {
  event.preventDefault();
  let selected_users = [];
   let button = document.querySelector("#disable_user");
  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.checked
      ? selected_users.push(checkbox.id)
      : console.log(checkbox.id);
  });
  update_user_status(button,selected_users, "disabled");
//   console.log("selected users=", selected_users);
  selected_users = [];
};


document.querySelector("#suspend_user").onclick = () => {
  event.preventDefault();
  let selected_users = [];
  let button = document.querySelector("#suspend_user");
  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.checked
      ? selected_users.push(checkbox.id)
      : console.log(checkbox.id);
  });
  update_user_status(button, selected_users, "suspended");
//   console.log("selected users=", selected_users);
  selected_users = [];
};

document.querySelector("#activate_user").onclick = () => {
  event.preventDefault();
  let selected_users = [];
  let button = document.querySelector("#activate_user");
  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.checked
      ? selected_users.push(checkbox.id)
      : console.log(checkbox.id);
  });
  update_user_status(button, selected_users, "active");
  //   console.log("selected users=", selected_users);
  selected_users = [];
};