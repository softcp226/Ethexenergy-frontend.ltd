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
const select_element=(id,innerText)=>{
return document.querySelector(`#${id}`).innerHTML=innerText
}
const create_element = (data) => {
    document.querySelector("#user_length").innerHTML=data.user_length;
    document.querySelector(
      "#active_user_length",
    ).innerHTML = `${data.active_users.length} ${data.active_users.percentage}`;
// document.querySelector("#suspended_users_length").innerHTML;
select_element(
  "suspended_users_length",
  `${data.suspended_users.length} ${data.suspended_users.percentage}`,
);
select_element(
  "disabled_users_length",
  `${data.disabled_users.length} ${data.disabled_users.percentage}`,
);

select_element(
  "users_that_ever_madedeposit",
  `${data.users_ever_madedeposit.length} ${data.users_ever_madedeposit.percentage} `,
);
select_element(
  "users_that_never_madedeposit",
  `${data.users_that_never_madedeposit.length} 
  ${data.users_that_never_madedeposit.percentage}`,
);
select_element("investment_package", `${data.investment_packages.length}`);
select_element("withdrawal_request",`${data.withdrawal_request.length}`);
select_element("pending_deposit", `${data.pending_deposit.length}`);
};

(async () => {
  let admin = get_adminInfo("admin");
  let token = get_adminInfo("admin_token");

  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/dashboard/details",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ admin, token }),
      },
    );
    const result = await response.json();
    console.log(result)
    if (result.error) {
      alert(error.message);
    }else{
        create_element(result.message);
    }
  } catch (error) {
   console.log(error);
  }
})();
