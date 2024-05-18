
export function isElementClassOrChildOf(element, className) {
  const currentEl = document.querySelector(`.${className}`);
  if (!currentEl) return false;
  if (element === currentEl) return true;
  let isChild = false;
  let parent = element;
  while (parent) {
    if (parent.classList.contains(className)) {
      isChild = true;
      break;
    }
    parent = parent.parentElement;
  }
  return isChild;
}