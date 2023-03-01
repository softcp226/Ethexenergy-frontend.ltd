let investment_packages;

const setPackages = (investment_package) => {
  investment_packages = investment_package;

  investment_package.forEach((package) => {
    const option = document.createElement("option");
    option.value = package.package_name;
    option.min = package.min;
    option.max = package.max;
    option.innerHTML = `${package.package_name} ($${package.min}-$${package.max})`;
    document.querySelector("#plan").append(option);
  });
};

(async () => {
  try {
    const response = await fetch(
      "https://ethexenergy-ltd.glitch.me/api/investment_packages/fetch",
      // "http://localhost:5000/api/investment_packages/fetch",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        // body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    console.log("result", result);
    if (result.error) {
      // alert(result.errMessage);
    } else {
      setPackages(result.message);
    }
  } catch (error) {
    console.log(error);
    // alert(error.message);
  }
})();
