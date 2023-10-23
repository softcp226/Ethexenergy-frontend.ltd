const btc_icon =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/225px-Bitcoin.svg.png";
const ethereum_icon =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmyEwFnrqqHY4c5y0fIJVZhW7lpBzoNXGY2Q&usqp=CAU";
const usdt_icon =
  "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Tether-USDT-icon.png";
const perfect_money_icon =
  "https://play-lh.googleusercontent.com/A0-25O4FaUEAWFUAc6a4UQm6Qz3kuKzjTp93jvkBYF3Yv3UxcVx2TfHupfOUQqHcuqj2=w240-h480-rw";

const select_credit_icon = (data) => {
  console.log("data", data);

  switch (data.payment_method) {
    case "BITCOIN":
      return btc_icon;
      break;

    case "ETHEREUM":
      return ethereum_icon;
      break;

    case "USDT(TRC20)":
      return usdt_icon;
      break;

    case "PERFECT MONEY":
      return perfect_money_icon;
      break;

    default:
      return btc_icon;
      break;
  }
};

const select_debit_icon = (data) => {
  console.log("data", data);

  switch (data.withdrawal_method) {
    case "BITCOIN":
      return btc_icon;
      break;

    case "ETHEREUM":
      return ethereum_icon;
      break;

    case "USDT(TRC20)":
      return usdt_icon;
      break;

    case "PERFECT MONEY":
      return perfect_money_icon;
      break;

    default:
      return btc_icon;
      break;
  }
};

const create_credit_element = (data) => {
  const wpb_column_vc_column_container = document.createElement("div");
  const vc_column_inner = document.createElement("div");
  const wpb_wrapper = document.createElement("div");
  const pr_box = document.createElement("div");
  const name_h6 = document.createElement("h6");
  const withdrawal_detail_c = document.createElement("div");
  const amount_container_div = document.createElement("div");
  const amount_container_p = document.createElement("p");
  const wallet_icon_div = document.createElement("div");
  const wallet_icon_img = document.createElement("img");
  const svg_div_container = document.createElement("div");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="green" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
													<path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"></path>
												</svg>`;
  wpb_column_vc_column_container.className =
    "wpb_column vc_column_container vc_col-sm-6";
  vc_column_inner.className = "vc_column-inner";
  wpb_wrapper.className = "wpb_wrapper";
  pr_box.className = "pr_box";
  withdrawal_detail_c.className = "withdrawal-detail-c";

  wpb_column_vc_column_container.append(vc_column_inner);
  vc_column_inner.append(wpb_wrapper);
  wpb_wrapper.append(pr_box);
  pr_box.append(name_h6);
  pr_box.append(withdrawal_detail_c);
  withdrawal_detail_c.append(amount_container_div);
  withdrawal_detail_c.append(wallet_icon_div);
  withdrawal_detail_c.append(svg_div_container);
  amount_container_div.append(amount_container_p);

  wallet_icon_div.append(wallet_icon_img);
  svg_div_container.innerHTML = svg;

  name_h6.innerHTML = data.user ? data.user.username : "UNAVAILABLE...";
  amount_container_p.innerHTML = data.credit;

  wallet_icon_img.src = select_credit_icon(data.deposit_request);
  document
    .querySelector("#latest_deposit")
    .append(wpb_column_vc_column_container);
};

const create_debit_element = (data) => {
  const wpb_column_vc_column_container = document.createElement("div");
  const vc_column_inner = document.createElement("div");
  const wpb_wrapper = document.createElement("div");
  const pr_box = document.createElement("div");
  const name_h6 = document.createElement("h6");
  const withdrawal_detail_c = document.createElement("div");
  const amount_container_div = document.createElement("div");
  const amount_container_p = document.createElement("p");
  const wallet_icon_div = document.createElement("div");
  const wallet_icon_img = document.createElement("img");
  const svg_div_container = document.createElement("div");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="red" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
												<path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"></path>
											</svg>`;
  wpb_column_vc_column_container.className =
    "wpb_column vc_column_container vc_col-sm-6";
  vc_column_inner.className = "vc_column-inner";
  wpb_wrapper.className = "wpb_wrapper";
  pr_box.className = "pr_box";
  withdrawal_detail_c.className = "withdrawal-detail-c";

  wpb_column_vc_column_container.append(vc_column_inner);
  vc_column_inner.append(wpb_wrapper);
  wpb_wrapper.append(pr_box);
  pr_box.append(name_h6);
  pr_box.append(withdrawal_detail_c);
  withdrawal_detail_c.append(amount_container_div);
  withdrawal_detail_c.append(wallet_icon_div);
  withdrawal_detail_c.append(svg_div_container);
  amount_container_div.append(amount_container_p);

  wallet_icon_div.append(wallet_icon_img);
  svg_div_container.innerHTML = svg;

  name_h6.innerHTML = data.user ? data.user.username : "UNAVAILABLE...";
  amount_container_p.innerHTML = data.debit;
  wallet_icon_img.src = select_debit_icon(data.withdrawal_request);

  document
    .querySelector("#latest_withdrawal")
    .append(wpb_column_vc_column_container);
};
// <div class="wpb_column vc_column_container vc_col-sm-6">
// 							<div class="vc_column-inner">
// 								<div class="wpb_wrapper">
// 									<div class="pr_box">
// 										<h6>Ahmadi</h6>
// 										<div class="withdrawal-detail-c">
// 											<div>
// 												<p>$91,000</p>
// 											</div>
// 											<div><img src="css/dep-with-image/btc.gif" alt=""></div>
// 											<div>
// 												<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"
// 													fill="red" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
// 													<path
// 														d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
// 												</svg>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>

const fetch_first_10_deposits = async () => {
  try {
    const response = await fetch(
      // "http://localhost:5000/last_10_withdrawals&deposit/last_10_deposits",
      "https://ethexenergy-ltd.glitch.me/last_10_withdrawals&deposit/last_10_deposits",
    );
    const result = await response.json();
    console.log("result", result);
    if (result.error) {
      // alert(result.errMessage);
      console.log(result);
    } else {
      //   setText(result.message);
      result.message.forEach((element) => {
        create_credit_element(element);
      });
    }
  } catch (error) {
    console.log(error);
    // alert(error.message);
  }
};
fetch_first_10_deposits();

const fetch_first_10_withdrawals = async () => {
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/last_10_withdrawals&deposit/last_10_withdrawals",
      // "http://localhost:5000/last_10_withdrawals&deposit/last_10_withdrawals",
    );
    const result = await response.json();
    console.log("result", result);
    if (result.error) {
      // alert(result.errMessage);
      console.log(result);
    } else {
      //   setText(result.message);

      result.message.forEach((element) => {
        create_debit_element(element);
      });
    }
  } catch (error) {
    console.log(error);
    // alert(error.message);
  }
};
fetch_first_10_withdrawals();
