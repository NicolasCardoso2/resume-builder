export function formatDate(value) {
  if (!value) return ''
  const [year, month] = value.split('-')
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
  ]
  return month ? `${months[parseInt(month, 10) - 1]} ${year}` : year
}
