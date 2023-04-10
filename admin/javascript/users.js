let skip_count = 0;
let display_count = 20;

let row_number = 1;
construct_row_number = () => (row_number == 1 ? ++row_number : --row_number);

function get_adminInfo(cname) {
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
  window.location.replace("/admin");
}

//

const createAndAppendElement = (element) => {
  const container_tr = document.createElement("tr");
  container_tr.className = `row${construct_row_number()}`;
  const container_td = document.createElement("td");
  const container_table = document.createElement("table");
  const container_tbody = document.createElement("tbody");
  const tbody = document.createElement("tbody");
  const tbody_tr = document.createElement("tr");
  const input_td = document.createElement("td");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.value = "1";
  const username_b = document.createElement("b");
  username_b.className = "username";
  const user_status_span = document.createElement("b");
  const user_status_span_br = document.createElement("br");
  const name_tr = document.createElement("tr");
  const name_td = document.createElement("td");
  const namei = document.createElement("i");

  const reg_date_tr = document.createElement("tr");
  const reg_date_td = document.createElement("td");
  const upline_tr = document.createElement("tr");
  const upline_td = document.createElement("td");
  const Upline_a = document.createElement("a");
  const empty_tr = document.createElement("tr");
  const empty_td = document.createElement("td");
  const fund_table = document.createElement("table");
  const fund_tbody = document.createElement("tbody");
  const bal_tr = document.createElement("tr");
  const bal_td = document.createElement("td");
  const bal_fig_td = document.createElement("td");
  const bal_fig_b = document.createElement("b");
  const fund_tr = document.createElement("tr");
  const fund_td = document.createElement("td");
  const fund_fig_td = document.createElement("td");
  const fund_fig_b = document.createElement("b");

  const funded_tr = document.createElement("tr");
  const funded_td = document.createElement("td");
  const funded_fig_td = document.createElement("td");
  const funded_fig_b = document.createElement("b");

  const withdraw_tr = document.createElement("tr");
  const withdraw_td = document.createElement("td");
  const withdraw_fig_td = document.createElement("td");
  const withdraw_fig_b = document.createElement("b");

  const commission_tr = document.createElement("tr");
  const commission_td = document.createElement("td");
  const commission_fig_td = document.createElement("td");
  const commission_fig_b = document.createElement("b");

  const asset_tr = document.createElement("tr");
  const asset_td = document.createElement("td");
  const asset_fig_td = document.createElement("td");
  const asset_fig_b = document.createElement("b");

  const earning_tr = document.createElement("tr");
  const earning_td = document.createElement("td");
  const earning_fig_td = document.createElement("td");
  const earning_fig_b = document.createElement("b");

  container_tr.id = element._id;
  container_td.vAlign = "top";
  container_table.width = "100%";
  container_table.className = "list sub";
  container_table.append(tbody);
  tbody.append(tbody_tr);
  tbody_tr.append(input_td);
  input_td.append(input, username_b, user_status_span, user_status_span_br);
  tbody.append(name_tr);
  name_tr.append(name_td);
  name_td.innerText += "Name: ";
  name_td.append(namei);
  tbody.append(reg_date_tr);
  reg_date_tr.append(reg_date_td);
  tbody.append(upline_tr);
  upline_tr.append(upline_td);
  upline_td.append(Upline_a);
  tbody.append(empty_tr);
  empty_tr.append(empty_td);
  fund_table.className = "list sub";
  fund_table.width = "100%";
  fund_table.append(fund_tbody);
  fund_tbody.append(fund_tr);
  fund_tr.append(bal_td);
  bal_td.style.width = "50%";
  bal_td.innerHTML = "Balance";
  fund_tr.append(bal_fig_b);
  bal_fig_b.innerHTML = `$${element.final_balance
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;
  bal_fig_b.style.color = "gray";
  fund_tbody.append(funded_tr);
  funded_tr.append(funded_td);
  fund_td.append(funded_fig_td);
  funded_td.innerHTML = "Funded:";
  fund_fig_td.append(fund_fig_b);
  funded_tr.append(fund_fig_td);
  fund_fig_b.innerHTML = "$0.0";
  fund_fig_b.style.color = "gray";

  fund_tbody.append(withdraw_tr);
  withdraw_tr.append(withdraw_td);
  withdraw_td.innerHTML = "Withdraw:";
  withdraw_tr.append(withdraw_fig_td);
  withdraw_fig_td.append(withdraw_fig_b);
  withdraw_fig_b.innerHTML = "$0.0";

  fund_tbody.append(commission_tr);
  commission_tr.append(commission_td);
  commission_td.innerHTML = "Commission:";
  commission_tr.append(commission_fig_td);
  commission_fig_td.append(commission_fig_b);
  commission_fig_b.innerHTML = "$0.0";

  fund_tbody.append(asset_tr);
  asset_tr.append(asset_td);
  asset_td.innerHTML = "Assets:";
  asset_tr.append(asset_fig_td);
  asset_fig_td.append(asset_fig_b);
  asset_fig_b.innerHTML = "$0.0";

  fund_tbody.append(earning_tr);
  earning_tr.append(earning_td);
  earning_td.innerHTML = "Earnings:";
  earning_tr.append(earning_fig_td);
  earning_fig_td.append(earning_fig_b);
  earning_fig_b.innerHTML = "$0.0";
  //  funded_tr.append()
  // funded_tr.append(funded_td)

  // funded_td.append(funded_fig_b)

  // funded_fig_b.style.color="gray";
  // funded_fig_b.innerHTML=element.total_deposit||"$0.00"
  //checkbox

  // y.append(fund_tr)
  // fund_tr.append(bal_td)

  // bal_td.append(bal_fig_td)
  // bal_fig_td.append(bal_fig_b);
  username_b.className = "username";
  username_b.innerHTML = element.username || "Null";
  user_status_span.innerHTML = element.status || "stat";
  if (element.status) {
    element.status == "active"
      ? (user_status_span.className = "badge badge-success")
      : (user_status_span.className = "sbmt btn btn-danger");
  }

  // name_td.append("Name:")
  input.className = "checkbox";
  input.id = element._id;
  // input.onchange=(input)=>console.log(input)
  namei.innerHTML = element.full_name || "null";
  reg_date_td.innerHTML = `Since: ${element.registration_date}`;
  upline_td.innerHTML = `Upline:${element.referral || "unavailable"}`;
  bal_td.innerHTML = "Balance";
  // bal_fig_b.innerHTML=`$ ${element.final_balance .toString()
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`
  // namei;

  const btn_td = document.createElement("td");
  const edit_btn = document.createElement("a");
  const funds_btn = document.createElement("a");
  edit_btn.className = "sbmt btn-sm btn-success";
  edit_btn.style.marginBottom = "2px";
  edit_btn.href = `/admin/user_edit.html?${element._id}`;
  funds_btn.className = "sbmt btn-sm btn-info";
  funds_btn.style.marginBottom = "2px";
  funds_btn.href = `/admin/user-details.html?${element._id}`;
  edit_btn.innerHTML = "edit";
  funds_btn.innerHTML = "funds";

  btn_td.append(edit_btn, document.createElement("br"), funds_btn);

  container_tr.append(container_td);
  container_tr.append(fund_table);
  container_tr.append(btn_td);
  container_td.append(container_table);

  container_table.append(container_tbody);

  document.querySelector("#list").append(container_tr);
};








const setText = (userInfo) => {
  userInfo.map((info) => createAndAppendElement(info));
};

(async () => {
  let token = get_adminInfo("admin_token");
  let admin = get_adminInfo("admin");

  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/fetch_users",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, skip_count, display_count }),
        // body: JSON.stringify({ token, admin }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      console.log(result.errMessage);
      document.querySelector("#errMessage").innerHTML =   result.errMessage;
   
    } else {
      setText(result.message);
    }
  } catch (err) {
    console.log(err);
    document.querySelector("#errMessage").innerHTML = err.message;
  }
})();
