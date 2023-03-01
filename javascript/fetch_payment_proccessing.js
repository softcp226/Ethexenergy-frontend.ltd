let payment_proccessing;
const set_payment_proccessing = (data) => {
  data.forEach((element) => {
    const option = document.createElement("option");
    option.value = element.name;
    option.innerHTML = element.name;
    option.id = element.wallet_address;
    document.querySelector("#payment-method").append(option);
  });
};

(async () => {
  let token = getCookie("token");
  let user = getCookie("user");
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/user/fetch_payment_proccessing",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    console.log("result", result);
    if (result.error) {
      // alert(result.errMessage);
    } else {
      payment_proccessing = result.message;
      set_payment_proccessing(result.message);
    }
  } catch (error) {
    console.log(error);
    // alert(error.message);
  }
})();
