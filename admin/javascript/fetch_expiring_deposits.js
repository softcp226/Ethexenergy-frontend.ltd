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

// document.create_element ;

let row_number = 1;
construct_row_number = () => (row_number == 1 ? ++row_number : --row_number);

const create_element = (data) => {
  const container_tr = document.createElement("tr");
  const username_td = document.createElement("td");
  const percentage_td = document.createElement("td");
  const deposit_amount_td = document.createElement("td");
  const deposit_method_img = document.createElement("img");
  const expiring_time_td = document.createElement("td");
  const button_container_td = document.createElement("td");
  const account_btn_a = document.createElement("a");
  account_btn_a.className = "sbmt btn-sm btn-success";

  const funds_btn_a = document.createElement("a");
  funds_btn_a.className = "sbmt btn-sm btn-info";
  account_btn_a.innerHTML = "account";
  funds_btn_a.innerHTML = "funds";
  account_btn_a.href=`/admin/user_edit.html?${data.user._id}`;
  funds_btn_a.href = `/admin/user-details.html?${data.user._id}`;

  container_tr.className = `row${construct_row_number()}`;
  username_td.innerHTML = data.user.username;
  percentage_td.innerHTML = "No plan selected";
  deposit_amount_td.innerText = `$${data.deposit_request.deposit_amount}.00`;
  deposit_method_img.src =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpTuyc5UTf_-kvmj_bwOPbFvZvoq-LhlkO7OV6B5ZAb_Qgx9iwYQlah17gnnlrn1r-RW8&usqp=CAU";
  deposit_method_img.height = 17;
  deposit_amount_td.append(deposit_method_img);
  expiring_time_td.innerHTML =
    data.deposit_request.expiring_date_string || "unspecified";
  button_container_td.append(account_btn_a, funds_btn_a);

  container_tr.append(
    username_td,
    percentage_td,
    deposit_amount_td,
    expiring_time_td,
    button_container_td
  );
  document.querySelector("#list").append(container_tr);
};

(async () => {
  let admin = get_adminInfo("admin");
  let token = get_adminInfo("admin_token");

  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/expiring_deposit/fetch",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ admin, token }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#errMessage").innerHTML = result.errMessage;
    } else {
      result.message.forEach((element) => {
        create_element(element);
      });
    }
  } catch (error) {
    console.log(error);
    document.querySelector("#errMessage").innerHTML = error.message;
  }
})();
