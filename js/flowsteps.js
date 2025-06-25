// js/flowSteps.js
const flowSteps = [
    {
        id: 'goals',
        title: '1. Define Goals & Problems',
        shortTitle: 'Goals',
        heroImage: 'images/step-goals.jpg',
        contentGenerator: generateGoalsHTML,
        isFuture: false,
    },
    {
        id: 'prep-insights',
        title: '2. Prep Insights',
        shortTitle: 'Prep',
        heroImage: 'images/step-prep-insights.jpg',
        contentGenerator: generatePrepInsightsHTML,
        isFuture: false,
    },
    {
        id: 'company-insights',
        title: '3. Company & Market Insights',
        shortTitle: 'Insights',
        heroImage: 'images/step-company-insights.jpg',
        contentGenerator: generateCompanyInsightsHTML,
        isFuture: false,
    },
    {
        id: 'backlog-parser',
        title: '4. Backlog Parser',
        shortTitle: 'Backlog',
        heroImage: 'images/step-backlog-parser.jpg',
        contentGenerator: generateBacklogParserHTML,
        isFuture: false,
    },
    {
        id: 'define-epics',
        title: '5. Define Epics',
        shortTitle: 'Epics',
        heroImage: 'images/step-define-epics.jpg', // Placeholder
        contentGenerator: generateDefineEpicsHTML,
        isFuture: false,
    },
    {
        id: 'story-breakdown',
        title: '6. Story Breakdown',
        shortTitle: 'Stories',
        heroImage: 'images/step-story-breakdown.jpg', // Placeholder
        contentGenerator: generatePlaceholderHTML, // Generic placeholder for future steps
        isFuture: true,
    },
    {
        id: 'story-pointing',
        title: '7. Story Pointing',
        shortTitle: 'Estimate',
        heroImage: 'images/step-story-pointing.jpg', // Placeholder
        contentGenerator: generatePlaceholderHTML,
        isFuture: true,
    },
    {
        id: 'implementation',
        title: '8. Assign & Implement',
        shortTitle: 'Build',
        heroImage: 'images/step-implementation.jpg', // Placeholder
        contentGenerator: generatePlaceholderHTML,
        isFuture: true,
    },
    {
        id: 'deployment',
        title: '9. Deployment',
        shortTitle: 'Deploy',
        heroImage: 'images/step-deployment.jpg', // Placeholder
        contentGenerator: generatePlaceholderHTML,
        isFuture: true,
    },
    {
        id: 'learnings',
        title: '10. Learnings & CI',
        shortTitle: 'Improve',
        heroImage: 'images/step-learnings.jpg', // Placeholder
        contentGenerator: generatePlaceholderHTML,
        isFuture: true,
    }
];

// Step 1: Goals
function generateGoalsHTML(stepData, appData) {
    let problemStatementsHTML = '<ul id="problem-statements-list">';
    (appData.problem_statements || []).forEach((ps, index) => {
        problemStatementsHTML += `
            <li>
                <input type="text" class="problem-statement-input" value="${ps}" data-index="${index}" placeholder="Enter problem statement">
                <button type="button" class="remove-problem-statement-btn" data-index="${index}">Remove</button>
            </li>`;
    });
    problemStatementsHTML += '</ul>';

    // Convert goals array to string for display
    const goalsText = (appData.goals || []).join(', ');

    return `
        <div>
            <label for="project-name">Project Name:</label>
            <input type="text" id="project-name" placeholder="e.g., 'NextGen CRM Platform'" value="${appData.name || ''}" required>
        </div>
        <div>
            <label for="corporate-goals">Corporate Goals (Optional):</label>
            <textarea id="corporate-goals" placeholder="e.g., 'Increase market share by 10% in Q4, Improve customer retention by 15%.'">${goalsText}</textarea>
        </div>
        <div>
            <label>Problem Statements (Optional, 1 or many):</label>
            ${problemStatementsHTML}
            <button type="button" id="add-problem-statement-btn" class="secondary">Add Problem Statement</button>
        </div>
    `;
}

