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

const setText = (investment_package) => {
  investment_package.forEach((investment_package) => {
    const plan_container_div = document.createElement("div");
    const package_name = document.createElement("h1");
    package_name.innerHTML = investment_package.package_name;

    const package_ul = document.createElement("ul");
    const package_min_li = document.createElement("li");
    const package_max_li = document.createElement("li");
    const package_return_li = document.createElement("li");
    const package_return_li_b = document.createElement("b");
    const package_principal_li = document.createElement("li");
    const package_instant_li = document.createElement("li");

    package_return_li_b.style.color = "#fff";
    package_return_li_b.innerHTML = `${investment_package.percentage}`;
    package_min_li.innerHTML = `Min: $${investment_package.min}`;
    package_max_li.innerHTML = `Max: $${investment_package.max}`;

    package_return_li.append(
      `${investment_package.percentage}% ${investment_package.payment_period} Return`,
    );

    package_principal_li.innerHTML = "PRINCIPAL WITHDRAWAL";
    package_instant_li.innerHTML = "INSTANT WITHDRAWAL";
    const package_btn = document.createElement("a");
    package_btn.href = "register.html";
    package_btn.className = "btn btn-default";
    package_btn.innerHTML = "Get Started";
    // package_return_li.innerHTML=;
    package_ul.append(
      package_min_li,
      package_max_li,
      package_return_li,
      package_principal_li,
      package_instant_li,
      package_btn,
    );

    plan_container_div.append(package_name, package_ul);
    document.querySelector("#pricing_list").append(plan_container_div);
  });
};

(async () => {
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/investment_packages/fetch",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        // body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    console.log("result", result);
    if (result.error) {
      alert(result.errMessage);
    } else {
      setText(result.message);
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
})();
