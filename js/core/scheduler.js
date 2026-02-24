/**
 * Run the selected scheduling algorithm
 * @param {string} algorithm - Algorithm key
 * @param {Array} processes - Array of process
 * @param {Object} options -Additional options
 * @returns {Object} Simulation results
 */

function runScheduler(algorithm, processes, options = {}){
    // TODO: implement scheduling logic
    console.log(`Running ${algorithm} with`, processes);
}

/**
 * Calculate completion time for each process
 * @param {Array} schedule - Scheduled process order
 * @returns {Array} Processes with completion times
 */
function calculateCompletionTime(schedule){
    // TODO: implement
}

/**
 * Calculate turnaround time for each process
 * CT - AT = TAT
 * @param {Array} processes - Processes with completion times
 * @returns {Array} Processes with turnaround times
 */
function calculateTurnaroundTime(processes){
    // TODO: implement
}

/**
 * Calculate waiting time for each process
 * TAT - BT = WT
 * @param {Array} processes - Processes with turnaround times
 * @returns {Array} Processes with waiting times
 */
function calculateWaitingTime(processes){
    // TODO: implement
}

/**
 * Calculate average turnaround time
 * @param {Array} processes - Processes with TAT values
 * @returns {number} Average TAT
 */
function calculateAvgTAT(processes){
    // TODO: implement
}

/**
 * Calculate average waiting time
 * @param {Array} processes - Processes with WT values
 * @returns {number} Average WT
 */
function calculateAvgWT(processes){
    // TODO: implement
}

/**
 * Calculate CPU efficiency
 * @param {Array} processes - All processes
 * @param {number} totalTime - Total simulation time
 * @returns {number} CPU efficiency percentage
 */
function calculateCPUEfficiency(processes, totalTime){
    // TODO: implement
}





// Core Scheduler Module

/**
 * Run the selected scheduling algorithm
 * @param {string} algorithm - Algorithm key (fcfs, sjf, srtf, rr, priority, hybrid)
 * @param {Array} processes - Array of process objects
 * @param {Object} options - Additional options (e.g. timeQuantum)
 * @returns {Object} Simulation results
 */
function runScheduler(algorithm, processes, options = {}){
    switch(algorithm){
        case 'fcfs':
            return runFCFS(processes);

        // Other algorithms will be added in future commits
        default:
            console.warn(`Algorithm "${algorithm}" not yet implemented.`);
            return null;
    }
}

// =============================================
//   FCFS — First Come First Serve
// =============================================

/**
 * Run Non-Preemptive FCFS scheduling
 * @param {Array} rawProcesses - Array of { id, at, bt, color }
 * @returns {Object} { processes, gantt, avgTAT, avgWT, cpuEfficiency }
 */
function runFCFS(rawProcesses){

    // Deep copy so we never mutate the original input
    const processes = rawProcesses.map(p => ({ ...p }));

    // Step 1 — Sort by arrival time
    processes.sort((a, b) => a.at - b.at);

    let time     = 0;
    let totalTAT = 0;
    let totalWT  = 0;
    const gantt  = [];

    // Step 2 — Process each job in arrival order
    processes.forEach(p => {

        // If CPU is idle between last job and this arrival — record IDLE block
        if(time < p.at){
            gantt.push({
                id: 'IDLE',
                start: time,
                end: p.at,
                color: null
            });
            time = p.at;
        }

        // Record gantt block for this process
        gantt.push({
            id: p.id,
            start: time,
            end: time + p.bt,
            color: p.color
        });

        // Calculate times
        p.ct  = time + p.bt;       // Completion Time
        p.tat = p.ct - p.at;       // Turnaround Time = CT - AT
        p.wt  = p.tat - p.bt;      // Waiting Time    = TAT - BT

        time      = p.ct;
        totalTAT += p.tat;
        totalWT  += p.wt;
    });

    // Step 3 — Calculate averages
    const avgTAT = totalTAT / processes.length;
    const avgWT  = totalWT  / processes.length;

    // Step 4 — CPU Efficiency
    // Total burst time / total time elapsed * 100
    const totalBurst     = processes.reduce((sum, p) => sum + p.bt, 0);
    const totalTime      = time;
    const cpuEfficiency  = ((totalBurst / totalTime) * 100).toFixed(2);

    return {
        processes,
        gantt,
        avgTAT: avgTAT.toFixed(2),
        avgWT:  avgWT.toFixed(2),
        cpuEfficiency
    };
}

// =============================================
//   PLACEHOLDERS — coming in future commits
// =============================================

/**
 * Run SJF scheduling
 * @param {Array} processes
 */
function runSJF(processes){
    // TODO: implement
}

/**
 * Run SRTF scheduling
 * @param {Array} processes
 */
function runSRTF(processes){
    // TODO: implement
}

/**
 * Run Round Robin scheduling
 * @param {Array} processes
 * @param {number} quantum
 */
function runRR(processes, quantum){
    // TODO: implement
}

/**
 * Run Priority scheduling
 * @param {Array} processes
 */
function runPriority(processes){
    // TODO: implement
}

/**
 * Run Hybrid scheduling
 * @param {Array} processes
 * @param {string} mode - 'time' or 'space'
 */
function runHybrid(processes, mode){
    // TODO: implement
}
