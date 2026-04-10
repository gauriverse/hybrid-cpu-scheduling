// Simulator Page - UI Interaction Logic

/**
 * Initialize the simulator page
 */
function initializeSimulator(){
    setupAlgorithmSelection();
    setupHybridSelection();
    setupHybridCombinations();
    setupProcessControls();
    setupRunButton();
}

/**
 * Setup click handlers for algorithm selector buttons
 */
function setupAlgorithmSelection(){
    const buttons = document.querySelectorAll('.algo-selector-btn');
    if(!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const algoKey = btn.dataset.algo;
            selectAlgorithm(algoKey);
        });
    });
}

/**
 * Handle algorithm selection
 * @param {string} algoKey - Selected algorithm key
 */
function selectAlgorithm(algoKey){

    // Save to state
    setSelectedAlgorithm(algoKey);
    resetSimulatorUI();
    // Update active button visually
    document.querySelectorAll('.algo-selector-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.algo-selector-btn[data-algo="${algoKey}"]`);
    if(activeBtn){
        activeBtn.classList.add('active');
    }

 const combinationsSection = document.getElementById('hybrid-combinations');

if(algoKey === 'hybrid'){
    if(combinationsSection){
        combinationsSection.removeAttribute('hidden');
    }
} else {
    if(combinationsSection){
        combinationsSection.setAttribute('hidden', '');
    }
}
updateConditionalFields(algoKey);
}

/**
 * Show or hide priority / time quantum fields
 * based on currently selected algorithm
 * @param {string} algoKey - Selected algorithm key
 */
function updateConditionalFields(algoKey){
    const priorityFields = document.querySelectorAll('.field-priority');
    const quantumFields  = document.querySelectorAll('.field-quantum');

    // Show priority if algorithm includes "priority"
    const needsPriority = algoKey === 'priority' || algoKey.includes('priority');
    
    priorityFields.forEach(field => {
        if(needsPriority){
            field.removeAttribute('hidden');
        } else {
            field.setAttribute('hidden', '');
        }
    });

    // Show quantum if algorithm includes "rr"
    const needsQuantum = algoKey === 'rr' || algoKey.includes('rr');

    quantumFields.forEach(field => {
        if(needsQuantum){
            field.removeAttribute('hidden');
        } else {
            field.setAttribute('hidden', '');
        }
    });
}

/**
 * Setup click handlers for hybrid option buttons
 */
function setupHybridSelection(){
    const buttons = document.querySelectorAll('.hybrid-option-btn');
    if(!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const hybridMode = btn.dataset.hybrid;
            selectHybridMode(hybridMode);
        });
    });
}

/**
 * Handle hybrid mode selection
 * @param {string} mode - 'time' or 'space'
 */
function selectHybridMode(mode){

    // Update active button visually
    document.querySelectorAll('.hybrid-option-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.hybrid-option-btn[data-hybrid="${mode}"]`);
    if(activeBtn){
        activeBtn.classList.add('active');
    }

    // Show combinations section
    const combinationsSection = document.getElementById('hybrid-combinations');
    const timeCombos          = document.getElementById('time-combos');
    const spaceCombos         = document.getElementById('space-combos');

    if(combinationsSection) combinationsSection.removeAttribute('hidden');

    // Show appropriate combo group based on mode
    if(mode === 'time'){
        if(timeCombos)  timeCombos.removeAttribute('hidden');
        if(spaceCombos) spaceCombos.setAttribute('hidden', '');
    } else if(mode === 'space'){
        if(spaceCombos) spaceCombos.removeAttribute('hidden');
        if(timeCombos)  timeCombos.setAttribute('hidden', '');
    }

    console.log(`Hybrid mode selected: ${mode}`);
}

/**
 * Setup click handlers for hybrid combination buttons
 */
function setupHybridCombinations(){
    const buttons = document.querySelectorAll('.hybrid-combo-btn');
    if(!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const combo = btn.dataset.combo;
            selectHybridCombination(combo);
        });
    });
}

