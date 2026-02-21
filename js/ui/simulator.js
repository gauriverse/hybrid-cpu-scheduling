/**
 * Initialize simulator page
 */

function initializeSimulator() {
  setupAlgorithmSelection();
  setupHybridSelection();
  setupProcessControls();
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
  if (hybridOptions) {
    if (algoKey === "hybrid") {
      hybridOptions.removeAttribute("hidden");
    } else {
      hybridOptions.setAttribute("hidden", "");
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

  setSelectedAlgorithm(`hybrid-${mode}`);

  console.log(`Hybrid mode selected: ${mode}`);
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
