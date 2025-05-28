export default function decorate(block) {
  const children = [...block.children];

  // Create a container for the buttons
  const toolsContainer = document.createElement('div');
  toolsContainer.className = 'tools-buttons';

  // Skip the first two heading rows
  for (let i = 1; i < children.length; i++) {
    const row = children[i];
    const img = row.querySelector('img');
    const link = row.querySelector('a');

    if (img && link) {
      const button = document.createElement('a');
      button.className = 'tool-btn';
      button.href = link.href;

      const icon = img.cloneNode(true);
      icon.classList.add('tool-icon');

      const label = document.createElement('span');
      label.textContent = link.textContent;

      button.appendChild(icon);
      button.appendChild(label);

      toolsContainer.appendChild(button);
    }
  }

  // Clear old block content and add styled output
  block.innerHTML = '';
  const heading = document.createElement('h4');
  heading.textContent = children[0].innerText;
  block.appendChild(heading);
  block.appendChild(toolsContainer);
}