/**
 * Handle hybrid combination selection
 * @param {string} combo - Combination key (e.g., 'priority-srtf', 'fcfs-sjf')
 */
function selectHybridCombination(combo){

    // Update active button visually
    document.querySelectorAll('.hybrid-combo-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.hybrid-combo-btn[data-combo="${combo}"]`);
    if(activeBtn){
        activeBtn.classList.add('active');
    }

    // Save to state with 'hybrid-' prefix
    const fullAlgo = `hybrid-${combo}`;
    setSelectedAlgorithm(fullAlgo);

    // Update input fields based on selected combination
    updateConditionalFields(fullAlgo);

    console.log(`Hybrid combination selected: ${fullAlgo}`);
}

/**
 * Setup add process button and wire remove on existing row
 */
function setupProcessControls(){
    const addBtn = document.getElementById('add-process-btn');
    if(addBtn){
        addBtn.addEventListener('click', addProcess);
    }

    // Wire remove button on the default first row
    wireRemoveButton(document.getElementById('process-row-1'));
}

/**
 * Dynamically create and append a new process row
 */
function addProcess(){
    incrementProcessCounter();
    const count  = getProcessCounter();
    const color  = getRandomColor();
    const algoKey = getSelectedAlgorithm();

    const row = document.createElement('div');
    row.className = 'process-row';
    row.id = `process-row-${count}`;

    row.innerHTML = `
        <span class="process-id">P${count}</span>
        <input type="number" class="process-input" placeholder="0" min="0" value="0" />
        <input type="number" class="process-input" placeholder="1" min="1" />
        <input type="number" class="process-input field-priority" placeholder="1" min="1" ${algoKey.includes('priority') ? '' : 'hidden'} />
        <input type="number" class="process-input field-quantum" placeholder="2" min="1" ${algoKey.includes('rr') ? '' : 'hidden'} />
        <input type="color" class="process-color" value="${color}" />
        <button class="btn-remove-process" data-row="${count}">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

    const container = document.getElementById('process-rows');
    if(container){
        container.appendChild(row);
    }

    wireRemoveButton(row);
}
function resetSimulatorUI(){

    // 1. Clear process rows
    const container = document.getElementById('process-rows');
    if(container){
        container.innerHTML = '';
    }

    // 2. Reset process counter (IMPORTANT)
    resetProcessCounter(); // (ye function hona chahiye tere state.js me)

    // 3. Add default first row
    addProcess();

    // 4. Hide results sections
    const ganttSection   = document.getElementById('gantt-section');
    const tableSection   = document.getElementById('table-section');
    const metricsSection = document.getElementById('metrics-section');

    if(ganttSection)   ganttSection.setAttribute('hidden', '');
    if(tableSection)   tableSection.setAttribute('hidden', '');
    if(metricsSection) metricsSection.setAttribute('hidden', '');
}
/**
 * Attach remove handler to a process row's remove button
 * @param {HTMLElement} row - The process row element
 */
function wireRemoveButton(row){
    if(!row) return;

    const removeBtn = row.querySelector('.btn-remove-process');
    if(removeBtn){
        removeBtn.addEventListener('click', () => {
            removeProcess(row);
        });
    }
}

/**
 * Remove a process row — keeps minimum of 1 row
 * @param {HTMLElement} row - The process row to remove
 */
function removeProcess(row){
    const container = document.getElementById('process-rows');
    if(!container) return;

    const allRows = container.querySelectorAll('.process-row');

    if(allRows.length <= 1){
        console.log('Cannot remove last process row');
        return;
    }

    row.remove();
}

/**
 * Wire the Run Simulation button
 */
function setupRunButton(){
    const runBtn = document.getElementById('run-btn');
    if(!runBtn) return;

    runBtn.addEventListener('click', handleRunSimulation);
}

/**
 * Collect process inputs, validate, run scheduler, render results
 */
function handleRunSimulation(){

    // Step 1 — Check algorithm is selected
    const algo = getSelectedAlgorithm();
    if(!algo){
        alert('Please select an algorithm first.');
        return;
    }

    // Step 2 — Collect and validate process rows
    const rows = document.querySelectorAll('.process-row');
    const collectedProcesses = [];
    let hasError = false;
    let globalQuantum = null; // Store one quantum value for all processes

    rows.forEach((row, index) => {
        const id = row.querySelector('.process-id').textContent.trim();
        const allInputs = row.querySelectorAll('.process-input');
        const at = parseInt(allInputs[0].value);
        const bt = parseInt(allInputs[1].value);
        const color = row.querySelector('.process-color').value;

        // Priority handling
        let priority = 0;
        if(algo.includes('priority')){
            const priorityInput = row.querySelector('.field-priority:not([hidden])');
            if(priorityInput){
                priority = parseInt(priorityInput.value);

                if(!isPositiveNumber(priority)){
                    priorityInput.style.borderColor = 'var(--color-error)';
                    hasError = true;
                } else {
                    priorityInput.style.borderColor = 'var(--color-border)';
                }
            }
        }

       // VALIDATION: Check for quantum mismatch if RR is selected
    if (algo.includes('rr')) {
        let firstQuantumValue = null;
        rows.forEach((row) => {
            const quantumInput = row.querySelector('.field-quantum:not([hidden])');
            if (quantumInput) {
                const val = parseInt(quantumInput.value);
                if (!isPositiveNumber(val)) {
                    quantumInput.style.borderColor = 'var(--color-error)';
                    hasError = true;
                } else {
                    quantumInput.style.borderColor = 'var(--color-border)';
                    if (firstQuantumValue === null) {
                        firstQuantumValue = val;
                        globalQuantum = val; // <--- UPDATE THE GLOBAL VARIABLE HERE
                    } else if (val !== firstQuantumValue) {
                        quantumInput.style.borderColor = 'var(--color-error)';
                        hasError = true;
                    }
                }
            }
        });
    }


        // Validate burst time
        if(!isPositiveNumber(bt)){
            allInputs[1].style.borderColor = 'var(--color-error)';
            hasError = true;
        } else {
            allInputs[1].style.borderColor = 'var(--color-border)';
        }

        // Validate arrival time
        if(!isNonNegativeNumber(at)){
            allInputs[0].style.borderColor = 'var(--color-error)';
            hasError = true;
        } else {
            allInputs[0].style.borderColor = 'var(--color-border)';
        }

        collectedProcesses.push({ id, at, bt, priority, color });
    });

    if(hasError){
        alert('Please fix invalid inputs before running the simulation.');
        return;
    }

    // Step 3 — Save to state
    clearProcesses();
    collectedProcesses.forEach(p => addProcessToState(p));

    // Step 4 — Run the scheduler with proper quantum
    const options = {};
    if(algo.includes('rr')){
        options.quantum = globalQuantum;
        console.log('Using quantum:', globalQuantum);
    }

    const results = runScheduler(algo, getProcesses(), options);

    if(!results){
        alert(`Algorithm "${algo}" is not yet implemented.`);
        return;
    }

    // Step 5 — Render results
    renderGantt(results.gantt);
    renderTable(results.processes);
    renderMetrics(results.avgTAT, results.avgWT, results.cpuEfficiency);

    // Step 6 — Reveal and scroll
    revealResultSections();
}

/**
 * Show gantt, table and metrics sections
 */
function revealResultSections(){
    const ganttSection   = document.getElementById('gantt-section');
    const tableSection   = document.getElementById('table-section');
    const metricsSection = document.getElementById('metrics-section');

    if(ganttSection)   ganttSection.removeAttribute('hidden');
    if(tableSection)   tableSection.removeAttribute('hidden');
    if(metricsSection) metricsSection.removeAttribute('hidden');

    if(ganttSection){
        ganttSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}