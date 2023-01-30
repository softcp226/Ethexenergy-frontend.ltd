const get_userID = () => {
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

const create_total_balance_figure = (data) => {
  let total_balance = document.querySelector("#total_balance");
  total_balance.innerHTML = `$${data.final_balance}.0`;
  const total_balance_div = document.createElement("div");
  total_balance_div.className = "sbmt-group";
  const total_balance_a = document.createElement("a");
  total_balance_a.className = "sbmt btn-sm btn-info";
  total_balance_a.innerHTML = "history";
  total_balance_div.append(total_balance_a);
  total_balance.append(total_balance_div);
};

const create_total_deposit_figure = (data) => {
  let total_deposit = document.querySelector("#total_deposit");
  total_deposit.innerHTML = `$${data.total_deposit}.0`;
  const total_deposit_div = document.createElement("div");
  total_deposit_div.className = "sbmt-group";
  const total_deposit_a = document.createElement("a");
  total_deposit_a.className = "sbmt btn-sm btn-info";
  total_deposit_a.innerHTML = "history";
  total_deposit_div.append(total_deposit_a);
  total_deposit.append(total_deposit_div);
};

const create_active_deposit_figure = (data) => {
  let active_deposit = document.querySelector("#active_deposit");
  active_deposit.innerHTML = `$${data.active_deposit}.0`;
  const active_deposit_div = document.createElement("div");
  active_deposit_div.className = "sbmt-group";
  const active_deposit_a = document.createElement("a");
  active_deposit_a.className = "sbmt btn-sm btn-danger";
  active_deposit_a.innerHTML = "history";
  active_deposit_div.append(active_deposit_a);
  active_deposit.append(active_deposit_div);
};

const create_total_earning_figure = (data) => {
  let total_earning = document.querySelector("#total_earning");
  total_earning.innerHTML = `$${data.total_earning}.0`;
  const total_earning_div = document.createElement("div");
  total_earning_div.className = "sbmt-group";
  const total_earning_a = document.createElement("a");
  total_earning_a.className = "sbmt btn-sm btn-info";
  total_earning_a.innerHTML = "history";
  total_earning_div.append(total_earning_a);
  total_earning.append(total_earning_div);
};

const create_total_withdrawal_figure = (data) => {
  let total_withdrawal = document.querySelector("#total_withdrawal");
  total_withdrawal.innerHTML = `$${data.total_withdrawal}.0`;
  const total_withdrawal_div = document.createElement("div");
  total_withdrawal_div.className = "sbmt-group";
  const total_withdrawal_request_a = document.createElement("a");
  total_withdrawal_request_a.className = "sbmt btn-sm btn-danger";
  total_withdrawal_request_a.innerHTML = "withdraw request";
  const total_withdrawal_history_a = document.createElement("a");
  total_withdrawal_history_a.className = "sbmt btn-sm btn-info";
  total_withdrawal_history_a.innerHTML = "history";
  // total_withdrawal;
  total_withdrawal_div.append(total_withdrawal_request_a,total_withdrawal_history_a);
  total_withdrawal.append(total_withdrawal_div);
};


const create_pending_withdrawals_figure = (data) => {
  let pending_withdrawals = document.querySelector("#pending_withdrawals");
  pending_withdrawals.innerHTML = `$${data.pending_withdrawal}.0`;
  const pending_withdrawals_div = document.createElement("div");
  pending_withdrawals_div.className = "sbmt-group";
  const pending_withdrawals_a = document.createElement("a");
  pending_withdrawals_a.className = "sbmt btn-sm btn-info";
  pending_withdrawals_a.innerHTML = "history";
  pending_withdrawals_div.append(pending_withdrawals_a);
  pending_withdrawals.append(pending_withdrawals_div);
};

const create_total_bonus_figure=(data)=>{
   let total_bonus = document.querySelector("#total_bonus");
   total_bonus.innerHTML = `$${data.referral_bonus}.0`;
   const total_bonus_div = document.createElement("div");
   total_bonus_div.className = "sbmt-group";
   const total_bonus_request_a = document.createElement("a");
   total_bonus_request_a.className = "sbmt btn-sm btn-danger";
   total_bonus_request_a.innerHTML = "add a bonus";
   const total_bonus_history_a = document.createElement("a");
   total_bonus_history_a.className = "sbmt btn-sm btn-info";
   total_bonus_history_a.innerHTML = "history";
   // total_bonus;
   total_bonus_div.append(
     total_bonus_request_a,
     total_bonus_history_a,
   );
   total_bonus.append(total_bonus_div);
}

const setText = (data) => {
  document.querySelector("#username").innerHTML = data.username;
  document.querySelector("#fullname").innerHTML = data.full_name;
  document.querySelector("#email").innerHTML = data.email;
  create_total_balance_figure(data);
  create_total_deposit_figure(data);
  create_active_deposit_figure(data);
  create_total_earning_figure(data);
  create_total_withdrawal_figure(data);
  create_pending_withdrawals_figure(data)
  create_total_bonus_figure(data)
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
    alert(err.message);
    // document.querySelector(".errMessage").innerHTML = err.message;
  }
})();
