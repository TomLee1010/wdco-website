const translations = {};
let currentLang = localStorage.getItem('lang') || 'en';

// This variable will be set in each HTML file to define the path to the root.
// It defaults to '.' for the root page (index.html).
const path_prefix = window.path_prefix || '.';

async function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    await loadTranslations();
    updateText();
    updateHtmlLang();
    updateLangSwitcher();
    document.body.style.visibility = 'visible';
}

async function loadTranslations() {
    // Always load English as a fallback
    const enResponse = await fetch(`${path_prefix}/lang/en.json`);
    const enData = await enResponse.json();
    translations['en'] = enData;

    if (currentLang !== 'en') {
        const response = await fetch(`${path_prefix}/lang/${currentLang}.json`);
        const data = await response.json();
        translations[currentLang] = data;
    }
}

function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || translations['en'][key] || key;
}

function updateText() {
    document.querySelectorAll('[data-i18n-key]').forEach(element => {
        const key = element.getAttribute('data-i18n-key');
        const translation = t(key);

        // Use innerHTML for specific keys that need to render HTML, like line breaks
        if (key === 'wdc_intro_title') {
            element.innerHTML = translation;
            return; // Skip to the next element
        }

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.type === 'submit') {
                element.value = translation;
            } else {
                element.placeholder = translation;
            }
        } else if (element.classList.contains('menu-options')) {
            // Keep the existing img element
            const img = element.querySelector('img');
            element.innerText = translation;
            if (img) {
                element.appendChild(img);
            }
        } else {
            // Fallback for other elements
            element.textContent = translation;
        }
    });
}

function updateHtmlLang() {
    document.documentElement.lang = currentLang === 'en' ? 'en-HK' : 'zh-HK';
}

function updateLangSwitcher() {
    document.querySelectorAll('.language-container .language span').forEach(span => {
        span.innerText = currentLang === 'en' ? 'En' : '中文';
    });
}

(async () => {
    await setLanguage(currentLang);

    document.querySelectorAll('.language-container').forEach(langSwitcher => {
        langSwitcher.addEventListener('click', (e) => {
            e.preventDefault();
            const newLang = currentLang === 'en' ? 'zh' : 'en';
            setLanguage(newLang);
        });
    });
})();