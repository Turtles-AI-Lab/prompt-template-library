/**
 * Prompt Template Library - Main Application
 * Security-hardened version with all vulnerabilities fixed
 */

// State
let currentFilter = 'all';
let searchTerm = '';

// DOM Elements - with null checks
const searchInput = document.getElementById('searchInput');
const categoryFilters = document.getElementById('categoryFilters');
const promptsContainer = document.getElementById('promptsContainer');
const noResults = document.getElementById('noResults');
const totalPrompts = document.getElementById('totalPrompts');
const totalCategories = document.getElementById('totalCategories');
const modal = document.getElementById('promptModal');
const modalClose = document.querySelector('.close');

/**
 * Utility: Escape HTML to prevent XSS
 */
function escapeHtml(unsafe) {
    if (unsafe === null || unsafe === undefined) return '';
    return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Utility: Sanitize CSS class names to prevent injection
 */
function sanitizeCssClass(className) {
    if (!className || typeof className !== 'string') return '';
    // Only allow alphanumeric, hyphens, and underscores
    return className.replace(/[^a-zA-Z0-9_-]/g, '');
}

/**
 * Utility: Validate data arrays
 */
function validateData() {
    if (!window.PROMPTS || !Array.isArray(window.PROMPTS)) {
        console.error('PROMPTS data is missing or invalid');
        window.PROMPTS = [];
    }
    if (!window.CATEGORIES || !Array.isArray(window.CATEGORIES)) {
        console.error('CATEGORIES data is missing or invalid');
        window.CATEGORIES = [{ id: 'all', name: 'All Prompts', icon: '🎯' }];
    }
}

/**
 * Utility: Check if required DOM elements exist
 */
function checkDomElements() {
    const requiredElements = {
        searchInput,
        categoryFilters,
        promptsContainer,
        noResults,
        totalPrompts,
        totalCategories,
        modal,
        modalClose
    };

    for (const [name, element] of Object.entries(requiredElements)) {
        if (!element) {
            console.error(`Required DOM element '${name}' not found`);
            return false;
        }
    }
    return true;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    try {
        validateData();
        if (!checkDomElements()) {
            console.error('Failed to initialize: missing required DOM elements');
            return;
        }
        initializeStats();
        renderCategoryFilters();
        renderPrompts();
        setupEventListeners();
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

/**
 * Initialize stats
 */
function initializeStats() {
    try {
        if (totalPrompts && Array.isArray(PROMPTS)) {
            totalPrompts.textContent = PROMPTS.length;
        }
        if (totalCategories && Array.isArray(CATEGORIES)) {
            totalCategories.textContent = CATEGORIES.length - 1; // Exclude "All"
        }
    } catch (error) {
        console.error('Error initializing stats:', error);
    }
}

/**
 * Render category filter buttons - XSS safe using DOM methods
 */
function renderCategoryFilters() {
    try {
        if (!categoryFilters || !Array.isArray(CATEGORIES)) return;

        // Clear existing content safely
        categoryFilters.textContent = '';

        CATEGORIES.forEach(cat => {
            const button = document.createElement('button');
            button.className = cat.id === 'all' ? 'filter-btn active' : 'filter-btn';

            // Sanitize category ID before using as data attribute
            const sanitizedId = sanitizeCssClass(cat.id);
            button.setAttribute('data-category', sanitizedId);

            // Safely set text content (no HTML injection possible)
            button.textContent = `${cat.icon || ''} ${cat.name || ''}`;

            // Add click handler with error handling
            button.addEventListener('click', (e) => {
                try {
                    const target = e.currentTarget;
                    currentFilter = target.dataset.category || 'all';

                    // Update active state
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    target.classList.add('active');

                    renderPrompts();
                } catch (error) {
                    console.error('Error in filter button click handler:', error);
                }
            });

            categoryFilters.appendChild(button);
        });
    } catch (error) {
        console.error('Error rendering category filters:', error);
    }
}

/**
 * Filter prompts based on search and category
 */
function filterPrompts() {
    try {
        if (!Array.isArray(PROMPTS)) return [];

        let filtered = [...PROMPTS]; // Create a copy to avoid mutation

        // Filter by category
        if (currentFilter && currentFilter !== 'all') {
            filtered = filtered.filter(p => p && p.category === currentFilter);
        }

        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(p => {
                if (!p) return false;
                const title = (p.title || '').toLowerCase();
                const description = (p.description || '').toLowerCase();
                const category = (p.category || '').toLowerCase();
                const prompt = (p.prompt || '').toLowerCase();

                return title.includes(term) ||
                       description.includes(term) ||
                       category.includes(term) ||
                       prompt.includes(term);
            });
        }

        return filtered;
    } catch (error) {
        console.error('Error filtering prompts:', error);
        return [];
    }
}

/**
 * Render prompts - XSS safe using DOM methods
 */
function renderPrompts() {
    try {
        if (!promptsContainer || !noResults) return;

        const filtered = filterPrompts();

        if (filtered.length === 0) {
            promptsContainer.textContent = ''; // Clear safely
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';

        // Clear existing content safely
        promptsContainer.textContent = '';

        // Create prompt cards using safe DOM methods
        filtered.forEach(prompt => {
            if (!prompt) return;
            const card = createPromptCardElement(prompt);
            if (card) {
                promptsContainer.appendChild(card);
            }
        });
    } catch (error) {
        console.error('Error rendering prompts:', error);
    }
}

/**
 * Create prompt card element - XSS safe using DOM methods
 * Fixes DOM-based XSS vulnerability
 */
function createPromptCardElement(prompt) {
    try {
        // Validate prompt data
        if (!prompt || typeof prompt.id === 'undefined') return null;

        const card = document.createElement('div');
        card.className = 'prompt-card';
        card.setAttribute('data-id', String(prompt.id));

        // Header
        const header = document.createElement('div');
        header.className = 'prompt-header';
        const title = document.createElement('h3');
        title.textContent = prompt.title || '';
        header.appendChild(title);
        card.appendChild(header);

        // Meta (category and difficulty badges)
        const meta = document.createElement('div');
        meta.className = 'prompt-meta';

        const categoryBadge = document.createElement('span');
        // Sanitize CSS class to prevent injection
        const sanitizedCategory = sanitizeCssClass(prompt.category);
        categoryBadge.className = `badge ${sanitizedCategory}`;
        categoryBadge.textContent = formatCategory(prompt.category || '');
        meta.appendChild(categoryBadge);

        const difficultyBadge = document.createElement('span');
        // Sanitize CSS class to prevent injection
        const sanitizedDifficulty = sanitizeCssClass(prompt.difficulty);
        difficultyBadge.className = `badge ${sanitizedDifficulty}`;
        difficultyBadge.textContent = prompt.difficulty || '';
        meta.appendChild(difficultyBadge);

        card.appendChild(meta);

        // Description
        const description = document.createElement('p');
        description.className = 'prompt-description';
        description.textContent = prompt.description || '';
        card.appendChild(description);

        // Preview
        const preview = document.createElement('div');
        preview.className = 'prompt-preview';
        preview.textContent = truncateText(prompt.prompt || '', 150);
        card.appendChild(preview);

        // Copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = '📋 Copy Prompt';
        copyBtn.setAttribute('data-id', String(prompt.id));

        // Add click handler for copy button with error handling
        copyBtn.addEventListener('click', (e) => {
            try {
                e.stopPropagation();
                const promptId = parseInt(e.target.dataset.id, 10);
                if (!isNaN(promptId)) {
                    const targetPrompt = PROMPTS.find(p => p && p.id === promptId);
                    if (targetPrompt && targetPrompt.prompt) {
                        copyPrompt(targetPrompt.prompt, e.target);
                    }
                }
            } catch (error) {
                console.error('Error in copy button handler:', error);
            }
        });

        card.appendChild(copyBtn);

        // Add click handler for card with error handling
        card.addEventListener('click', (e) => {
            try {
                if (!e.target.classList.contains('copy-btn')) {
                    const promptId = parseInt(card.dataset.id, 10);
                    if (!isNaN(promptId)) {
                        showPromptModal(promptId);
                    }
                }
            } catch (error) {
                console.error('Error in card click handler:', error);
            }
        });

        return card;
    } catch (error) {
        console.error('Error creating prompt card:', error);
        return null;
    }
}

/**
 * Show prompt in modal - XSS safe with null checks
 */
function showPromptModal(promptId) {
    try {
        if (!Array.isArray(PROMPTS) || !modal) return;

        const prompt = PROMPTS.find(p => p && p.id === promptId);
        if (!prompt) {
            console.error('Prompt not found:', promptId);
            return;
        }

        // Get modal elements with null checks
        const modalTitle = document.getElementById('modalTitle');
        const modalCategory = document.getElementById('modalCategory');
        const modalDifficulty = document.getElementById('modalDifficulty');
        const modalDescription = document.getElementById('modalDescription');
        const modalPrompt = document.getElementById('modalPrompt');
        const exampleBox = document.getElementById('modalExample');
        const modalCopyBtn = document.getElementById('modalCopyBtn');

        if (!modalTitle || !modalCategory || !modalDifficulty ||
            !modalDescription || !modalPrompt || !exampleBox || !modalCopyBtn) {
            console.error('Modal elements not found');
            return;
        }

        // Safely set text content (no XSS possible)
        modalTitle.textContent = prompt.title || '';
        modalCategory.textContent = formatCategory(prompt.category || '');

        // Sanitize CSS classes before setting
        const sanitizedCategory = sanitizeCssClass(prompt.category);
        modalCategory.className = `badge ${sanitizedCategory}`;

        modalDifficulty.textContent = prompt.difficulty || '';
        const sanitizedDifficulty = sanitizeCssClass(prompt.difficulty);
        modalDifficulty.className = `badge ${sanitizedDifficulty}`;

        modalDescription.textContent = prompt.description || '';
        modalPrompt.textContent = prompt.prompt || '';

        // Set example if exists - XSS safe using DOM methods
        if (prompt.example) {
            // Clear and rebuild using DOM methods
            exampleBox.textContent = '';

            const heading = document.createElement('h4');
            heading.textContent = '💡 Expected Result:';
            exampleBox.appendChild(heading);

            const paragraph = document.createElement('p');
            paragraph.textContent = prompt.example;
            exampleBox.appendChild(paragraph);

            exampleBox.style.display = 'block';
        } else {
            exampleBox.style.display = 'none';
        }

        // Set copy button handler with error handling
        modalCopyBtn.onclick = () => {
            try {
                copyPrompt(prompt.prompt || '', modalCopyBtn);
            } catch (error) {
                console.error('Error in modal copy button:', error);
            }
        };

        // Use requestAnimationFrame to avoid race conditions
        requestAnimationFrame(() => {
            modal.style.display = 'block';
        });
    } catch (error) {
        console.error('Error showing modal:', error);
    }
}

/**
 * Copy prompt to clipboard with fallback for unsupported browsers
 */
function copyPrompt(text, button) {
    try {
        if (!button) return;

        // Check if Clipboard API is supported
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showCopySuccess(button);
            }).catch(err => {
                console.error('Clipboard API failed:', err);
                fallbackCopy(text, button);
            });
        } else {
            // Fallback for unsupported browsers
            fallbackCopy(text, button);
        }
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        alert('Failed to copy: ' + error.message);
    }
}

