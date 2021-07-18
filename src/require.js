import { defaults } from './_config'
import { getField, getContainer } from './helpers'

/**
 * Adiciona obrigatoriedade a um campo de forumário Orquestra
 * @param {String|HTMLElement|HTMLCollection|jQuery} field - campo de formulário Orquestra
 * @param {Boolean} params.toggleClass - habilita a adição de classe auxiliar ao container do campo de formulário
 */
export function addRequired (fields, params) {
  params = {
    toggleClass: false,
    ...defaults,
    ...params
  }

  fields = Array.isArray(fields)
    ? fields
    : getField(fields, { returnArray: true })

  const container = getContainer(fields[0], params.container)

  fields.forEach(field => {
    field.setAttribute('required', 'S')
    field.removeAttribute(params.dataAttrRequired)
  })

  if (params.toggleClass) {
    container.classList.add(params.requiredClass)
  }
}

/**
 * Remove obrigatoriedade a um campo de forumário Orquestra
 * @param {String|HTMLElement|HTMLCollection|jQuery} field - campo de formulário Orquestra
 * @param {Boolean} params.toggleClass - habilita a remoção de classe auxiliar do container do campo de formulário
 */
export function removeRequired (fields, params) {
  params = {
    toggleClass: false,
    ...defaults,
    ...params
  }

  fields = Array.isArray(fields)
    ? fields
    : getField(fields, { returnArray: true })

  const container = getContainer(fields[0], params.container)

  fields.forEach(field => {
    field.setAttribute('required', 'N')
    field.setAttribute(params.dataAttrRequired, true)
  })

  if (params.toggleClass) {
    container.classList.remove(params.requiredClass)
  }
}
