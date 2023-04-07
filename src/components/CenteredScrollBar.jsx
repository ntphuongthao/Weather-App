import { useEffect } from 'react';

function CenteredScrollBar() {
  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');
    const scrollThumb = scrollContainer.querySelector('::-webkit-scrollbar-thumb');

    function handleScroll() {
      var scrollWidth = scrollContainer.scrollWidth;
      var clientWidth = scrollContainer.clientWidth;
      var thumbWidth = (clientWidth / scrollWidth) * clientWidth;
      var thumbLeft = (scrollContainer.scrollLeft + (clientWidth / 2)) - (thumbWidth / 2);
      console.log(scrollContainer);
      console.log(scrollThumb);
      scrollThumb.style.width = thumbWidth + 'px';
      scrollThumb.style.left = thumbLeft + 'px';
    }

    scrollContainer.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}

export default CenteredScrollBar;