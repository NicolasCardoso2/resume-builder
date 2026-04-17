export function downloadPDF(filename = 'curriculo.pdf') {
  const style = document.createElement('style')
  style.innerHTML = `
    @media print {
      body > *:not(#resume-print-root) { display: none !important; }
      #resume-print-root { display: block !important; }
    }
  `
  document.head.appendChild(style)
  document.title = filename.replace('.pdf', '')
  window.print()
  document.head.removeChild(style)
}
