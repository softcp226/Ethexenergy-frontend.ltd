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
handle_delete_package = async (btn, package_id) => {
  let admin = get_adminInfo("admin");
  let token = get_adminInfo("admin_token");

  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/investment_packages/delete",

      // "http://localhost:5000/api/admin/investment_packages/delete",

      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ admin, token, package_id }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#errMessage").innerHTML = result.errMessage;
    } else {
     alert("success");
     window.location.replace("/admin/investment-program.html");
    }
  } catch (error) {
    console.log(error);
    document.querySelector("#errMessage").innerHTML = error.message;
  }
};

let row_number = 1;
construct_row_number = () => (row_number == 1 ? ++row_number : --row_number);

const create_element = (data) => {
  const container_tr = document.createElement("tr");
  const down_arrow_td = document.createElement("td");
  const down_arrow_br = document.createElement("br");
  const down_arrow_a = document.createElement("a");
  down_arrow_a.innerHTML = "▾";
  const percentage_td = document.createElement("td");
  const percentage_b = document.createElement("b");
  const limits_container_td = document.createElement("td");
  const limits_nobr = document.createElement("nobr");
  const nobr_br = document.createElement("br");
  const total_invest_span = document.createElement("span");
  const total_amount_span = document.createElement("span");
  const active_invest_span = document.createElement("span");
  const total_active_span = document.createElement("span");
  const active_br = document.createElement("br");
  const percentage_over_time_td = document.createElement("td");
  const percentage_over_time_br = document.createElement("br");
  const button_container_td = document.createElement("td");
  const edit_btn = document.createElement("a");
  edit_btn.className = "sbmt btn-sm btn-success";
  edit_btn.innerHTML = "edit";
  edit_btn.href = `/admin/investment-program-add.html?${data._id}`;
  const plan_container_tr = document.createElement("tr");
  const plan_container_td = document.createElement("td");
  const plan_container_table = document.createElement("table");
  const plan_container_tbody = document.createElement("tbody");
  const plan_name_tr = document.createElement("tr");
  const plan_name_td = document.createElement("td");
  const plan_price_td = document.createElement("td");
  const plan_percentage_td = document.createElement("td");
  plan_container_tr.className = `row${construct_row_number()}`;

  const delete_btn = document.createElement("a");
  delete_btn.className = "sbmt btn-sm btn-danger";
  delete_btn.innerHTML = "delete";
  delete_btn.onclick = () => handle_delete_package(delete_btn, data._id);
  container_tr.className = `row${construct_row_number()}`;

  down_arrow_td.style.textAlign = "center";
  down_arrow_td.append(down_arrow_a);
  down_arrow_a.href =
    "?a=programs&amp;action=down&amp;id=1&amp;form_id=16637567271321&amp;form_token=4a53101d60527411b5271f9b1582b34c";

  percentage_td.append(percentage_b);
  percentage_b.innerHTML = `${data.percentage}% After ${data.payment_period} hours`;
  limits_container_td.append(limits_nobr);
  limits_nobr.innerHTML = `Limits $${data.min} - $${data.max}`;
  const limits_container_br = document.createElement("br");
  total_invest_span.className = "badge badge-primary";
  total_invest_span.innerHTML = "0";
  total_amount_span.className = "badge badge-success";
  total_amount_span.innerText = `$${"0"}`;
  active_invest_span.innerText = `$${"0"}`;
  active_invest_span.className = "badge badge-danger";
  total_active_span.className = "badge badge-warning";
  total_active_span.innerText = `$${"0"}`;

  limits_container_td.append(
    limits_container_br,
    "Total: ",
    total_invest_span,
    total_amount_span,
    active_br,
    "Active:",
    active_invest_span,
    total_active_span,
  );
  percentage_over_time_td.innerText = `${data.percentage}% After ${data.payment_period}`;
  percentage_over_time_td.append(percentage_over_time_br);
  percentage_over_time_td.append("+ return 100.00% principal");
  button_container_td.append(edit_btn, delete_btn);

  container_tr.append(
    down_arrow_td,
    percentage_td,
    limits_container_td,
    percentage_over_time_td,
    button_container_td,
  );

  plan_container_td.colSpan = "5";
  plan_container_table.cellSpacing = "0";
  plan_container_table.cellPadding = "2";
  plan_container_table.border = "0";
  plan_container_table.width = "66%";
  plan_container_table.align = "right";
  plan_container_table.style.paddingBottom = "20px";
  plan_container_table.style.marginRight = "60px";

  plan_name_tr.onmouseover = "bgColor='#FFECB0';";
  plan_name_tr.onmouseout = "bgColor='';";
  plan_container_td.width = "120";

  const white_bg_tr = document.createElement("tr");
  const white_bg_td = document.createElement("td");
  const white_bg_br = document.createElement("br");
  white_bg_tr.style.backgroundColor = "#fff";
  white_bg_td.colSpan = "5";
  white_bg_td.append(white_bg_br);
  white_bg_tr.append(white_bg_td);
  // plan_container_td.innerHTML = `${data.name}`;

  //    plan_container_table.append(plan_container_tbody2);
  //     plan_container_tr.append(plan_container_td);
  //   plan_container_td.append(plan_container_table);
  //     plan_container_tbody2.append(plan_name_tr);
  //  plan_name_tr.append(plan_name_td);
  //  plan_name_td.innerHTML=data.name

  // plan_container_tr.append(plan_name_tr)

  //  plan_container_td.append(plan_container_tbody)
  // // plan_price_td.append(plan_container_table);

  //  plan_price_td.align="right"
  //  plan_price_td.innerHTML=`${data.min} - ${data.max}`

  //  plan_container_tr.append(plan_container_td,plan_price_td)
  plan_percentage_td.innerHTML = `${data.percentage}.00%`;
  plan_price_td.innerHTML = `$${data.min} - $${data.max}`;
  plan_name_td.innerHTML = data.package_name.toUpperCase();
  plan_name_tr.append(plan_name_td, plan_price_td, plan_percentage_td);
  plan_container_tbody.append(plan_name_tr);
  plan_container_table.append(plan_container_tbody);
  plan_container_td.append(plan_container_table);
  plan_container_tr.append(plan_container_td);

  document
    .querySelector("#list")
    .append(container_tr, plan_container_tr, white_bg_tr);
};

(async () => {
  let admin = get_adminInfo("admin");
  let token = get_adminInfo("admin_token");

  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/investment_packages",
      // "http://localhost:5000/api/admin/investment_packages",

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
