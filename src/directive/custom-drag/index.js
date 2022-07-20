import drag from './drag'

const install = function(Vue) {
  Vue.directive('custom-drag', drag)
}

if (window.Vue) {
  window['custom-drag'] = drag
  Vue.use(install); // eslint-disable-line
}

drag.install = install
export default drag
