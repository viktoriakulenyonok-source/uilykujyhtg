// Navigation functionality
class App {
    constructor() {
        this.currentScreen = 'auth';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupModals();
        this.setupTaskActions();
        this.setupAuthForm();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetScreen = link.getAttribute('href').substring(1);
                this.showScreen(targetScreen);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    showScreen(screenId) {
        // Hide all screens
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));
        
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
        }
    }

    setupModals() {
        const modalOverlay = document.getElementById('modal-overlay');
        const modalClose = document.querySelector('.modal-close');
        const modalCancel = document.getElementById('modal-cancel');
        
        modalClose.addEventListener('click', () => this.hideModal());
        modalCancel.addEventListener('click', () => this.hideModal());
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.hideModal();
            }
        });
    }

    showModal(title, content, onConfirm = null) {
        const modalOverlay = document.getElementById('modal-overlay');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');
        const modalConfirm = document.getElementById('modal-confirm');
        
        modalTitle.textContent = title;
        modalContent.textContent = content;
        modalOverlay.classList.add('active');
        
        // Remove previous event listeners
        const newConfirmBtn = modalConfirm.cloneNode(true);
        modalConfirm.parentNode.replaceChild(newConfirmBtn, modalConfirm);
        
        if (onConfirm) {
            newConfirmBtn.addEventListener('click', () => {
                onConfirm();
                this.hideModal();
            });
        }
    }

    hideModal() {
        const modalOverlay = document.getElementById('modal-overlay');
        modalOverlay.classList.remove('active');
    }

    setupTaskActions() {
        // Task selection
        document.addEventListener('click', (e) => {
            if (e.target.matches('.task-card button')) {
                const taskName = e.target.closest('.task-card').querySelector('h3').textContent;
                this.showModal(
                    'Выбор задания',
                    `Вы хотите выбрать задание из категории "${taskName}"?`,
                    () => {
                        this.addTaskToMyTasks(taskName);
                        this.showNotification('Задание добавлено в "Мои задания"', 'success');
                    }
                );
            }
            
            // Task actions in My Tasks
            if (e.target.matches('.btn-danger')) {
                this.showModal(
                    'Хотите отказаться?',
                    'Вы уверены, что хотите отказаться от этого задания? Оно будет возвращено в банк заданий.',
                    () => {
                        e.target.closest('.assignment-card').remove();
                        this.showNotification('Задание возвращено в банк', 'success');
                    }
                );
            }
            
            // Market actions
            if (e.target.matches('.gift-card .btn-primary')) {
                const giftName = e.target.closest('.gift-card').querySelector('h3').textContent;
                const price = e.target.closest('.gift-card').querySelector('.price').textContent;
                
                this.showModal(
                    'Подтверждение покупки',
                    `Вы хотите получить "${giftName}" за ${price}?`,
                    () => {
                        this.showNotification('Запрос отправлен', 'success');
                    }
                );
            }
            
            if (e.target.matches('.gift-card .btn-disabled')) {
                this.showModal(
                    'Подарок недоступен',
                    'У вас недостаточно баллов для получения этого подарка.',
                    null
                );
            }
        });
    }

    setupAuthForm() {
        const authForm = document.querySelector('.auth-form');
        const loginBtn = authForm.querySelector('.btn-primary');
        
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const login = authForm.querySelector('input[type="text"]').value;
            const password = authForm.querySelector('input[type="password"]').value;
            
            if (login && password) {
                this.showNotification('Авторизация успешна', 'success');
                setTimeout(() => {
                    this.showScreen('task-bank');
                    document.querySelector('a[href="#task-bank"]').classList.add('active');
                    document.querySelector('a[href="#auth"]').classList.remove('active');
                }, 1500);
            } else {
                this.showNotification('Заполните все поля', 'error');
            }
        });
    }

    addTaskToMyTasks(taskName) {
        const taskList = document.querySelector('.task-list');
        const newTask = document.createElement('div');
        newTask.className = 'assignment-card';
        newTask.innerHTML = `
            <div>
                <h3>Новое задание: ${taskName}</h3>
                <p class="status pending">В процессе</p>
            </div>
            <div class="task-actions">
                <button class="btn-primary">Продолжить</button>
                <button class="btn-danger">Отказаться</button>
            </div>
        `;
        taskList.appendChild(newTask);
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            background: ${type === 'success' ? '#38a169' : '#e53e3e'};
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// Additional utility functions
function simulateLoading(button, duration = 2000) {
    const originalText = button.textContent;
    button.innerHTML = '<span class="loading"></span> Загрузка...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, duration);
}

// Smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Local storage helpers for persistent data
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Theme toggle functionality (bonus feature)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    saveToStorage('theme', isDark ? 'dark' : 'light');
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = loadFromStorage('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});