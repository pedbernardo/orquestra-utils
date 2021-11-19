[![](https://data.jsdelivr.com/v1/package/gh/pedbernardo/orquestra-utils/badge)](https://www.jsdelivr.com/package/gh/pedbernardo/orquestra-utils)
# 📎 Orquestra Utils
Biblioteca utilitária de javascript para interagir com o Orquestra BPMS

## Instalação
Utilizando package managers

```bash
npm install orquestra-utils

# ou com yarn

yarn add orquestra-utils
```

Utilizando CDN
```html
<script src="https://cdn.jsdelivr.net/gh/pedbernardo/orquestra-utils@0.5.6/dist/orquestra-utils.js"></script>

<!-- ou minificado -->

<script src="https://cdn.jsdelivr.net/gh/pedbernardo/orquestra-utils@0.5.6/dist/orquestra-utils.min.js"></script>
```


## Como Utilizar

```js
// importe todas as funções com namespace
import Utils from 'orquestra-utils'

// importe as funções separadamente
import { getMonthName } from 'orquestra-utils'
```

## Configuração

**Configuração Padrão**
```js
const defaults = {
  container: 'tr',
  hideClass: 'hidden',
  requiredClass: 'execute-required',
  dataAttrRequired: 'data-was-required'
}
```
## Construtor

### Como modificar os parâmetros padrão?
<br>
Ao importar a biblioteca (seja através da CDN ou NPM) ela irá dispor das funções utilitárias com a configuração padrão acima. Embora os métodos permitam que a configuração seja redefinida através dos parâmetros, você pode utilizar o **construtor** para criar uma nova instância com os parâmetros desejados.
<br>

### `setup`
Cria uma nova instância de Utils com os parâmetros desejados

> _Utils.setup( Object )_

**Exemplo de uso**
```js
const UtilsForm = Utils.setup({
  container: '.form-group',
  hideClass: 'is-hidden',
  requiredClass: 'is-required',
})

UtilsForm.hideField(document.querySelector('[xname=inpfieldId]'))
```

> Importante perceber que ao utilizar o construtor os métodos não irão suportar o objeto de configuração nos métodos, utilizando sempre a configuração do setup.

<br>

## Métodos

### `showField`
Oculta um campo de formulário, limpa o seu valor e remove sua obrigatoriedade (caso possua)

> _Utils.showField( string | HTMLElement | Node, Object [optional] )_

**Exemplo de uso**
```js
Utils.showField('fieldId')
Utils.showField(document.querySelector('[xname=inpfieldId]'), { container: '.group' })
```

<br>

### `hideField`
Exibe um campo de formulário e recoloca sua obrigatoriedade (caso possua)

> _Utils.showField( string | HTMLElement | Node, Object [optional] )_

**Exemplo de uso**
```js
Utils.hideField('fieldId')
Utils.hideField(document.querySelector('[xname=inpfieldId]'), { container: '.group' })
```

<br>

### `addRequired`
Adiciona obrigatoriedade a um campo de formulário

> _Utils.showField( string | HTMLElement | Node)_

**Exemplo de uso**
```js
Utils.addRequired('fieldId')
Utils.addRequired(document.querySelector('[xname=inpfieldId]'))
```

<br>

### `removeRequired`
Remove obrigatoriedade de um campo de formulário

> _Utils.showField( string | HTMLElement | Node)_

**Exemplo de uso**
```js
Utils.removeRequired('fieldId')
Utils.removeRequired(document.querySelector('[xname=inpfieldId]'))
```

<br>

### `clearField`
Limpa os valores de um campo de formulário

> _Utils.showField( string | HTMLElement | Node)_

**Exemplo de uso**
```js
Utils.clearField('fieldId')
Utils.clearField(document.querySelector('[xname=inpfieldId]'))
```

<br>

### `onFileChange`
Trigger disparado quando um campo do tipo **Arquivo** é modificado

> _Utils.onFileChange( string | HTMLElement | Node, function [callback] )_

**Callbacks**
> **Adição de Arquivo** _Callback( string [filepath], HTMLElement [delete button] )_ <br>
> **Remoção de Arquivo** _Callback( null )_ 
 
**Exemplo de uso**
```js
Utils.onFileChange('fieldId', (filepath, deleteBtn) => {
  console.log({ filepath, deleteBtn })
})
```

