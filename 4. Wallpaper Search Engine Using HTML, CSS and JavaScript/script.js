const accessKey = "3LM_0TxF8rSVt1zkAqh_FyJCiJS9OIJnBZIxThv9SVY";
const searchForm = document.getElementById("search-feild");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");


let keyword = "";
let page = 1;

async function searchImage() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResult.innerHTML = "";   // used to clear privious result from search feild
        
    }

    const  results = data.results

    results.map((result) => {   // images are displayed using this function
        const image = document.createElement("img")
        image.src = result.urls.small;
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html;
        imageLink.target = "_blank";  // opens link in new tab

        imageLink.appendChild(image);

        searchResult.appendChild(imageLink);

    })
    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImage();
})

showMoreBtn.addEventListener("click", () => {  // used for Show more result to work
    page++;
    searchImage();
})