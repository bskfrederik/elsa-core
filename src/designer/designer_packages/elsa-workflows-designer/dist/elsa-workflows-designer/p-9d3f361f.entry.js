import{r as t,h as i}from"./p-a7a3baa1.js";import{I as s}from"./p-6e6754a9.js";import"./p-691e5295.js";import"./p-219f806a.js";import"./p-72dc819a.js";import"./p-144a434e.js";import"./p-b6964c5d.js";import"./p-e71312f9.js";import"./p-ddecd487.js";const n=class{constructor(i){t(this,i);this.onUpdateClick=()=>{const t=this.renderContext.activity;t.version=t.latestAvailablePublishedVersion;t.workflowDefinitionVersionId=t.latestAvailablePublishedVersionId;this.currentVersion=t.version;this.renderContext.notifyActivityChanged()};this.renderContext=undefined;this.currentVersion=undefined}onRenderContextChanged(t){var i;const s=t===null||t===void 0?void 0:t.activity;this.currentVersion=(i=s===null||s===void 0?void 0:s.version)!==null&&i!==void 0?i:0}componentWillLoad(){this.onRenderContextChanged(this.renderContext)}render(){var t;if(!this.renderContext)return i("div",null);const n=this.renderContext.activity;const o=n.id;const e=n.latestAvailablePublishedVersion;const r=n.version<e;const d=`${o}`;const a={"Current version":this.currentVersion.toString(),"Published version":(t=e===null||e===void 0?void 0:e.toString())!==null&&t!==void 0?t:"-"};return i("div",{key:d},i(s,{title:"Version",dictionary:a}),r&&i("div",null,i("button",{class:"elsa-btn elsa-btn-default",onClick:t=>this.onUpdateClick()},"Upgrade")))}static get watchers(){return{renderContext:["onRenderContextChanged"]}}};export{n as elsa_workflow_definition_activity_version_settings};
//# sourceMappingURL=p-9d3f361f.entry.js.map