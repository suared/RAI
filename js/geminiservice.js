// js/geminiService.js
// 
// This service simulates Gemini API calls and uses mock data from the app's data management system.
// All mock data is now managed in app.js for centralized data management.

async function fetchMarketIntelligence(softwarePrompt, problemStatement = '') {
    console.log("Simulating Gemini API call for:", softwarePrompt, "Specific Problem:", problemStatement);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get mock data from the app's data management system
    const mockData = window.getMockData('marketIntelligence');
    
    // Replace placeholders with actual values
    const processedData = {
        specificProblemInsights: problemStatement ? mockData.specificProblemInsights : [],
        competitorFeatures: mockData.competitorFeatures.map(f => ({
            ...f,
            text: f.text.replace('{softwarePrompt}', softwarePrompt)
        })),
        userChallenges: mockData.userChallenges.map(c => ({
            ...c,
            text: c.text.replace('{softwarePrompt}', softwarePrompt)
        }))
    };

    return {
        reportLink: 'simulated_gemini_deep_research_report.pdf',
        summary: processedData
    };
}

async function fetchCompanyInsights(projectName = 'New Project') {
    console.log("Simulating Gemini API call for Company Insights for:", projectName);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get mock data from the app's data management system
    const mockData = window.getMockData('companyInsights');

    return {
        reportLink: 'simulated_gemini_company_insights_report.pdf',
        marketShare: mockData.marketShare,
        topCompetitors: mockData.topCompetitors,
        swot: mockData.swot,
        userFeedbacks: mockData.userFeedbacks
    };
}

async function fetchParsedBacklog(backlogFile, backlogUrl, userFeedbacks = []) {
    console.log("Simulating Gemini API call for Backlog Parsing. File:", backlogFile, "URL:", backlogUrl);
    await new Promise(resolve => setTimeout(resolve, 750)); // Simulate network delay

    // Get mock data from the app's data management system
    const mockData = window.getMockData('parsedBacklog');

    const feedbackCoverage = {
        notCovered: userFeedbacks.filter((fb, i) => i % 2 !== 0).map(fb => ({ 
            id: `fnc_${fb.id}`, 
            feedbackId: fb.id, 
            feedbackText: fb.text, 
            reason: 'No specific feature in current backlog directly addresses this.' 
        })),
        covered: userFeedbacks.filter((fb, i) => i % 2 === 0).map(fb => ({ 
            id: `fc_${fb.id}`, 
            feedbackId: fb.id, 
            feedbackText: fb.text, 
            relatedFeature: `Mock Feature for: ${fb.text.substring(0,30)}...` 
        })),
    };
    
    if (userFeedbacks.length === 0) {
        feedbackCoverage.notCovered.push({
            id: 'fc_placeholder', 
            feedbackId: 'none', 
            feedbackText: 'No user feedback was provided to analyze coverage against.', 
            reason: ''
        });
    }

    return { 
        features: mockData.features, 
        feedbackCoverage 
    };
}

// Initialize and log that the service is ready
console.log('GeminiService loaded - using centralized mock data from app.js');