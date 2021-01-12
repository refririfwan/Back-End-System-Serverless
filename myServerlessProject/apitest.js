const searchButton = document.querySelector('.search-button')
searchButton.addEventListener('click', async function(){
    try {
        const inputKeyword = document.querySelector('.input-keyword')
        const data = await getData(inputKeyword.value);
        updateUI(data);
    } catch (err){
        alert(err)
    }
});

function getData(keyword){
    return fetch('URL' + keyword, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'KEY',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error(response.statusText)
        } else {
            return response.json()
        }
    })
    .then(response => {
        if(response.Response === "False"){
            throw new Error(response.Error)
        } else {
            return response;
        }
    })
}

function updateUI(data){
    const cards = showCards(data);
    const dataContainer = document.querySelector('.data-container')
    dataContainer.innerHTML = cards
}

function showCards(m) {
    return `
            <div class="col-md-4 my-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${m.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.age}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">${m.job}</h6>
                    </div>
                </div>
            </div>
        `;
}
