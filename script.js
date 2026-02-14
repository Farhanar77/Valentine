document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    // Check if we are on the victory page, if so, we don't need to do anything
    if (!yesBtn || !noBtn) return;

    let noClickCount = 0;
    let yesScale = 1;

    noBtn.addEventListener('click', () => {
        noClickCount++;

        // Make Yes button bigger only for the first 2 clicks
        if (noClickCount <= 2) {
            yesScale += 0.2;
            yesBtn.style.transform = `scale(${yesScale})`;
        }

        if (noClickCount === 1) {
            noBtn.textContent = 'rubbish';
            moveButton(noBtn);
        } else if (noClickCount === 2) {
            noBtn.textContent = 'goru';
            moveButton(noBtn);
            // Enable evasive behavior after 2nd click state is reached
            makeButtonEvasive();
        } else {
            // Should not be reachable if evasive, but just in case
            moveButton(noBtn);
        }
    });

    yesBtn.addEventListener('click', () => {
        // Redirect to congratulations.html
        window.location.href = 'congratulations.html';
    });

    function makeButtonEvasive() {
        // Move button to body to ensure position:fixed is relative to viewport,
        // ignoring any parent transforms (like on .container)
        document.body.appendChild(noBtn);

        const moveBtn = () => {
            const width = noBtn.offsetWidth;
            const height = noBtn.offsetHeight;
            const padding = 20; // Enough safety margin but not too restrictive

            // Calculate the valid range for the top-left corner
            // Min: padding
            // Max: window size - button size - padding
            const minX = padding;
            const minY = padding;

            // If window is too small, max could be less than min. 
            // We use Math.max to ensure we at least default to minX/minY, 
            // but effectively if it's too small, it stays at 20,20.

            // Use document.documentElement.clientWidth/Height to get viewport size excluding scrollbars
            const viewportWidth = document.documentElement.clientWidth;
            const viewportHeight = document.documentElement.clientHeight;

            const maxX = Math.max(minX, viewportWidth - width - padding);
            const maxY = Math.max(minY, viewportHeight - height - padding);

            // Generate random coordinate between min and max
            const randomX = Math.random() * (maxX - minX) + minX;
            const randomY = Math.random() * (maxY - minY) + minY;

            noBtn.style.position = 'fixed';
            noBtn.style.zIndex = '9999';
            noBtn.style.left = `${randomX}px`;
            noBtn.style.top = `${randomY}px`;
        };

        // Use mouseenter for better performance than mouseover
        noBtn.addEventListener('mouseenter', moveBtn);

        // Also move immediately to show the effect
        moveBtn();

        // Ensure button stays in viewport on resize
        window.addEventListener('resize', () => {
            moveBtn();
        });
    }

    function moveButton(btn) {
        // Remove the class if it exists to reset the animation
        btn.classList.remove('shake-anim');

        // Trigger reflow to restart animation
        void btn.offsetWidth;

        // Add the class back
        btn.classList.add('shake-anim');

        // Remove class after animation finishes
        setTimeout(() => {
            btn.classList.remove('shake-anim');
        }, 500);
    }
    // Start particle system
    createParticles();
});

// Reveal GIF strictly after everything is loaded to prevent white flash
window.addEventListener('load', () => {
    const gif = document.querySelector('.gif-container img');
    if (gif) {
        // slight buffer to ensure separate paint frame
        requestAnimationFrame(() => {
            gif.classList.add('loaded');
        });
    }
});

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
