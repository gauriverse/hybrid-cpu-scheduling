// Rendering Module - Generate algorithm cards on homepage

/**
 * Render algorithm cards in the grid
 */
function renderAlgorithmCards(){
    const grid = document.getElementById('algorithmGrid');
    if(!grid)
        return;

    grid.innerHTML = Object.entries(ALGORITHMS).map(([key, algo]) => 
        `<article class="algo-card" data-algo="${key}">
            <h3 class="algo-card-title">${algo.name}</h3>
            <p class="algo-card-description">${algo.description}</p>
        </article>`
    ).join('');

    // Attach click handlers to cards
    grid.querySelectorAll('.algo-card').forEach(card => {
        card.addEventListener('click', () => {
            const algoKey = card.dataset.algo;
            showAlgorithmModal(algoKey);
        });
    });
}