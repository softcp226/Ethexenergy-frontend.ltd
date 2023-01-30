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
let row_number = 1;
construct_row_number = () => (row_number == 1 ? ++row_number : --row_number);

const create_element = (data) => {
  data.forEach((element) => {
    console.log(element.username);
 const container_tr = document.createElement("tr");
 const user_name_td = document.createElement("td");
  let amount_td = document.createElement("td");
   const amount_b = document.createElement("b");
   user_name_td.innerHTML=element.username;
   amount_b.innerHTML = `$${element.referral_bonus}`;
   amount_td.append(amount_b)
   container_tr.className=`row${construct_row_number()}`
   amount_td.width="200";
   amount_td.align="right"
container_tr.append(user_name_td,amount_td);
    
 document.querySelector("#list").append(container_tr);
  });
};

(async () => {
  let admin = get_adminInfo("admin");
  let token = get_adminInfo("admin_token");

  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/user/top_referral",
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
      create_element(result.message);
    }
  } catch (error) {
    document.querySelector("#errMessage").innerHTML = result.errMessage;
  }
})();
