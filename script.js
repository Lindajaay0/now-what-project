'use strict';

/*Tastedive API */
const apiKey1 = "347735-NowWhat-507JHMJA";

const searchUrl1 = "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar";

function contentType() {
  let searchList = document.getElementById("#content-type");
  document.getElementById("Type").value=searchList.options[searchList.selectIndex].text;
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encondeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join('&');
}

function getRecommendations(query, contentType, maxResults=15) {
  const tasteDiveParams = {
    k: apiKey1,
    q: query,
    type: contentType,
    verbose: 1,
    info: 1
  };
  const queryString = $.param(tasteDiveParams);
  const url = searchUrl1 + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults
    (responseJson))
    .catch(err => {
      console.log(err);
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(data) {
  console.log(data);
  const similar = data.Similar.Results;
  $('#results-list').empty();
  for (let i = 0; i < similar.length; i++) {
    $('#results-list').append(
      `<li><h3>${similar[i].Name}</h3><h3>${similar[i].Type}</h3>
        <div class="line"></div>
        <a href="${similar[i].wUrl}" target="_blank"><h4><i class="fas fa-chevron-right"></i>Learn more
        </h4></a>
        <a href="${similar[i].yUrl}" target="_blank"><h4><i class="fas fa-chevron-right"></i>Youtube
        </h4></a>
    </li>`
    );
  }
  $('#results').removeClass('hidden');
}

function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const contentType = $('#content-type').val();
    getRecommendations(searchTerm, contentType)
  });
}

$(watchForm);