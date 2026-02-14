document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const buttonGroup = document.querySelector('.button-group');

    // Start particle system on all pages
    createParticles();

    // Button logic only if buttons exist (index page)
    if (yesBtn && noBtn) {
        let noClickCount = 0;
        let yesScale = 1;
        let currentGap = 1.5; // Initial gap in rem

        noBtn.addEventListener('click', () => {
            noClickCount++;

            yesScale += 0.15;
            yesBtn.style.transform = `scale(${yesScale})`;

            currentGap += 1;
            if (buttonGroup) {
                buttonGroup.style.gap = `${currentGap}rem`;
            }

            switch (noClickCount) {
                case 1: noBtn.textContent = 'Are you positive?'; break;
                case 2: noBtn.textContent = 'Pookie Please 🥺'; break;
                case 3: noBtn.textContent = 'I will be very sad 😢'; break;
                case 4: noBtn.textContent = 'Are you sure?'; break;
                case 5: noBtn.textContent = 'Think again!'; break;
                case 6: noBtn.textContent = 'Dont do this to me..'; break;
                case 7:
                    noBtn.textContent = 'Last Chance!';
                    makeButtonEvasive();
                    break;
            }
            moveButton(noBtn);
        });

        yesBtn.addEventListener('click', () => {
            const container = document.querySelector('.container');
            if (container) container.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'congratulations.html';
            }, 500);
        });

        function makeButtonEvasive() {
            document.body.appendChild(noBtn);
            const moveBtn = () => {
                const width = noBtn.offsetWidth;
                const height = noBtn.offsetHeight;
                const padding = 20;
                const viewportWidth = document.documentElement.clientWidth;
                const viewportHeight = document.documentElement.clientHeight;
                const maxX = Math.max(padding, viewportWidth - width - padding);
                const maxY = Math.max(padding, viewportHeight - height - padding);
                const randomX = Math.random() * (maxX - padding) + padding;
                const randomY = Math.random() * (maxY - padding) + padding;
                noBtn.style.position = 'fixed';
                noBtn.style.zIndex = '9999';
                noBtn.style.left = `${randomX}px`;
                noBtn.style.top = `${randomY}px`;
            };
            noBtn.addEventListener('mouseenter', moveBtn);
            moveBtn();
            window.addEventListener('resize', moveBtn);
        }

        function moveButton(btn) {
            btn.classList.remove('shake-anim');
            void btn.offsetWidth;
            btn.classList.add('shake-anim');
            setTimeout(() => btn.classList.remove('shake-anim'), 500);
        }
    }
});

// Reveal GIF strictly after everything is loaded to prevent white flash
function revealGifs() {
    const gifs = document.querySelectorAll('.gif-container img');

    const reveal = (gif) => {
        gif.classList.add('loaded');
        // Clear inline styles to allow CSS class to take over
        gif.style.opacity = '';
        gif.style.visibility = '';
    };

    gifs.forEach(gif => {
        // If image is already loaded (cached), reveal immediately
        if (gif.complete) {
            reveal(gif);
        } else {
            // Otherwise wait for it
            gif.onload = () => reveal(gif);
        }
    });
}

// Check on load and immediately in case DOM is ready
window.addEventListener('load', revealGifs);
document.addEventListener('DOMContentLoaded', revealGifs);

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-container';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '0'; // Behind everything
    document.body.appendChild(particlesContainer);

    const symbols = ['💖', '🌸', '🎀', '🤍', '💗'];

    setInterval(() => {
        const particle = document.createElement('div');
        particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.position = 'absolute';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.bottom = '-50px';
        particle.style.fontSize = Math.random() * 20 + 20 + 'px'; // 20px to 40px
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particle.style.animation = `floatUp ${Math.random() * 3 + 4}s linear forwards`; // 4s to 7s duration

        particlesContainer.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 8000);
    }, 300); // New particle every 300ms
}
