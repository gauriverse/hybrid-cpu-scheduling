/**
 * Initialize simulator page
 */

function initializeSimulator() {
  setupAlgorithmSelection();
  setupHybridSelection();
  setupHybridCombinations();
  setupProcessControls();
  setupRunButton();
}

/**
 * Setup click handlers for algorithm selector buttons
 */
function setupAlgorithmSelection() {
  const buttons = document.querySelectorAll(".algo-selector-btn");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const algoKey = btn.dataset.algo;
      selectAlgorithm(algoKey);
    });
  });
}

/**
 * Handle algorithm selection
 * @param {string} algoKey - Selected
 */
function selectAlgorithm(algoKey) {
  // Save to state
  setSelectedAlgorithm(algoKey);

  // Update
  document.querySelectorAll('.algo-selector-btn').forEach((btn) => {
    btn.classList.remove("active");
  });
  const activeBtn = document.querySelector(
    `.algo-selector-btn[data-algo="${algoKey}"]`,
  );
  if (activeBtn) {
    activeBtn.classList.add("active");
  }

  // Show hybrid options if hybrid selected, hide otherwise
  const hybridOptions = document.getElementById("hybrid-options");
  const combinationSection = document.getElementById("hybrid-combinations");
  const timeCombos = document.getElementById("time-combos");
  const spaceCombos = document.getElementById("space-combos");
  if (hybridOptions) {
    if (algoKey === "hybrid") {
      hybridOptions.removeAttribute("hidden");
    } else {
      hybridOptions.setAttribute("hidden", "");
      if (combinationSection) combinationSection.setAttribute("hidden", "");
    if (timeCombos) timeCombos.setAttribute("hidden", "");
    if (spaceCombos) spaceCombos.setAttribute("hidden", "");
    }
    
  }

  // Show/hide priority and quantum fields in process inputs
  updateConditionalFields(algoKey);

  console.log(`Algorithm selected: ${algoKey}`);
}

/**
 * Show or hide priority / time quantum fields
 * based on currently selected algorithm
 * @param {string} algoKey - Selected algorithm key
 */
function updateConditionalFields(algoKey) {
  const priorityFields = document.querySelectorAll(".field-priority");
  const quantumFields = document.querySelectorAll(".field-quantum");

  priorityFields.forEach((field) => {
    if (algoKey === "priority") {
      field.removeAttribute("hidden");
    } else {
      field.setAttribute("hidden", "");
    }
  });

  quantumFields.forEach((field) => {
    if (algoKey === "rr") {
      field.removeAttribute("hidden");
    } else {
      field.setAttribute("hidden", "");
    }
  });
}

/**
 * Setup click handlers for hybrid option buttons
 */

function setupHybridSelection() {
  const buttons = document.querySelectorAll(".hybrid-option-btn");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const hybridMode = btn.dataset.hybrid;
      selectHybridMode(hybridMode);
    });
  });
}

/**
 * Handle hybrid mode selection
 * @param {string} mode - 'time' or 'space'
 */

function selectHybridMode(mode) {
  document.querySelectorAll('.hybrid-option-btn').forEach((btn) => {
    btn.classList.remove('active');
  });

  const activeBtn = document.querySelector(`.hybrid-option-btn[data-hybrid="${mode}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  const combinationSection = document.getElementById('hybrid-combinations');
  const timeCombos = document.getElementById('time-combos');
  const spaceCombos = document.getElementById('space-combos');

  if(combinationSection) combinationSection.removeAttribute('hidden');

  if(mode == 'time'){
    if(timeCombos) timeCombos.removeAttribute('hidden');
    if(spaceCombos) spaceCombos.setAttribute('hidden','');
  }else if(mode === 'space'){
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

    // Update active button visually (only within visible group)
    document.querySelectorAll('.hybrid-combo-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.hybrid-combo-btn[data-combo="${combo}"]`);
    if(activeBtn){
        activeBtn.classList.add('active');
    }

    // Save to state with 'hybrid-' prefix
    setSelectedAlgorithm(`hybrid-${combo}`);

    console.log(`Hybrid combination selected: hybrid-${combo}`);
}

