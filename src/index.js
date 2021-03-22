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

const UtilsPublic = {
  getField,
  clearField,
  addRequired,
  removeRequired,
  showField,
  hideField,
  onFileChange
}

function setup (config) {
  const params = {
    ...configDefaults,
    ...config
  }

  const getField = field => UtilsPublic.getField(field, params)
  const clearField = field => UtilsPublic.clearField(field)
  const addRequired = field => UtilsPublic.addRequired(field)
  const removeRequired = field => UtilsPublic.removeRequired(field)
  const showField = field => UtilsPublic.showField(field, params)
  const hideField = field => UtilsPublic.hideField(field, params)

  return {
    getField,
    clearField,
    addRequired,
    removeRequired,
    showField,
    hideField
  }
}

export default {
  setup,
  ...UtilsPublic
}
