export default function decorate(block) {
  const children = [...block.children];

  // Create a container to hold video elements
  const videoContainer = document.createElement('div');
  videoContainer.className = 'video-block';

  // Loop through table rows, skipping the first heading row if needed
  for (let i = 0; i < children.length; i++) {
    const row = children[i];
    const link = row.querySelector('a');

    if (link && link.href) {
      const video = document.createElement('video');
      
      video.autoplay=true;
      video.setAttribute("autoplay","")
      video.className = 'video-player';
      
      video.setAttribute('loop', '');

      const source = document.createElement('source');
      source.src = link.href;
      source.type = 'video/mp4'; // Change if needed (e.g., 'video/ogg')

      video.appendChild(source);
      video.appendChild(document.createTextNode('Your browser does not support HTML video.'));

      videoContainer.appendChild(video);
    }
  }

  // Clear the block and insert video container
  block.innerHTML = '';
  block.appendChild(videoContainer);
}
