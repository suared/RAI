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

async function fetchCompanyInsights(projectName = 'New Project') {
    console.log("Simulating Gemini API call for Company Insights for:", projectName);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
        reportLink: 'simulated_gemini_company_insights_report.pdf', // Dummy link
        marketShare: '15% (Estimated)',
        topCompetitors: [
            { id: 'comp1', name: 'Innovatech Solutions', strength: 'Strong R&D, large patent portfolio.' },
            { id: 'comp2', name: 'MarketMover Inc.', strength: 'Aggressive marketing, wide distribution network.' },
            { id: 'comp3', name: 'UserFirst Corp.', strength: 'Excellent customer support, high user retention.' },
        ],
        swot: {
            strengths: [
                { id: 's1', text: 'Unique proprietary algorithm for core functionality.' },
                { id: 's2', text: 'Experienced cross-functional engineering team.' },
            ],
            weaknesses: [
                { id: 'w1', text: 'Limited brand recognition in new target markets.' },
                { id: 'w2', text: 'Current infrastructure may not scale easily for 10x growth.' },
            ],
            opportunities: [
                { id: 'o1', text: 'Growing demand for AI-driven automation in the specified sector.' },
                { id: 'o2', text: 'Potential strategic partnerships with complementary service providers.' },
            ],
            threats: [
                { id: 't1', text: 'Rapid technological advancements by key competitors.' },
                { id: 't2', text: 'Potential for new data privacy regulatory hurdles.' },
            ],
        },
        userFeedbacks: [ // Top 5
            { id: 'uf1', text: 'The onboarding process is too complicated and time-consuming for new users.', priority: 1 },
            { id: 'uf2', text: 'Lack of integration with our existing primary CRM (e.g., Salesforce).', priority: 2 },
            { id: 'uf3', text: 'Reporting features are not customizable enough for our specific business needs.', priority: 3 },
            { id: 'uf4', text: 'The mobile application experience is clunky and significantly slower than desktop.', priority: 4 },
            { id: 'uf5', text: 'Customer support response times are inconsistent, especially for urgent issues.', priority: 5 },
        ]
    };
}

async function fetchParsedBacklog(backlogFile, backlogUrl, userFeedbacks = []) {
    console.log("Simulating Gemini API call for Backlog Parsing. File:", backlogFile, "URL:", backlogUrl);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

    const features = {
        increasedRevenue: [
            { id: 'fr1', text: 'Develop and implement a premium subscription tier offering advanced analytics and priority support.' },
            { id: 'fr2', text: 'Introduce an affiliate marketing program to incentivize referrals and expand reach.' },
        ],
        increasedMarketShare: [
            { id: 'fms1', text: 'Launch a targeted digital marketing campaign focusing on small to medium-sized businesses (SMBs).' },
            { id: 'fms2', text: 'Expand language support to include Spanish and German to cater to European markets.' },
        ],
        timeToMarket: [
            { id: 'fttm1', text: 'Refactor the legacy user authentication module to improve development velocity for new features.' },
            { id: 'fttm2', text: 'Adopt a comprehensive CI/CD pipeline for automated testing and deployments.' },
        ]
    };

    const feedbackCoverage = {
        notCovered: userFeedbacks.filter((fb, i) => i % 2 !== 0).map(fb => ({ id: `fnc_${fb.id}`, feedbackId: fb.id, feedbackText: fb.text, reason: 'No specific feature in current backlog directly addresses this.' })),
        covered: userFeedbacks.filter((fb, i) => i % 2 === 0).map(fb => ({ id: `fc_${fb.id}`, feedbackId: fb.id, feedbackText: fb.text, relatedFeature: `Mock Feature for: ${fb.text.substring(0,30)}...` })),
    };
     if (userFeedbacks.length === 0) {
        feedbackCoverage.notCovered.push({id: 'fc_placeholder', feedbackId: 'none', feedbackText: 'No user feedback was provided to analyze coverage against.', reason: ''});
    }

    return { features, feedbackCoverage };
}