/**
 * Fallback copy method for unsupported browsers
 */
function fallbackCopy(text, button) {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showCopySuccess(button);
            } else {
                throw new Error('Copy command failed');
            }
        } catch (err) {
            console.error('Fallback copy failed:', err);
            alert('Failed to copy. Please copy manually.');
        } finally {
            document.body.removeChild(textArea);
        }
    } catch (error) {
        console.error('Error in fallback copy:', error);
    }
}

/**
 * Show copy success feedback
 */
function showCopySuccess(button) {
    try {
        if (!button) return;

        const originalText = button.textContent;
        button.textContent = '✅ Copied!';
        button.style.background = '#10b981';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    } catch (error) {
        console.error('Error showing copy success:', error);
    }
}

/**
 * Setup event listeners with null checks and error handling
 */
function setupEventListeners() {
    try {
        // Search with null check and error handling
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                try {
                    searchTerm = e.target.value || '';
                    renderPrompts();
                } catch (error) {
                    console.error('Error in search handler:', error);
                }
            });
        }

        // Modal close with null checks and error handling
        if (modalClose && modal) {
            modalClose.addEventListener('click', () => {
                try {
                    // Use requestAnimationFrame to avoid race conditions
                    requestAnimationFrame(() => {
                        modal.style.display = 'none';
                    });
                } catch (error) {
                    console.error('Error closing modal:', error);
                }
            });
        }

        // Click outside modal to close with null check and error handling
        if (modal) {
            window.addEventListener('click', (e) => {
                try {
                    if (e.target === modal) {
                        // Use requestAnimationFrame to avoid race conditions
                        requestAnimationFrame(() => {
                            modal.style.display = 'none';
                        });
                    }
                } catch (error) {
                    console.error('Error in window click handler:', error);
                }
            });
        }

        // ESC key to close modal with null check and error handling
        if (modal) {
            document.addEventListener('keydown', (e) => {
                try {
                    if (e.key === 'Escape' && modal.style.display === 'block') {
                        // Use requestAnimationFrame to avoid race conditions
                        requestAnimationFrame(() => {
                            modal.style.display = 'none';
                        });
                    }
                } catch (error) {
                    console.error('Error in keydown handler:', error);
                }
            });
        }
    } catch (error) {
        console.error('Error setting up event listeners:', error);
    }
}

/**
 * Format category name for display
 */
function formatCategory(category) {
    try {
        if (!category || typeof category !== 'string') return '';
        return category
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    } catch (error) {
        console.error('Error formatting category:', error);
        return String(category);
    }
}

/**
 * Truncate text to specific length
 */
function truncateText(text, maxLength) {
    try {
        if (!text || typeof text !== 'string') return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    } catch (error) {
        console.error('Error truncating text:', error);
        return String(text);
    }
}
