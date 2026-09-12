/**
 * VisionONE Access - Official WordPress & Website AI Voice Widget Loader
 * https://www.visionerpsolutions.com/
 */
(function () {
  if (window.__VisionOneWidgetLoaded) return;
  window.__VisionOneWidgetLoaded = true;

  const currentScript = document.currentScript || document.getElementById('visionone-widget');
  const rawAppUrl = (currentScript && currentScript.getAttribute('data-app-url')) || window.location.origin;
  // External sites cannot connect to private ais-dev- endpoints; route through public ais-pre- endpoint
  const appUrl = rawAppUrl.replace('ais-dev-', 'ais-pre-');
  const position = (currentScript && currentScript.getAttribute('data-position')) || 'right';

  // Create Container
  const container = document.createElement('div');
  container.id = 'visionone-access-widget-root';
  container.style.position = 'fixed';
  container.style.bottom = '18px';
  if (position === 'left') {
    container.style.left = '18px';
  } else {
    container.style.right = '18px';
  }
  container.style.zIndex = '2147483647'; // Highest z-index for seamless WordPress compatibility
  container.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

  // Create Compact, Sleek Launcher Button
  const launcher = document.createElement('button');
  launcher.id = 'visionone-widget-launcher';
  launcher.style.width = '52px';
  launcher.style.height = '52px';
  launcher.style.borderRadius = '50%';
  launcher.style.background = 'linear-gradient(135deg, #1d4ed8 0%, #312e81 100%)';
  launcher.style.boxShadow = '0 8px 24px -2px rgba(29, 78, 216, 0.45), 0 2px 4px rgba(0, 0, 0, 0.1)';
  launcher.style.border = '1px solid rgba(255, 255, 255, 0.25)';
  launcher.style.cursor = 'pointer';
  launcher.style.display = 'flex';
  launcher.style.alignItems = 'center';
  launcher.style.justifyContent = 'center';
  launcher.style.color = '#ffffff';
  launcher.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease';
  launcher.setAttribute('aria-label', 'Open VisionONE Voice Assistant');

  launcher.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `;

  // Create Sleek Iframe Container
  const iframeContainer = document.createElement('div');
  iframeContainer.id = 'visionone-iframe-wrapper';
  iframeContainer.style.display = 'none';
  iframeContainer.style.width = '360px';
  iframeContainer.style.maxWidth = 'calc(100vw - 24px)';
  iframeContainer.style.height = '520px';
  iframeContainer.style.maxHeight = 'calc(100vh - 80px)';
  iframeContainer.style.borderRadius = '16px';
  iframeContainer.style.overflow = 'hidden';
  iframeContainer.style.boxShadow = '0 20px 45px -10px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(0,0,0,0.06)';
  iframeContainer.style.marginBottom = '12px';
  iframeContainer.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

  const iframe = document.createElement('iframe');
  iframe.src = `${appUrl}?widget=true&embedded=true`;
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.allow = 'microphone; clipboard-write;';

  iframeContainer.appendChild(iframe);
  container.appendChild(iframeContainer);
  container.appendChild(launcher);

  document.body.appendChild(container);

  let isOpen = false;
  launcher.addEventListener('click', () => {
    isOpen = !isOpen;
    iframeContainer.style.display = isOpen ? 'block' : 'none';
    launcher.style.transform = isOpen ? 'scale(0.92)' : 'scale(1)';
    launcher.innerHTML = isOpen
      ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
  });
})();
