function searchRecommendation() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const listName = Object.keys(data).find(item => item.toLowerCase() === input);
            if (listName) {
                data[listName].map((item) => {
                    const name = item.name;
                    const description = item.description;
                    console.log('name: ', name)
                    console.log('description: ', description)
                    resultDiv.innerHTML += `<h2>${name}</h2>`;
                    // resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

                    resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${description}</p>`;
                })
            } else {
                resultDiv.innerHTML = 'List not found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}
btnSearch = document.getElementById('btnSearch')
btnSearch.addEventListener('click', searchRecommendation);