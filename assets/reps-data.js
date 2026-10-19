/* Contatos publicamente divulgados pela Surf Star no linktr.ee/surfstarns.
 * Não foram atribuídas regiões de atendimento ou números de SKU não confirmados.
 */
window.SURFSTAR_REPS = [
  { id: 'cleiton', name: 'Cleiton', initials: 'C', phone: '553791733969' },
  { id: 'luiz', name: 'Luiz Fernando', initials: 'LF', phone: '553791774242' },
  { id: 'marcos', name: 'Marcos Paulo', initials: 'MP', phone: '5537999916363' }
];
window.surfstarWhatsapp = function(phone,message) {
  return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
};
