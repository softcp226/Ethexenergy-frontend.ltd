// const get_adminInfo = (cname) => {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }

//   // return "";
//   window.location.href = "/admin";
// };
let row_number=1
construct_row_number=()=>row_number ==1 ?++row_number : --row_number

const create_element = (data) => {
  data.forEach((element) => {
    console.log(element.user.username)
    const container_tr = document.createElement("tr");
    const user_name_td = document.createElement("td");
    let amount_td=document.createElement("td")
    const user_name_b = document.createElement("b");
    const br = document.createElement("br");
    const small = document.createElement("small");
    const img = document.createElement("img");
    const a = document.createElement("a");
    let plan = document.createElement("td");
    let payment_method_td = document.createElement("td");
    let td_container = document.createElement("td");
    let btn_container = document.createElement("td");
    let idTxt = document.createElement("td");
const date_td=document.createElement("td")
    container_tr.className = `row${construct_row_number()}`;
    user_name_b.innerHTML = element.user.username || "Unspecified";
    small.innerHTML =
      element.user.full_name || "unspecified";
date_td.innerHTML=element.date||"Unspecified at the moment"
    plan.innerHTML = "--";
    amount_td.innerHTML = `$${element.deposit_amount}`;
    idTxt.innerHTML = `Transaction ID ${element._id}`;
    img.src = `${element.payment_method_img || "css/1674653.png"}`;
    img.height = "17";
    img.hspace = "1";
    img.vspace = "1";
    payment_method_td.append(img)
    a.href = `/admin/deposit-details.html?${element._id}`;
 a.innerHTML="Details"
 a.className = "sbmt btn-sm btn-success";
    btn_container.append(a)
user_name_td.append(user_name_b);
user_name_td.append(br)
user_name_td.append(small)
container_tr.append(user_name_td);
container_tr.append(date_td)
  container_tr.append(plan)
  container_tr.append(amount_td)
  container_tr.append(idTxt)
  container_tr.append(payment_method_td)
  container_tr.append(btn_container)
    document.querySelector("#list").append(container_tr);
  });
};

(async () => {
  let admin = get_adminInfo("admin");
  let token = get_adminInfo("admin_token");

  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/deposit_request",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ admin, token }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#errMessage").innerHTML=result.errMessage
    } else {
      create_element(result.message);
    }
  } catch (error) {
   document.querySelector("#errMessage").innerHTML = result.errMessage;
  }
})();
