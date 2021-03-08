import { getField } from './helpers'

/**
 * Adiciona obrigatoriedade a um campo de forumário Orquestra
 * @param {String|HTMLElement|HTMLCollection|jQuery} field - campo de formulário Orquestra
 */
export function addRequired (fields) {
  fields = Array.isArray(fields)
    ? fields
    : getField(fields, { returnArray: true })

  fields.forEach(field => {
    field.setAttribute('required', 'S')
    field.removeAttribute('data-was-required')
  })
}

/**
 * Remove obrigatoriedade a um campo de forumário Orquestra
 * @param {String|HTMLElement|HTMLCollection|jQuery} field - campo de formulário Orquestra
 */
export function removeRequired (fields) {
  fields = Array.isArray(fields)
    ? fields
    : getField(fields, { returnArray: true })

  fields.forEach(field => {
    field.setAttribute('required', 'N')
    field.setAttribute('data-was-required', true)
  })
}
