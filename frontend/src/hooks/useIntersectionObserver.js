import { useEffect, useRef, useState } from 'react';

/**
 * useIntersectionObserver
 * 
 * Triggers isVisible=true when the element enters the viewport.
 * By default, re-triggers each time the element enters (repeat: true).
 * Pass { repeat: false } to animate only once (like the old behaviour).
 */
export const useIntersectionObserver = (options = {}) => {
  const { repeat = true, threshold = 0.12, ...rest } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // If we don't want repeat, stop observing after first trigger
          if (!repeat) observer.unobserve(node);
        } else if (repeat) {
          // Reset so it re-animates next time it scrolls back in
          setIsVisible(false);
        }
      },
      { threshold, ...rest }
    );

    observer.observe(node);

    return () => observer.unobserve(node);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, isVisible };
};

export default useIntersectionObserver;



// import { useEffect, useRef, useState } from 'react';

// /**
//  * Custom hook for Intersection Observer
//  * Triggers animation when element enters viewport
//  */
// export const useIntersectionObserver = (options = {}) => {
//   const ref = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) {
//         setIsVisible(true);
//         observer.unobserve(entry.target);
//       }
//     }, {
//       threshold: 0.1,
//       ...options,
//     });

//     if (ref.current) {
//       observer.observe(ref.current);
//     }

//     return () => {
//       if (ref.current) {
//         observer.unobserve(ref.current);
//       }
//     };
//   }, [options]);

//   return { ref, isVisible };
// };

// export default useIntersectionObserver;
