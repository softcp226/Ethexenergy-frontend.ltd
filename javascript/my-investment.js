// const getCookie = (cname) => {
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
//   window.location.href = "/login.html";
// };

let handle_cancel_investment = async (button, investment) => {
  try {
    button.innerHTML = "proccessing...";
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/user/investment/cancel",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token: getCookie("token"),
          user: getCookie("user"),
          investment: investment,
        }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      alert(result.errMessage);
      button.innerHTML = "try again";
      return;
    }
    button.innerHTML = "success";
    window.location.href = "/my-investment.html";
  } catch (err) {
    alert(err.message);
    button.innerHTML = "try again";
  }
};

const createAndAppendElement = (element) => {
  console.log(element);
  const section = document.createElement("section");
  section.className = "table-list-credit";

  let TDH4 = document.createElement("h4");
  let REFH4 = document.createElement("h4");
  let AMTH4 = document.createElement("h4");
  let RTH4 = document.createElement("h4");
  let IVP = document.createElement("h4");
  let PT_LS = document.createElement("h4");
  let AN = document.createElement("h4");

  TDH4.innerHTML = element.transaction_date;
  REFH4.innerHTML = element.refrence_number;
  AMTH4.innerHTML = `$${element.amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;
  RTH4.innerHTML = "24 Hours";
    // element.return_time == "daily_return" ? "24 Hours" : "One Week";
  IVP.innerHTML = element.investment_plan;
  PT_LS.innerHTML = `$${element.pending_profit
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;

  PT_LS.style.color = element.show_loss ? "red" : "green";

  AN.innerHTML = "Cancel";
  AN.className = "status-fail";
  AN.onclick = () => handle_cancel_investment(AN, element._id);
  //   IVP.innerHTML = element.investment_plan;
  //   PT_LS.innerHTML = "+$3.30";
  //()=>{
  //       if(element.loss > 0){

  //       }else{

  //       }
  //   }

  //   DBH4.innerHTML = element.debit || "";
  //   CDH4.innerHTML = element.credit || "";
  //   SSH4.innerHTML = element.status;

  //   element.status == "failed"
  //     ? (SSH4.className = "status-fail")
  //     : element.status == "pending"
  //     ? (SSH4.className = "status-pending")
  //     : (SSH4.className = "status-success");
  section.append(TDH4, REFH4, AMTH4, RTH4, IVP, PT_LS, AN);
  document.querySelector(".history-table").append(section);
};

const shape_result = (investments) => {
  investments.map((investment) => createAndAppendElement(investment));
};

(async () => {
  let token = getCookie("token");
  let user = getCookie("user");
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/user/investments/fetch",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error)
      return (document.querySelector(".errMessage").innerHTML =
        result.errMessage);
    shape_result(result.message);
  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
  }
})();
