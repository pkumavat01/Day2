export default function decorate(block) {
  const children = [...block.children];
  let bgImageUrl = '';
  console.log(children)
  // Get the first image from the block (assuming it's the last child row with an image)
  const imageRowIndexes = children
  .map((child, idx) => ({ idx, hasImg: child.querySelector && child.querySelector('img') }))
  .filter(item => item.hasImg)
  .map(item => item.idx);

  const firstImageRowIndex = imageRowIndexes[0];
  const secondImageRowIndex = imageRowIndexes[1];
  const thirdImageRowIndex = imageRowIndexes[2];
  
  let bannerImageRow = null;
  if (firstImageRowIndex !== -1) {
    bannerImageRow = children[firstImageRowIndex];
    const image = bannerImageRow.querySelector('img');
    if (image) {
      bgImageUrl = image.src;
      block.removeChild(bannerImageRow); // Remove image row from block children
    }
  }

  // Extract banner title, desc, cta from the first row (assuming first 3 children)
  const title = document.createElement('h1');
  const desc = document.createElement('p');
  const cta = document.createElement('a');

  title.textContent = children[0]?.textContent.trim() || '';
  desc.textContent = children[1]?.textContent.trim() || '';

  if (children[2]) {
    const parts = children[2].textContent.split('|').map(p => p.trim());
    cta.textContent = parts[0] || 'Learn More';
    cta.href = parts[1] || '#';
    cta.classList.add('cta');
  }

  // Create main overlay wrapper
  const overlay = document.createElement('div');
  overlay.className = 'banner-overlay';

  // Create title and description container
  const mainText = document.createElement('div');
  mainText.className = 'banner-main-text';
  mainText.append(title, desc, cta);

  // Create side-by-side container for Photoshop and Express
  const sideBySide = document.createElement('div');
  sideBySide.className = 'banner-side-by-side';

  // Photoshop content assumed to be in 2nd set of rows (after banner text rows)
  // We'll look for those rows by position or parse your content properly.
  // Assuming your doc content layout:
  // children[3], children[4], children[5] for Photoshop
  // children[6], children[7], children[8] for Express

  // Helper function to create a box with title, desc, cta
  function createContentBox(titleText, descText, ctaText, ctaHref) {
    const box = document.createElement('div');
    box.className = 'content-box';

    const h3 = document.createElement('h3');
    h3.textContent = titleText;

    const p = document.createElement('p');
    p.innerHTML = descText.replace(/\n/g, '<br>');

    const a = document.createElement('a');
    a.href = ctaHref || '#';
    a.textContent = ctaText || 'Learn More';
    a.classList.add('cta');

    box.append(h3, p, a);
    return box;
  }

  // Photoshop box
  const photoshopTitle = children[4]?.textContent.trim();
  const photoshopDesc = [
    children[5]?.textContent.trim() || '',
    children[6]?.textContent.trim() || ''
  ].filter(Boolean).join('\n') || '';
  const photoshopCTA = children[7]?.textContent.split('|')[0].trim() || 'Learn More';
  const photoshopCTALink = '#'; // No link provided, can be added if exists

  const photoshopBox = createContentBox(photoshopTitle, photoshopDesc, photoshopCTA, photoshopCTALink);
  photoshopBox.classList.add('photoshop-box');
  // Add second image under the Photoshop box

  if (secondImageRowIndex !== -1) {
    const secondImageRow = children[secondImageRowIndex];
    const secondImage = secondImageRow?.querySelector('img');
    if (secondImage) {
      const imgClone = secondImage.cloneNode(true);
      imgClone.classList.add('photoshop-image');
      photoshopBox.appendChild(imgClone);
    }
  }
  // Express box
  const expressTitle = children[9]?.textContent.trim() || 'ADOBE EXPRESS';
  const expressDesc = [
    children[10]?.textContent.trim() || '',
    children[11]?.textContent.trim() || ''
  ].filter(Boolean).join('\n') || '';
  const expressCTA = children[12]?.textContent.split('|')[0].trim() || 'Learn More';
  const expressCTALink = '#'; // No link provided, can be added if exists

  const expressBox = createContentBox(expressTitle, expressDesc, expressCTA, expressCTALink);
  expressBox.classList.add('express-box'); 
  if (thirdImageRowIndex !== -1) {
    const thirdImageRow = children[thirdImageRowIndex];
    const thirdImage = thirdImageRow?.querySelector('img');
    if (thirdImage) {
      const imgClone = thirdImage.cloneNode(true);
      imgClone.classList.add('photoshop-image');
      expressBox.appendChild(imgClone);
    }
  }
  sideBySide.append(photoshopBox, expressBox);

  overlay.append(mainText, sideBySide);

  // Clear original block and append new overlay
  block.innerHTML = '';
  block.append(overlay);

  // Set banner background image
  if (bgImageUrl) {
    block.style.backgroundImage = `url('${bgImageUrl}')`;
    block.style.backgroundSize = 'cover';
    block.style.backgroundPosition = 'center';
    block.style.backgroundRepeat = 'no-repeat';
    block.style.position = 'relative';
  }

  block.classList.add('banner');
}
