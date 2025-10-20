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