// Simulator State Management

let processes = [];
let selectedAlgorithm = null;
let processCounter = 1;

/**
 * Get current list of process
 * @returns {Array} processes array
 */
function getProcesses(){
    return processes;
}

/**
 * Add a process to the list
 * @param {Object} process - Process object to add
 */
function addProcessToState(process){
    processes.push(process);
}

/**
 * Clear all processes
 */
function clearProcesses(){
    processes = [];
}

/**
 * Get selected algorithm
 * @returns {string} selected algorithm key
 */
function getSelectedAlgorithm(){
    return selectedAlgorithm;
}

/**
 * Set selected algorithm
 * @param {string} algoKey - Algorithm key to set
 */
function setSelectedAlgorithm(algoKey){
    selectedAlgorithm = algoKey;
}

/**
 * Get current process counter value
 * @returns {number} current counter
 */
function getProcessCounter(){
    return processCounter;
}

/**
 * Increment process counter by 1
 */
function incrementProcessCounter(){
    processCounter++;
}

/**
 * Reset process counter to 1
 */
function resetProcessCounter(){
    processCounter = 1;
}