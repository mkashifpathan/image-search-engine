const accessKey = "J2A4kI-A6EHlUTXFTJpEQhB8i_5cWKAaRPtx2fwHBFc";

const form = document.querySelector("form");
const searchInp = document.querySelector("input");
const searchResult = document.querySelector(".search-result");
const showMoreBtn = document.querySelector(".show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchInp.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json(); 
    const results = data.results; 
    
    if (page === 1) {
        searchResult.innerHTML = "";
    }

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });

    if (results.length > 0) {
        showMoreBtn.style.display = "block";
    } else {
        showMoreBtn.style.display = "none";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1; 
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++; 
    searchImages();
});