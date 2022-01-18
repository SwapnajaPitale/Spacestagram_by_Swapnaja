// Loading Animation
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
});

// Toggle Like
function toggleLike(x) {
  x.classList.toggle("fa-heart");
}

//Get APOD from NASA API
function sendHTTPRequest(method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status >= 300) {
        reject(`Error, status code ${xhr.status}: ${xhr.statusText}`);
      } else {
        let data = JSON.parse(xhr.response);
        resolve(data);
      }
    };
    xhr.open(method, url);
    xhr.send();
  });
}

async function getAPOD() {
  let response = await sendHTTPRequest(
    "GET",
    "https://api.nasa.gov/planetary/apod?api_key=DXqVFrcdSgOsOyCmeGDspbGnLHqrXI4U2EqAfZNG"
  );
  console.log(response);
  let photoOfToday = response.url;
  let title = response.title;
  let date = response.date;
  let explanation = response.explanation;
  let mediaType = response["media_type"];
  let copyright = response.copyright;
  let copyrightResp;

  // if copyright is not null,
  if (copyright !== null) {
    copyrightResp = `Copyright: ${copyright} ©`;
  }

  // If media type is image condition here
  if (mediaType === "image") {
    document.getElementById(
      "cardImg"
    ).innerHTML = `<img class="card-img-top" src=${photoOfToday} alt=${title} id='photoOfToday'>`;
  } else if (mediaType === "video") {
    document.getElementById(
      "cardImg"
    ).innerHTML = `<iframe class="card-img-top" src=${photoOfToday} alt=${title} id='photoOfToday'></iframe>`;
  } else {
    document.getElementById(
      "cardImg"
    ).innerHTML = `<p>Unsupported media type</p>`;
  }

  document.getElementById(
    "card-body"
  ).innerHTML = `<h4 class="card-title" id='card-title'>${title}</h4>
 <p class='card-date' id='card-date'>${date}</p>      
 <p class="card-text" id='explanation'>${explanation}</p>
 <p id='copyright'>${copyrightResp}</p>
`;
  document.getElementById(
    "imgUrl"
  ).innerHTML = `<a href=${photoOfToday} target='_blank'>${photoOfToday}</a>`;
}
getAPOD();
