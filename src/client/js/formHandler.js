function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;

  Client.checkForName(formText);

  const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
  const apiKey = "&appid=38621e60d3342339ccfb250e31b427a9&units=metric";
  const zip = document.getElementById("name").value + ",de";

  console.log("::: Form Submitted :::");
  console.log(baseURL + zip + apiKey);
  getWeatherData(baseURL, zip, apiKey).then(function (data) {
    document.getElementById("results").innerHTML = data.main.temp;
  });
}

const getWeatherData = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + key);
  try {
    // convert data to json format as required
    const data = await res.json();
    if (data.cod == 404) {
      // advise user if postal code is not valid
      window.alert("Please enter a valid postal code in Germany!");
    } else {
      return data;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export { handleSubmit };