// Step 2: Prep Insights
function generatePrepInsightsHTML(stepData, appData) {
    return `
        <p>Optionally, provide your existing product backlog for deeper analysis in subsequent steps. This can help in identifying gaps and aligning with market insights.</p>
        <div>
            <label for="backlog-file">Upload Backlog File (Optional):</label>
            <input type="file" id="backlog-file" accept=".csv,.txt,.json,.xml">
            ${appData.backlogFile ? `<p>Current file: ${appData.backlogFile.name}</p>` : ''}
        </div>
        <div>
            <label for="backlog-url">Or, Provide Backlog URL (Optional):</label>
            <input type="text" id="backlog-url" placeholder="e.g., https://jira.example.com/backlog.csv" value="${appData.backlogUrl || ''}">
        </div>
        <div id="prep-insights-loader-container" class="hidden" style="margin-top: 20px; text-align: center;">
            <div class="loader"></div>
            <p id="prep-insights-status" style="margin-top: 10px; font-weight: bold;"></p>
        </div>
    `;
}

// Step 3: Company Insights
function generateCompanyInsightsHTML(stepData, appData) {
    // Use the new data structure directly
    const { competitors, swot, user_reviews, marketShare } = appData;
    
    let competitorsHTML = competitors.map(c => {
        const strength = c.user_reviews[0]?.positive[0] || 'Strong competitor';
        return `<li><strong>${c.name} (${c.company}):</strong> <input type="text" class="editable-insight" data-path="competitors.${c.id}.user_reviews.0.positive.0" value="${strength}"></li>`;
    }).join('');
    
    const generateSwotHTML = (type, items) => {
        let html = `<h4>${type.charAt(0).toUpperCase() + type.slice(1)}</h4><ul>`;
        items.forEach((item, index) => {
            html += `<li><textarea class="editable-insight swot-item" data-path="swot.${type}.${index}">${item}</textarea></li>`;
        });
        html += `</ul>`;
        return html;
    };

    // Convert user_reviews to the format expected by the UI
    const userFeedbacks = user_reviews[0]?.positive.map((feedback, index) => ({
        id: `uf${index + 1}`,
        text: feedback,
        priority: index + 1
    })) || [];

    let userFeedbacksHTML = userFeedbacks.map(fb => `<li><input type="text" class="editable-insight" data-path="user_reviews.0.positive.${fb.priority - 1}" value="${fb.text}"> (Priority: ${fb.priority})</li>`).join('');

    return `
        <div class="report-link-container">
            <i class="fas fa-file-alt"></i> Gemini Insights Report: <a href="#" target="_blank" onclick="event.preventDefault(); alert('This is a dummy link to: Gemini Insights Report');">View Full Report (Simulated)</a>
        </div>
        <div>
            <label for="market-share">Estimated Market Share:</label>
            <input type="text" id="market-share" class="editable-insight" data-path="marketShare" value="${marketShare}">
        </div>
        <div class="competitors-section">
            <h3>Top ${competitors.length} Competitors & Strengths:</h3>
            <ul>${competitorsHTML}</ul>
        </div>
        <div class="swot-analysis">
            <h3>SWOT Analysis:</h3>
            <div class="swot-grid">
                <div>${generateSwotHTML('strengths', swot.strengths)}</div>
                <div>${generateSwotHTML('weaknesses', swot.weaknesses)}</div>
                <div>${generateSwotHTML('opportunities', swot.opportunities)}</div>
                <div>${generateSwotHTML('threats', swot.threats)}</div>
            </div>
        </div>
        <div class="user-feedback-section">
            <h3>Top ${userFeedbacks.length} User Feedbacks (Priority Order):</h3>
            <ul>${userFeedbacksHTML}</ul>
        </div>
    `;
}

