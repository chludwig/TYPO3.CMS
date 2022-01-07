/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,i,s){void 0===s&&(s=i),Object.defineProperty(e,s,{enumerable:!0,get:function(){return t[i]}})}:function(e,t,i,s){void 0===s&&(s=i),e[s]=t[i]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__decorate=this&&this.__decorate||function(e,t,i,s){var n,d=arguments.length,r=d<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(d<3?n(r):d>3?n(t,i,r):n(t,i))||r);return d>3&&r&&Object.defineProperty(t,i,r),r},__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&__createBinding(t,e,i);return __setModuleDefault(t,e),t};define(["require","exports","d3-selection","../../SvgTree","lit/decorators"],(function(e,t,i,s,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SelectTree=void 0,i=__importStar(i);let d=class extends s.SvgTree{constructor(){super(),this.textPosition=30,this.settings={unselectableElements:[],exclusiveNodesIdentifiers:"",validation:{},readOnlyMode:!1,showIcons:!0,marginTop:15,nodeHeight:20,indentWidth:16,width:300,duration:400,dataUrl:"",defaultProperties:{},expandUpToLevel:null},this.exclusiveSelectedNode=null,this.addIcons(),this.addEventListener("typo3:svg-tree:nodes-prepared",this.prepareLoadedNodes)}expandAll(){this.nodes.forEach(e=>{this.showChildren(e)}),this.prepareDataForVisibleNodes(),this.updateVisibleNodes()}selectNode(e,t=!0){if(!this.isNodeSelectable(e))return;const i=e.checked;this.handleExclusiveNodeSelection(e),this.settings.validation&&this.settings.validation.maxItems&&!i&&this.getSelectedNodes().length>=this.settings.validation.maxItems||(e.checked=!i,this.dispatchEvent(new CustomEvent("typo3:svg-tree:node-selected",{detail:{node:e,propagate:t}})),this.updateVisibleNodes())}filter(e){this.searchTerm=e,this.nodes.length&&(this.nodes[0].expanded=!1);const t=new RegExp(e,"i");this.nodes.forEach(e=>{t.test(e.name)?(this.showParents(e),e.expanded=!0,e.hidden=!1):(e.hidden=!0,e.expanded=!1)}),this.prepareDataForVisibleNodes(),this.updateVisibleNodes()}showParents(e){if(0===e.parents.length)return;const t=this.nodes[e.parents[0]];t.hidden=!1,t.expanded=!0,this.showParents(t)}updateVisibleNodes(){super.updateVisibleNodes();const e=Math.ceil(this.viewportHeight/this.settings.nodeHeight+1),t=Math.floor(Math.max(this.scrollTop-2*this.settings.nodeHeight,0)/this.settings.nodeHeight),s=this.data.nodes.slice(t,t+e);this.nodesContainer.selectAll(".node").data(s,e=>e.stateIdentifier).selectAll(".tree-check use").attr("visibility",(function(e){const t=Boolean(e.checked),s=i.select(this);return s.classed("icon-checked")&&t||s.classed("icon-indeterminate")&&e.indeterminate&&!t?"visible":!s.classed("icon-check")||e.indeterminate||t?"hidden":"visible"}))}isNodeSelectable(e){return!this.settings.readOnlyMode&&-1===this.settings.unselectableElements.indexOf(e.identifier)}appendTextElement(e){return this.renderCheckbox(e),super.appendTextElement(e)}renderCheckbox(e){const t=e.filter(e=>this.isNodeSelectable(e)||Boolean(e.checked)).append("g").attr("class","tree-check").on("click",(e,t)=>this.selectNode(t));t.append("use").attr("x",28).attr("y",-8).attr("visibility","hidden").attr("class","icon-check").attr("xlink:href","#icon-check"),t.append("use").attr("x",28).attr("y",-8).attr("visibility","hidden").attr("class","icon-checked").attr("xlink:href","#icon-checked"),t.append("use").attr("x",28).attr("y",-8).attr("visibility","hidden").attr("class","icon-indeterminate").attr("xlink:href","#icon-indeterminate")}prepareLoadedNodes(e){let t=e.detail.nodes;e.detail.nodes=t.map(e=>{if(!e.stateIdentifier){const t=e.parents.length?e.parents[e.parents.length-1]:e.identifier;e.stateIdentifier=t+"_"+e.identifier}return!1===e.selectable&&this.settings.unselectableElements.push(e.identifier),e})}handleExclusiveNodeSelection(e){const t=this.settings.exclusiveNodesIdentifiers.split(",");this.settings.exclusiveNodesIdentifiers.length&&!1===e.checked&&(t.indexOf(""+e.identifier)>-1?(this.disableSelectedNodes(),this.exclusiveSelectedNode=e):-1===t.indexOf(""+e.identifier)&&this.exclusiveSelectedNode&&(this.exclusiveSelectedNode.checked=!1,this.exclusiveSelectedNode=null))}addIcons(){this.icons={check:{identifier:"check",icon:'<g width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect height="16" width="16" fill="transparent"></rect><path transform="scale(0.01)" d="M1312 256h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-832q0-66-47-113t-113-47zm288 160v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z"></path></g>'},checked:{identifier:"checked",icon:'<g width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect height="16" width="16" fill="transparent"></rect><path transform="scale(0.01)" d="M813 1299l614-614q19-19 19-45t-19-45l-102-102q-19-19-45-19t-45 19l-467 467-211-211q-19-19-45-19t-45 19l-102 102q-19 19-19 45t19 45l358 358q19 19 45 19t45-19zm851-883v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z"></path></g>'},indeterminate:{identifier:"indeterminate",icon:'<g width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect height="16" width="16" fill="transparent"></rect><path transform="scale(0.01)" d="M1344 800v64q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h832q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z"></path></g>'}}}};d=__decorate([n.customElement("typo3-backend-form-selecttree")],d),t.SelectTree=d}));