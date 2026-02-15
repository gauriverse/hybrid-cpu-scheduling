/**
 * Show algorithm detail modal
 * @param {string} algoKey - Algorithm key
 */

// =========== SHOW MODAL ==========
function showAlgorithmModal(algoKey){
    const algo = ALGORITHMS[algoKey];
    if(!algo)
        return;

    const modal = document.getElementById('algorithmModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = algo.name;

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    modalBody.innerHTML = `
        <div class="modal-section">
            <h4 class="modal-section-title">Description</h4>
            <p class="modal-section-content">${algo.description}</p>
        </div>

        <div class="modal-section">
            <h4 class="modal-section-title">Algorithm Steps</h4>
            <ul class="modal-list">
                ${algo.algorithm.map(step => `<li>${step}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-section">
            <h4 class="modal-section-title">Complexity Analysis</h4>
            <div class="complexity-grid">
                <div class="complexity-item">
                    <div class="complexity-label">Best Case</div>
                    <div class="complexity-value">${algo.timeComplexity.best}</div>
                </div>
                <div class="complexity-item">
                    <div class="complexity-label">Average Case</div>
                    <div class="complexity-value">${algo.timeComplexity.average}</div>
                </div>
                <div class="complexity-item">
                    <div class="complexity-label">Worst Case</div>
                    <div class="complexity-value">${algo.timeComplexity.worst}</div>
                </div>
                <div class="complexity-item">
                    <div class="complexity-label">Space</div>
                    <div class="complexity-value">${algo.spaceComplexity}</div>
                </div>
            </div>
        </div>
        
        <div class="modal-section">
            <h4 class="modal-section-title">Advantages</h4>
            <ul class="modal-list">
                ${algo.advantages.map(adv => `<li>${adv}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h4 class="modal-section-title">Disadvantages</h4>
            <ul class="modal-list">
                ${algo.disadvantages.map(dis => `<li>${dis}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h4 class="modal-section-title">Real-Life Example</h4>
            <p class="modal-section-content">${algo.realLifeExample}</p>
        </div>
    `;

    modal.removeAttribute('hidden');
    document.body.style.overflow='hidden';
}

// =========== CLOSE MODAL ==========
    function closeAlgorithmModal(){
        const modal = document.getElementById('algorithmModal');
        modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    }

// ========== INITIALIZE MODAL ==========
function initializeModal(){
    const closeBtn = document.getElementById('modalClose');
    const overlay = document.getElementById('modalOverlay');

    if(closeBtn){
        closeBtn.addEventListener('click', closeAlgorithmModal);
    }
    
    if(overlay){
        overlay.addEventListener('click', closeAlgorithmModal);
    }
}