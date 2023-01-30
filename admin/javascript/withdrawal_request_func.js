const handle_mass_payment = async (btn,withdrawal_request) => {
  console.log("called");
  let admin = get_adminInfo("admin");
  let token = get_adminInfo("admin_token");
  
  btn.value = "Proccessing...";
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/withdrawal/approve/mass_payment",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ admin, token, withdrawal_request }),
      },
    );
    const result = await response.json();
    console.log(result);
    btn.value = "Try Again";

    if (result.error) {
      console.log(error.message);
      btn.value = "Try Again";
    } else {
      btn.value = "Success";
      window.location.replace("/admin/withdrawal-request.html");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const handle_remove_withdrawal= async (btn, withdrawal_request) => {
  console.log("called");
  let admin = get_adminInfo("admin");
  let token = get_adminInfo("admin_token");

  btn.value = "Proccessing...";
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/withdrawal/approve/delete",
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ admin, token, withdrawal_request }),
      },
    );
    const result = await response.json();
    console.log(result);
    btn.value = "Try Again";

    if (result.error) {
      console.log(error.message);
      btn.value = "Try Again";
    } else {
      btn.value = "Success";
      window.location.replace("/admin/withdrawal-request.html");
    }
  } catch (error) {
    console.log(error.message);
  }
};

document.querySelector("#mass_payment").onclick = () => {
  if (confirm("Do you really want to process this withdrawal(s)?")) {
    event.preventDefault();
    let selected_users = [];
    document.querySelectorAll(".checkbox").forEach((checkbox) => {
      checkbox.checked
        ? selected_users.push(checkbox.id)
        : console.log(checkbox.id);
    });
    console.log(selected_users)
    if(selected_users.length<1)return alert("You must select atleast one user to make payment")
    handle_mass_payment(document.querySelector("#mass_payment"),selected_users);
}
  }

  document.querySelector("#assure").onclick = () => {
 if (confirm("Are you sure you want to set this request(s) as processed?\n\nNo funds will be sent to the user account(s)!")) {
    event.preventDefault();
    let selected_users = [];
    document.querySelectorAll(".checkbox").forEach((checkbox) => {
      checkbox.checked
        ? selected_users.push(checkbox.id)
        : console.log(checkbox.id);
    });
    console.log(selected_users)
    if(selected_users.length<1)return alert("You must select atleast one user to make payment")
    handle_mass_payment(document.querySelector("#assure"),selected_users);
  }
  }


    document.querySelector("#remove").onclick = () => {
      if (
        confirm(
          "Are you sure you want to Remove this withdrawal requests!, removed withdrawal request can't be reversed",
        )
      ) {
        event.preventDefault();
        let selected_users = [];
        document.querySelectorAll(".checkbox").forEach((checkbox) => {
          checkbox.checked
            ? selected_users.push(checkbox.id)
            : console.log(checkbox.id);
        });
        console.log(selected_users);
        if (selected_users.length < 1)
          return alert("You must select atleast one user to make payment");
        handle_remove_withdrawal(document.querySelector("#remove"), selected_users);
      }
    };

 
  //
  //
  //   document.querySelectorAll(".checkbox").forEach((checkbox) => {
  //     checkbox.checked
  //       ? selected_users.push(checkbox.id)
  //       : console.log(checkbox.id);
  //   });
  //   handle_delete_user(selected_users);
  //   //   console.log("selected users=", selected_users);
  //   selected_users = [];

