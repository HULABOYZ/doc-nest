export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: `<h1>Start Your Document</h1>
    <p>Welcome! <em>this is your canvas</em> — type anything and watch it grow.<br><br>
    Use <strong>headings</strong> to organize your ideas.<br><br>
    Create <strong>lists</strong> to keep things neat.<br><br>
    Add <strong>tables</strong> for structured info.<br><br>
    Insert <strong>images</strong> to make it visual and engaging.<br><br>
    Experiment with <em>styles, fonts, and colors</em> — create your way.</p>
`,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `<h1>John Doe</h1><h2>Professional Summary</h2><p><strong>Experienced Software Engineer</strong> with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.</p><h2>Skills</h2><ul><li>JavaScript, TypeScript</li><li>React, Next.js</li><li>Node.js, Express</li><li>Database Management (SQL/NoSQL)</li></ul><h2>Experience</h2><p><strong>Software Engineer</strong> - XYZ Company (2020-Present)</p><ul><li>Developed and maintained web applications.</li><li>Collaborated with cross-functional teams to enhance product performance.</li></ul><h2>Education</h2><p>BSc in Computer Science, University of ABC</p>`,
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `<h1>Dear [Hiring Manager],</h1><p>I am excited to apply for the <strong>[Position]</strong> role at <em>[Company]</em>. My experience in [Your Field] has equipped me with the skills necessary to contribute to your team.</p><p>I have successfully [highlight a key achievement or skill]. I am confident that my expertise in [relevant skills] will be valuable for your company.</p><p>Thank you for your time and consideration.</p><p>Sincerely,<br>[Your Name]</p>`,
  },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
    initialContent: `<h1>[Your Name]</h1><p>[Your Address]</p><p>[City, State ZIP]</p><p>[Date]</p><p>Dear [Recipient Name],</p><p>I am writing to <strong>discuss [topic]</strong>. Please find the details below:</p><ul><li>Point 1</li><li>Point 2</li><li>Point 3</li></ul><p>I look forward to your response.</p><p>Sincerely,<br>[Your Name]</p>`,
  },
  {
    id: "project-proposal",
    label: "Project Proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `<h1>Project Proposal: [Project Name]</h1><h2>Introduction</h2><p>This proposal outlines the project objectives, deliverables, timeline, and budget.</p><h2>Project Objectives</h2><ul><li>Objective 1</li><li>Objective 2</li><li>Objective 3</li></ul><h2>Scope of Work</h2><p>Tasks to be completed:</p><ol><li>Task 1</li><li>Task 2</li><li>Task 3</li></ol><h2>Timeline</h2><p>Phase 1: [Dates]<br>Phase 2: [Dates]<br>Phase 3: [Dates]</p><h2>Budget</h2><p>Estimated costs for each phase or resource.</p><h2>Conclusion</h2><p>Summary of the expected outcomes and benefits.</p>`,
  },
  {
    id: "agreement-template",
    label: "Agreement Template",
    imageUrl: "/agreement-template.svg",
    initialContent: `<h1>Agreement</h1><p>This agreement is made between <strong>[Party A]</strong> and <strong>[Party B]</strong> on <em>[Date]</em>.</p><h2>Terms and Conditions</h2><ul><li>Obligation 1</li><li>Obligation 2</li><li>Obligation 3</li></ul><h2>Duration</h2><p>The agreement will last from [Start Date] to [End Date].</p><h2>Signatures</h2><p>Party A: _______<br>Party B: _______</p>`,
  },
  {
    id: "policy-template",
    label: "Policy Template",
    imageUrl: "/policy-template.svg",
    initialContent: `<h1>[Company Name] Policy</h1><h2>Purpose</h2><p>This policy outlines the rules and guidelines for [Topic].</p><h2>Scope</h2><p>Applies to [Departments/Employees].</p><h2>Policy Details</h2><ul><li>Rule 1</li><li>Rule 2</li><li>Rule 3</li></ul><h2>Compliance</h2><p>Non-compliance may result in [consequence].</p>`,
  },
  {
    id: "software-proposal",
    label: "Software Proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `<h1>Software Proposal: [Software Name]</h1><h2>Overview</h2><p>This proposal details the software solution and its benefits.</p><h2>Key Features</h2><ul><li>Feature 1</li><li>Feature 2</li><li>Feature 3</li></ul><h2>Implementation Plan</h2><p>Steps to deploy the software:</p><ol><li>Step 1</li><li>Step 2</li><li>Step 3</li></ol><h2>Expected Outcomes</h2><p>Explain the benefits to the organization or users.</p>`,
  },
  {
    id: "contract-template",
    label: "Contract",
    imageUrl: "/contract-template.svg",
    initialContent: `<h1>Contract</h1><p>This contract is between <strong>[Party A]</strong> and <strong>[Party B]</strong>, effective from [Start Date] to [End Date].</p><h2>Terms & Conditions</h2><ul><li>Obligation 1</li><li>Obligation 2</li><li>Obligation 3</li></ul><h2>Payment Details</h2><p>Include amounts, deadlines, and payment methods.</p><h2>Signatures</h2><p>Party A: _______<br>Party B: _______</p>`,
  },
  {
    id: "scope-of-work",
    label: "Scope Of Work",
    imageUrl: "/scope-of-work.svg",
    initialContent: `<h1>Scope of Work: [Project Name]</h1><h2>Project Objectives</h2><ul><li>Objective 1</li><li>Objective 2</li></ul><h2>Tasks & Deliverables</h2><ol><li>Task 1</li><li>Task 2</li><li>Deliverable 1</li></ol><h2>Timeline</h2><p>Phase 1: [Dates]<br>Phase 2: [Dates]</p>`,
  },
  {
    id: "research-template",
    label: "Research",
    imageUrl: "/research-template.svg",
    initialContent: `<h1>Research Paper: [Topic]</h1><h2>Abstract</h2><p>Brief overview of the research purpose and results.</p><h2>Introduction</h2><p>Context and research question.</p><h2>Methodology</h2><p>Describe methods, sample, and procedures.</p><h2>Results</h2><p>Present findings in tables or charts.</p><h2>Discussion</h2><p>Interpret results and implications.</p><h2>Conclusion</h2><p>Summarize research outcomes.</p>`,
  },
  {
    id: "analysis-template",
    label: "Analysis",
    imageUrl: "/analysis-template.svg",
    initialContent: `<h1>Analysis Report: [Topic]</h1><h2>Overview</h2><p>Background information about the topic.</p><h2>Data & Findings</h2><ul><li>Finding 1</li><li>Finding 2</li></ul><h2>Interpretation</h2><p>Explain what the data means.</p><h2>Recommendations</h2><p>Provide actionable insights.</p>`,
  },
  {
    id: "case-study",
    label: "Case Study",
    imageUrl: "/case-study.svg",
    initialContent: `<h1>Case Study: [Subject]</h1><h2>Background</h2><p>Describe the context and relevant history.</p><h2>Problem</h2><p>Clearly define the problem or challenge.</p><h2>Solution</h2><p>Explain the solution implemented.</p><h2>Results</h2><p>Include outcomes, metrics, and key takeaways.</p>`,
  },
  {
    id: "syllabus-template",
    label: "Syllabus",
    imageUrl: "/syllabus-template.svg",
    initialContent: `<h1>Course Syllabus: [Course Name]</h1><h2>Instructor</h2><p>Name, contact info, office hours.</p><h2>Course Description</h2><p>Brief overview of the course objectives and learning outcomes.</p><h2>Schedule</h2><ul><li>Week 1: Topic / Reading</li><li>Week 2: Topic / Reading</li></ul><h2>Grading Policy</h2><p>Breakdown of assignments, exams, participation, etc.</p>`,
  },
  {
    id: "plan-template",
    label: "Plan",
    imageUrl: "/plan-template.svg",
    initialContent: `<h1>Plan: [Project or Goal]</h1><h2>Objective</h2><p>Define the goal you want to achieve.</p><h2>Steps</h2><ol><li>Step 1</li><li>Step 2</li><li>Step 3</li></ol><h2>Timeline</h2><p>Specify deadlines for each step.</p><h2>Resources Needed</h2><ul><li>Resource 1</li><li>Resource 2</li></ul>`,
  },
  {
    id: "manual-template",
    label: "Manual",
    imageUrl: "/manual-template.svg",
    initialContent: `<h1>Manual: [Product/Service]</h1><h2>Introduction</h2><p>Purpose of this manual and target audience.</p><h2>Getting Started</h2><p>Step-by-step instructions to begin using the product.</p><h2>Features</h2><ul><li>Feature 1</li><li>Feature 2</li></ul><h2>Maintenance & Safety</h2><p>Tips for proper usage and safety precautions.</p>`,
  },
  {
    id: "proposal-template",
    label: "Proposal",
    imageUrl: "/proposal-template.svg",
    initialContent: `<h1>Proposal: [Project or Idea]</h1><h2>Introduction</h2><p>Explain the purpose of the proposal.</p><h2>Background</h2><p>Provide context and relevant research.</p><h2>Plan & Approach</h2><ol><li>Step 1</li><li>Step 2</li></ol><h2>Expected Outcome</h2><p>Describe the results and benefits.</p>`,
  },
  {
    id: "Itinerary-template",
    label: "Itinerary",
    imageUrl: "/Itinerary-template.svg",
    initialContent: `<h1>Itinerary: [Trip/Event]</h1><h2>Dates</h2><p>Start Date - End Date</p><h2>Daily Schedule</h2><ol><li>Day 1: Activity / Location</li><li>Day 2: Activity / Location</li></ol><h2>Notes</h2><p>Important reminders, packing list, or special instructions.</p>`,
  },
]
