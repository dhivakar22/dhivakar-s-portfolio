let inputEl = document.getElementById("searchInput");
let resultEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResults(result) {

    let {
        link,
        title,
        description
    } = result;

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    let paraBreakEl = document.createElement("br");
    resultItemEl.appendChild(paraBreakEl);

    let descriptionEl = document.createElement("a");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

    resultEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResults(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        resultEl.textContent = "";

        let searchInputVal = inputEl.value;
        let requestUrl = "https://apis.ccbp.in/wiki-search?search=" + searchInputVal;
        let options = {
            method: "GET",
        }
        fetch(requestUrl, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });

    }
}

inputEl.addEventListener("keydown", searchWikipedia);