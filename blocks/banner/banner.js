export default function decorate(block) {
  const picture = block.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img?.src) {
      block.style.backgroundImage = `url('${img.src}')`;
      block.classList.add('banner-image'); 
      picture.remove(); 
    }
  }
}
