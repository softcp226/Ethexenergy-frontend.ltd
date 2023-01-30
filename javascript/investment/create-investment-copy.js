const write_percentage = (percentage, earning) => {
  document.querySelector(
    "#percentage",
  ).innerHTML = `${percentage} return after 24 hours`;
  document.querySelector("#earning").innerHTML = earning;
};
const show_err = () => {
  document.querySelector("#amount").style.border = "2px solid red";
  document.querySelector(".errMessage").innerHTML =
    "Investment amount can not be lesser than minimum investment for the plan selected";
};
const disable_show_err = () => {
  document.querySelector("#amount").style.border = "2px solid #fff";
  document.querySelector(".errMessage").innerHTML = "";
};
let profit;

const handle_request = () => {
  if (!amount.value) return;

  const package = investment_packages.filter(
    (package) => package.package_name == plan.value,
  );
  if (parseInt(amount.value) < package[0].min) return show_err();
  disable_show_err();
  var percentage = `${package[0].percentage}%`;
  var earning = `My Profit: $${Math.round(
    (amount.value / 100) * package[0].percentage,
  )}`;
  profit = Math.round((amount.value / 100) * package[0].percentage);

  write_percentage(percentage, earning);
  // handle_submit_request({
  //   profit,
  //   plan: plan.value,
  //   amount: amount.value,
  // });
};

// const handle_request = () => {
//   switch (plan.value) {
//     case "Basic Plan":
//       if (!amount.value) return;
//       // if (!return_time.value) return;
//       if (parseInt(amount.value) < 50) return show_err();
//       disable_show_err();

//       var percentage = "8%";
//       var earning = `My Profit: $${Math.round((amount.value / 100) * 8)}`;
//       profit = Math.round((amount.value / 100) * 8);
//       write_percentage(percentage, earning);
//       break;
//     // } else {
//     //   var percentage = "Weekly Percentage: 105%";
//     //   var earning = `My Profit: $${Math.round(
//     //     (amount.value / 100) * 15 * 7
//     //   )}`;
//     //   profit = Math.round((amount.value / 100) * 15 * 7);
//     //   write_percentage(percentage, earning);
//     //   break;
//     // }

//     // case "Premium Plan":
//     //   if (!amount.value) return;
//       // if (!return_time.value) return;
//     //   if (parseInt(amount.value) < 1000) return show_err();
//     //   disable_show_err();
//     //   if (return_time.value == "daily_return") {
//     //     var percentage = "daily Percentage: 25%";
//     //     var earning = `My Profit: $${Math.round(
//     //       (amount.value / 100) * 25
//     //     )}`;
//     //     profit = Math.round((amount.value / 100) * 25);
//     //     write_percentage(percentage, earning);
//     //     break;
//     //   } else {
//     //     var percentage = "Weekly Percentage: 175%";
//     //     var earning = `My Profit: $${Math.round(
//     //       (amount.value / 100) * 25 * 7
//     //     )}`;
//     //     profit = Math.round((amount.value / 100) * 25 * 7);
//     //     write_percentage(percentage, earning);
//     //     break;
//     //   }

//     case "Standard Plan":
//       if (!amount.value) return;
//       // if (!return_time.value) return;
//       if (parseInt(amount.value) < 500) return show_err();
//       disable_show_err();
//       // if (return_time.value == "daily_return") {
//       var percentage = "16%";
//       var earning = `My Profit: $${Math.round((amount.value / 100) * 16)}`;
//       profit = Math.round((amount.value / 100) * 16);
//       write_percentage(percentage, earning);
//       break;
//     // } else {
//     //   var percentage = "Weekly Percentage: 210%";
//     //   var earning = `My Profit: $${Math.round(
//     //     (amount.value / 100) * 30 * 7
//     //   )}`;
//     //   profit = Math.round((amount.value / 100) * 30 * 7);
//     //   write_percentage(percentage, earning);
//     //   break;
//     // }

//     // case "Enterprise Plan":
//     //   if (!amount.value) return;
//       // if (!return_time.value) return;
//     //   if (parseInt(amount.value) < 6000) return show_err();

//     //   disable_show_err();
//     //   if (return_time.value == "daily_return") {
//     //     var percentage = "daily Percentage: 35%";
//     //     var earning = `My Profit: $${Math.round(
//     //       (amount.value / 100) * 35
//     //     )}`;
//     //     profit = Math.round((amount.value / 100) * 35);
//     //     write_percentage(percentage, earning);
//     //     break;
//     //   } else {
//     //     var percentage = "Weekly Percentage: 245%";
//     //     var earning = `My Profit: $${Math.round(
//     //       (amount.value / 100) * 35 * 7
//     //     )}`;
//     //     profit = Math.round((amount.value / 100) * 35 * 7);
//     //     write_percentage(percentage, earning);
//     //     break;
//     //   }

//     case "Ultimate Plan":
//       if (!amount.value) return;
//       // if (!return_time.value) return;
//       if (parseInt(amount.value) < 5000) return show_err();

//       disable_show_err();
//       // if (return_time.value == "daily_return") {
//       var percentage = "33%";
//       var earning = `My Profit: $${Math.round((amount.value / 100) * 33)}`;
//       profit = Math.round((amount.value / 100) * 33);
//       write_percentage(percentage, earning);
//       break;
//     // } else {
//     //   var percentage = "Weekly Percentage: 280%";
//     //   var earning = `My Profit: $${Math.round(
//     //     (amount.value / 100) * 40 * 7
//     //   )}`;
//     //   profit = Math.round((amount.value / 100) * 40 * 7);
//     //   write_percentage(percentage, earning);
//     //   break;
//     // }

//     default:
//       handle_keychange();
//       break;
//   }
// };

const handle_keychange = () => {
  if (!amount.value) return display_error(amount);
  hide_error(amount);
  if (!plan.value) return display_error(plan);
  hide_error(plan);
  // if (!return_time.value) return display_error(return_time);

  // hide_error(return_time);
  handle_request();
};
