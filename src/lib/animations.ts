
// Function to check if an element is in viewport
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0 &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right >= 0
  );
}

// Initialize scroll animations
export function initScrollAnimations(): void {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const checkAnimation = () => {
    animatedElements.forEach((element) => {
      if (isInViewport(element as HTMLElement)) {
        element.classList.add('animated');
      }
    });
  };
  
  // Check elements on initial load
  checkAnimation();
  
  // Check elements on scroll
  window.addEventListener('scroll', checkAnimation);
}

// Image blur loading effect
export function setupBlurLoad(): void {
  const blurredImages = document.querySelectorAll('.blur-load');
  
  blurredImages.forEach((div) => {
    const img = div.querySelector('img');
    
    if (img && img.complete) {
      div.classList.add('loaded');
    } else if (img) {
      img.addEventListener('load', () => {
        div.classList.add('loaded');
      });
    }
  });
}
