function setColor() {
    // выбираем кнопку по id
    const btn = document.querySelector('#btn');
    if (!btn) return console.warn('Button #btn not found');

    // применяем цвета как строковые значения
    btn.style.backgroundColor = '#e84a5f';
    btn.style.color = '#fecea8';
    document.body.style.backgroundColor = '#2a363b';
    document.body.style.color = '#99b898';
}
// (removed duplicate listener; theme toggle will handle click)

// Тема: переключатель между стандартной и альтернативной темой
function toggleTheme() {
    const root = document.documentElement; // можно использовать body, но корень удобнее
    const alt = root.classList.toggle('theme-alt');
    try {
        localStorage.setItem('themeAlt', alt ? '1' : '0');
    } catch (e) {
        // localStorage может быть недоступен
    }
}

// Применяем сохранённую тему при загрузке и навешиваем обработчики
document.addEventListener('DOMContentLoaded', () => {
    const saved = (function(){ try { return localStorage.getItem('themeAlt'); } catch(e){ return null } })();
    if (saved === '1') document.documentElement.classList.add('theme-alt');

    // кнопка переключения темы (та же #btn используется для демонстрации)
    const themeBtn = document.querySelector('#btn');
    if (themeBtn) {
        // используем toggleTheme как единственный обработчик
        themeBtn.addEventListener('click', toggleTheme);
    }
});

// Toggle mobile menu via #burger button
(function() {
    const burger = document.getElementById('burger');
    const menuNav = document.querySelector('#menu nav');

    if (!burger || !menuNav) return; // nothing to do if elements missing

    function openMenu() {
        menuNav.classList.add('active');
        burger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        menuNav.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
        menuNav.classList.toggle('active');
        const expanded = menuNav.classList.contains('active');
        burger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }

    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close when clicking outside the nav
    document.addEventListener('click', function(e) {
        if (!menuNav.classList.contains('active')) return;
        if (!menuNav.contains(e.target) && e.target !== burger) {
            closeMenu();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            if (menuNav.classList.contains('active')) closeMenu();
        }
    });
})();