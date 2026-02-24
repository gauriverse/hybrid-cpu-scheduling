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
        case 'srtf':
            return runSRTF(processes);
        case 'sjf':
            return runSJF(processes);
        case 'priority':
            return runPriority(processes);
        case 'rr':
            return runRR(processes,options.quantum || 2);
            

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
//   SJF — Shortest Job First
// =============================================

/**
 * Run Non-Preemptive SJF scheduling
 * @param {Array} rawProcesses - Array of { id, at, bt, color }
 * @returns {Object} { processes, gantt, avgTAT, avgWT, cpuEfficiency }
 */
function runSJF(rawProcesses){

    // Deep copy and add done flag
    const processes = rawProcesses.map(p => ({
        ...p,
        done: false,
        ct: 0,
        tat: 0,
        wt: 0
    }));

    let time      = 0;
    let completed = 0;
    const n       = processes.length;
    const gantt   = [];

    // Loop until all processes complete
    while(completed < n){

        // Find available processes (arrived and not done yet)
        const available = processes
            .filter(p => p.at <= time && !p.done)
            .sort((a, b) => a.bt - b.bt); // Sort by burst time (shortest first)

        // If no process available — CPU is IDLE
        if(available.length === 0){
            gantt.push({
                id: 'IDLE',
                start: time,
                end: time + 1,
                color: null
            });
            time++;
            continue;
        }

        // Get shortest job
        const current = available[0];

        // Add gantt block for this process
        gantt.push({
            id: current.id,
            start: time,
            end: time + current.bt,
            color: current.color
        });

        // Execute to completion (non-preemptive)
        current.ct   = time + current.bt;
        current.tat  = current.ct - current.at;
        current.wt   = current.tat - current.bt;
        current.done = true;

        time = current.ct;
        completed++;
    }

    // Calculate averages
    const totalTAT = processes.reduce((sum, p) => sum + p.tat, 0);
    const totalWT  = processes.reduce((sum, p) => sum + p.wt, 0);
    const avgTAT   = totalTAT / n;
    const avgWT    = totalWT / n;

    // CPU Efficiency
    const totalBurst     = processes.reduce((sum, p) => sum + p.bt, 0);
    const totalTime      = time;
    const cpuEfficiency  = ((totalBurst / totalTime) * 100).toFixed(2);

    // Clean up done flag before returning
    processes.forEach(p => delete p.done);

    return {
        processes,
        gantt,
        avgTAT: avgTAT.toFixed(2),
        avgWT:  avgWT.toFixed(2),
        cpuEfficiency
    };
}



// =============================================
//   SRTF — Shortest Remaining Time First
// =============================================

/**
 * Run Preemptive SRTF scheduling
 * @param {Array} rawProcesses - Array of { id, at, bt, color }
 * @returns {Object} { processes, gantt, avgTAT, avgWT, cpuEfficiency }
 */
function runSRTF(rawProcesses){

    // Deep copy and add remaining time tracker
    const processes = rawProcesses.map(p => ({
        ...p,
        remaining: p.bt,
        ct: 0,
        tat: 0,
        wt: 0
    }));

    let time      = 0;
    let completed = 0;
    const n       = processes.length;
    const gantt   = [];
    let lastProcess = null;

    // Loop until all processes complete
    while(completed < n){

        // Find all processes that have arrived and still have work remaining
        const available = processes
            .filter(p => p.at <= time && p.remaining > 0)
            .sort((a, b) => a.remaining - b.remaining);

        // If no process available — CPU is IDLE
        if(available.length === 0){
            // Track idle time in gantt
            if(lastProcess !== 'IDLE'){
                gantt.push({
                    id: 'IDLE',
                    start: time,
                    end: time + 1,
                    color: null
                });
                lastProcess = 'IDLE';
            } else {
                // Extend last idle block
                gantt[gantt.length - 1].end = time + 1;
            }
            time++;
            continue;
        }

        // Get process with shortest remaining time
        const current = available[0];

        // If switching to a different process — start new gantt block
        if(lastProcess !== current.id){
            gantt.push({
                id: current.id,
                start: time,
                end: time + 1,
                color: current.color
            });
            lastProcess = current.id;
        } else {
            // Same process continuing — extend its gantt block
            gantt[gantt.length - 1].end = time + 1;
        }

        // Execute for 1 time unit
        current.remaining--;
        time++;

        // Check if process completed
        if(current.remaining === 0){
            current.ct  = time;
            current.tat = current.ct - current.at;
            current.wt  = current.tat - current.bt;
            completed++;
        }
    }

    // Calculate averages
    const totalTAT = processes.reduce((sum, p) => sum + p.tat, 0);
    const totalWT  = processes.reduce((sum, p) => sum + p.wt, 0);
    const avgTAT   = totalTAT / n;
    const avgWT    = totalWT / n;

    // CPU Efficiency
    const totalBurst     = processes.reduce((sum, p) => sum + p.bt, 0);
    const totalTime      = time;
    const cpuEfficiency  = ((totalBurst / totalTime) * 100).toFixed(2);

    // Remove 'remaining' property before returning
    processes.forEach(p => delete p.remaining);

    return {
        processes,
        gantt,
        avgTAT: avgTAT.toFixed(2),
        avgWT:  avgWT.toFixed(2),
        cpuEfficiency
    };
}


// =============================================
//   Priority Scheduling
// =============================================

/**
 * Run Non-Preemptive Priority Scheduling
 * Lower priority number = Higher priority
 * @param {Array} rawProcesses - Array of { id, at, bt, priority, color }
 * @returns {Object} { processes, gantt, avgTAT, avgWT, cpuEfficiency }
 */
