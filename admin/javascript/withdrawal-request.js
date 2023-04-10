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
  console.log(data);
  data.forEach((element) => {
    let container_tr = document.createElement("tr");
    let container_td = document.createElement("td");
    let username_td = document.createElement("td");
    let input = document.createElement("input");
    input.type = "checkbox";
    input.name = "checkbox";
    input.className= "checkbox";
    input.id = element._id;
    input.value = element._id;
    const link_username = document.createElement("a");
    link_username.class = "link username";
    const upline_small = document.createElement("small");
    const edit_btn = document.createElement("a");
    const manage_btn = document.createElement("a");
    const br_break = document.createElement("br");
    const br = document.createElement("br");

    const wallet_arrow = "→ ";

    const wallet_sm = document.createElement("small");
    const wallet_b = document.createElement("b");
    const sm_style = document.createElement("small");
    sm_style.style.color = "gray";
    const balance_sm = document.createElement("small");
    const date_td = document.createElement("td");
    const date_sm = document.createElement("small");
    const withdrawal_amount_td = document.createElement("td");
    withdrawal_amount_td.align = "right";
    const withdrawal_amount_b = document.createElement("b");
    const withdrawal_method_img = document.createElement("img");
    withdrawal_method_img.align = "absmiddle";
    withdrawal_method_img.hspace = "1";
    withdrawal_method_img.height = "17";
    const withdrawal_method_b = document.createElement("b");
    const withdrawal_method_td = document.createElement("td");
    const pay_btn_td = document.createElement("td");
    const pay_btn = document.createElement("a");

    link_username.className = "link username";
    link_username.innerHTML = element.user.username;
    upline_small.innerHTML = " (Upline: n/a) ";
    edit_btn.className = "badge badge-danger";
    edit_btn.href = `/edit-withdrawal.html?${element._id}`;
    edit_btn.innerHTML = "edit";
    edit_btn.target = "_blank";
    manage_btn.className = "badge badge-info";
    manage_btn.target = "_blank";
    manage_btn.innerHTML = "Manage";
    manage_btn.href = `/admin/user-detail.html?${element._id}`;
    wallet_sm.innerHTML = `Wallet Address: ${element.wallet}`;
    balance_sm.style.color = "#2F4F4F";
    balance_sm.innerHTML = `Balance:${element.user.final_balance
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;

    date_sm.innerHTML = element.transaction_date;
    // withdrawal_requests

    container_tr.className = "row1 trn_user";
    container_tr.append(container_td);
    container_td.append(input);
    container_tr.append(username_td);

    username_td.append(link_username);
    username_td.append(upline_small);

    username_td.append(
      edit_btn,
      manage_btn,
      document.createElement("br"),
      wallet_arrow,
      wallet_b,
    );
    withdrawal_amount_b.innerHTML = `$${element.withdrawal_amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    withdrawal_method_img.src =
      element.withdrawal_method_img ||
      "/css/images/8572312.png";
    // username_td.append(br)
    // username_td.append(br_break)
    // username_td.append(`${}`);
    // username_td.append();
    wallet_b.append(wallet_sm);
    username_td.append(br);
    username_td.append(sm_style);
    username_td.append(br, br_break);
    username_td.append(balance_sm);

    container_tr.append(date_td);
    date_td.append(date_sm);
    withdrawal_amount_td.append(withdrawal_amount_b);
    withdrawal_amount_td.append(withdrawal_method_img);
    pay_btn.href = `/admin/manual-pay.html?${element._id}`;
    pay_btn.innerHTML = "Manual Pay";
    pay_btn.className = "sbmt btn-sm btn-info";
    pay_btn_td.append(pay_btn);
    container_tr.append(withdrawal_amount_td);
    container_tr.append(pay_btn_td);
    // payment_method_td.append(payment_method_b)
    document.querySelector("#list").append(container_tr);
  });
};

let admin = get_adminInfo("admin");
let token = get_adminInfo("admin_token");
let display_count = 20;
let skip_count = 0;

(async () => {
  console.log("called");
  let admin = get_adminInfo("admin");
  let token = get_adminInfo("admin_token");

  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/withdrawal/fetch",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ admin, token, display_count, skip_count }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#errMessage").innerHTML = result.errMessage;
      // console.log(error.message);
    } else {
      create_element(result.message);
    }
  } catch (error) {
    document.querySelector("#errMessage").innerHTML = error.message;
  }
})();

// document.addEventListener("DOMContentLoaded",async()=>{

// console.log("called")
//   try {
//     const response = await fetch("/api/admin/withdrawal/fetch", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({ admin, token,display_count,skip_count}),
//     });
//     const result = await response.json();
//     console.log(result);
//     if (result.error) {
//       console.log(result.errMessage);
//     } else {
//       create_element(result.message);
//     }
//   } catch (error) {
//     console.log(error.message);
//   }

// })
