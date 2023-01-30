const getDeposit_request = () => {
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


const addProblem = async (data) => {
  document.querySelector("#add_to_problem").innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/deposit_request/problem",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error){
      document.querySelector("#errMessage").innerHTML = result.errMessage;
    }else{
          document.querySelector("#add_to_problem").innerHTML =
            "Success";

        window.location.replace("/admin/pending-deposit.html");
    }
    } catch (error) {
    document.querySelector("#add_to_problem").innerHTML = "Try again";
    console.log(error);
  }
};

document.querySelector("#add_to_problem").onclick = () => {
  event.preventDefault();
  const admin = get_adminInfo("admin");
  const token = get_adminInfo("admin_token");
  console.log(token);
 const deposit_request = getDeposit_request();

  addProblem({ token, admin, deposit_request});
};

const handle_delete_deposit_request = async (btn, deposit_id) => {
  btn.innerHTML = "Proccessing...";
  let token = get_adminInfo("admin_token");
  let admin = get_adminInfo("admin");
  console.log(deposit_id);
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/deposit_request/delete",
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, deposit_request: deposit_id }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      btn.innerHTML = "Try again";
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      console.log(result);
    } else {
      alert(result.message);
      btn.innerHTML = "Success";
      window.location.href = "/admin/pending-deposit.html";
    }
  } catch (err) {
    btn.innerHTML = "Try again";
    console.log(err);
    console.log(err.message);
  }
};

document.querySelector("#delete_btn").onclick = () => {
  event.preventDefault();
  handle_delete_deposit_request(
    document.querySelector("#delete_btn"),
    getDeposit_request(),
  );
};

const submit_deposit_approval = async (form) => {
  document.querySelector("#delete_btn").innerHTML = "processing...";
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/deposit/approve",
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
      document.querySelector("#delete_btn").innerHTML = "Try again";
      return;
    }
    document.querySelector("#delete_btn").innerHTML = "success";
    window.location.href = "/admin/pending-deposit.html";
  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
    document.querySelector("#delete_btn").innerHTML = "Try again";
    console.log(err);
  }
};
//deposit-details

document.querySelector("#add_fund").onclick = () => {
  event.preventDefault();
  const amount = document.querySelector("#deposit_amount");

  if (!amount.value) return (amount.style.border = "2px solid red");
  amount.style.border = "2px solid #fff";
  const admin = get_adminInfo("admin");
  const token = get_adminInfo("admin_token");
  const deposit_request = getDeposit_request();
  submit_deposit_approval({
    admin: admin,
    token: token,
    deposit_request,
    deposit_amount: amount.value,
  });
};

const create_element = (data) => {
  document.querySelector("#deposit_amount").value = data.deposit_amount;
  document.querySelector("#credit_amount").innerHTML = data.deposit_amount;
  document.querySelector("#currency").innerHTML = data.payment_method;
  document.querySelector("#date").innerHTML = data.date;
  document.querySelector("#user").innerHTML = data.user.username;
  document.querySelector("#transaction_id").innerHTML = data._id;
};

(async () => {
  let admin = get_adminInfo("admin");
  let token = get_adminInfo("admin_token");
  let deposit_request = getDeposit_request();
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/deposit_request/single",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ admin, token, deposit_request }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#errMessage").innerHTML = result.errMessage;
    } else {
      create_element(result.message);
    }
  } catch (error) {
    document.querySelector("#errMessage").innerHTML = error.message;
  }
})();
