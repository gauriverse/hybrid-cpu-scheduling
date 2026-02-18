/**
 * Initialize simulator page
 */

function initializeSimulator(){
    setupAlgorithmSelection();
}

/**
 * Setup click handlers for algorithm selector buttons
 */
function setupAlgorithmSelection(){
    const buttons = document.querySelectorAll('.algo-selector-btn');
    if(!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click',() => {
            const algoKey = btn.dataset.algo;
            selectAlgorithm(algoKey);
        });
    });
}

/**
 * Handle algorithm selection
 * @param {string} algoKey - Selected
 */
function selectAlgorithm(algoKey){
    // Save to state
    setSelectedAlgorithm(algoKey);

    // Update 
    document.querySelectorAll('.algo-selector-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.algo-selector-btn[data-algo="${algoKey}]`);
    if(activeBtn){
        activeBtn.classList.add('active');
    }

    // Show hybrid options if hybrid selected, hide otherwise
    const hybridOptions = document.getElementById('hybrid-options');
    if(hybridOptions){
        if(algoKey === 'hybrid'){
            hybridOptions.removeAttribute('hidden');
        } else {
            hybridOptions.setAttribute('hidden', '');
        }
    }

    // Show/hide priority and quantum fields in process inputs
    updateConditionalFields(algoKey);

    console.log(`Algorithm selected: ${algoKey}`)
}

/**
 * Show or hide priority / time quantum fields
 * based on currently selected algorithm
 * @param {string} algoKey - Selected algorithm key
 */
function updateConditionalFields(algoKey){
    const priorityFields = document.querySelectorAll('.field-priority');
    const quantumFields = document.querySelectorAll('.field-quantum');

    priorityFields.forEach(field => {
        if(algoKey === 'priority'){
            field.removeAttribute('hidden');
        }
        else{
            field.setAttribute('hidden','');
        }
    });

    quantumFields.forEach(field => {
        if(algoKey === 'rr'){
            field.removeAttribute('hidden');
        }
        else{
            field.setAttribute('hidden','');
        }
    });
}