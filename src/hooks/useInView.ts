import { useEffect, useRef, useState } from 'react';

export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.6) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setInView(entry.isIntersecting));
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
