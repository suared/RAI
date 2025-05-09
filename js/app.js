// js/app.js
document.addEventListener('DOMContentLoaded', () => {
    const stepperContainer = document.getElementById('flow-stepper');
    const mainContentArea = document.getElementById('main-content');
    const stepContentWrapper = document.getElementById('step-content-wrapper');
    const startDiscoveryBtn = document.getElementById('start-discovery-btn');
    const mainHeroImage = document.querySelector('.hero-image-main');
    const appLogo = document.getElementById('appLogo');

    // App state
    let currentStepIndex = 0;
    let appData = {
        softwarePrompt: '',
        problemStatement: '',
        marketIntelligence: null,
        selectedFindings: [],
        epics: []
    };

    function init() {
        // Placeholder for App Logo
        appLogo.src = generateAbstractLogo(); // Simple generated logo

        renderStepper();
        // Initially, show hero, hide steps
        mainHeroImage.classList.remove('hidden');
        stepContentWrapper.classList.add('hidden');

        startDiscoveryBtn.addEventListener('click', () => {
            mainHeroImage.classList.add('hidden');
            stepContentWrapper.classList.remove('hidden');
            renderStepContent(currentStepIndex);
        });
    }

    function generateAbstractLogo() {
        const canvas = document.createElement('canvas');
        canvas.width = 40;
        canvas.height = 40;
        const ctx = canvas.getContext('2d');

        // Simple design: concentric circles or abstract shapes
        ctx.beginPath();
        ctx.arc(20, 20, 18, 0, 2 * Math.PI);
        ctx.fillStyle = '#007bff'; // Main accent color
        ctx.fill();

        ctx.beginPath();
        ctx.arc(20, 20, 12, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(20, 20, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#0056b3'; // Darker shade
        ctx.fill();

        return canvas.toDataURL();
    }


    function renderStepper() {
        stepperContainer.innerHTML = '';
        flowSteps.forEach((step, index) => {
            const stepEl = document.createElement('div');
            stepEl.classList.add('step-indicator');
            stepEl.textContent = step.shortTitle;
            stepEl.dataset.stepIndex = index;

            if (index === currentStepIndex && !mainHeroImage.classList.contains('hidden')) {
                // No active step if main hero is shown
            } else if (index === currentStepIndex) {
                stepEl.classList.add('active');
            } else if (index < currentStepIndex) {
                stepEl.classList.add('completed');
            }
            if (step.isFuture) {
                stepEl.classList.add('future');
            }

            stepEl.addEventListener('click', () => {
                if (!step.isFuture && index <= getFurthestReachableStep()) {
                    navigateToStep(index);
                }
            });
            stepperContainer.appendChild(stepEl);
        });
    }
    
    function getFurthestReachableStep() {
        // This logic determines how far a user can navigate.
        // For now, they can go back to any completed step.
        // They can go forward one step if current is not future.
        if (flowSteps[currentStepIndex].isFuture) return currentStepIndex;
        
        let furthest = currentStepIndex;
        // Allow navigation to any step that has necessary data or is the next logical step
        if (appData.softwarePrompt) furthest = Math.max(furthest, 0); // Can always go to step 0 if started
        if (appData.marketIntelligence) furthest = Math.max(furthest, 1); // Can go to step 1 if MI is fetched
        if (appData.selectedFindings.length > 0 || (appData.marketIntelligence && currentStepIndex === 1) ) {
             furthest = Math.max(furthest, 2); // Can go to step 2 if findings selected or just finished MI
        }
        // Add more conditions for future steps if needed

        return furthest;
    }


    function navigateToStep(index) {
        if (index >= 0 && index < flowSteps.length) {
            currentStepIndex = index;
            renderStepContent(index);
            renderStepper();
        }
    }

    function renderStepContent(index) {
        const stepData = flowSteps[index];
        stepContentWrapper.innerHTML = `
            <div class="step-hero" style="background-image: url('${stepData.heroImage}');">
                <h2 class="step-title-overlay">${stepData.title}</h2>
            </div>
            <div id="dynamic-step-content">
                <!-- JS will populate this -->
            </div>
            <div class="navigation-buttons">
                <button class="prev-step" ${index === 0 ? 'disabled' : ''}>« Previous</button>
                <button class="next-step" ${index === flowSteps.length - 1 || flowSteps[index + 1]?.isFuture ? 'disabled' : ''}>
                    ${flowSteps[index + 1]?.isFuture ? 'Next (Future)' : 'Next »'}
                </button>
            </div>
        `;
        
        // Adjust step-hero CSS for overlay text
        const stepHeroDiv = stepContentWrapper.querySelector('.step-hero');
        if(stepHeroDiv) {
            stepHeroDiv.style.position = 'relative';
            stepHeroDiv.style.display = 'flex';
            stepHeroDiv.style.alignItems = 'flex-end';
            stepHeroDiv.style.padding = '20px';
        }
        const titleOverlay = stepContentWrapper.querySelector('.step-title-overlay');
        if(titleOverlay) {
            titleOverlay.style.color = 'white';
            titleOverlay.style.margin = '0';
            titleOverlay.style.textShadow = '1px 1px 3px rgba(0,0,0,0.7)';
        }


        const dynamicContentContainer = document.getElementById('dynamic-step-content');
        dynamicContentContainer.innerHTML = stepData.contentGenerator(stepData, appData);

        // Add event listeners for navigation buttons
        const prevButton = stepContentWrapper.querySelector('.prev-step');
        const nextButton = stepContentWrapper.querySelector('.next-step');

        if (prevButton) {
            prevButton.addEventListener('click', () => navigateToStep(currentStepIndex - 1));
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (validateAndSaveStep(currentStepIndex)) {
                     if (currentStepIndex === 0) { // After defining software, fetch intelligence
                        fetchAndDisplayMarketIntelligence(dynamicContentContainer, nextButton);
                    } else {
                        navigateToStep(currentStepIndex + 1);
                    }
                }
            });
        }
        
        // Attach step-specific event listeners
        attachStepEventListeners(index);
    }

    function validateAndSaveStep(index) {
        const stepData = flowSteps[index];
        if (stepData.id === 'define-software') {
            const softwarePromptInput = document.getElementById('software-prompt');
            const problemStatementInput = document.getElementById('problem-statement');
            if (softwarePromptInput.value == null || softwarePromptInput.value.trim() == "") {
                alert('Please enter a software solution prompt.');
                softwarePromptInput.focus();
                return false;
            }
            appData.softwarePrompt = softwarePromptInput.value.trim();
            appData.problemStatement = problemStatementInput.value.trim();
            return true;
        }
        if (stepData.id === 'market-intelligence') {
            appData.selectedFindings = [];
            const checkboxes = document.querySelectorAll('.finding-item input[type="checkbox"]:checked');
            checkboxes.forEach(cb => {
                // Find the original finding object to store more than just text
                const allFindings = [
                    ...(appData.marketIntelligence.summary.specificProblemInsights || []),
                    ...(appData.marketIntelligence.summary.competitorFeatures || []),
                    ...(appData.marketIntelligence.summary.userChallenges || [])
                ];
                const finding = allFindings.find(f => f.id === cb.value);
                if(finding) appData.selectedFindings.push(finding);
            });
            if (appData.selectedFindings.length === 0) {
                alert('Please select at least one finding to proceed.');
                return false;
            }
            return true;
        }
         if (stepData.id === 'define-epics') {
            const epicTitle = document.getElementById('epic-title');
            const epicDescription = document.getElementById('epic-description');
            if (epicTitle && epicTitle.value.trim()) { // Example: allow saving one epic
                appData.epics.push({title: epicTitle.value.trim(), description: epicDescription.value.trim()});
                // In a real app, you'd have a list of epics and "add epic" functionality
                alert('Epic (mock) saved! For demo, only one epic input is shown.');
            } else if (!appData.epics.length) {
                 alert('Consider defining at least one epic based on the selected findings.');
                 //return false; // Make it optional for demo
            }
            return true;
        }
        return true; // Default for placeholders
    }
    
    async function fetchAndDisplayMarketIntelligence(contentContainer, nextButton) {
        contentContainer.innerHTML = '<div class="loader"></div><p style="text-align:center;">Performing deep research with Gemini... (Simulated)</p>';
        nextButton.disabled = true; // Disable next while loading

        try {
            appData.marketIntelligence = await fetchMarketIntelligence(appData.softwarePrompt, appData.problemStatement);
            // Once data is fetched, re-render the current step (which is market-intelligence)
            // or directly transition if you want to automatically go to the next after fetch.
            // For this flow, we want to display the results on the *current* Market Intelligence step.
            currentStepIndex = flowSteps.findIndex(step => step.id === 'market-intelligence'); // Ensure current step is correct
            renderStepContent(currentStepIndex);
            renderStepper(); // Update stepper to show completion/activity
        } catch (error) {
            console.error("Error fetching market intelligence:", error);
            contentContainer.innerHTML = '<p class="error">Failed to fetch market intelligence. Please try again.</p>';
            nextButton.disabled = false; // Re-enable if error
        }
    }

    function attachStepEventListeners(index) {
        const stepData = flowSteps[index];
        if (stepData.id === 'market-intelligence' && appData.marketIntelligence) {
            // Example: Add listeners for highlighting or interaction with findings if needed beyond checkboxes
            const findingItems = document.querySelectorAll('.finding-item');
            findingItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    if (e.target.type !== 'checkbox') {
                        const checkbox = item.querySelector('input[type="checkbox"]');
                        if (checkbox) checkbox.checked = !checkbox.checked;
                    }
                });
            });
        }
    }

    init();
});