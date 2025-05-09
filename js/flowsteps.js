// js/flowSteps.js
const flowSteps = [
    {
        id: 'define-software',
        title: '1. Define Software & Problem',
        shortTitle: 'Define',
        heroImage: 'images/step-define-software.jpg', // Placeholder, will use generated
        contentGenerator: generateDefineSoftwareHTML, // Function to generate HTML for this step
        isFuture: false,
    },
    {
        id: 'market-intelligence',
        title: '2. Market Intelligence Review',
        shortTitle: 'Research',
        heroImage: 'images/step-market-intelligence.jpg', // Placeholder
        contentGenerator: generateMarketIntelligenceHTML,
        isFuture: false,
    },
    {
        id: 'define-epics',
        title: '3. Define Epics',
        shortTitle: 'Epics',
        heroImage: 'images/step-define-epics.jpg', // Placeholder
        contentGenerator: generateDefineEpicsHTML,
        isFuture: false,
    },
    {
        id: 'story-breakdown',
        title: '4. Story Breakdown',
        shortTitle: 'Stories',
        heroImage: 'images/step-story-breakdown.jpg', // Placeholder
        contentGenerator: generatePlaceholderHTML, // Generic placeholder for future steps
        isFuture: true,
    },
    {
        id: 'story-pointing',
        title: '5. Story Pointing',
        shortTitle: 'Estimate',
        heroImage: 'images/step-story-pointing.jpg', // Placeholder
        contentGenerator: generatePlaceholderHTML,
        isFuture: true,
    },
    {
        id: 'implementation',
        title: '6. Assign & Implement',
        shortTitle: 'Build',
        heroImage: 'images/step-implementation.jpg', // Placeholder
        contentGenerator: generatePlaceholderHTML,
        isFuture: true,
    },
    {
        id: 'deployment',
        title: '7. Deployment',
        shortTitle: 'Deploy',
        heroImage: 'images/step-deployment.jpg', // Placeholder
        contentGenerator: generatePlaceholderHTML,
        isFuture: true,
    },
    {
        id: 'learnings',
        title: '8. Learnings & CI',
        shortTitle: 'Improve',
        heroImage: 'images/step-learnings.jpg', // Placeholder
        contentGenerator: generatePlaceholderHTML,
        isFuture: true,
    }
];

// Functions to generate HTML content for each step (examples)

// Step 1: Define Software
function generateDefineSoftwareHTML(stepData, currentAppData) {
    return `
        <p>Describe the software solution you're envisioning or the existing software you want to improve. You can also include a specific problem you're trying to solve.</p>
        <div>
            <label for="software-prompt">Software Solution Name / Description:</label>
            <input type="text" id="software-prompt" placeholder="e.g., 'AI-powered CRM for small e-commerce businesses'" value="${currentAppData.softwarePrompt || ''}">
        </div>
        <div>
            <label for="problem-statement">Specific Problem Statement (Optional):</label>
            <textarea id="problem-statement" placeholder="e.g., 'Users struggle to identify high-value leads quickly'">${currentAppData.problemStatement || ''}</textarea>
        </div>
    `;
}

// Step 2: Market Intelligence
function generateMarketIntelligenceHTML(stepData, currentAppData) {
    if (!currentAppData.marketIntelligence) {
        // This state occurs if user navigates back before Gemini call finishes or if it's the first load of this step
        return `<p>Please complete Step 1 to initiate market research.</p>
                <p>If you've completed Step 1, the research will begin when you click "Next" on that step.</p>`;
    }

    const { reportLink, summary } = currentAppData.marketIntelligence;
    let findingsHTML = '';

    if (summary.specificProblemInsights && summary.specificProblemInsights.length > 0) {
        findingsHTML += `<div class="findings-section">
                            <h3>Insights for: "${currentAppData.problemStatement}"</h3>`;
        summary.specificProblemInsights.forEach(insight => {
            const isSelected = currentAppData.selectedFindings.find(sf => sf.id === insight.id);
            findingsHTML += `<div class="finding-item ${insight.type}">
                                <input type="checkbox" id="finding-${insight.id}" value="${insight.id}" ${isSelected ? 'checked' : ''}>
                                <label for="finding-${insight.id}">${insight.text}</label>
                             </div>`;
        });
        findingsHTML += `</div>`;
    }

    if (summary.competitorFeatures && summary.competitorFeatures.length > 0) {
        findingsHTML += `<div class="findings-section">
                            <h3>Competitor Features & Capabilities</h3>`;
        summary.competitorFeatures.forEach(feature => {
             const isSelected = currentAppData.selectedFindings.find(sf => sf.id === feature.id);
            findingsHTML += `<div class="finding-item ${feature.type}">
                                <input type="checkbox" id="finding-${feature.id}" value="${feature.id}" ${isSelected ? 'checked' : ''}>
                                <label for="finding-${feature.id}">${feature.text}</label>
                             </div>`;
        });
        findingsHTML += `</div>`;
    }

    if (summary.userChallenges && summary.userChallenges.length > 0) {
        findingsHTML += `<div class="findings-section">
                            <h3>Key User Challenges Reported</h3>`;
        summary.userChallenges.forEach(challenge => {
            const isSelected = currentAppData.selectedFindings.find(sf => sf.id === challenge.id);
            findingsHTML += `<div class="finding-item ${challenge.type}">
                                <input type="checkbox" id="finding-${challenge.id}" value="${challenge.id}" ${isSelected ? 'checked' : ''}>
                                <label for="finding-${challenge.id}">${challenge.text}</label>
                             </div>`;
        });
        findingsHTML += `</div>`;
    }

    return `
        <div class="report-link-container">
            <i class="fas fa-file-alt"></i> Gemini Deep Research Report: <a href="${reportLink}" target="_blank" onclick="event.preventDefault(); alert('This is a dummy link to: ${reportLink}');">View Full Report (Simulated)</a>
        </div>
        <p>Below is a summary of key findings. Please review and select the items you want to address or leverage for defining epics in the next step.</p>
        ${findingsHTML}
    `;
}

