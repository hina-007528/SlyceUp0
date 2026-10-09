import { useEffect } from 'react';

// Progressive enhancement: .fx does nothing unless this hook is working.
export default function useTextFade(scrollRef) {
  useEffect(() => {
    return; // Disabled by user request.
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let instance = null;
    let failed = false;
    const elements = () => [...document.querySelectorAll('main .fx')];

    const restore = () => {
      document.documentElement.removeAttribute('data-scroll-fx');
      for (const element of elements()) {
        element.style.removeProperty('--fx-opacity');
        element.style.removeProperty('--fx-shift');
      }
    };
    const update = () => {
      frame = 0;
      if (failed || motion.matches || window.scrollY <= 1) {
        restore();
        return;
      }
      try {
        const halfHeight = window.innerHeight / 2;
        for (const element of elements()) {
          const bounds = element.getBoundingClientRect();
          if (!bounds.height || getComputedStyle(element).display === 'none') continue;
          // Subtract the previous drift so the transform never feeds into itself.
          const previousShift = parseFloat(element.style.getPropertyValue('--fx-shift')) || 0;
          const distance = bounds.top - previousShift + bounds.height / 2 - halfHeight;
          const opacity = Math.max(0, 1 - Math.pow(Math.abs(distance) / (halfHeight * 1.1), 2.1));
          const shift = Math.max(-halfHeight * 0.08, Math.min(halfHeight * 0.08, distance * 0.08));
          element.style.setProperty('--fx-opacity', opacity.toFixed(4));
          element.style.setProperty('--fx-shift', `${shift.toFixed(2)}px`);
        }
        document.documentElement.setAttribute('data-scroll-fx', '');
      } catch (error) {
        failed = true;
        restore();
        console.warn('Text effects unavailable; keeping all text visible.', error);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const bind = (next) => {
      instance?.off('scroll', schedule);
      instance = next;
      instance?.on('scroll', schedule);
      schedule();
    };
    const changed = (event) => bind(event.detail);
    window.addEventListener('lenis:change', changed);
    // Also works with native scrolling if Lenis initialization fails.
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    motion.addEventListener('change', schedule);
    const observer = new MutationObserver(schedule);
    observer.observe(document.querySelector('main'), { childList: true, subtree: true });
    bind(scrollRef.current);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      instance?.off('scroll', schedule);
      window.removeEventListener('lenis:change', changed);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener('change', schedule);
      restore();
    };
  }, [scrollRef]);
}