function runPriority(rawProcesses){

    // Deep copy and add done flag
    const processes = rawProcesses.map(p => ({
        ...p,
        done: false,
        ct: 0,
        tat: 0,
        wt: 0
    }));

    let time      = 0;
    let completed = 0;
    const n       = processes.length;
    const gantt   = [];

    // Loop until all processes complete
    while(completed < n){

        // Find available processes (arrived and not done yet)
        const available = processes
            .filter(p => p.at <= time && !p.done)
            .sort((a, b) => a.priority - b.priority); // Sort by priority (lower = higher priority)

        // If no process available — CPU is IDLE
        if(available.length === 0){
            gantt.push({
                id: 'IDLE',
                start: time,
                end: time + 1,
                color: null
            });
            time++;
            continue;
        }

        // Get highest priority process
        const current = available[0];

        // Add gantt block for this process
        gantt.push({
            id: current.id,
            start: time,
            end: time + current.bt,
            color: current.color
        });

        // Execute to completion (non-preemptive)
        current.ct   = time + current.bt;
        current.tat  = current.ct - current.at;
        current.wt   = current.tat - current.bt;
        current.done = true;

        time = current.ct;
        completed++;
    }

    // Calculate averages
    const totalTAT = processes.reduce((sum, p) => sum + p.tat, 0);
    const totalWT  = processes.reduce((sum, p) => sum + p.wt, 0);
    const avgTAT   = totalTAT / n;
    const avgWT    = totalWT / n;

    // CPU Efficiency
    const totalBurst     = processes.reduce((sum, p) => sum + p.bt, 0);
    const totalTime      = time;
    const cpuEfficiency  = ((totalBurst / totalTime) * 100).toFixed(2);

    // Clean up done flag before returning
    processes.forEach(p => delete p.done);

    return {
        processes,
        gantt,
        avgTAT: avgTAT.toFixed(2),
        avgWT:  avgWT.toFixed(2),
        cpuEfficiency
    };
}


// =============================================
//   Round Robin
// =============================================

/**
 * Run Preemptive Round Robin scheduling
 * @param {Array} rawProcesses - Array of { id, at, bt, color }
 * @param {number} quantum - Time quantum for each process
 * @returns {Object} { processes, gantt, avgTAT, avgWT, cpuEfficiency }
 */
function runRR(rawProcesses, quantum){
    // Check if any process has its own quantum defined
    const differentQuantumFound = rawProcesses.some(p => 
        p.quantum !== undefined && p.quantum !== quantum
    );

    if(differentQuantumFound){
        alert("Error: Round Robin requires SAME time quantum for all processes.");
        return null; // stop execution
    }

    if(quantum <= 0){
        alert("Error: Time Quantum must be greater than 0.");
        return null;
    }

    // Deep copy and add remaining time tracker
    const processes = rawProcesses.map(p => ({
        ...p,
        remaining: p.bt,
        ct: 0,
        tat: 0,
        wt: 0
    }));

    const queue     = [];
    let time        = 0;
    let completed   = 0;
    const n         = processes.length;
    const gantt     = [];
    const arrived   = new Set(); // Track which processes have been added to queue

    while(completed < n){

        // Add processes that arrive exactly at current time to queue
        processes.forEach(p => {
            if(p.at === time && !arrived.has(p.id)){
                queue.push(p);
                arrived.add(p.id);
            }
        });

        // If queue is empty — CPU is IDLE
        if(queue.length === 0){
            gantt.push({
                id: 'IDLE',
                start: time,
                end: time + 1,
                color: null
            });
            time++;
            continue;
        }

        // Get next process from queue
        const current = queue.shift();

        // Execute for time quantum or remaining time, whichever is smaller
        const execTime = Math.min(quantum, current.remaining);
        
        // Add gantt block
        gantt.push({
            id: current.id,
            start: time,
            end: time + execTime,
            color: current.color
        });

        current.remaining -= execTime;
        time += execTime;

        // Add any processes that arrived during execution to queue
        processes.forEach(p => {
            if(p.at > time - execTime && p.at <= time && !arrived.has(p.id)){
                queue.push(p);
                arrived.add(p.id);
            }
        });

        // If current process still has work remaining — add back to queue
        if(current.remaining > 0){
            queue.push(current);
        } else {
            // Process completed
            current.ct  = time;
            current.tat = current.ct - current.at;
            current.wt  = current.tat - current.bt;
            completed++;
        }
    }

    // Calculate averages
    const totalTAT = processes.reduce((sum, p) => sum + p.tat, 0);
    const totalWT  = processes.reduce((sum, p) => sum + p.wt, 0);
    const avgTAT   = totalTAT / n;
    const avgWT    = totalWT / n;

    // CPU Efficiency
    const totalBurst     = processes.reduce((sum, p) => sum + p.bt, 0);
    const totalTime      = time;
    const cpuEfficiency  = ((totalBurst / totalTime) * 100).toFixed(2);

    // Clean up remaining property before returning
    processes.forEach(p => delete p.remaining);

    return {
        processes,
        gantt,
        avgTAT: avgTAT.toFixed(2),
        avgWT:  avgWT.toFixed(2),
        cpuEfficiency
    };
}



/**
 * Run Hybrid scheduling
 * @param {Array} processes
 * @param {string} mode - 'time' or 'space'
 */
function runHybrid(processes, mode){
    // TODO: implement
}