// Step 3: Define Epics
function generateDefineEpicsHTML(stepData, currentAppData) {
    if (currentAppData.selectedFindings.length === 0) {
        return `<p>Please go back to the Market Intelligence Review step and select some findings to inform your epics.</p>`;
    }

    let selectedFindingsHTML = '<h3>Selected Findings to Address:</h3><ul class="selected-findings-list">';
    currentAppData.selectedFindings.forEach(finding => {
        selectedFindingsHTML += `<li><i class="fas fa-check-circle" style="color: green; margin-right: 5px;"></i>${finding.text}</li>`;
    });
    selectedFindingsHTML += '</ul>';

    // Basic epic input - in a real app this would be more dynamic (add multiple epics)
    let existingEpicsHTML = '<h3>Defined Epics:</h3>';
    if (currentAppData.epics.length > 0) {
        existingEpicsHTML += '<ul>';
        currentAppData.epics.forEach(epic => {
            existingEpicsHTML += `<li><strong>${epic.title}</strong>: ${epic.description}</li>`;
        });
        existingEpicsHTML += '</ul>';
    } else {
        existingEpicsHTML += '<p>No epics defined yet.</p>';
    }


    return `
        ${selectedFindingsHTML}
        <p>Based on the selected findings, start drafting your high-level Epics. An Epic is a large body of work that can be broken down into a number of smaller stories.</p>
        
        <div class="epic-input-area">
            <label for="epic-title">Epic Title:</label>
            <input type="text" id="epic-title" placeholder="e.g., 'Enhanced Lead Scoring & Prioritization'">
            
            <label for="epic-description">Epic Description (User Story Format Recommended):</label>
            <textarea id="epic-description" placeholder="As a [user type], I want [goal] so that [benefit]."></textarea>
            <button id="add-epic-btn-mock" class="secondary">Save Epic (Mock)</button>
        </div>
        <hr style="margin: 20px 0;">
        ${existingEpicsHTML}
    `;
    // Note: The "Save Epic (Mock)" button functionality is simplified in validateAndSaveStep.
    // A real implementation would add to appData.epics and re-render this part.
}

// Placeholder for future steps
function generatePlaceholderHTML(stepData) {
    return `
    <div class="step-hero" style="background-image: url('${stepData.heroImage}');"></div>
        <h2>${stepData.title}</h2>
        <p>This step is under construction. Future iterations will enable functionality for ${stepData.shortTitle.toLowerCase()}.</p>
        <div class="navigation-buttons">
            <button class="prev-step" ${currentStepIndex === 0 ? 'disabled' : ''}>« Previous</button>
            <button class="next-step" ${currentStepIndex === flowSteps.length - 1 || flowSteps[currentStepIndex+1]?.isFuture ? 'disabled' : ''}>Next »</button>
        <p>This step, <strong>${stepData.title}</strong>, is a placeholder for future development.</p>
        <p>Functionality for ${stepData.shortTitle.toLowerCase()} will be implemented in subsequent iterations of this application.</p>
        <div style="text-align: center; font-size: 3em; color: #ccc; margin-top: 30px;">
            <i class="fas fa-cogs"></i> <!-- Example Icon -->
        </div>
    `;
}