/** Alternating section backgrounds for service catalog lists */
export const SECTION_BG_CYCLE = ['white', 'sky', 'stone']

export function sectionBgAt(index) {
  return SECTION_BG_CYCLE[index % SECTION_BG_CYCLE.length]
}
