// Main Application Entry Point

/**
 * Initialize the application
 */
function initializeApp(){
    console.log('🚀 CPU Scheduling Simulator initialized');

    // Render algorithm cards on homepage
    renderAlgorithmCards();

    // Initialize modal functionality
    initializeModal();

    // Wire the nav btn
    setupNavigation();

    // Initialize simulator page if on simulator.html
    initializeSimulator();
}

// Setup navigation between pages
function setupNavigation(){
    // Homepage to Simulator
    const simulatorBtn = document.getElementById('simulatorBtn');
    if(simulatorBtn){
        simulatorBtn.addEventListener('click',() => {
            window.location.href = 'simulator.html';
        });
    }

    // Simulator to Homepage
    const backBtn = document.getElementById('back-btn');
    if(backBtn){
        backBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    } 
}

// Run initialization when DOM is ready
if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initializeApp);
}
else{
    initializeApp();
}