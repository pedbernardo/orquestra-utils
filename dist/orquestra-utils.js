(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Utils = factory());
}(this, (function () { 'use strict';

  const defaults = {
    container: 'tr',
    hideClass: 'hidden',
    dataAttrRequired: 'data-was-required'
  };

  const fieldsTypesValueBased = [
    'text',
    'textarea',
    'select-one',
    'hidden'
  ];

  /**
   * @private
   * Encontra um campo de formulário a partir do idetificador
   *
   * @param {String} fieldId - identificador do campo no Orquestra
   * @param {Boolean} options.returnArray - força que o retorno seja um array mesmo quando houve somente 1 campo
   * @returns {Array|HTMLElement} - campo ou array com os campos encontrados
   */
  function getFieldById (fieldId, { returnArray }) {
    returnArray = returnArray || false;
    fieldId = fieldId.substring(0, 3) === 'inp'
      ? fieldId
      : `inp${fieldId}`;

    const fields = document.querySelectorAll(`[xname="${fieldId}"]`);

    if (!fields) {
      console.error(`[Util] Nehum campo de formulário encontrado para o identificador ${fieldId.substring(3)}`);
      return null
    }

    if (returnArray) {
      return [...fields]
    }

    return fields.length > 1
      ? [...fields]
      : fields[0]
  }

  /**
   * @private
   * Verifica se o campo de formulário é obrigatório a partir da propriedade
   * `required="S"` utilizada pelo Orquestra ou pelo atributo temporário
   * `data-was-required` adicionado pela função `hideField`
   *
   * @param {Array} fields - campos de formulário Orquestra
   * @returns {Boolean} se o campo é obrigatório
   */
  function isFieldRequired (fields) {
    return fields.some(
      field =>
        field.getAttribute(defaults.dataAttrRequired) ||
        field.getAttribute('required') === 'S'
    )
  }

  /**
   * @private
   * Retona um `HTMLElement` a partir de um campo de formulário
   *
   * @param {HTMLElement} field - campo de formulário
   * @param {String} containerRef - queryString do elemento que contém o campo de formulário,
   * podendo agrupar outros elementos, comumente utilizado com o label do campo
   * @returns {HTMLElement} contâiner do campo de formulário
   */
  function getContainer (field, containerRef) {
    const container = field.closest(containerRef);
    const fieldId = field.getAttribute('xname').substring(3);

    if (!container) {
      console.error(`[Util] não encontrado HTMLElement para referência ${container} a partir do campo ${fieldId}`);
    }

    return container
  }

  /**
   * @private
   * Limpa o valor de um campo de formulário do tipo `Arquivo`
   * @param {HTMLElement} field - campo de formulário Orquestra
   */
  function clearFileField (field) {
    const fieldId = field.getAttribute('xname').substring(3);
    const deleteBtn = field.parentElement
      .querySelector(`#div${fieldId} > a:last-of-type`);

    if (deleteBtn) {
      deleteBtn.click();
    }
  }

  /**
   * @private
   * @param {String|HTMLElement|HTMLCollection|jQuery} field - campo de formulário Orquestra
   * @param {String} containerRef - queryString do elemento que contém o campo de formulário
   * @returns {Object} campos de formulário e informações auxiliares utilizadas internamente
   */
  function handleField (field, containerRef) {
    const fields = getField(field, { returnArray: true });

    if (!fields) {
      return
    }

    const container = getContainer(fields[0], containerRef);

    if (!container) {
      return
    }

    const isRequired = isFieldRequired(fields);

    return {
      fields,
      container,
      isRequired
    }
  }

  /**
   * @public
   * Normaliza e retorna um campo de formulário Orquestra
   *
   * @param {String|HTMLElement|HTMLCollection|jQuery} field - campo de formulário Orquestra
   * @param {Boolean} options.returnArray - força que o retorno seja um array mesmo quando houve somente 1 campo
   * @returns {Array|HTMLElement} - campo ou array com os campos encontrados
   */
  function getField (field, { returnArray }) {
    returnArray = returnArray || false;

    // eslint-disable-next-line no-undef
    if (field instanceof jQuery) {
      return returnArray || field.length > 0
        ? [...field]
        : field[0]
    }

    if (field instanceof HTMLElement) {
      return returnArray
        ? [field]
        : field
    }

    if (
      field instanceof HTMLCollection ||
      field instanceof NodeList ||
      Array.isArray(field)
    ) {
      return [...field]
    }

    if (typeof field === 'string') {
      return getFieldById(field, { returnArray })
    }
  }

  /**
   * @public
   * Limpa o valor de um campo de formulário
   * @param {String|HTMLElement|HTMLCollection|jQuery} field - campo de formulário Orquestra
   */
  function clearField (fields) {
    const changeEvent = new Event('change');

    fields = Array.isArray(fields)
      ? fields
      : getField(fields, { returnArray: true });

    fields.forEach(field => {
      const fieldType = field.type;
      const xType = field.getAttribute('xtype');

      if (fieldsTypesValueBased.includes(fieldType)) {
        if (xType === 'FILE') {
          clearFileField(field);
        } else {
          field.value = '';
        }
      } else {
        field.checked = false;
      }

      field.dispatchEvent(changeEvent);
    });
  }

  /**
   * @punlic
   * @param {HTMLElement} field - campo de formulário
   * @param {Function} callback - função de callback
   */
  function onFileChange (fields, callback) {
    const [field] = getField(fields, { returnArray: true });
    const xType = field.getAttribute('xtype');
    const id = field.getAttribute('xname').substring(3);
    const btn = field.nextElementSibling;

    if (xType !== 'FILE') {
      return console.error(`[Util] Para observar mudanças o campo deve ser do tipo Arquivo. Tipo informado: ${xType}`)
    }

    const observer = new MutationObserver(handleFileChange);

    observer.observe(btn, { attributes: true });

    function handleFileChange (mutationsList, observer) {
      mutationsList.forEach(mutation => {
        if (mutation.type === 'attributes') {
          const deleteBtn = field.parentElement
            .querySelector(`[xid=div${id}] > a:last-of-type`);

          const filepath = field.value;

          if (deleteBtn) {
            deleteBtn.addEventListener(
              'click',
              () => callback(null)
            );
          }

          callback(filepath, deleteBtn);
        }
      });
    }
  }

  /**
   * Adiciona obrigatoriedade a um campo de forumário Orquestra
   * @param {String|HTMLElement|HTMLCollection|jQuery} field - campo de formulário Orquestra
   */
  function addRequired (fields) {
    fields = Array.isArray(fields)
      ? fields
      : getField(fields, { returnArray: true });

    fields.forEach(field => {
      field.setAttribute('required', 'S');
      field.removeAttribute('data-was-required');
    });
  }

  /**
   * Remove obrigatoriedade a um campo de forumário Orquestra
   * @param {String|HTMLElement|HTMLCollection|jQuery} field - campo de formulário Orquestra
   */
  function removeRequired (fields) {
    fields = Array.isArray(fields)
      ? fields
      : getField(fields, { returnArray: true });

    fields.forEach(field => {
      field.setAttribute('required', 'N');
      field.setAttribute('data-was-required', true);
    });
  }

  /**
   * @public
   * Re-exibe um campo de formulário Orquestra removendo a classe auxiliar indicada.
   *
   * @param {String|HTMLElement|HTMLCollection|jQuery} field - campo de formulário Orquestra
   * @param {String} params.container - queryString do elemento que contém o campo de formulário
   * @param {String} params.hideClass - classe auxiliar utilizada pra ocultar o campo
   */
  function showField (field, params) {
    params = {
      ...defaults,
      ...params
    };

    const props = handleField(field, params.container);

    if (!props) {
      return
    }

    const { fields, container, isRequired } = props;

    container.classList.remove(params.hideClass);

    if (isRequired) {
      addRequired(fields);
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
  function hideField (field, params) {
    params = {
      ...defaults,
      ...params
    };

    const props = handleField(field, params.container);

    if (!props) {
      return
    }

    const { fields, container, isRequired } = props;

    container.classList.add(params.hideClass);

    clearField(fields);

    if (isRequired) {
      removeRequired(fields);
    }
  }

  const UtilsPublic = {
    getField,
    clearField,
    addRequired,
    removeRequired,
    showField,
    hideField,
    onFileChange
  };

  function setup (config) {
    const params = {
      ...defaults,
      ...config
    };

    const getField = field => UtilsPublic.getField(field, params);
    const clearField = field => UtilsPublic.clearField(field);
    const addRequired = field => UtilsPublic.addRequired(field);
    const removeRequired = field => UtilsPublic.removeRequired(field);
    const showField = field => UtilsPublic.showField(field, params);
    const hideField = field => UtilsPublic.hideField(field, params);

    return {
      getField,
      clearField,
      addRequired,
      removeRequired,
      showField,
      hideField
    }
  }

  var index = {
    setup,
    ...UtilsPublic
  };

  return index;

})));
