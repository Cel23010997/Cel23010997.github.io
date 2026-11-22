(() => {
  const links = document.querySelectorAll('.resume-download'); if (!links.length) return;
  const dialog = document.createElement('dialog'); dialog.className = 'resume-dialog'; dialog.id = 'resume-dialog';
  dialog.setAttribute('aria-labelledby', 'resume-preview-title');
  dialog.innerHTML = '<div class="resume-preview-bar"><b id="resume-preview-title">Resume</b><button class="resume-close" aria-label="Close resume preview" autofocus>×</button></div><div class="resume-preview-actions"><a class="button small" id="resume-get-pdf" download>Download PDF</a><a class="text-link" id="resume-get-docx" download>Download Word</a><a class="text-link" id="resume-open-pdf" target="_blank" rel="noopener">Open PDF ↗</a></div><div class="resume-preview-body"><img id="resume-page-image" alt=""><details><summary>Read the text version</summary><pre id="resume-text-version"></pre></details></div>';
  document.body.append(dialog);
  const image = dialog.querySelector('img'); let currentPdf = '';
  links.forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); const pdf = link.getAttribute('href'); currentPdf = pdf;
    const label = link.querySelector('span')?.textContent || 'Resume';
    document.getElementById('resume-preview-title').textContent = label + ' resume';
    document.getElementById('resume-get-pdf').href = pdf;
    document.getElementById('resume-open-pdf').href = pdf;
    document.getElementById('resume-get-docx').href = pdf.replace(/\.pdf$/, '.docx');
    image.alt = 'One-page ' + label.toLowerCase() + ' resume for Celeste Tong. A text version and downloads are available below and above.';
    image.src = pdf.replace(/\.pdf$/, '-preview.png');
    document.getElementById('resume-text-version').textContent = 'Loading resume text…';
    fetch(pdf.replace(/\.pdf$/, '.txt')).then(r => {if (!r.ok) throw new Error(); return r.text();}).then(text => {
      if (currentPdf === pdf) document.getElementById('resume-text-version').textContent = text;
    }).catch(() => {if (currentPdf === pdf) document.getElementById('resume-text-version').textContent = 'Please use the PDF or Word download above.';});
    dialog.showModal(); document.body.style.overflow = 'hidden'; dialog.scrollTop = 0;
  }));
  dialog.querySelector('.resume-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { currentPdf = ''; document.body.style.overflow = ''; });
})();
