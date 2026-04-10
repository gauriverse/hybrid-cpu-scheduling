// Rendering Module - Generate algorithm cards on homepage

/**
 * Render algorithm cards in the grid
 */
function renderAlgorithmCards(){
    const grid = document.getElementById('algorithmGrid');
    if(!grid)
        return;

    grid.innerHTML = Object.entries(ALGORITHMS).map(([key, algo]) => 
        `<article class="algo-card" data-algo="${key}">
            <h3 class="algo-card-title">${algo.name}</h3>
            <p class="algo-card-description">${algo.description}</p>
        </article>`
    ).join('');

    // Attach click handlers to cards
    grid.querySelectorAll('.algo-card').forEach(card => {
        card.addEventListener('click', () => {
            const algoKey = card.dataset.algo;
            showAlgorithmModal(algoKey);
            
        });
    });
}



// =============================================
//   SIMULATOR — Gantt Chart
// =============================================

/**
 * Render gantt chart blocks and timeline
 * @param {Array} gantt - Array of { id, start, end, color }
 */
function renderGantt(gantt){
    const blocksContainer   = document.getElementById('gantt-blocks');
    const timelineContainer = document.getElementById('gantt-timeline');

    if(!blocksContainer || !timelineContainer) return;

    // Clear previous render
    blocksContainer.innerHTML   = '';
    timelineContainer.innerHTML = '';

    // Total time span — used to calculate block widths
    const totalTime = gantt[gantt.length - 1].end;

    gantt.forEach(block => {
        const duration   = block.end - block.start;
        const widthPct   = (duration / totalTime) * 100;

        // --- Gantt Block ---
        const blockEl = document.createElement('div');
        blockEl.classList.add('gantt-block');

        if(block.id === 'IDLE'){
            // IDLE block — no color, muted style
            blockEl.classList.add('gantt-block--idle');
            blockEl.textContent = 'IDLE';
        } else {
            // Process block — use process color
            blockEl.style.backgroundColor = block.color;
            blockEl.textContent = block.id;
        }

        // Width proportional to duration
        blockEl.style.width = `${widthPct}%`;

        blocksContainer.appendChild(blockEl);

        // --- Timeline Marker ---
        const markerEl = document.createElement('div');
        markerEl.classList.add('gantt-time-marker');
        markerEl.style.width = `${widthPct}%`;
        markerEl.textContent = block.start;

        timelineContainer.appendChild(markerEl);
    });

    // Add final time marker at the very end
    const lastMarker = document.createElement('div');
    lastMarker.classList.add('gantt-time-marker');
    lastMarker.textContent = gantt[gantt.length - 1].end;
    timelineContainer.appendChild(lastMarker);
}

// =============================================
//   SIMULATOR — Output Table
// =============================================

/**
 * Render process results into the output table
 * @param {Array} processes - Array with ct, tat, wt added by scheduler
 */
function renderTable(processes){
    const tbody = document.getElementById('output-table-body');
    if(!tbody) return;

    // Clear previous render
    tbody.innerHTML = '';

    processes.forEach(p => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <span class="process-color-dot" style="background-color: ${p.color}"></span>
                ${p.id}
            </td>
            <td>${p.at}</td>
            <td>${p.bt}</td>
            <td>${p.ct}</td>
            <td>${p.tat}</td>
            <td>${p.wt}</td>
        `;

        tbody.appendChild(row);
    });
}

// =============================================
//   SIMULATOR — Metrics
// =============================================

/**
 * Render performance metrics
 * @param {string} avgTAT - Average turnaround time
 * @param {string} avgWT - Average waiting time
 * @param {string} cpuEfficiency - CPU efficiency percentage
 */
function renderMetrics(avgTAT, avgWT, cpuEfficiency){
    const atatEl       = document.getElementById('metric-atat');
    const awtEl        = document.getElementById('metric-awt');
    const efficiencyEl = document.getElementById('metric-efficiency');

    if(atatEl)       atatEl.textContent       = `${avgTAT} ms`;
    if(awtEl)        awtEl.textContent        = `${avgWT} ms`;
    if(efficiencyEl) efficiencyEl.textContent = `${cpuEfficiency}%`;
}
