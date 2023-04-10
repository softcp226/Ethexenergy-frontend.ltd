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

// let row_number = 1;
// construct_row_number = () => (row_number == 1 ? ++row_number : --row_number);

 const create_element = (data) => {
  data.forEach((element) => {
    //     // console.log(element.username);
    const container_tr = document.createElement("tr");
     container_tr.className = `row${construct_row_number()}`;
      const user_name_td = document.createElement("td");
      user_name_td.className = "trn_user";
      const user_name_b = document.createElement("b");
      user_name_b.innerHTML=element.user.username;
      const edit_btn=document.createElement("a");
      const manage_btn = document.createElement("a");
      edit_btn.className = "badge badge-danger";
      edit_btn.href = `/admin/user_edit.html?${element.user._id}`;
     edit_btn.innerHTML="edit";
     manage_btn.className = "badge badge-info";
     manage_btn.href = `/admin/user-details.html?${element.user._id}`;
      manage_btn.innerHTML="manage"
      const manage_btn_br=document.createElement("br");
      const description_small=document.createElement("small");
      description_small.style.color="gray";
      const description_b=document.createElement("b");
      description_b.innerHTML = element.credit
        ? "Deposit made to user account: "
        : "Withdraw processed to account: ";
        const amount_td=document.createElement("td");
      const amount_b = document.createElement("b");
      amount_b.style.color="green";
      amount_b.innerHTML=element.debit||element.credit;
      const amount_img=document.createElement("img");
     amount_img.src = "images/1010.gif";
     const date_td=document.createElement("td");
     const date_sm = document.createElement("small");
     date_sm.innerHTML = element.transaction_date;
    description_small.append(description_b)
     user_name_td.append(user_name_b,edit_btn,manage_btn,manage_btn_br,description_small)
  date_td.append(date_sm)
     amount_td.append(amount_b,amount_img)
     container_tr.append(user_name_td,amount_td,date_td)
    document.querySelector("#list").append(container_tr);
  });
 };

(async () => {
  let admin = get_adminInfo("admin");
  let token = get_adminInfo("admin_token");

  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/transactions/fetch",
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
    document.querySelector("#errMessage").innerHTML =error.message                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ;
  }
})();