// Step 4: Backlog Parser
function generateBacklogParserHTML(stepData, appData) {
    let featuresHTML = '';
    if (appData.features && appData.features.length > 0) {
        // Group features by domain for display
        const featuresByDomain = {};
        appData.features.forEach(f => {
            if (!featuresByDomain[f.domain]) {
                featuresByDomain[f.domain] = [];
            }
            featuresByDomain[f.domain].push(f);
        });

        featuresHTML = `
            <div id="features-section">
                <h3>Features by Domain</h3>`;
        Object.entries(featuresByDomain).forEach(([domain, features]) => {
            featuresHTML += `
                <h4>${domain}</h4>
                <ul>${features.map(f => `<li><input type="text" class="editable-feature" data-domain="${f.domain}" data-sub-domain="${f.sub_domain}" data-version="${f.version}" value="${f.feature}"> <span class="feature-meta">(${f.sub_domain} - ${f.version})</span></li>`).join('')}</ul>`;
        });
        featuresHTML += `</div>`;
    }

    let feedbackCoverageHTML = '';
    if (appData.feedbackCoverage) {
        const { notCovered, covered } = appData.feedbackCoverage;
        feedbackCoverageHTML = `
            <div id="feedback-coverage-section">
                <h3>Feedback Coverage</h3>
                <h4>Not Covered in Backlog</h4>
                <ul>${(notCovered || []).map(fc => `<li>${fc.feedbackText} ${fc.reason ? `<em>(${fc.reason})</em>` : ''}</li>`).join('')}</ul>
                <h4>Covered in Backlog (Mock Examples)</h4>
                <ul>${(covered || []).map(fc => `<li>${fc.feedbackText} - <em>Related to: ${fc.relatedFeature}</em></li>`).join('')}</ul>
            </div>`;
    }

    return `
        <p>If you provided a backlog earlier, it will be used. You can also provide or update it here.</p>
        <div>
            <label for="backlog-file-parser">Upload Backlog File:</label>
            <input type="file" id="backlog-file-parser" accept=".csv,.txt,.json,.xml">
            ${appData.backlogFile ? `<p>Current file: ${appData.backlogFile.name}</p>` : ''}
        </div>
        <div>
            <label for="backlog-url-parser">Or, Provide Backlog URL:</label>
            <input type="text" id="backlog-url-parser" placeholder="e.g., https://jira.example.com/backlog.csv" value="${appData.backlogUrl || ''}">
        </div>
        <button id="parse-backlog-btn" class="primary" style="margin-top:15px;">Parse Backlog</button>
        <div id="parser-loader-container" class="hidden" style="text-align:center; margin-top:10px;">
            <div class="loader"></div> Parsing backlog and generating insights...
        </div>
        ${featuresHTML}
        ${feedbackCoverageHTML}
    `;
}

// Step 5: Define Epics (Updated to reflect new appData structure if needed)
function generateDefineEpicsHTML(stepData, appData) {
    let guidanceHTML = '';
    if (appData.user_reviews && appData.user_reviews[0] && appData.user_reviews[0].positive && appData.user_reviews[0].positive.length > 0) {
        guidanceHTML += '<h3>Key User Feedback to Consider:</h3><ul class="selected-findings-list">';
        appData.user_reviews[0].positive.forEach((finding, index) => {
            guidanceHTML += `<li><i class="fas fa-lightbulb" style="color: orange; margin-right: 5px;"></i>${finding}</li>`;
        });
        guidanceHTML += '</ul>';
    } else {
         guidanceHTML = `<p>No specific user feedback from previous steps to display. Define epics based on your project goals.</p>`;
    }

    let existingEpicsHTML = '<h3>Defined Epics:</h3>';
    if (appData.epics && appData.epics.length > 0) {
        existingEpicsHTML += '<ul>';
        appData.epics.forEach(epic => {
            existingEpicsHTML += `<li><strong>${epic.title}</strong>: ${epic.description}</li>`;
        });
        existingEpicsHTML += '</ul>';
    } else {
        existingEpicsHTML += '<p>No epics defined yet.</p>';
    }

    return `
        ${guidanceHTML}
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