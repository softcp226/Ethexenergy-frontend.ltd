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




const delete_proccessing = async (data) => {
  console.log(data.delete_btn);
 data.delete_btn.innerHTML = "proccessing";
  try {
    const response = await fetch(
      // "http://localhost:5000/api/admin/payment_proccessing/delete",

      "https://ethexenergy-ltd.glitch.me/api/admin/payment_proccessing/delete",
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token: get_adminInfo("admin_token"),
          admin: get_adminInfo("admin"),
          payment_proccessor_ID: data.payment_proccessor_ID,
        }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#errMessage").innerHTML = result.errMessage;
      data.delete_btn.innerHTML = "Try again";
    } else {
      window.location.replace("/admin/proccessings.html");
      // result.message.forEach((element) => {
      //   create_element(element);
      // });
    }
  } catch (error) {
    console.log(error);
    document.querySelector("#errMessage").innerHTML = error.message;
    data.delete_btn.innerHTML = "Try again";
  }
};


const create_element = (data) => {
  const container_tr = document.createElement("tr");
  const proccessing_name_td = document.createElement("td");
  const proccessing_name_span = document.createElement("span");
  const proccessing_img_td = document.createElement("td");
  const proccessing_img = document.createElement("img");
  const btn_container_td = document.createElement("td");
  const edit_btn_a=document.createElement("a")
  const delete_btn_a = document.createElement("a");
  data.status == "active"
    ? (proccessing_name_span.style.fontWeight = "bold")
    : "";
  proccessing_name_span.innerHTML=data.name;
  proccessing_img.src=data.icon
  proccessing_img.height="17"
  proccessing_img_td.append(proccessing_img)
 
  edit_btn_a.innerHTML="edit"
  edit_btn_a.href = `/admin/edit_proccessing.html?${data._id}`;
  delete_btn_a.innerHTML="delete"
  edit_btn_a.className = "sbmt btn-sm btn-info";
  delete_btn_a.className = "sbmt btn-sm btn-danger";
  delete_btn_a.onclick = () =>
    delete_proccessing({ delete_btn: delete_btn_a, payment_proccessor_ID:data._id,  });
  btn_container_td.append(edit_btn_a,delete_btn_a)
  proccessing_name_td.append(proccessing_name_span)
  container_tr.append(proccessing_name_td,proccessing_img_td,btn_container_td)
  document.querySelector("#list").append(container_tr)
};

(async () => {
  let admin = get_adminInfo("admin");
  let token = get_adminInfo("admin_token");

  try {
    const response = await fetch(
      // "http://localhost:5000/api/admin/payment_proccessing/fetch",

      "https://ethexenergy-ltd.glitch.me/api/admin/payment_proccessing/fetch",
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
