const accessKey = "j8XLv7kBwHSRZP_vS8RTdQMaqb2a3f5CjI9V38MfkFA"

const formEl = document.querySelector("form")

const searchInpEl = document.getElementById("search-inp")

const searchResultsEl = document.querySelector(".search-results")

const showMoreEl = document.getElementById("show-more-btn")


let inputData = "";
let page = 1;


async function searchImages(){
    inputData = searchInpEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (page === 1) {
        searchResultsEl.innerHTML = "";
    }

    const results = data.results;

    results.map((result)=>{
        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img")
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultsEl.appendChild(imageWrapper);
    });

    page++;

    

    if(page > 1) {
        showMoreEl.style.display = "block";
    }
    
    
    
    
}


formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    page = 1;
    searchImages();
})

showMoreEl.addEventListener("click", () => {
    searchImages();
});