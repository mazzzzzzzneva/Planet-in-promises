const PROMISE_WEIGHT_KG = 0.0237;

const PLANET_DATA = {
    mercury: { 
        weight: 3.3011e23, 
        name: "Меркурий",
        effect: '☄️'
    },
    venus: { 
        weight: 4.8675e24, 
        name: "Венера",
        effect: '🌠'
    },
    earth: { 
        weight: 5.9726e24, 
        name: "Земля",
        effect: '✨'
    },
    mars: { 
        weight: 6.417e23, 
        name: "Марс",
        effect: '🔴'
    },
    jupiter: { 
        weight: 1.8986e27, 
        name: "Юпитер",
        effect: '🌀' 
    },
    saturn: { 
        weight: 5.6846e26, 
        name: "Сатурн",
        effect: '💫'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const planetButtons = document.querySelectorAll('.planet-btn');
    const currentPlanetSpan = document.getElementById('current-planet');
    const planetPicDiv = document.getElementById('planet-pic');
    const promiseNumberSpan = document.getElementById('promise-number');
    
    //запуск
    createFloatingStuff();
    
    planetButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const planetCode = this.dataset.planet;
            const planet = PLANET_DATA[planetCode];
            
            planetButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentPlanetSpan.textContent = planet.name;
            planetPicDiv.textContent = this.querySelector('.planet-symbol').textContent;
            
            const promiseCount = planet.weight / PROMISE_WEIGHT_KG;
            promiseNumberSpan.textContent = formatBigNumber(promiseCount);
            
            makeButtonBounce(this);
            changeSpaceEffects(planet.effect);
        });
    });
});

//форматируем
function formatBigNumber(num) {
    if (num > 1e24) return (num / 1e24).toFixed(2) + ' секстиллионов';
    if (num > 1e21) return (num / 1e21).toFixed(2) + ' квинтиллионов';
    if (num > 1e18) return (num / 1e18).toFixed(2) + ' квадриллионов';
    return Math.round(num).toLocaleString('ru-RU');
}

function makeButtonBounce(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1.05)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }, 150);
}

function createFloatingStuff() {
    const container = document.getElementById('floatingStuff');
    const symbols = ['✨', '⭐', '🌟'];
    
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'floating-thing';
        element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        element.style.left = `${Math.random() * 100}vw`;
        element.style.top = `${Math.random() * 100}vh`;
        element.style.animation = `float-around ${10 + Math.random() * 20}s linear infinite`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(element);
    }
}

function changeSpaceEffects(effectSymbol) {
    const container = document.getElementById('floatingStuff');
    
    const oldEffects = document.querySelectorAll('.space-effect');
    oldEffects.forEach(el => el.remove());
    
    const count = 15;
    const size = effectSymbol === '🌀' || effectSymbol === '💫' ? 30 : 20;
    
    for (let i = 0; i < count; i++) {
        const element = document.createElement('div');
        element.className = 'floating-thing space-effect';
        element.textContent = effectSymbol;
        element.style.left = `${Math.random() * 100}vw`;
        element.style.top = `${Math.random() * 100}vh`;
        
        if (effectSymbol === '🌀' || effectSymbol === '💫') {
            element.style.animation = `spin-around ${15 + Math.random() * 10}s linear infinite`;
        } else {
            element.style.animation = `float-around ${8 + Math.random() * 15}s linear infinite`;
        }
        
        element.style.fontSize = `${size}px`;
        element.style.opacity = '0.7';
        container.appendChild(element);
    }
}