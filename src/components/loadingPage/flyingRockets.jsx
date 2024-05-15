import React, { useEffect, useRef } from 'react';
import img from  "../../assets/rocket.svg";
export  const FlyingRockets = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();

        for (let i = 0; i < 3; i++) {
            const rocket = document.createElement('img');
            rocket.src = img; // Using the imported image here
            rocket.className = 'rocket';
            container.appendChild(rocket); // Append the rocket, not img


            let dx = Math.random() < 0.5 ? 1 : -1; // Direction x
            let dy = Math.random() < 0.5 ? 1 : -1; // Direction y
            let rotation = 0;
            let x = Math.random() * (containerRect.width - rocket.offsetWidth);
            let y = Math.random() * (containerRect.height - rocket.offsetHeight);

            const updatePosition = () => {
                x += dx * 2; // Adjust speed as needed
                y += dy * 2; // Adjust speed as needed

                if (x <= 0 || x >= containerRect.width - rocket.offsetWidth) {
                    dx *= -1;
                    rotation += 180;
                }
                if (y <= 0 || y >= containerRect.height - rocket.offsetHeight) {
                    dy *= -1;
                    rotation += 180;
                }

                rocket.style.left = `${x}px`;
                rocket.style.top = `${y}px`;
                rocket.style.transform = `rotate(${rotation}deg)`;

                requestAnimationFrame(updatePosition);
            };

            updatePosition();
        }

        // Cleanup function to remove rockets
        return () => {
            while (container.firstChild) {
                container.removeChild(container.lastChild);
            }
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            style={{ 
                position: 'relative', 
                width: '800px', 
                height: '600px', 
            }} 
        />
    );
};