/**
 * Setup add process button and wire remove on existing row
 */

function setupProcessControls() {
  const addBtn = document.getElementById('add-process-btn');
  if (addBtn) {
    addBtn.addEventListener('click', addProcess);
  }

  wireRemoveButton(document.getElementById('process-row-1'));
}

/**
 * Dynamically create and append a new process row
 */

function addProcess() {
  incrementProcessCounter();
  const count = getProcessCounter();
  const color = getRandomColor();
  const algoKey = getSelectedAlgorithm();

  const row = document.createElement("div");
  row.className = 'process-row';
  row.id = `process-row-${count}`;

  row.innerHTML = `
        <span class="process-id">P${count}</span>
        <input type="number" class="process-input" placeholder="0" min="0" value="0" />
        <input type="number" class="process-input" placeholder="1" min="1" />
        <input type="number" class="process-input field-priority" placeholder="1" min="1" ${algoKey === "priority" ? "" : "hidden"} />
        <input type="number" class="process-input field-quantum" placeholder="2" min="1" ${algoKey === "rr" ? "" : "hidden"} />
        <input type="color" class="process-color" value="${color}" />
        <button class="btn-remove-process" data-row="${count}">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

  // Append row to container
  const container = document.getElementById("process-rows");
  if (container) {
    container.appendChild(row);
  }

  // Wire its remove button
  wireRemoveButton(row);
}

/**
 * Attach remove handler to a process row's remove button
 * @param {HTMLElement} row - The process row element
 */
function wireRemoveButton(row) {
  if (!row) return;

  const removeBtn = row.querySelector(".btn-remove-process");
  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      removeProcess(row);
    });
  }
}

/**
 * Remove a process row — keeps minimum of 1 row
 * @param {HTMLElement} row - The process row element to remove
 */
function removeProcess(row) {
  const container = document.getElementById("process-rows");
  if (!container) return;

  const allRows = container.querySelectorAll(".process-row");

  // Do not remove if only one row remains
  if (allRows.length <= 1) {
    console.log("Cannot remove last process row");
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
 * Collect process inputs, valdate and revea; result sections
 */

function handleRunSimulation(){
    const algo = getSelectedAlgorithm();
    if(!algo){
        alert('Pleae select an algorithm first.');
        return;
    }

    const rows = document.querySelectorAll('.process-row');
    const collectedProcesses = [];
    let hasError = false;

    rows.forEach(row => {
        const id = row.querySelector('.process-id').textContent.trim();
        const inputs  = row.querySelectorAll('.process-input:not([hidden])');
        const at      = parseInt(inputs[0].value);
        const bt      = parseInt(inputs[1].value);
        const color   = row.querySelector('.process-color').value;

        // Burst Time must be positive
        if(!isPositiveNumber(bt)){
            inputs[1].style.borderColor = 'var(--color-error)';
            hasError = true;
        }
        else{
            inputs[1].style.borderColor = 'var(--color-border)';
        }

        // Arrival time must be non-negative
        if(!isNonNegativeNumber(at)){
            inputs[0].style.borderColor = 'var(--color-error)';
            hasError = true;
        } else {
            inputs[0].style.borderColor = 'var(--color-border)';
        }

        collectedProcesses.push({ id, at, bt, color });
    });

    if(hasError){
        alert('Please fix invalid inputs before running the simulation.');
        return;
    }

    
    // Save collected processes to state
    clearProcesses();
    collectedProcesses.forEach(p => addProcessToState(p));

    console.log('Processes ready for simulation:', getProcesses());
    console.log('Algorithm:', algo);

    // Reveal result sections
    revealResultSections();
}

/**
 * Show gantt, table and metrics sections after simulation runs
 */
function revealResultSections(){
    const ganttSection   = document.getElementById('gantt-section');
    const tableSection   = document.getElementById('table-section');
    const metricsSection = document.getElementById('metrics-section');

    if(ganttSection)   ganttSection.removeAttribute('hidden');
    if(tableSection)   tableSection.removeAttribute('hidden');
    if(metricsSection) metricsSection.removeAttribute('hidden');

    // Scroll smoothly to gantt chart
    if(ganttSection){
        ganttSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}