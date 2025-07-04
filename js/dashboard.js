// js/dashboard.js
try {
    console.log("dashboard.js script started.");

    const chartData = {
        ideaGeneration: {
            title: "Idea Generation (Count)",
            unit: "Count",
            yAxisLabels: ["250", "200", "150", "100", "50", "0"],
            yAxisMaxValue: 250,
            series: [
                { name: "New", label: "new", color: "#4e79a7" },
                { name: "Existing", label: "existing", color: "#f28e2b" },
                { name: "Potential", label: "potential", color: "#e15759" },
                { name: "Internal", label: "internal", color: "#76b7b2" },
                { name: "Future", label: "future", color: "#59a14f" }
            ],
            categories: [
                { name: "Very Small", values: [40, 60, 30, 50, 20] },
                { name: "Small", values: [70, 160, 60, 80, 50] },
                { name: "Medium", values: [120, 140, 110, 130, 100] },
                { name: "Large", values: [180, 200, 170, 190, 160] },
                { name: "Xtra-Large", values: [220, 240, 210, 230, 200] }
            ]
        },
        prioritization: {
            title: "Prioritization ($)",
            unit: "$",
            yAxisLabels: ["250k", "200k", "150k", "100k", "50k", "0"],
            yAxisMaxValue: 250000,
            series: [
                { name: "New", label: "new", color: "#4e79a7" },
                { name: "Existing", label: "existing", color: "#f28e2b" },
                { name: "Potential", label: "potential", color: "#e15759" },
                { name: "Internal", label: "internal", color: "#76b7b2" },
                { name: "Future", label: "future", color: "#59a14f" }
            ],
            categories: [
                { name: "Revenue $", values: [150000, 120000, 100000, 80000, 50000] },
                { name: "Cost Saving $", values: [200000, 180000, 160000, 140000, 120000] },
                { name: "Compliance $", values: [90000, 110000, 130000, 150000, 170000] },
                { name: "Support $", values: [60000, 80000, 100000, 120000, 140000] }
            ]
        },
        featureEngineering: {
            title: "Feature Engineering (Hours)",
            unit: "Hours",
            yAxisLabels: ["25000", "20000", "15000", "10000", "5000", "0"],
            yAxisMaxValue: 25000,
            series: [
                { name: "Automation Plan", label: "new", color: "#4e79a7" },
                { name: "Human Plan", label: "existing", color: "#f28e2b" },
                { name: "Automation Actual", label: "potential", color: "#e15759" },
                { name: "Human Actual", label: "internal", color: "#76b7b2" }
            ],
            categories: [
                { name: "New", values: [4000, 6000, 3000, 5000] },
                { name: "Existing", values: [7000, 16000, 6000, 8000] },
                { name: "Potential", values: [12000, 14000, 11000, 13000] },
                { name: "Internal", values: [18000, 20000, 17000, 19000] },
                { name: "Future", values: [22000, 24000, 21000, 23000] },
                { name: "Support", values: [12000, 4000, 2000, 20000] }
            ]
        }
    };

    function renderChart(containerId, data) {
        try {
            console.log(`Rendering chart for: ${containerId}`);
            const container = document.getElementById(containerId);
            if (!container) {
                console.error(`Container with ID '${containerId}' not found.`);
                return;
            }

            const chartAreaHeight = 250; // Corresponds to the height in CSS

            let chartHTML = `<h3>${data.title}</h3><div class="chart" data-unit="${data.unit || ''}">`;
            
            chartHTML += '<div class="y-axis">';
            data.yAxisLabels.forEach(label => chartHTML += `<span>${label}</span>`);
            chartHTML += '</div>';

            chartHTML += '<div class="chart-content"><div class="chart-bars">';
            data.categories.forEach(category => {
                chartHTML += '<div class="bar-cluster"><div class="cluster-bars">';
                category.values.forEach((value, index) => {
                    const series = data.series[index];
                    const height = (value / data.yAxisMaxValue) * chartAreaHeight;
                    chartHTML += `<div class="bar" style="height: ${height}px;" data-value="${value}" data-label="${series.label}"></div>`;
                });
                chartHTML += `</div><div class="cluster-label">${category.name}</div></div>`;
            });
            chartHTML += '</div></div>';

            chartHTML += '<div class="legend">';
            data.series.forEach(series => {
                chartHTML += `<div class="legend-item" data-label="${series.label}">${series.name}</div>`;
            });
            chartHTML += '</div></div>';

            container.innerHTML = chartHTML;
            console.log(`Finished rendering chart for: ${containerId}`);
        } catch (e) {
            console.error(`An error occurred in renderChart for ${containerId}:`, e);
        }
    }

    const supportTableData = [
        {
            customerId: "1",
            customerName: "Customer 1",
            details: "Details for Customer 1",
            actions: [
                { description: "Significant new support tickets detected", completed: false },
                { description: "Customer infrastructure cost threshold is high", completed: false }
            ]
        },
        {
            customerId: "2",
            customerName: "Customer 2",
            details: "Details for Customer 2",
            actions: [
                { description: "Insufficient use for paid license", completed: false }
            ]
        }
    ];

    function renderSupportTable(data) {
        const tableBody = document.getElementById('support-table-body');
        if (!tableBody) {
            console.error("Support table body not found.");
            return;
        }

        let tableHTML = "";
        data.forEach(customer => {
            const openActionCount = customer.actions.filter(action => !action.completed).length;
            tableHTML += `
                <tr class="customer-row" data-customer-id="${customer.customerId}">
                    <td>${customer.customerName}</td>
                    <td>${customer.details}</td>
                    <td class="action-count">${openActionCount}</td>
                </tr>
            `;
            customer.actions.forEach(action => {
                tableHTML += `
                    <tr class="action-row" data-customer-id="${customer.customerId}" style="display: none;">
                        <td colspan="2">${action.description}</td>
                        <td><input type="checkbox" class="completion-status" ${action.completed ? 'checked' : ''} /></td>
                    </tr>
                `;
            });
        });

        tableBody.innerHTML = tableHTML;
    }

    function initializeDashboard() {
        renderChart("idea-generation-chart-container", chartData.ideaGeneration);
        renderChart("prioritization-chart-container", chartData.prioritization);
        renderChart("feature-engineering-chart-container", chartData.featureEngineering);
        renderSupportTable(supportTableData);

        console.log("Attaching event listeners for dashboard.");
        document.querySelectorAll('.section-title').forEach(title => {
            title.addEventListener('click', () => {
                const section = title.parentElement;
                section.classList.toggle('collapsed');
            });
        });

        document.querySelectorAll('.bar').forEach(bar => {
            const value = bar.dataset.value;
            const unit = bar.closest('.chart').dataset.unit || '';
            const valueSpan = document.createElement('span');
            valueSpan.classList.add('bar-value');
            if (unit === '$') {
                valueSpan.textContent = `$${(value / 1000).toFixed(0)}k`;
            } else {
                valueSpan.textContent = value;
            }
            bar.appendChild(valueSpan);
        });
        console.log("Dashboard script finished.");
    }

    function initializeSupportTable() {
        const tableBody = document.getElementById('support-table-body');
        if (!tableBody) {
            console.error("Support table body not found.");
            return;
        }

        tableBody.addEventListener('click', event => {
            const target = event.target;
            if (target.closest('.customer-row')) {
                const customerRow = target.closest('.customer-row');
                const customerId = customerRow.dataset.customerId;
                const actionRows = document.querySelectorAll(`.action-row[data-customer-id='${customerId}']`);
                
                actionRows.forEach(actionRow => {
                    actionRow.style.display = actionRow.style.display === 'none' ? 'table-row' : 'none';
                });
            }
        });

        tableBody.addEventListener('change', event => {
            const target = event.target;
            if (target.classList.contains('completion-status')) {
                const actionRow = target.closest('.action-row');
                const customerId = actionRow.dataset.customerId;
                const customerRow = document.querySelector(`.customer-row[data-customer-id='${customerId}']`);
                const actionRows = document.querySelectorAll(`.action-row[data-customer-id='${customerId}']`);
                
                const openActionCount = Array.from(actionRows).filter(row => !row.querySelector('.completion-status').checked).length;
                customerRow.querySelector('.action-count').textContent = openActionCount;
            }
        });
    }

    function initializeSupportTableActions() {
        const expandAllBtn = document.getElementById('expand-all-btn');
        const collapseAllBtn = document.getElementById('collapse-all-btn');

        if (expandAllBtn) {
            expandAllBtn.addEventListener('click', () => {
                document.querySelectorAll('.action-row').forEach(row => {
                    row.style.display = 'table-row';
                });
            });
        }

        if (collapseAllBtn) {
            collapseAllBtn.addEventListener('click', () => {
                document.querySelectorAll('.action-row').forEach(row => {
                    row.style.display = 'none';
                });
            });
        }
    }

    initializeDashboard();
    initializeSupportTable();
    initializeSupportTableActions();

} catch (e) {
    console.error("An error occurred during dashboard script execution:", e);
}
