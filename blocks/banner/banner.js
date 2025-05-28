export default function decorate(block) {
  const children = [...block.children];
  
  // Assuming the last child contains background image URL with prefix "Background Image:"
  const lastChild = children[children.length - 1];
  let bgImageUrl = '';

  if (lastChild && lastChild.textContent.startsWith('Background Image:')) {
    bgImageUrl = lastChild.textContent.replace('Background Image:', '').trim();
    // Remove the last child since it's used for background image only
    block.removeChild(lastChild);
  }

  // Now build the content elements from remaining children
  const title = document.createElement('h1');
  const desc = document.createElement('p');
  const cta = document.createElement('a');

  title.textContent = children[0]?.textContent || '';
  desc.textContent = children[1]?.textContent || '';

  if(children[2]) {
    const parts = children[2].textContent.split('|');
    cta.textContent = parts[0].trim();
    cta.href = parts[1]?.trim() || '#';
  }

  block.innerHTML = ''; // clear content
  block.append(title, desc, cta);

  // Set background image dynamically
  if (bgImageUrl) {
    block.style.backgroundImage = `url('${bgImageUrl}')`;
    block.style.backgroundSize = 'cover';
    block.style.backgroundPosition = 'center';
    block.style.backgroundRepeat = 'no-repeat';
  }

  // Add styling classes if needed
  block.classList.add('banner');
}
