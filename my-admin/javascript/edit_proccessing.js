const Get_Proccessing_ID = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

const name = document.querySelector("#name");
const icon_link = document.querySelector("#icon_link");
const proccessing_status = document.querySelector("#status");
const payment_instruction = document.querySelector("#payment_instruction");



const add_proccessing = async (data) => {
  document.querySelector("#update").value = "proccessing";
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/payment/proccessing",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#errMessage").innerHTML = result.errMessage;
      document.querySelector("#update").value = "Try again";
    } else {
      window.location.replace("/admin/proccessings.html");
      // result.message.forEach((element) => {
      //   create_element(element);
      // });
    }
  } catch (error) {
    console.log(error);
    document.querySelector("#errMessage").innerHTML = error.message;
    document.querySelector("#update").value = "Try again";
  }
};


document.querySelector("#update").onclick = () => {
  event.preventDefault();
  if (!name.value) return show_input_error(name);
  if (!icon_link.value) return show_input_error(icon_link);
  if (!proccessing_status.value) return show_input_error(proccessing_status);
  if (!payment_instruction.value) return show_input_error(payment_instruction);

  let admin = get_adminInfo("admin");
  let token = get_adminInfo("admin_token");

  add_proccessing({
    admin,
    token,
    name: name.value,
    icon: icon_link.value,
    status: proccessing_status.value,
    wallet_address: payment_instruction.value,
  });
};



let update_proccessing = true;

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
  name.value = data.name;
  icon_link.value = data.icon;
  proccessing_status.value = data.status;
  payment_instruction.value = data.wallet_address;
};

(async () => {
  let admin = get_adminInfo("admin");
  let token = get_adminInfo("admin_token");
  let proccessing_id = Get_Proccessing_ID();
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/admin/payment_proccessing/fetchOne",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ admin, token, proccessing_id: proccessing_id }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#errMessage").innerHTML = result.errMessage;
    } else {
     create_element(result.message)
      // result.message.forEach((element) => {
      //   create_element(element);
      // });
    }
  } catch (error) {
    console.log(error);
    document.querySelector("#errMessage").innerHTML = error.message;
  }
})();
