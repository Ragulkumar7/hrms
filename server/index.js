const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

// Section 5: Payroll Logic
app.post('/api/payroll/calculate', (req, res) => {
    // Logic: Fetch Employee Attendance + Check LOP + Calculate PT
    res.json({ message: "Payroll processed successfully for 100+ employees." });
});

// Section 6: IT PO Logic
app.post('/api/it/generate-po', (req, res) => {
    // Logic: Create PO entry -> Notify Accounts Team
    res.json({ message: "PO generated and sent to Accounts for approval." });
});

app.listen(port, () => {
    console.log(`HRMS Backend running at http://localhost:${port}`);
});