import { defaults } from './_config'
import { handleField, clearField } from './helpers'
import { addRequired, removeRequired } from './require'

/**
 * @public
 * Re-exibe um campo de formulário Orquestra removendo a classe auxiliar indicada.
 *
 * @param {String|HTMLElement|HTMLCollection|jQuery} field - campo de formulário Orquestra
 * @param {String} params.container - queryString do elemento que contém o campo de formulário
 * @param {String} params.hideClass - classe auxiliar utilizada pra ocultar o campo
 */
export function showField (field, params) {
  params = {
    ...defaults,
    ...params
  }

  const props = handleField(field, params.container)

  if (!props) {
    return
  }

  const { fields, container, isRequired } = props

  container.classList.remove(params.hideClass)

  if (isRequired) {
    addRequired(fields)
  }
}

/**
 * @public
 * Oculta um campo de formulário Orquestra adicionando a classe auxiliar indicada,
 * como também limpa o seu valor.
 *
 * Para tanto a classe deve conter a propriedade `display: none`
 *
 * @param {String|HTMLElement|HTMLCollection|jQuery} field - campo de formulário Orquestra
 * @param {String} params.container - queryString do elemento que contém o campo de formulário
 * @param {String} params.hideClass - classe auxiliar utilizada pra ocultar o campo
 */
export function hideField (field, params) {
  params = {
    ...defaults,
    ...params
  }

  const props = handleField(field, params.container)

  if (!props) {
    return
  }

  const { fields, container, isRequired } = props

  container.classList.add(params.hideClass)

  clearField(fields)

  if (isRequired) {
    removeRequired(fields)
  }
}
