const getWithdrawal_request = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

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

const create_element = (data) => {
  console.log("data", data);
  document.querySelector("#username").innerHTML = data.user.username;
  document.querySelector("#withdrawal_method").innerHTML =
    data.withdrawal_method;
  document.querySelector("#wallet").innerHTML = data.wallet;
  document.querySelector(
    "#withdrawal_amount",
  ).innerHTML = `$${data.withdrawal_amount}`;
};

const confirm_payment = async () => {
  console.log("called");
  let admin = get_adminInfo("admin");
  let token = get_adminInfo("admin_token");
  let withdrawal_request = getWithdrawal_request();
  let withdrawal_hash = document.querySelector("#transaction_hash").value;

  document.querySelector("#confirm_payment").value = "Proccessing...";
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/withdrawal/approve",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          admin,
          token,
          withdrawal_request,
          withdrawal_hash,
        }),
      },
    );
    const result = await response.json();
    console.log(result);
    document.querySelector("#confirm_payment").value = "Try Again";

    if (result.error) {
      alert(result.errMessage);
      document.querySelector("#confirm_payment").value = "Try Again";
    } else {
      document.querySelector("#confirm_payment").value = "Success";
      window.location.replace("/admin/withdrawal-request.html");
    }
  } catch (error) {
    console.log(error.message);
  }
};

document.querySelector("#confirm_payment").onclick = () => {
  event.preventDefault();
  confirm_payment();
};

let admin = get_adminInfo("admin");
let token = get_adminInfo("admin_token");

(async () => {
  console.log("called");
  let admin = get_adminInfo("admin");
  let token = get_adminInfo("admin_token");
  let withdrawal_request = getWithdrawal_request();
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/withdrawal/fetch/single",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ admin, token, withdrawal_request }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      console.log(error.message);
    } else {
      create_element(result.message);
    }
  } catch (error) {
    console.log(error.message);
  }
})();
