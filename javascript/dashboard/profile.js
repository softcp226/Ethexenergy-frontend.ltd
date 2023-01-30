// const setText = (user) => {
//   document.querySelectorAll("#user_passport").forEach((passport) => {
//     passport.src = user.passport;
//   });

//   document.querySelector("#first_name").value = user.first_name;
//   document.querySelector("#last_name").value = user.last_name;

//   document.querySelector("#email").value = user.email;
// };

const getCookie = (cname) => {
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
  window.location.href = "/login.html";
};

// (async () => {
//   const user = getCookie("user");
//   const token = getCookie("token");
//   try {
//     const response = await fetch("/api/user/find", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({ token, user }),
//     });
//     const result = await response.json();
//     console.log(result);
//     if (result.error) {
//       alert(result.errMessage);
//     } else {
//       setText(result.message);
//     }
//   } catch (error) {
//     alert(error.message);
//   }
// })();
