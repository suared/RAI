// js/geminiService.js
async function fetchMarketIntelligence(softwarePrompt, problemStatement = '') {
    console.log("Simulating Gemini API call for:", softwarePrompt, "Specific Problem:", problemStatement);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    let specificProblemInsights = [];
    if (problemStatement) {
        specificProblemInsights = [
            { id: 'sp1', text: `Regarding "${problemStatement}": Users often find competitor X's solution too complex in this area.`, type: 'problem_statement' },
            { id: 'sp2', text: `Regarding "${problemStatement}": Addressing this directly could significantly improve user onboarding friction.`, type: 'problem_statement' },
        ];
    }

    const mockData = {
        reportLink: 'simulated_gemini_deep_research_report.pdf', // Dummy link
        summary: {
            specificProblemInsights: specificProblemInsights,
            competitorFeatures: [
                { id: 'cf1', text: 'Competitor A offers advanced AI-driven analytics for ${softwarePrompt}.', type: 'competitor' },
                { id: 'cf2', text: 'Competitor B has a highly-rated mobile-first interface for similar solutions.', type: 'competitor' },
                { id: 'cf3', text: 'Integration with popular third-party tools is a key feature of Competitor C.', type: 'competitor' },
            ],
            userChallenges: [
                { id: 'uc1', text: 'Users frequently report difficulties with the initial setup process in existing tools for ${softwarePrompt}.', type: 'challenge' },
                { id: 'uc2', text: 'Lack of customizable reporting is a common pain point mentioned in reviews.', type: 'challenge' },
                { id: 'uc3', text: 'Poor customer support from existing solutions leads to high churn.', type: 'challenge' },
            ]
        }
    };
    // Replace placeholder in mock data
    mockData.summary.competitorFeatures.forEach(f => f.text = f.text.replace('${softwarePrompt}', softwarePrompt));
    mockData.summary.userChallenges.forEach(c => c.text = c.text.replace('${softwarePrompt}', softwarePrompt));

    return mockData;
}