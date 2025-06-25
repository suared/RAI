// js/geminiService.js
// 
// This service simulates Gemini API calls and uses mock data from the app's data management system.
// All mock data is now managed in app.js for centralized data management.

async function fetchMarketIntelligence(softwarePrompt, problemStatement = '') {
    console.log("Simulating Gemini API call for:", softwarePrompt, "Specific Problem:", problemStatement);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Use new competitors array fields
    const competitors = window.getMockData('competitors');
    const allProblems = competitors.flatMap(c => c.problems || []);
    const allFeatures = competitors.flatMap(c => c.features || []);
    const specificProblemInsights = competitors.flatMap(c => c.user_reviews?.[0]?.positive || []);

    const processedData = {
        specificProblemInsights,
        competitorFeatures: allFeatures.map(f => ({ text: f })),
        userChallenges: allProblems.map(p => ({ text: p }))
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

    // Handle userFeedbacks as array of strings (not objects)
    const feedbackCoverage = {
        notCovered: userFeedbacks.filter((fb, i) => i % 2 !== 0).map((fb, index) => ({ 
            id: `fnc_${index}`, 
            feedbackId: `feedback_${index}`, 
            feedbackText: fb, 
            reason: 'No specific feature in current backlog directly addresses this.' 
        })),
        covered: userFeedbacks.filter((fb, i) => i % 2 === 0).map((fb, index) => ({ 
            id: `fc_${index}`, 
            feedbackId: `feedback_${index}`, 
            feedbackText: fb, 
            relatedFeature: `Mock Feature for: ${fb.substring(0,30)}...` 
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