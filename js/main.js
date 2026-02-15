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
}

// Run initialization when DOM is ready
if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initializeApp);
}
else{
    initializeApp();
}