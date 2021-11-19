import { defaults as configDefaults } from './_config'

import {
  getField,
  clearField,
  onFileChange
} from './helpers'

import {
  addRequired,
  removeRequired
} from './require'

import {
  showField,
  hideField
} from './visibility'

function setup (config) {
  const params = {
    ...configDefaults,
    ...config
  }

  const getField = field => getField(field, params)
  const clearField = field => clearField(field)
  const addRequired = field => addRequired(field)
  const removeRequired = field => removeRequired(field)
  const showField = field => showField(field, params)
  const hideField = field => hideField(field, params)

  return {
    getField,
    clearField,
    addRequired,
    removeRequired,
    showField,
    hideField,
    onFileChange
  }
}

export {
  setup,
  getField,
  clearField,
  addRequired,
  removeRequired,
  showField,
  hideField,
  onFileChange
}
