import { useRef } from 'react';

const useIntersectionObserver = (callback: () => void) => {
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold: 1 },
    ),
  );

  const observe = (element: Element) => {
    observer.current.observe(element);
  };
  const unobserve = (element: Element) => {
    observer.current.unobserve(element);
  };
  const disconnect = observer.current.disconnect;

  return { observe, unobserve, disconnect };
};

export default useIntersectionObserver;
