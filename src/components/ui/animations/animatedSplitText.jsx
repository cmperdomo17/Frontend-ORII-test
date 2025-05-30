import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

const AnimatedSplitText = ({
    text,
    className,
    highlightText = "",
    highlightClass = "text-primary",
    x = 0,
    y = 0,
    duration = 1,
    opacity = 0,
    stagger = 0.05,
    breakOnMobile = false
}) => {
    const headingRef = useRef(null);
    
    const renderHighlightedText = () => {
        if (!highlightText || !text.includes(highlightText)) {
            return text;
        }

        const parts = text.split(highlightText);
        
        return (
            <>
                {parts[0]}
                <span className={highlightClass}>{highlightText}</span>
                {parts[1] || ''}
                {breakOnMobile && <br className="block md:hidden" />}
            </>
        );
    };

    useEffect(() => {
        gsap.registerPlugin(SplitText);

        if (headingRef.current) {
            const split = new SplitText(headingRef.current, {
                type: "words,chars"
            });

            // Apply inline-block to words to keep them together
            gsap.set(split.words, {
                display: "inline-block",
                whiteSpace: "nowrap"
            });

            // Animate characters
            gsap.from(split.chars, {
                duration,
                x,
                y,
                opacity,
                stagger,
                ease: "power3.out",
            });
        }

        return () => {
            if (headingRef.current) {
                const splitInstance = headingRef.current._gsap?.splitText;
                if (splitInstance) {
                    splitInstance.revert();
                }
            }
        };
    }, [text, x, y, duration, opacity, stagger]);

    return (
        <h1 ref={headingRef} className={`leading-tight ${className}`}>
            {renderHighlightedText()}
        </h1>
    );
};

export default AnimatedSplitText;