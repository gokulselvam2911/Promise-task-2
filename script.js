document.getElementById('search-button').addEventListener('click', async () => {
    const word = document.getElementById('word-input').value.trim();
    if (word) {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!response.ok) throw new Error('Word not found');
            
            const data = await response.json();
            displayDefinitions(data);
        } catch (error) {
            document.getElementById('definitions').innerHTML = `<div class="alert alert-danger" role="alert">${error.message}</div>`;
        }
    } else {
        alert('Please enter a word.');
    }
});

function displayDefinitions(data) {
    const definitionsDiv = document.getElementById('definitions');
    definitionsDiv.innerHTML = ''; 

    const meanings = data[0].meanings;

    meanings.forEach(meaning => {
        meaning.definitions.forEach(def => {
            definitionsDiv.innerHTML += `
                <div class="card definition-card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${data[0].word}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${meaning.partOfSpeech}</h6>
                        <p class="card-text">${def.definition}</p>
                    </div>
                </div>
            `;
        });
    });
}
