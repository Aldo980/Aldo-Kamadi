import { useEffect } from 'react';

/**
 * Custom hook that uses IntersectionObserver to add 'active' class to elements
 * with the 'reveal' class when they enter the viewport.
 * 
 * @param {Object} [options]
 * @param {number} [options.threshold=0.15] - Intersection ratio threshold
 * @param {string} [options.rootMargin='0px 0px -50px 0px'] - Viewport margin offset
 * @param {string} [options.selector='.reveal'] - Target elements query selector
 * @param {boolean} [options.once=true] - Whether to unobserve after first activation
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -50px 0px',
  selector = '.reveal',
  once = true,
} = {}) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback for environments lacking IntersectionObserver
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => el.classList.add('active'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove('active');
          }
        });
      },
      { threshold, rootMargin }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (!el.classList.contains('active')) {
          observer.observe(el);
        }
      });
    };

    // Initial observation
    observeElements();

    // Listen for DOM changes to observe dynamically rendered components
    const mutationObserver = new MutationObserver((mutations) => {
      let hasAddedNodes = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          hasAddedNodes = true;
          break;
        }
      }
      if (hasAddedNodes) {
        observeElements();
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [threshold, rootMargin, selector, once]);
}

export default useScrollReveal;
