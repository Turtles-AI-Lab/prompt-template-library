/**
 * Prompt Template Library - Main Application
 */

// State
let currentFilter = 'all';
let searchTerm = '';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const categoryFilters = document.getElementById('categoryFilters');
const promptsContainer = document.getElementById('promptsContainer');
const noResults = document.getElementById('noResults');
const totalPrompts = document.getElementById('totalPrompts');
const totalCategories = document.getElementById('totalCategories');
const modal = document.getElementById('promptModal');
const modalClose = document.querySelector('.close');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeStats();
    renderCategoryFilters();
    renderPrompts();
    setupEventListeners();
});

/**
 * Initialize stats
 */
function initializeStats() {
    totalPrompts.textContent = PROMPTS.length;
    totalCategories.textContent = CATEGORIES.length - 1; // Exclude "All"
}

/**
 * Render category filter buttons
 */
function renderCategoryFilters() {
    categoryFilters.innerHTML = CATEGORIES.map(cat => `
        <button
            class="filter-btn ${cat.id === 'all' ? 'active' : ''}"
            data-category="${cat.id}"
        >
            ${cat.icon} ${cat.name}
        </button>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentFilter = e.target.dataset.category;

            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            renderPrompts();
        });
    });
}

/**
 * Filter prompts based on search and category
 */
function filterPrompts() {
    let filtered = PROMPTS;

    // Filter by category
    if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }

    // Filter by search term
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(p =>
            p.title.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term) ||
            p.prompt.toLowerCase().includes(term)
        );
    }

    return filtered;
}

/**
 * Render prompts
 */
function renderPrompts() {
    const filtered = filterPrompts();

    if (filtered.length === 0) {
        promptsContainer.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    promptsContainer.innerHTML = filtered.map(prompt => createPromptCard(prompt)).join('');

    // Add click handlers to cards
    document.querySelectorAll('.prompt-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('copy-btn')) {
                const promptId = parseInt(card.dataset.id);
                showPromptModal(promptId);
            }
        });
    });

    // Add click handlers to copy buttons
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const promptId = parseInt(e.target.dataset.id);
            const prompt = PROMPTS.find(p => p.id === promptId);
            copyPrompt(prompt.prompt, e.target);
        });
    });
}

/**
 * Create prompt card HTML
 */
function createPromptCard(prompt) {
    return `
        <div class="prompt-card" data-id="${prompt.id}">
            <div class="prompt-header">
                <h3>${prompt.title}</h3>
            </div>
            <div class="prompt-meta">
                <span class="badge ${prompt.category}">${formatCategory(prompt.category)}</span>
                <span class="badge ${prompt.difficulty}">${prompt.difficulty}</span>
            </div>
            <p class="prompt-description">${prompt.description}</p>
            <div class="prompt-preview">${truncateText(prompt.prompt, 150)}</div>
            <button class="copy-btn" data-id="${prompt.id}">📋 Copy Prompt</button>
        </div>
    `;
}

/**
 * Show prompt in modal
 */
function showPromptModal(promptId) {
    const prompt = PROMPTS.find(p => p.id === promptId);
    if (!prompt) return;

    document.getElementById('modalTitle').textContent = prompt.title;
    document.getElementById('modalCategory').textContent = formatCategory(prompt.category);
    document.getElementById('modalCategory').className = `badge ${prompt.category}`;
    document.getElementById('modalDifficulty').textContent = prompt.difficulty;
    document.getElementById('modalDifficulty').className = `badge ${prompt.difficulty}`;
    document.getElementById('modalDescription').textContent = prompt.description;
    document.getElementById('modalPrompt').textContent = prompt.prompt;

    // Set example if exists
    const exampleBox = document.getElementById('modalExample');
    if (prompt.example) {
        exampleBox.innerHTML = `<h4>💡 Expected Result:</h4><p>${prompt.example}</p>`;
        exampleBox.style.display = 'block';
    } else {
        exampleBox.style.display = 'none';
    }

    // Set copy button
    const modalCopyBtn = document.getElementById('modalCopyBtn');
    modalCopyBtn.onclick = () => copyPrompt(prompt.prompt, modalCopyBtn);

    modal.style.display = 'block';
}

/**
 * Copy prompt to clipboard
 */
function copyPrompt(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = '✅ Copied!';
        button.style.background = '#10b981';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy: ' + err.message);
    });
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        renderPrompts();
    });

    // Modal close
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

/**
 * Format category name for display
 */
function formatCategory(category) {
    return category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Truncate text to specific length
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}
