import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function useSmoothScroll() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const configure = () => {
      scrollRef.current?.destroy();
      scrollRef.current = null;
      if (!motion.matches) {
        try {
          scrollRef.current = new Lenis({
            autoRaf: true,
            lerp: 0.06,
            wheelMultiplier: 0.75,
            smoothWheel: true,
            syncTouch: false,
            overscroll: false,
            prevent: (node) => node.matches?.('input, textarea, select, [data-native-scroll], [data-lenis-prevent]'),
          });
        } catch (error) {
          console.warn('Smooth scrolling unavailable; using native scrolling.', error);
        }
      }
      window.dispatchEvent(new CustomEvent('lenis:change', { detail: scrollRef.current }));
    };
    configure();
    motion.addEventListener('change', configure);

    const navigate = (event) => {
      if (!scrollRef.current || event.defaultPrevented || event.button !== 0 ||
          event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname ||
          url.search !== location.search || !url.hash) return;
      let id;
      try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, '', url.hash);
      scrollRef.current.resize();
      scrollRef.current.scrollTo(target);
    };
    document.addEventListener('click', navigate);
    // Browser history and same-document URL changes must replace any running
    // anchor animation instead of letting its old destination pull us back.
    const followHash = () => {
      if (!scrollRef.current) return;
      let id;
      try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
      const target = id ? document.getElementById(id) : 0;
      if (target === null) return;
      // The browser has already moved for this hash. Rebase Lenis using the
      // actual position, not its still-running animation's older position.
      const position = target === 0 ? 0 : scrollY + target.getBoundingClientRect().top;
      scrollRef.current.stop();
      scrollRef.current.start();
      scrollRef.current.resize();
      scrollRef.current.scrollTo(position, { immediate: true });
    };
    window.addEventListener('hashchange', followHash);
    return () => {
      document.removeEventListener('click', navigate);
      window.removeEventListener('hashchange', followHash);
      motion.removeEventListener('change', configure);
      scrollRef.current?.destroy();
      scrollRef.current = null;
    };
  }, []);

  return scrollRef;
}
