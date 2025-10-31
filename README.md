# 🎯 AI Prompt Template Library


![GitHub stars](https://img.shields.io/github/stars/Turtles-AI-Lab/prompt-template-library?style=social)
![GitHub forks](https://img.shields.io/github/forks/Turtles-AI-Lab/prompt-template-library?style=social)
![GitHub issues](https://img.shields.io/github/issues/Turtles-AI-Lab/prompt-template-library)
![GitHub license](https://img.shields.io/github/license/Turtles-AI-Lab/prompt-template-library)
![GitHub last commit](https://img.shields.io/github/last-commit/Turtles-AI-Lab/prompt-template-library)


**Free, battle-tested AI prompt templates for ChatGPT, Claude, and other LLMs.**

[![Visitors](https://komarev.com/ghpvc/?username=prompt-template-library&color=blue&style=flat-square&label=Visitors)](https://github.com/Turtles-AI-Lab/prompt-template-library)

## 🌟 Features

- **20+ Professional Prompts**: Battle-tested templates across 8 categories
- **Copy & Use**: One-click copy to clipboard
- **Smart Search**: Find prompts by keyword, category, or use case
- **Detailed Examples**: See what results to expect
- **Difficulty Levels**: Beginner to Advanced
- **Zero Dependencies**: Pure vanilla JavaScript
- **Mobile Responsive**: Works on all devices

## 📂 Categories

- 💬 **Customer Service** - Email responses, de-escalation, support
- 💼 **Sales** - Cold outreach, objection handling, proposals
- 📢 **Marketing** - Social media, product descriptions, campaigns
- 💻 **Coding** - Code review, debugging, documentation
- ✍️ **Content Creation** - Blog outlines, email subject lines, repurposing
- 📊 **Business** - Meeting minutes, SWOT analysis, planning
- ⚡ **Productivity** - Task breakdown, email summarization
- 📚 **Education** - Study guides, concept explanation

## 🚀 Quick Start

### Option 1: Use Online
Simply open `index.html` in your browser - no installation needed!

### Option 2: Clone & Host
```bash
git clone https://github.com/Turtles-AI-Lab/prompt-template-library.git
cd prompt-template-library
open index.html
```

### Option 3: GitHub Pages
Fork this repo and enable GitHub Pages in settings!

## 💡 How to Use

1. **Browse** or search for a prompt that matches your need
2. **Click** on any prompt to see the full template
3. **Copy** the prompt with one click
4. **Customize** by replacing placeholders like `[TOPIC]`
5. **Paste** into ChatGPT, Claude, or any AI
6. **Iterate** based on the results

## 📋 Example Prompts

### Professional Email Response
```
Act as a customer service representative. Write a professional and empathetic
email response to the following customer inquiry:

Customer Message: [PASTE CUSTOMER MESSAGE]

Requirements:
- Address the customer's concern directly
- Show empathy and understanding
- Provide a clear solution or next steps...
```

### Code Review Assistant
```
Review this code and provide detailed feedback:

Language: [PROGRAMMING LANGUAGE]
Purpose: [WHAT THE CODE DOES]

Analyze for:
1. Code quality and readability
2. Performance issues
3. Security vulnerabilities...
```

## 🛠️ Adding Your Own Prompts

Edit `data/prompts.js` and add your prompt:

```javascript
{
    id: 21,
    title: "Your Prompt Title",
    category: "marketing", // or sales, coding, etc.
    difficulty: "beginner", // or intermediate, advanced
    description: "Brief description of what this does",
    prompt: `Your full prompt template here with [PLACEHOLDERS]`,
    example: "What result to expect"
}
```

## 🎨 Customization

### Add New Categories

Edit `data/prompts.js` CATEGORIES array:

```javascript
{ id: 'your-category', name: 'Your Category', icon: '🔥' }
```

### Change Styling

All styles are in `css/style.css`. Modify colors, fonts, layouts to match your brand.

## 📊 Stats

- **20 Prompts** (and growing)
- **8 Categories**
- **3 Difficulty Levels**
- **100% Free & Open Source**

## 🤝 Related Projects

- [Email-to-Ticket Parser](https://github.com/Turtles-AI-Lab/email-to-ticket-parser) - Extract ticket info from emails
- [AI Ticket Classifier](https://github.com/Turtles-AI-Lab/ai-ticket-classifier) - Python ticket classification
- [LLM Cost Calculator](https://github.com/Turtles-AI-Lab/llm-cost-calculator) - Compare AI API costs

## 📝 Contributing

We'd love your prompts! To contribute:

1. Fork this repository
2. Add your prompt to `data/prompts.js`
3. Test it with at least 2 AI models
4. Submit a Pull Request

Please ensure your prompts are:
- Well-tested and reliable
- Clearly documented with examples
- Free of bias and harmful content
- Original or properly attributed

## 💬 Prompt Submission

Have a great prompt to share? Email it to: **jgreenia@jandraisolutions.com**

Include:
- Prompt title and description
- The full prompt template
- Example output
- Which AI models you tested it with

## 📜 License

MIT License - feel free to use these prompts in your projects!

## 🙋 Support

- **Issues**: [GitHub Issues](https://github.com/Turtles-AI-Lab/prompt-template-library/issues)
- **Email**: jgreenia@jandraisolutions.com
- **Discussions**: [GitHub Discussions](https://github.com/Turtles-AI-Lab/prompt-template-library/discussions)

## 🌟 Show Your Support

If you find these prompts useful:
- ⭐ Star this repository
- 🔗 Share with your network
- 🐛 Report bugs or suggest improvements
- ✍️ Contribute your own prompts

---

**Built by [Turtles AI Lab](https://github.com/Turtles-AI-Lab)** | **Free & Open Source**

*Making AI more accessible, one prompt at a time.*
