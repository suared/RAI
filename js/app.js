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
    
    // Alternative data sets for different scenarios
    const alternativeDataSets = {
        startup: {
            competitors: [
                {
                    id: 'comp1',
                    name: 'StartupX',
                    company: 'StartupX Inc.',
                    industry: 'Startup Solutions',
                    user_reviews: [
                        {
                            positive: [
                                'Agile development methodology and rapid prototyping.',
                                'Strong community engagement.',
                                'Fast time-to-market for new features.'
                            ],
                            negative: [
                                'Limited financial resources for marketing and sales.',
                                'Small team size limits feature development velocity.',
                                'May lack enterprise-grade security features.'
                            ],
                            site_references: []
                        }
                    ],
                    status: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    id: 'comp2',
                    name: 'TechFlow',
                    company: 'TechFlow Solutions',
                    industry: 'Technology Services',
                    user_reviews: [
                        {
                            positive: [
                                'Strong community engagement.',
                                'Innovative approach to problem solving.',
                                'Good developer experience.'
                            ],
                            negative: [
                                'Limited enterprise features.',
                                'May not scale for large organizations.',
                                'Support can be inconsistent.'
                            ],
                            site_references: []
                        }
                    ],
                    status: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    id: 'comp3',
                    name: 'InnovateLab',
                    company: 'InnovateLab',
                    industry: 'Research & Development',
                    user_reviews: [
                        {
                            positive: [
                                'University partnerships, research focus.',
                                'Cutting-edge technology implementation.',
                                'Strong academic backing.'
                            ],
                            negative: [
                                'May lack practical business focus.',
                                'Limited commercial experience.',
                                'Research-oriented approach may not suit all businesses.'
                            ],
                            site_references: []
                        }
                    ],
                    status: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            ],
            features: [
                {
                    domain: 'User Experience',
                    sub_domain: 'Onboarding',
                    feature: 'Implement freemium model with premium feature upgrades.',
                    version: 'Future',
                    status: 0
                },
                {
                    domain: 'Marketing',
                    sub_domain: 'User Acquisition',
                    feature: 'Create referral program for user acquisition.',
                    version: 'Future',
                    status: 0
                },
                {
                    domain: 'Integration',
                    sub_domain: 'Third Party',
                    feature: 'Develop integrations with popular startup tools.',
                    version: 'Next',
                    status: 0
                },
                {
                    domain: 'Marketing',
                    sub_domain: 'Content',
                    feature: 'Launch content marketing strategy targeting startup community.',
                    version: 'Next',
                    status: 0
                },
                {
                    domain: 'Development',
                    sub_domain: 'MVP',
                    feature: 'Build MVP with core features only.',
                    version: 'Now',
                    status: 0
                },
                {
                    domain: 'Development',
                    sub_domain: 'CI/CD',
                    feature: 'Implement automated testing and deployment pipeline.',
                    version: 'Now',
                    status: 0
                }
            ],
            user_reviews: [
                {
                    positive: [
                        'Need for faster onboarding and setup process.',
                        'Integration with popular startup tools (Slack, Notion, etc.).',
                        'Affordable pricing tiers for small teams.',
                        'API access for custom integrations.',
                        'Responsive customer support for technical issues.'
                    ],
                    negative: [
                        'Limited enterprise features.',
                        'May not scale for large organizations.',
                        'Support can be inconsistent.',
                        'Lack of advanced security features.',
                        'Limited customization options.'
                    ],
                    site_references: []
                }
            ],
            swot: {
                strengths: [
                    'Agile development methodology and rapid prototyping.',
                    'Strong technical founding team with domain expertise.',
                    'Fast time-to-market for new features.',
                    'Innovative approach to problem solving.'
                ],
                weaknesses: [
                    'Limited financial resources for marketing and sales.',
                    'Small team size limits feature development velocity.',
                    'May lack enterprise-grade security features.',
                    'Limited brand recognition.'
                ],
                opportunities: [
                    'Untapped market segment with growing demand.',
                    'Potential for strategic partnerships with larger companies.',
                    'Growing startup ecosystem.',
                    'Increasing demand for agile solutions.'
                ],
                threats: [
                    'Established competitors with deep pockets.',
                    'Economic downturn affecting funding availability.',
                    'Larger companies entering the market.',
                    'Rapid technological changes.'
                ]
            }
        }
    };
    
    // Consolidated app data with default mock data
    let appData = {
        // User input data - aligned with backend structure
        name: '',
        goals: [],
        problem_statements: [],
        backlogFile: null,
        backlogUrl: '',
        epics: [],
        marketShare: '15% (Estimated)',
        competitors: [
            {
                id: 'comp1',
                name: 'Innovatech Solutions',
                company: 'Innovatech',
                industry: 'Enterprise Software',
                marketShare: '10%',
                problems: [
                    'Problem 1 for Innovatech',
                    'Problem 2 for Innovatech'
                ],
                features: [
                    'Feature 1 for Innovatech',
                    'Feature 2 for Innovatech'
                ],
                user_reviews: [
                    {
                        positive: [
                            'Strong R&D, large patent portfolio.',
                            'Comprehensive feature set for enterprise needs.',
                            'Excellent integration capabilities.'
                        ],
                        negative: [
                            'High cost and complex licensing.',
                            'Steep learning curve for new users.',
                            'Implementation can be lengthy and expensive.'
                        ],
                        site_references: []
                    }
                ],
                status: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 'comp2',
                name: 'MarketMover Inc.',
                company: 'MarketMover',
                industry: 'Business Solutions',
                user_reviews: [
                    {
                        positive: [
                            'Aggressive marketing, wide distribution network.',
                            'Competitive pricing for mid-market.',
                            'Good customer support.'
                        ],
                        negative: [
                            'Feature set may be limited for enterprise.',
                            'Integration challenges with legacy systems.',
                            'Reporting capabilities could be improved.'
                        ],
                        site_references: []
                    }
                ],
                status: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 'comp3',
                name: 'UserFirst Corp.',
                company: 'UserFirst',
                industry: 'User Experience Solutions',
                user_reviews: [
                    {
                        positive: [
                            'Excellent customer support, high user retention.',
                            'Intuitive user interface design.',
                            'Strong focus on user experience.'
                        ],
                        negative: [
                            'Limited advanced features for power users.',
                            'May not scale well for large enterprises.',
                            'Customization options are limited.'
                        ],
                        site_references: []
                    }
                ],
                status: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ],
        features: [
            {
                domain: 'User Experience',
                sub_domain: 'Onboarding',
                feature: 'Implement an AI-driven configuration wizard that simplifies the setup process, using natural language processing to understand user requirements and configure the system accordingly.',
                version: 'Future',
                status: 0
            },
            {
                domain: 'Backend',
                sub_domain: 'Analytics & Reporting',
                feature: 'Develop an innovative suite of LLM (Large Language Models) and Agent Technology for predictive analytics, offering insights into trends and predictive needs.',
                version: 'Now',
                status: 0
            },
            {
                domain: 'Business Model',
                sub_domain: 'Pricing Strategy',
                feature: 'Introduce a modular pricing strategy that allows smaller organizations to select and pay for only the features they need, reducing the overall cost barrier.',
                version: 'Future',
                status: 0
            },
            {
                domain: 'User Interface',
                sub_domain: 'Reporting',
                feature: 'Create a more intuitive and guided reporting tool that allows users with no technical background to easily build and modify reports through a drag-and-drop interface and natural language queries.',
                version: 'Future',
                status: 0
            },
            {
                domain: 'API',
                sub_domain: 'Integration',
                feature: 'Launch an integration hub that simplifies the process of connecting with third-party systems, offering pre-built connectors, simplified APIs, and an integration support team to assist customers.',
                version: 'Next',
                status: 0
            }
        ],
        user_reviews: [
            {
                positive: [
                    'The onboarding process is too complicated and time-consuming for new users.',
                    'Lack of integration with our existing primary CRM (e.g., Salesforce).',
                    'Reporting features are not customizable enough for our specific business needs.',
                    'The mobile application experience is clunky and significantly slower than desktop.',
                    'Customer support response times are inconsistent, especially for urgent issues.'
                ],
                negative: [
                    'High cost, especially for smaller organizations.',
                    'Complex and lengthy implementation process.',
                    'Configuration and customization can be challenging.',
                    'Reporting can be difficult for average users to build/modify.',
                    'Integration challenges with some third-party systems.'
                ],
                site_references: []
            }
        ],
        swot: {
            strengths: [
                'Unique proprietary algorithm for core functionality.',
                'Experienced cross-functional engineering team.',
                'Strong market position and brand recognition.',
                'Comprehensive suite of integrated applications.',
                'History of innovation, particularly in cloud-based solutions.'
            ],
            weaknesses: [
                'Limited brand recognition in new target markets.',
                'Current infrastructure may not scale easily for 10x growth.',
                'High cost and potentially complex pricing/licensing.',
                'Complexity in implementation, configuration, and ongoing management.',
                'Steep learning curve and potential challenges with user adoption.'
            ],
            opportunities: [
                'Growing demand for AI-driven automation in the specified sector.',
                'Potential strategic partnerships with complementary service providers.',
                'Increasing demand for AI and automation features.',
                'Need for integrated business processes and data across functions.',
                'Ongoing digital transformation initiatives within businesses.'
            ],
            threats: [
                'Rapid technological advancements by key competitors.',
                'Potential for new data privacy regulatory hurdles.',
                'Intense competition from established players and agile challengers.',
                'Availability of more affordable or value-focused solutions.',
                'Increasing concerns around data privacy, security, and compliance.'
            ]
        }
    };

    // Mock data management functions
    function switchMockData(dataSetName) {
        if (alternativeDataSets[dataSetName]) {
            // Update appData with the alternative data set
            const newData = alternativeDataSets[dataSetName];
            appData.competitors = newData.competitors;
            appData.features = newData.features;
            appData.user_reviews = newData.user_reviews;
            appData.swot = newData.swot;
            
            console.log(`Mock data switched to: ${dataSetName}`);
        } else {
            console.warn(`Data set "${dataSetName}" not found. Available sets:`, Object.keys(alternativeDataSets));
        }
    }

    function getAvailableDataSets() {
        return ['default', ...Object.keys(alternativeDataSets)];
    }

    function getMockData(dataType) {
        // Check if we should auto-switch based on project name
        if (appData.name && appData.name.toLowerCase().includes('startup')) {
            // Auto-switch to startup data if not already switched
            const currentCompetitors = appData.competitors[0]?.name;
            if (currentCompetitors !== 'StartupX') {
                switchMockData('startup');
            }
        }
        
        console.log(`Getting mock data for: ${dataType}`);
        
        // Return data based on the new structure
        if (dataType === 'competitors') {
            return appData.competitors;
        } else if (dataType === 'features') {
            return appData.features;
        } else if (dataType === 'user_reviews') {
            return appData.user_reviews;
        } else if (dataType === 'swot') {
            return appData.swot;
        } else if (dataType === 'parsedBacklog') {
            // Always return an object with features and feedbackCoverage fields
            return {
                features: appData.features || [],
                feedbackCoverage: appData.feedbackCoverage || { notCovered: [], covered: [] }
            };
        } else {
            // For legacy compatibility, return the appropriate data
            const mockData = appData[dataType];
            
            // Replace placeholders with actual values from appData
            if (dataType === 'marketShare' && appData.problem_statements && appData.problem_statements.length > 0) {
                const problemStatement = appData.problem_statements[0];
                mockData.specificProblemInsights = mockData.specificProblemInsights.map(insight => ({
                    ...insight,
                    text: insight.text.replace('this area', `"${problemStatement}"`)
                }));
            }
            
            return mockData;
        }
    }

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
        
        // Log mock data management status
        console.log('App initialized with mock data sets:', getAvailableDataSets());
        console.log('Use switchMockData("startup") to switch data sets');
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
        if (appData.name) furthest = Math.max(furthest, 1); // Can go to Prep-Insights if Goals is done
        if (appData.name) furthest = Math.max(furthest, 2); // Can go to Company Insights if Goals is done (Prep is optional)
        if (appData.competitors && appData.competitors.length > 0) furthest = Math.max(furthest, 3); // Can go to Backlog Parser if Insights are loaded
        if (appData.competitors && appData.competitors.length > 0) furthest = Math.max(furthest, 4); // Can go to Epics if Insights are loaded
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

    async function renderStepContent(index) {
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
        
        // Always render using the new structure for company-insights
        dynamicContentContainer.innerHTML = stepData.contentGenerator(stepData, appData);


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

    // --- API Integration for /run-flow ---
    let currentRunFlowRequestId = null;
    let currentRunFlowStatus = null;

    async function startRunFlow() {
        const idToken = window.getGoogleIdToken && window.getGoogleIdToken();
        if (!idToken) {
            alert('You must be signed in with Google to start the flow.');
            return;
        }
        // Prepare payload
        const payload = {
            product_name: appData.name,
            goals: appData.goals,
            problem_statements: appData.problem_statements
        };
        // Show loading/progress message
        showRunFlowStatus('Submitting to backend...');
        try {
            const response = await fetch('/run-flow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + idToken
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (data.success) {
                // Store request_id for SSE (to be used in next step)
                currentRunFlowRequestId = data.request_id || null;
                currentRunFlowStatus = 'pending';
                showRunFlowStatus('Flow started! Waiting for backend processing...');
                // (SSE integration will be added next)
            } else {
                showRunFlowStatus('Backend error: ' + (data.error || data.message));
            }
        } catch (err) {
            showRunFlowStatus('Network or server error: ' + err.message);
        }
    }

    function showRunFlowStatus(msg) {
        let statusDiv = document.getElementById('run-flow-status');
        if (!statusDiv) {
            statusDiv = document.createElement('div');
            statusDiv.id = 'run-flow-status';
            statusDiv.style.margin = '16px 0';
            statusDiv.style.padding = '8px';
            statusDiv.style.background = '#f0f0f0';
            statusDiv.style.borderRadius = '6px';
            statusDiv.style.textAlign = 'center';
            document.body.insertBefore(statusDiv, document.body.firstChild);
        }
        statusDiv.textContent = msg;
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
            appData.name = projectNameInput.value.trim();
            // Convert comma-separated goals to array
            appData.goals = corporateGoalsInput.value.trim().split(',').map(goal => goal.trim()).filter(goal => goal.length > 0);
            
            // Initialize to ensure a fresh list from DOM, preventing duplicates on save
            appData.problem_statements = [];
            document.querySelectorAll('.problem-statement-input').forEach(input => {
                if (input.value.trim()) {
                    appData.problem_statements.push(input.value.trim()); // Add only non-empty, trimmed values
                }
            });
            // --- Call backend after goals step is saved ---
            startRunFlow();
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
        if (stepData.id === 'company-insights') {
            document.querySelectorAll('.editable-insight').forEach(input => {
                const path = input.dataset.path.split('.');
                let obj = appData;
                try {
                    if (path[0] === 'competitors') {
                        const comp = obj.competitors.find(c => c.id === path[1]);
                        if(comp) {
                            if (path[2] === 'user_reviews' && path[3] === '0' && path[4] === 'positive') {
                                const index = parseInt(path[5]);
                                if (comp.user_reviews[0] && comp.user_reviews[0].positive) {
                                    comp.user_reviews[0].positive[index] = input.value;
                                }
                            }
                        }
                    } else if (path[0] === 'swot') {
                        const index = parseInt(path[2]);
                        if (obj.swot[path[1]] && obj.swot[path[1]][index] !== undefined) {
                            obj.swot[path[1]][index] = input.value;
                        }
                    } else if (path[0] === 'user_reviews') {
                        const index = parseInt(path[3]);
                        if (obj.user_reviews[0] && obj.user_reviews[0].positive) {
                            obj.user_reviews[0].positive[index] = input.value;
                        }
                    } else if (path[0] === 'marketShare') {
                        obj.marketShare = input.value;
                    }
                } catch (e) { console.warn("Could not save insight field:", path.join('.'), e); }
            });
            return true;
        }
        if (stepData.id === 'backlog-parser') {
            const parseBtn = document.getElementById('parse-backlog-btn');
            const loader = document.getElementById('parser-loader-container');
            const dynamicContentContainer = document.getElementById('dynamic-step-content');

            if (parseBtn && loader && dynamicContentContainer) {
                parseBtn.addEventListener('click', async () => {
                    loader.classList.remove('hidden');
                    parseBtn.disabled = true;
                    // Clear any previous error messages
                    const existingError = dynamicContentContainer.querySelector('.error');
                    if (existingError) {
                        existingError.remove();
                    }
                    try {
                        // Ensure latest backlogFile/URL is saved to appData before fetching
                        validateAndSaveStep(index);
                        const parsed = await fetchParsedBacklog(appData.backlogFile ? appData.backlogFile.name : null, appData.backlogUrl, appData.user_reviews?.[0]?.positive);
                        appData.features = parsed.features || [];
                        appData.feedbackCoverage = parsed.feedbackCoverage || null;
                        // Re-render the dynamic content of this step to show parsed data
                        dynamicContentContainer.innerHTML = flowSteps[index].contentGenerator(flowSteps[index], appData);
                        attachStepEventListeners(index);
                    } catch (error) {
                        console.error("Error parsing backlog:", error);
                        const errorDiv = document.createElement('div');
                        errorDiv.className = 'error';
                        errorDiv.innerHTML = '<p>Failed to parse backlog. Please try again.</p>';
                        dynamicContentContainer.insertBefore(errorDiv, dynamicContentContainer.firstChild);
                    } finally {
                        loader.classList.add('hidden');
                        parseBtn.disabled = false;
                    }
                });
            }
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
                        // 1. Capture current values from ALL input fields before re-rendering
                        const projectNameInput = document.getElementById('project-name');
                        const corporateGoalsInput = document.getElementById('corporate-goals');
                        const problemInputs = document.querySelectorAll('.problem-statement-input');
                        
                        // Save all current values to appData
                        if (projectNameInput) {
                            appData.name = projectNameInput.value.trim();
                        }
                        if (corporateGoalsInput) {
                            appData.goals = corporateGoalsInput.value.trim().split(',').map(goal => goal.trim()).filter(goal => goal.length > 0);
                        }
                        
                        const currentStatements = Array.from(problemInputs).map(input => input.value.trim());
                        appData.problem_statements = currentStatements.filter(statement => statement.length > 0);

                        // 2. Add a new empty problem statement to the array for the new input field
                        appData.problem_statements.push(''); 
                        
                        // 3. Re-render the content based on the updated appData
                        dynamicContentContainer.innerHTML = flowSteps[index].contentGenerator(flowSteps[index], appData);
                        
                        // 4. Re-attach all event listeners for the new content
                        attachStepEventListeners(index); // Re-attach listeners
                    }
                });
            }
            document.querySelectorAll('.remove-problem-statement-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idxToRemove = parseInt(e.target.dataset.index, 10);
                    const dynamicContentContainer = document.getElementById('dynamic-step-content');

                    if (dynamicContentContainer) {
                        // 1. Capture current values from ALL input fields before re-rendering
                        const projectNameInput = document.getElementById('project-name');
                        const corporateGoalsInput = document.getElementById('corporate-goals');
                        const problemInputs = document.querySelectorAll('.problem-statement-input');
                        
                        // Save all current values to appData
                        if (projectNameInput) {
                            appData.name = projectNameInput.value.trim();
                        }
                        if (corporateGoalsInput) {
                            appData.goals = corporateGoalsInput.value.trim().split(',').map(goal => goal.trim()).filter(goal => goal.length > 0);
                        }
                        
                        const currentStatements = Array.from(problemInputs).map(input => input.value.trim());
                        appData.problem_statements = currentStatements.filter(statement => statement.length > 0);

                        // 2. Remove the specified problem statement
                        if (idxToRemove >= 0 && idxToRemove < appData.problem_statements.length) {
                            appData.problem_statements.splice(idxToRemove, 1);
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
                    // Clear any previous error messages
                    const existingError = dynamicContentContainer.querySelector('.error');
                    if (existingError) {
                        existingError.remove();
                    }
                    try {
                        // Ensure latest backlogFile/URL is saved to appData before fetching
                        validateAndSaveStep(index);
                        const parsed = await fetchParsedBacklog(appData.backlogFile ? appData.backlogFile.name : null, appData.backlogUrl, appData.user_reviews?.[0]?.positive);
                        appData.features = parsed.features || [];
                        appData.feedbackCoverage = parsed.feedbackCoverage || null;
                        // Re-render the dynamic content of this step to show parsed data
                        dynamicContentContainer.innerHTML = flowSteps[index].contentGenerator(flowSteps[index], appData);
                        attachStepEventListeners(index);
                    } catch (error) {
                        console.error("Error parsing backlog:", error);
                        const errorDiv = document.createElement('div');
                        errorDiv.className = 'error';
                        errorDiv.innerHTML = '<p>Failed to parse backlog. Please try again.</p>';
                        dynamicContentContainer.insertBefore(errorDiv, dynamicContentContainer.firstChild);
                    } finally {
                        loader.classList.add('hidden');
                        parseBtn.disabled = false;
                    }
                });
            }
        }
    }

    init();
    window.getMockData = getMockData;
});