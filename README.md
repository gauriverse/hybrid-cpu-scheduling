# CPU Scheduling Simulator with Hybrid Time-Efficient Algorithms

A web-based interactive simulator for visualizing and analyzing CPU scheduling algorithms, including traditional approaches and innovative hybrid combinations designed for time efficiency.

## 🎯 Project Overview

This simulator implements **8 CPU scheduling algorithms** (5 standard + 3 hybrid) and provides real-time visualization through Gantt charts, process tables, and performance metrics. It serves as both an educational tool for understanding operating system concepts and a research platform for analyzing scheduling algorithm performance.

## ✨ Features

- **5 Standard Algorithms**
  - First Come First Serve (FCFS)
  - Shortest Job First (SJF)
  - Shortest Remaining Time First (SRTF)
  - Priority Scheduling
  - Round Robin (RR)

- **3 Hybrid Time-Efficient Algorithms**
  - Priority + SRTF
  - Round Robin + SJF
  - Priority + Round Robin

- **Interactive User Interface**
  - Dynamic process input with add/remove functionality
  - Algorithm selection with visual feedback
  - Context-sensitive input fields (priority, time quantum)
  - Color-coded process visualization

- **Comprehensive Visualization**
  - Gantt chart showing process execution timeline
  - Process results table with all timing metrics
  - Performance metrics (Average TAT, Average WT, CPU Efficiency)
  - Idle time tracking

- **Input Validation**
  - Real-time validation of numeric inputs
  - Automatic error highlighting
  - Prevents invalid simulation runs

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, or Edge)
- No additional software or libraries required

### Installation

1. Clone or download the repository:
```bash
git clone https://github.com/gauriverse/hybrid-cpu-scheduling.git
cd hybrid-cpu-scheduling
```

2. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

## 📁 Project Structure
cpu-scheduler/
├── index.html              # Homepage with algorithm cards
├── simulator.html          # Main simulator interface
├── css/
│   ├── variables.css       # Design tokens and CSS variables
│   ├── base.css           # Reset styles and base layout
│   ├── components.css     # Reusable component styles
│   └── pages.css          # Page-specific styles
├── js/
│   ├── config/
│   │   └── algorithms.js  # Algorithm metadata
│   ├── core/
│   │   └── scheduler.js   # Scheduling algorithm implementations
│   ├── ui/
│   │   ├── render.js      # Gantt chart and table rendering
│   │   ├── modal.js       # Algorithm information modal
│   │   └── simulator.js   # Simulator page interactions
│   ├── utils/
│   │   ├── helpers.js     # Utility functions
│   │   └── storage.js     # State management
│   └── main.js            # Application entry point
└── README.md


## 🔧 Technical Details

### Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with custom properties
- **JavaScript (ES6)**: Modular architecture with no external dependencies

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance

- Handles up to 20 processes efficiently
- Instant simulation execution for typical workloads
- Responsive rendering on 1024×768+ displays

## 📝 Code Structure

### Modular Architecture

The codebase follows clear separation of concerns:

- **Configuration Layer**: Algorithm metadata and constants
- **Core Layer**: Pure scheduling algorithm implementations
- **UI Layer**: Rendering and user interaction handling
- **Utilities Layer**: Helpers and state management

### Key Functions

```javascript
// Run any scheduling algorithm
runScheduler(algorithm, processes, options)

// Individual algorithm implementations
runFCFS(processes)
runSJF(processes)
runSRTF(processes)
runPriority(processes)
runRR(processes, quantum)
runHybridPrioritySRTF(processes)
runHybridRRSJF(processes, quantum)
runHybridPriorityRR(processes, quantum)

// Visualization
renderGantt(ganttData)
renderTable(processData)
renderMetrics(avgTAT, avgWT, cpuEfficiency)
```

## 🐛 Known Limitations

- Does not model I/O operations
- Context switching overhead not explicitly calculated
- Assumes all burst times are known in advance
- Limited to single-processor simulation
- No real-time scheduling support

## 🚧 Future Enhancements

- [ ] Multi-level queue scheduling
- [ ] I/O operation modeling
- [ ] Real-time scheduling algorithms (EDF, RMS)
- [ ] Multi-processor/multi-core support
- [ ] Machine learning-based burst time prediction
- [ ] Export results to PDF/CSV
- [ ] Batch testing with multiple configurations
- [ ] Advanced visualization (state diagrams, resource graphs)
- [ ] Space-efficient hybrid algorithms (FCFS+SJF, FCFS+Priority, FCFS+RR)