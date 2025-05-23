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
        projectName: '',
        corporateGoals: '',
        problemStatements: [], // array of strings
        backlogFile: null, // File object or name string
        backlogUrl: '',
        companyInsightsData: null, // { marketShare, topCompetitors, swot, userFeedbacks }
        parsedBacklogData: null, // { features, feedbackCoverage }
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
        // if (flowSteps[currentStepIndex].isFuture) return currentStepIndex; // Allow navigation for now
        
        let furthest = currentStepIndex;
        // Simplified: allow navigation to any non-future step that has been "unlocked" by completing previous ones.
        // More granular control:
        if (appData.projectName) furthest = Math.max(furthest, 1); // Can go to Prep-Insights if Goals is done
        if (appData.projectName) furthest = Math.max(furthest, 2); // Can go to Company Insights if Goals is done (Prep is optional)
        if (appData.companyInsightsData) furthest = Math.max(furthest, 3); // Can go to Backlog Parser if Insights are loaded
        if (appData.companyInsightsData) furthest = Math.max(furthest, 4); // Can go to Epics if Insights are loaded
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

    async function renderStepContent(index) { // Made async for potential data loading
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
        
        if (stepData.id === 'company-insights' && !appData.companyInsightsData) {
            dynamicContentContainer.innerHTML = `<div class="loader-container"><div class="loader"></div><p>Loading company and market insights...</p></div>`;
            try {
                appData.companyInsightsData = await fetchCompanyInsights(appData.projectName);
                dynamicContentContainer.innerHTML = stepData.contentGenerator(stepData, appData); // Re-render with data
            } catch (error) {
                console.error("Error fetching company insights:", error);
                dynamicContentContainer.innerHTML = '<p class="error">Failed to fetch company insights. Please try again.</p>';
            }
        } else {
            dynamicContentContainer.innerHTML = stepData.contentGenerator(stepData, appData);
        }


        // Add event listeners for navigation buttons
        const prevButton = stepContentWrapper.querySelector('.prev-step');
        const nextButton = stepContentWrapper.querySelector('.next-step');

        if (prevButton) {
            prevButton.addEventListener('click', () => navigateToStep(currentStepIndex - 1));
        }
        if (nextButton) {
            nextButton.addEventListener('click', async () => {
                if (validateAndSaveStep(currentStepIndex)) {
                    const currentStepConfig = flowSteps[currentStepIndex];
                    const nextStepConfig = flowSteps[currentStepIndex + 1];

                    if (currentStepConfig.id === 'prep-insights') {
                        await showPrepInsightsLoadingSequence(nextButton);
                        navigateToStep(currentStepIndex + 1); // Navigate after loading
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
        if (stepData.id === 'goals') {
            const projectNameInput = document.getElementById('project-name');
            const corporateGoalsInput = document.getElementById('corporate-goals');
            
            if (!projectNameInput.value.trim()) {
                alert('Project Name is required.');
                projectNameInput.focus();
                return false;
            }
            appData.projectName = projectNameInput.value.trim();
            appData.corporateGoals = corporateGoalsInput.value.trim();
            
            // Initialize to ensure a fresh list from DOM, preventing duplicates on save
            appData.problemStatements = [];
            document.querySelectorAll('.problem-statement-input').forEach(input => {
                if (input.value.trim()) {
                    appData.problemStatements.push(input.value.trim()); // Add only non-empty, trimmed values
                }
            });
            return true;
        }
        if (stepData.id === 'prep-insights') {
            const backlogFileInput = document.getElementById('backlog-file');
            const backlogUrlInput = document.getElementById('backlog-url');
            if (backlogFileInput.files.length > 0) {
                appData.backlogFile = backlogFileInput.files[0]; // Store File object
            } else if (!backlogFileInput.value && appData.backlogFile) {
                // If input is cleared but we had a file, keep it unless explicitly removed
            } else {
                 appData.backlogFile = null;
            }
            appData.backlogUrl = backlogUrlInput.value.trim();
            return true;
        }
        if (stepData.id === 'company-insights' && appData.companyInsightsData) {
            // Save editable fields
            appData.companyInsightsData.marketShare = document.getElementById('market-share')?.value || appData.companyInsightsData.marketShare;
            document.querySelectorAll('.editable-insight').forEach(input => {
                const path = input.dataset.path.split('.'); // e.g., "swot.strengths.s1.text" or "topCompetitors.comp1.strength"
                let obj = appData.companyInsightsData;
                try {
                    if (path[0] === 'topCompetitors') { // e.g. topCompetitors.comp1.strength
                        const comp = obj.topCompetitors.find(c => c.id === path[1]);
                        if(comp) comp[path[2]] = input.value;
                    } else if (path[0] === 'swot') { // e.g. swot.strengths.s1.text
                        const swotItem = obj.swot[path[1]].find(item => item.id === path[2]);
                        if(swotItem) swotItem[path[3]] = input.value;
                    } else if (path[0] === 'userFeedbacks') { // e.g. userFeedbacks.uf1.text
                         const feedbackItem = obj.userFeedbacks.find(item => item.id === path[1]);
                        if(feedbackItem) feedbackItem[path[2]] = input.value;
                    }
                } catch (e) { console.warn("Could not save insight field:", path.join('.'), e); }
            });
            return true;
        }
        if (stepData.id === 'backlog-parser') {
            const backlogFileInput = document.getElementById('backlog-file-parser');
            const backlogUrlInput = document.getElementById('backlog-url-parser');
             if (backlogFileInput.files.length > 0) {
                appData.backlogFile = backlogFileInput.files[0];
            } else if (!backlogFileInput.value && appData.backlogFile) {
                // Keep existing if input cleared
            } else {
                appData.backlogFile = null;
            }
            appData.backlogUrl = backlogUrlInput.value.trim();

            if (appData.parsedBacklogData && appData.parsedBacklogData.features) {
                 document.querySelectorAll('.editable-feature').forEach(input => {
                    const category = input.dataset.category;
                    const id = input.dataset.id;
                    const feature = appData.parsedBacklogData.features[category]?.find(f => f.id === id);
                    if (feature) feature.text = input.value;
                });
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
            }
            return true;
        }
        return true; // Default for placeholders
    }
    
    async function showPrepInsightsLoadingSequence(nextButton) {
        const loaderContainer = document.getElementById('prep-insights-loader-container');
        const statusElement = document.getElementById('prep-insights-status');
        if (!loaderContainer || !statusElement) return;

        loaderContainer.classList.remove('hidden');
        if(nextButton) nextButton.disabled = true;

        const statuses = [
            "Gathering Market Share Insights...",
            "Processing Publicly Available Insights...",
            "Generating Initial Insights..."
        ];

        for (const status of statuses) {
            statusElement.textContent = status;
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
        
        statusElement.textContent = "Preparation Complete!";
        await new Promise(resolve => setTimeout(resolve, 1000)); // Short pause on complete

        loaderContainer.classList.add('hidden');
        if(nextButton) nextButton.disabled = false;
    }

    function attachStepEventListeners(index) {
        const stepData = flowSteps[index];

        if (stepData.id === 'goals') {
            const addProblemBtn = document.getElementById('add-problem-statement-btn');
            if (addProblemBtn) {
                addProblemBtn.addEventListener('click', () => {
                    const dynamicContentContainer = document.getElementById('dynamic-step-content');
                    if (dynamicContentContainer) {
                        // 1. Capture current values from existing input fields
                        const problemInputs = document.querySelectorAll('.problem-statement-input');
                        const currentStatements = Array.from(problemInputs).map(input => input.value);
                        
                        // 2. Set appData.problemStatements to these current values
                        appData.problemStatements = currentStatements;

                        // 3. Add a new empty problem statement to the array for the new input field
                        appData.problemStatements.push(''); 
                        
                        // 4. Re-render the content based on the updated appData
                        dynamicContentContainer.innerHTML = flowSteps[index].contentGenerator(flowSteps[index], appData);
                        
                        // 5. Re-attach all event listeners for the new content
                        attachStepEventListeners(index); // Re-attach listeners
                    }
                });
            }
            document.querySelectorAll('.remove-problem-statement-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idxToRemove = parseInt(e.target.dataset.index, 10);
                    const dynamicContentContainer = document.getElementById('dynamic-step-content');

                    if (dynamicContentContainer) {
                        // 1. Capture current values from existing input fields
                        const problemInputs = document.querySelectorAll('.problem-statement-input');
                        const currentStatements = Array.from(problemInputs).map(input => input.value);
                        appData.problemStatements = currentStatements;

                        // 2. Remove the specified problem statement
                        if (idxToRemove >= 0 && idxToRemove < appData.problemStatements.length) {
                            appData.problemStatements.splice(idxToRemove, 1);
                        }
                        
                        // 3. Re-render
                        dynamicContentContainer.innerHTML = flowSteps[index].contentGenerator(flowSteps[index], appData);
                        attachStepEventListeners(index);
                    }
                });
            });
        }

        if (stepData.id === 'prep-insights') {
            const fileInput = document.getElementById('backlog-file');
            if (fileInput) {
                fileInput.addEventListener('change', (e) => {
                    if (e.target.files.length > 0) {
                        appData.backlogFile = e.target.files[0];
                        // Optionally display file name next to input
                        const existingP = fileInput.parentElement.querySelector('p');
                        if(existingP) existingP.remove();
                        const p = document.createElement('p');
                        p.textContent = `Selected file: ${appData.backlogFile.name}`;
                        fileInput.parentElement.appendChild(p);
                    } else {
                        appData.backlogFile = null;
                         const existingP = fileInput.parentElement.querySelector('p');
                        if(existingP) existingP.remove();
                    }
                });
            }
        }
        if (stepData.id === 'backlog-parser') {
            const parseBtn = document.getElementById('parse-backlog-btn');
            const loader = document.getElementById('parser-loader-container');
            const dynamicContentContainer = document.getElementById('dynamic-step-content');

            if (parseBtn && loader && dynamicContentContainer) {
                parseBtn.addEventListener('click', async () => {
                    loader.classList.remove('hidden');
                    parseBtn.disabled = true;
                    try {
                        // Ensure latest backlogFile/URL is saved to appData before fetching
                        validateAndSaveStep(index); // This saves backlog-file-parser and backlog-url-parser
                        appData.parsedBacklogData = await fetchParsedBacklog(appData.backlogFile ? appData.backlogFile.name : null, appData.backlogUrl, appData.companyInsightsData?.userFeedbacks);
                        // Re-render the dynamic content of this step to show parsed data
                        dynamicContentContainer.innerHTML = flowSteps[index].contentGenerator(flowSteps[index], appData);
                        attachStepEventListeners(index); // Re-attach listeners for new content
                    } catch (error) {
                        console.error("Error parsing backlog:", error);
                        dynamicContentContainer.innerHTML += '<p class="error">Failed to parse backlog. Please try again.</p>';
                    } finally {
                        loader.classList.add('hidden');
                        parseBtn.disabled = false;
                    }
                });
            }
        }
    }

    init();
});