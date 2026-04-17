import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const PDF_W_MM = 210
const PDF_H_MM = 297
const SCALE = 2

function collectLinks(el) {
  const elRect = el.getBoundingClientRect()
  const ratio = PDF_W_MM / el.offsetWidth
  const annotations = []
  el.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href')
    if (!href || href.startsWith('#')) return
    const r = link.getBoundingClientRect()
    annotations.push({
      x: (r.left - elRect.left) * ratio,
      y: (r.top - elRect.top) * ratio,
      w: r.width * ratio,
      h: r.height * ratio,
      url: href,
    })
  })
  return annotations
}

export const usePDFExport = () => {
  const ref = useRef()
  const [exporting, setExporting] = useState(false)

  const handlePrint = async () => {
    const el = ref.current
    if (!el) return
    setExporting(true)
    try {
      await document.fonts.ready
      await new Promise((resolve) => setTimeout(resolve, 200))

      // Capture link positions before canvas render
      const linkAnnotations = collectLinks(el)

      const canvas = await html2canvas(el, {
        scale: SCALE,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        foreignObjectRendering: false,
        onclone: async (_clonedDoc, clonedEl) => {
          let node = clonedEl.parentElement
          while (node) {
            node.style.transform = 'none'
            node.style.zoom = ''
            node = node.parentElement
          }
        },
      })

      const imgData = canvas.toDataURL('image/jpeg', 0.95)
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

      const naturalH = (canvas.height / canvas.width) * PDF_W_MM

      if (naturalH <= PDF_H_MM) {
        pdf.addImage(imgData, 'JPEG', 0, 0, PDF_W_MM, naturalH)
        linkAnnotations.forEach(({ x, y, w, h, url }) => {
          pdf.link(x, y, w, h, { url })
        })
      } else {
        const scale = PDF_H_MM / naturalH
        const fittedW = PDF_W_MM * scale
        const offsetX = (PDF_W_MM - fittedW) / 2
        pdf.addImage(imgData, 'JPEG', offsetX, 0, fittedW, PDF_H_MM)
        linkAnnotations.forEach(({ x, y, w, h, url }) => {
          pdf.link(offsetX + x * scale, y * scale, w * scale, h * scale, { url })
        })
      }

      pdf.save('Curriculo.pdf')
    } finally {
      setExporting(false)
    }
  }

  return { ref, handlePrint, exporting }
}
