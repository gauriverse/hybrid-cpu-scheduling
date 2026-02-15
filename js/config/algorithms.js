// Contains all algorithm data and process information

const ALGORITHMS = {
    // ===================== FCFS =====================
  fcfs: {
    name: "First Come First Serve (FCFS)",
    shortDesc: "Processe executed in arrival time order",
    description:
      "FCFS is the simplest CPU s cheduling algorithm that executes processes in the exact order they arrive in the ready queue. Think of it like a queue at a ticket counter - whoever arrives first gets served first.",
    algorithm: [
      "Processes are arranged in a queue based on their arrival time",
      "The CPU is allocated to the first process in the queue",
      "Once a process starts executing, it runs to completion",
      "After completion, the next process in the queue is selected",
      "This continues until all processes have been executed",
    ],
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: 'O(1)',
        advantages: [
            'Simple and easy to understand',
            'Easy to implement using a FIFO queue',
            'Fair in terms of arrival order',
            'No overhead of process switching',
            'Suitable for batch systems'
        ],
        disadvantages: [
            'Convoy Effect: Short processes wait for long processes',
            'High average waiting time',
            'Not optimal for time-sharing systems',
            'Cannot preempt long processes',
            'Poor performance with varying burst times'
        ],
        realLifeExample: 'Like a queue at a grocery store checkout - the first person to arrive is served first, regardless of how many items they have. If someone with a full cart is ahead of you with just one item, you have to wait.'
  },

  // ===================== SJF =====================
  sjf: {
        name: 'Shortest Job First (SJF)',
        shortDesc: 'Shortest burst time executes first',
        description: 'SJF is a scheduling algorithm that selects the process with the smallest burst time for execution next. It minimizes average waiting time but requires knowledge of future burst times.',
        algorithm: [
            'Sort all processes by their burst time',
            'Select the process with the shortest burst time',
            'Execute the selected process to completion',
            'Remove the completed process from the queue',
            'Repeat until all processes are completed'
        ],
        timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(n)',
        advantages: [
            'Minimum average waiting time',
            'Optimal for minimizing wait time',
            'Better throughput than FCFS',
            'Good for batch systems with known execution times',
            'Reduces convoy effect'
        ],
        disadvantages: [
            'Difficult to predict burst time in advance',
            'Starvation: Long processes may never execute',
            'Not practical for interactive systems',
            'Requires estimation techniques',
            'Cannot be implemented at the level of short-term CPU scheduling'
        ],
        realLifeExample: 'Like a hospital emergency room triage - patients with minor injuries (shortest treatment time) are often treated quickly, while those with lengthy procedures wait longer. However, critical cases (priorities) override this system.'
    },

    // ===================== Priority =====================
    priority: {
        name: 'Priority Scheduling',
        shortDesc: 'Based on priority levels',
        description: 'Priority scheduling assigns a priority value to each process, and the CPU is allocated to the process with the highest priority. Lower priority number means higher priority (typically).',
        algorithm: [
            'Assign priority values to all processes',
            'Arrange processes in descending order of priority',
            'Allocate CPU to the highest priority process',
            'If priorities are equal, use FCFS',
            'Execute until completion, then select next highest priority'
        ],
        timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(n)',
        advantages: [
            'Allows differentiation between important and less important processes',
            'Flexibility in assigning priorities',
            'Can be preemptive or non-preemptive',
            'Good for real-time systems',
            'System processes can have higher priority'
        ],
        disadvantages: [
            'Starvation: Low priority processes may never execute',
            'Complex priority assignment',
            'Can lead to priority inversion',
            'Requires additional overhead to maintain priorities',
            'Difficult to decide priority values'
        ],
        realLifeExample: 'Like airport boarding - first class passengers (high priority) board first, followed by business class, then economy. Frequent flyers and families with small children also get priority boarding regardless of ticket class.'
    },

    // ===================== Round Robin =====================
    rr: {
        name: 'Round Robin (RR)',
        shortDesc: 'Time quantum based execution',
        description: 'Round Robin assigns a fixed time quantum to each process in a circular order. When the time quantum expires, the process is preempted and added to the end of the ready queue.',
        algorithm: [
            'Set a fixed time quantum (e.g., 2ms)',
            'Place all processes in a circular queue',
            'Allocate CPU to first process for one time quantum',
            'If process completes within quantum, remove it',
            'If not, move it to the end of the queue',
            'Continue with next process in queue'
        ],
        timeComplexity: {
            best: 'O(n)',
            average: 'O(n)',
            worst: 'O(n)'
        },
        spaceComplexity: 'O(n)',
        advantages: [
            'Fair allocation of CPU time',
            'No starvation - all processes get CPU time',
            'Good response time for interactive systems',
            'Easy to implement',
            'Better for time-sharing systems'
        ],
        disadvantages: [
            'Higher context switching overhead',
            'Performance depends on time quantum size',
            'Average waiting time can be high',
            'Not optimal for batch systems',
            'Turnaround time can be high for longer processes'
        ],
        realLifeExample: 'Like a classroom where the teacher asks questions - each student gets 30 seconds to answer. If they can\'t answer in 30 seconds, the teacher moves to the next student and comes back to them later.'
    },

    // // ===================== SRTF =====================
    srtf: {
        name: 'Shortest Remaining Time First (SRTF)',
        shortDesc: 'Preemptive shortest job first',
        description: 'SRTF is the preemptive version of SJF. The process with the smallest remaining burst time is selected for execution. If a new process arrives with shorter remaining time, the current process is preempted.',
        algorithm: [
            'At each time unit, calculate remaining time for all processes',
            'Select process with shortest remaining time',
            'If a new process arrives with shorter remaining time, preempt current',
            'Execute selected process for one time unit',
            'Repeat until all processes complete'
        ],
        timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n²)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(n)',
        advantages: [
            'Optimal average waiting time',
            'Better response time than SJF',
            'Minimizes average turnaround time',
            'Good for time-sharing systems',
            'Prevents convoy effect'
        ],
        disadvantages: [
            'High context switching overhead',
            'Starvation of longer processes',
            'Requires knowledge of remaining burst time',
            'Complex implementation',
            'Overhead of frequent preemption'
        ],
        realLifeExample: 'Like a chef managing multiple orders - if a quick 2-minute order comes in while cooking a 30-minute roast, the chef might pause the roast to quickly prepare and serve the fast order, then resume the roast.'
    },

    // ===================== Hybrid =====================
    hybrid: {
        name: 'Hybrid Scheduling',
        shortDesc: 'Combined algorithm approach',
        description: 'Hybrid scheduling combines multiple scheduling algorithms to optimize for different types of processes. Typically uses different algorithms for interactive and batch processes simultaneously.',
        algorithm: [
            'Classify processes into categories (interactive, batch, system)',
            'Assign different scheduling algorithms to each category',
            'Interactive processes: Use Round Robin for responsiveness',
            'Batch processes: Use SJF or FCFS for throughput',
            'System processes: Use Priority scheduling',
            'Dynamically adjust based on system load'
        ],
        timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(n)',
        advantages: [
            'Optimizes for different process types',
            'Balances responsiveness and throughput',
            'Flexible and adaptable',
            'Reduces overall system latency',
            'Can prioritize critical processes'
        ],
        disadvantages: [
            'Complex implementation',
            'Higher overhead for classification',
            'Difficult to tune parameters',
            'May require heuristics',
            'Challenging to debug and maintain'
        ],
        realLifeExample: 'Like a restaurant kitchen that handles dine-in orders (round-robin for equal service), takeout orders (FCFS), and catering orders (batch processing), while emergency orders from VIPs get priority treatment.'
    }
};