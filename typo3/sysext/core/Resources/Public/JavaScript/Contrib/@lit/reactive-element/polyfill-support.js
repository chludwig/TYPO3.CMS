define((function(){"use strict";var i;i=function(){
/**
          * @license
          * Copyright 2017 Google LLC
          * SPDX-License-Identifier: BSD-3-Clause
          */
var i,n="__scoped";null!==(i=window.reactiveElementPolyfillSupport)&&void 0!==i||(window.reactiveElementPolyfillSupport=function(i){var t=i.ReactiveElement;if(void 0!==window.ShadyCSS&&(!window.ShadyCSS.nativeShadow||window.ShadyCSS.ApplyShim)){var o=t.prototype;window.ShadyDOM&&window.ShadyDOM.inUse&&!0===window.ShadyDOM.noPatch&&window.ShadyDOM.patchElementProto(o);var d=o.createRenderRoot;o.createRenderRoot=function(){var i,t,o,w=this.localName;if(window.ShadyCSS.nativeShadow)return d.call(this);if(!this.constructor.hasOwnProperty(n)){this.constructor[n]=!0;var s=this.constructor.elementStyles.map((function(i){return i instanceof CSSStyleSheet?Array.from(i.cssRules).reduce((function(i,n){return i+n.cssText}),""):i.cssText}));null===(t=null===(i=window.ShadyCSS)||void 0===i?void 0:i.ScopingShim)||void 0===t||t.prepareAdoptedCssText(s,w),void 0===this.constructor._$AJ&&window.ShadyCSS.prepareTemplateStyles(document.createElement("template"),w)}return null!==(o=this.shadowRoot)&&void 0!==o?o:this.attachShadow(this.constructor.shadowRootOptions)};var w=o.connectedCallback;o.connectedCallback=function(){w.call(this),this.hasUpdated&&window.ShadyCSS.styleElement(this)};var s=o._$AE;o._$AE=function(i){this.hasUpdated||window.ShadyCSS.styleElement(this),s.call(this,i)}}})},"function"==typeof define&&define.amd?define(i):i()}));