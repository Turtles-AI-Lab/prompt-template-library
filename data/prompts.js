/**
 * AI Prompt Template Library
 * Battle-tested prompts for various use cases
 */

const PROMPTS = [
    // CUSTOMER SERVICE
    {
        id: 1,
        title: "Professional Email Response",
        category: "customer-service",
        difficulty: "beginner",
        description: "Generate professional, empathetic customer service email responses",
        prompt: `Act as a customer service representative. Write a professional and empathetic email response to the following customer inquiry:

Customer Message: [PASTE CUSTOMER MESSAGE]

Requirements:
- Address the customer's concern directly
- Show empathy and understanding
- Provide a clear solution or next steps
- Maintain a professional but friendly tone
- Include a call to action if needed`,
        example: "Customer feels heard and receives clear next steps"
    },
    {
        id: 2,
        title: "Handle Angry Customer",
        category: "customer-service",
        difficulty: "intermediate",
        description: "De-escalate angry customer situations with empathy",
        prompt: `You are an expert customer service specialist trained in de-escalation. A customer is upset about: [DESCRIBE ISSUE]

Create a response that:
1. Acknowledges their frustration without being defensive
2. Takes responsibility where appropriate
3. Offers a concrete solution
4. Rebuilds trust and confidence
5. Ends on a positive note

Tone: Empathetic, professional, solution-focused`,
        example: "Turns angry customers into satisfied ones"
    },

    // SALES
    {
        id: 3,
        title: "Cold Email Outreach",
        category: "sales",
        difficulty: "intermediate",
        description: "Craft personalized cold emails that get responses",
        prompt: `Write a cold email for B2B outreach with these details:

Target Company: [COMPANY NAME]
Their Pain Point: [PAIN POINT]
Your Solution: [YOUR PRODUCT/SERVICE]
Your Value Prop: [KEY BENEFIT]

Requirements:
- Keep it under 100 words
- Personalized to their company
- Clear value proposition
- Soft call-to-action
- No pushy sales language`,
        example: "20%+ open rates and 5%+ response rates"
    },
    {
        id: 4,
        title: "Sales Objection Handler",
        category: "sales",
        difficulty: "advanced",
        description: "Generate responses to common sales objections",
        prompt: `I'm selling: [PRODUCT/SERVICE]
Price: [PRICE POINT]
Common objection: "[OBJECTION]"

Provide 3 different ways to handle this objection:
1. Feel-Felt-Found method
2. Question reversal
3. Value reframe

For each method, give:
- The response script
- Why it works
- When to use it`,
        example: "Convert 30-40% of objections into sales"
    },

    // MARKETING
    {
        id: 5,
        title: "Social Media Post Generator",
        category: "marketing",
        difficulty: "beginner",
        description: "Create engaging social media posts for any platform",
        prompt: `Create a social media post for [PLATFORM: LinkedIn/Twitter/Instagram/Facebook]

Topic: [YOUR TOPIC]
Goal: [Engagement/Traffic/Sales/Awareness]
Tone: [Professional/Casual/Humorous/Inspirational]

Include:
- Attention-grabbing hook
- Value-packed content
- Clear call-to-action
- Relevant hashtags (3-5)
- Emoji usage (if appropriate for platform)`,
        example: "2-3x higher engagement than regular posts"
    },
    {
        id: 6,
        title: "Product Description Writer",
        category: "marketing",
        difficulty: "intermediate",
        description: "Write compelling product descriptions that convert",
        prompt: `Write a product description for:

Product: [PRODUCT NAME]
Key Features: [LIST FEATURES]
Target Audience: [WHO IT'S FOR]
Main Benefit: [PRIMARY BENEFIT]
Price Point: [PRICE]

Format:
- Attention-grabbing headline
- 3-4 benefit-focused bullets
- Emotional appeal paragraph
- Trust-building element
- Clear CTA

Focus on benefits over features. Use power words. Create urgency where appropriate.`,
        example: "Conversion rates increase 15-25%"
    },

    // CODING
    {
        id: 7,
        title: "Code Review Assistant",
        category: "coding",
        difficulty: "intermediate",
        description: "Get detailed code reviews with improvement suggestions",
        prompt: `Review this code and provide detailed feedback:

Language: [PROGRAMMING LANGUAGE]
Purpose: [WHAT THE CODE DOES]

\`\`\`
[PASTE CODE HERE]
\`\`\`

Analyze for:
1. Code quality and readability
2. Performance issues
3. Security vulnerabilities
4. Best practices violations
5. Potential bugs

For each issue found:
- Explain the problem
- Show the corrected code
- Explain why the fix is better`,
        example: "Catches 80% of common code issues"
    },
    {
        id: 8,
        title: "Debug Helper",
        category: "coding",
        difficulty: "beginner",
        description: "Get help debugging error messages and bugs",
        prompt: `I'm getting this error:

Error Message: [PASTE ERROR MESSAGE]
Language/Framework: [e.g., Python, React, Node.js]
What I'm trying to do: [BRIEF DESCRIPTION]
Code snippet (if relevant):
\`\`\`
[PASTE CODE]
\`\`\`

Please:
1. Explain what this error means in simple terms
2. Identify the most likely cause
3. Provide step-by-step fix
4. Suggest how to prevent this in the future`,
        example: "Solves 90% of common bugs in minutes"
    },
    {
        id: 9,
        title: "Code Documentation Generator",
        category: "coding",
        difficulty: "beginner",
        description: "Generate comprehensive code documentation",
        prompt: `Generate documentation for this code:

\`\`\`[LANGUAGE]
[PASTE CODE HERE]
\`\`\`

Include:
1. Brief description of what it does
2. Parameters/inputs with types
3. Return value/output
4. Usage example
5. Edge cases and error handling
6. Time/space complexity (if applicable)

Format as proper docstring/comments for [LANGUAGE]`,
        example: "Complete, professional documentation in seconds"
    },

    // CONTENT CREATION
    {
        id: 10,
        title: "Blog Post Outline Creator",
        category: "content",
        difficulty: "beginner",
        description: "Create detailed blog post outlines with SEO focus",
        prompt: `Create a blog post outline for:

Topic: [TOPIC]
Target Audience: [AUDIENCE]
Keywords: [PRIMARY KEYWORD + 2-3 SECONDARY]
Goal: [Inform/Persuade/Entertain/Convert]
Word Count Target: [e.g., 1500 words]

Provide:
1. SEO-optimized title (3 options)
2. Meta description (155 chars)
3. H2/H3 section headers
4. Brief description of what to cover in each section
5. Internal/external link suggestions
6. CTA placement recommendations`,
        example: "Reduces writing time by 50%"
    },
    {
        id: 11,
        title: "Email Subject Line Generator",
        category: "content",
        difficulty: "beginner",
        description: "Create high-converting email subject lines",
        prompt: `Generate 10 email subject lines for:

Email Type: [Newsletter/Promo/Update/Announcement]
Target Audience: [WHO]
Main Message: [WHAT YOU'RE COMMUNICATING]
Goal: [Open Rate/Clicks/Sales]

Variations should include:
- 3 with numbers/lists
- 2 with questions
- 2 with urgency/scarcity
- 2 curiosity-driven
- 1 personalized

Keep all under 50 characters. A/B test ready.`,
        example: "30-50% higher open rates"
    },

    // BUSINESS
    {
        id: 12,
        title: "Meeting Minutes Generator",
        category: "business",
        difficulty: "beginner",
        description: "Convert meeting notes into professional minutes",
        prompt: `Convert these meeting notes into professional meeting minutes:

Meeting: [MEETING NAME/PURPOSE]
Date: [DATE]
Attendees: [LIST ATTENDEES]

Raw Notes:
[PASTE YOUR NOTES]

Format as:
1. Meeting Overview
2. Key Discussion Points
3. Decisions Made
4. Action Items (with owners and deadlines)
5. Next Steps

Use professional language and organize chronologically.`,
        example: "Professional documentation in 1 minute"
    },
    {
        id: 13,
        title: "SWOT Analysis Generator",
        category: "business",
        difficulty: "intermediate",
        description: "Create comprehensive SWOT analysis for any business decision",
        prompt: `Perform a SWOT analysis for:

Company/Project: [NAME]
Industry: [INDUSTRY]
Specific Decision/Situation: [WHAT YOU'RE ANALYZING]

Provide detailed analysis of:
- Strengths: Internal advantages
- Weaknesses: Internal limitations
- Opportunities: External positive factors
- Threats: External risks

For each quadrant:
- List 5-7 points
- Prioritize by impact
- Include brief explanation
- Suggest actionable insights`,
        example: "Strategic clarity in 5 minutes"
    },

    // PRODUCTIVITY
    {
        id: 14,
        title: "Task Breakdown & Prioritization",
        category: "productivity",
        difficulty: "beginner",
        description: "Break down big projects into manageable tasks",
        prompt: `I need to complete: [PROJECT/GOAL]
Deadline: [DATE]
Constraints: [TIME/RESOURCES/DEPENDENCIES]

Please:
1. Break this into 10-15 specific, actionable tasks
2. Estimate time for each task
3. Prioritize using Eisenhower Matrix
4. Suggest optimal sequencing
5. Identify potential bottlenecks
6. Recommend daily/weekly milestones`,
        example: "Complete projects 40% faster"
    },
    {
        id: 15,
        title: "Email Summarizer",
        category: "productivity",
        difficulty: "beginner",
        description: "Summarize long emails into key action items",
        prompt: `Summarize this email into actionable points:

[PASTE EMAIL]

Provide:
1. TL;DR (1 sentence)
2. Key Points (3-5 bullets)
3. Action Items (what I need to do)
4. Important Dates/Deadlines
5. Priority Level (Low/Medium/High/Urgent)
6. Suggested Response (if needed)`,
        example: "Process emails 3x faster"
    },

    // EDUCATION
    {
        id: 16,
        title: "Explain Like I'm 5",
        category: "education",
        difficulty: "beginner",
        description: "Explain complex topics in simple terms",
        prompt: `Explain this complex topic in simple terms:

Topic: [COMPLEX CONCEPT]
My Background: [YOUR KNOWLEDGE LEVEL]
Why I Need to Know: [CONTEXT]

Requirements:
- Use simple language (5th grade reading level)
- Use analogies and examples
- Break into small chunks
- Include visual descriptions
- End with a simple summary
- Suggest resources to learn more`,
        example: "Understand any concept in minutes"
    },
    {
        id: 17,
        title: "Study Guide Creator",
        category: "education",
        difficulty: "intermediate",
        description: "Create comprehensive study guides from any material",
        prompt: `Create a study guide from this material:

Subject: [SUBJECT]
Topic: [SPECIFIC TOPIC]
Exam Date: [DATE]

Material:
[PASTE TEXT/NOTES]

Include:
1. Key Concepts Summary
2. Important Terms & Definitions
3. Practice Questions (10)
4. Quick Reference Facts
5. Common Mistakes to Avoid
6. Memory Aids/Mnemonics
7. Recommended Study Schedule`,
        example: "Ace exams with focused study"
    },

    // ADVANCED PROMPTING
    {
        id: 18,
        title: "Chain-of-Thought Problem Solver",
        category: "productivity",
        difficulty: "advanced",
        description: "Solve complex problems using step-by-step reasoning",
        prompt: `Solve this problem using chain-of-thought reasoning:

Problem: [DESCRIBE PROBLEM]
Context: [RELEVANT BACKGROUND]
Constraints: [LIMITATIONS/REQUIREMENTS]

Think through this step-by-step:
1. First, let's identify what we know...
2. What's the core challenge?
3. What are possible approaches?
4. For each approach, what are pros/cons?
5. Let's work through the best approach...
6. Verify the solution...

Show your reasoning at each step. Question assumptions. Consider edge cases.`,
        example: "Solve complex problems systematically"
    },
    {
        id: 19,
        title: "Role-Play Negotiation",
        category: "sales",
        difficulty: "advanced",
        description: "Practice negotiations with AI as different personalities",
        prompt: `Let's role-play a negotiation. You play: [ROLE: e.g., tough buyer, indecisive client]

Scenario: [DESCRIBE NEGOTIATION CONTEXT]
My Goal: [WHAT I WANT TO ACHIEVE]
Their Position: [THEIR LIKELY STANCE]

After each of my responses, you should:
1. Respond in character
2. Raise realistic objections
3. Test my negotiation skills
4. (After 3-4 exchanges) Provide feedback on my technique

Start with their opening position.`,
        example: "Practice before real negotiations"
    },
    {
        id: 20,
        title: "Content Repurposing Machine",
        category: "marketing",
        difficulty: "intermediate",
        description: "Turn one piece of content into 10+ formats",
        prompt: `Repurpose this content into multiple formats:

Original Content:
[PASTE CONTENT]

Create:
1. Twitter thread (7-10 tweets)
2. LinkedIn post
3. Instagram caption
4. Email newsletter snippet
5. Blog post outline
6. YouTube video script (30 sec)
7. Pinterest pin description
8. Podcast talking points
9. Infographic key points
10. TikTok video idea

Maintain core message but adapt tone and length for each platform.`,
        example: "10x your content output"
    }
];

// Category list (extracted for filters)
const CATEGORIES = [
    { id: 'all', name: 'All Prompts', icon: '🎯' },
    { id: 'customer-service', name: 'Customer Service', icon: '💬' },
    { id: 'sales', name: 'Sales', icon: '💼' },
    { id: 'marketing', name: 'Marketing', icon: '📢' },
    { id: 'coding', name: 'Coding', icon: '💻' },
    { id: 'content', name: 'Content', icon: '✍️' },
    { id: 'business', name: 'Business', icon: '📊' },
    { id: 'productivity', name: 'Productivity', icon: '⚡' },
    { id: 'education', name: 'Education', icon: '📚' }
];
