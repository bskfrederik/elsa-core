import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

var PanelPosition;
(function (PanelPosition) {
  PanelPosition[PanelPosition["Left"] = 0] = "Left";
  PanelPosition[PanelPosition["Top"] = 1] = "Top";
  PanelPosition[PanelPosition["Right"] = 2] = "Right";
  PanelPosition[PanelPosition["Bottom"] = 3] = "Bottom";
})(PanelPosition || (PanelPosition = {}));

const positionToLocalStorage = {
  [PanelPosition.Right]: 'LS/rightPanelWidth',
  [PanelPosition.Left]: 'LS/leftPanelWidth',
  [PanelPosition.Bottom]: 'LS/bottomPanelWidth',
};
const positionToCssVariable = {
  [PanelPosition.Right]: '--workflow-editor-width',
  [PanelPosition.Left]: '--activity-picker-width',
  [PanelPosition.Bottom]: '--activity-editor-height',
};
const positionToDefaultSize = {
  [PanelPosition.Right]: 580,
  [PanelPosition.Left]: 300,
  [PanelPosition.Bottom]: 200,
};
function getPanelDefaultSize(position) {
  return localStorage.getItem(positionToLocalStorage[position]) || positionToDefaultSize[position];
}
function updatePanelDefaultSize(position, size) {
  return localStorage.setItem(positionToLocalStorage[position], size.toString());
}
function applyResize({ position, isDefault, isHide, size }) {
  const root = document.querySelector(':root');
  if (isHide) {
    root.style.setProperty(positionToCssVariable[position], '1px');
    return;
  }
  if (isDefault) {
    if (position < 0)
      position = position * -1;
    root.style.setProperty(positionToCssVariable[position], `${getPanelDefaultSize(position)}px`);
    return;
  }
  if (size < 0) {
    const flowChart = document.querySelector('elsa-flowchart');
    size = window.innerHeight + size - flowChart.getBoundingClientRect().y + 55;
  }
  root.style.setProperty(positionToCssVariable[position], `${size}px`);
  updatePanelDefaultSize(position, size);
  return;
}

const panelCss = ".panel-state-collapsed.panel-position-bottom{right:var(--workflow-editor-width);left:var(--activity-picker-width)}.panel-position-bottom{right:var(--workflow-editor-width) !important;left:var(--activity-picker-width) !important}";

const Panel = /*@__PURE__*/ proxyCustomElement(class Panel extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.expandedStateChanged = createEvent(this, "expandedStateChanged", 7);
    this.dragging = false;
    this.onToggleClick = () => {
      if (this.isExpanded) {
        applyResize({ position: this.position, isHide: true });
      }
      else {
        applyResize({ position: this.position, isDefault: true });
      }
      this.isExpanded = !this.isExpanded;
      this.expandedStateChanged.emit({ expanded: this.isExpanded });
    };
    this.onBodyMouseUp = () => {
      if (this.dragging) {
        this.clearJSEvents();
      }
    };
    this.resize = (e) => {
      if (this.position === PanelPosition.Right) {
        applyResize({ position: PanelPosition.Right, size: document.body.clientWidth - e.pageX });
      }
      if (this.position === PanelPosition.Left) {
        applyResize({ position: PanelPosition.Left, size: e.pageX });
      }
      if (this.position === PanelPosition.Bottom) {
        applyResize({ position: PanelPosition.Bottom, size: document.body.offsetHeight - e.pageY });
      }
    };
    this.onDragBarMouseDown = (e) => {
      e.preventDefault();
      const body = document.body;
      this.dragging = true;
      body.addEventListener('mousemove', this.resize);
    };
    this.position = PanelPosition.Left;
    this.isExpanded = true;
  }
  componentWillLoad() {
    document.addEventListener('mouseup', this.onBodyMouseUp);
    applyResize({ position: this.position, isDefault: true });
  }
  disconnectedCallback() {
    document.removeEventListener('mouseup', this.onBodyMouseUp);
  }
  clearJSEvents() {
    const body = document.body;
    this.dragging = false;
    body.removeEventListener('mousemove', this.resize);
  }
  render() {
    const isExpanded = this.isExpanded;
    const position = this.position;
    const stateClass = isExpanded ? 'panel-state-expanded' : 'panel-state-collapsed';
    const containerClassMap = [];
    containerClassMap[PanelPosition.Left] = 'panel-position-left tw-left-0 tw-top-0 tw-bottom-0 tw-border-r';
    containerClassMap[PanelPosition.Top] = 'panel-position-top tw-left-0 tw-top-0 tw-right-0 tw-border-b';
    containerClassMap[PanelPosition.Bottom] = 'panel-position-bottom h-0 tw-bottom-0 tw-border-t';
    containerClassMap[PanelPosition.Right] = 'panel-position-right tw-right-0 tw-top-0 tw-bottom-0 tw-border-l';
    const containerCssClass = containerClassMap[position];
    const toggleClassMap = {};
    toggleClassMap[PanelPosition.Left] = 'elsa-panel-toggle-left';
    toggleClassMap[PanelPosition.Top] = 'elsa-panel-toggle-top';
    toggleClassMap[PanelPosition.Right] = 'elsa-panel-toggle-right';
    toggleClassMap[PanelPosition.Bottom] = 'elsa-panel-toggle-bottom';
    const toggleCssClass = toggleClassMap[position];
    const iconOrientationCssClass = isExpanded ? 'tw-rotate-180' : '';
    const dragBarClassMap = {
      [PanelPosition.Left]: 'tw-right-0 tw-h-full tw-cursor-col-resize tw-w-1',
      [PanelPosition.Right]: 'tw-left-0 tw-h-full tw-cursor-col-resize tw-w-1',
      [PanelPosition.Bottom]: 'tw-top-0 tw-w-full tw-cursor-row-resize tw-h-1',
    };
    const dragBarClass = dragBarClassMap[this.position];
    return (h(Host, { class: `panel tw-absolute tw-bg-white tw-z-20 ${containerCssClass} ${stateClass}` }, h("div", { class: `tw-absolute tw-opacity-0 tw-bg-blue-400 tw-transition tw-ease-in-out tw-duration-300 hover:tw-opacity-100 tw-z-10 ${dragBarClass}`, onMouseDown: this.onDragBarMouseDown }), h("div", { class: "panel-content-container" }, h("slot", null)), h("div", { class: `tw-text-white ${toggleCssClass}`, onClick: () => this.onToggleClick() }, h("svg", { class: `tw-h-6 tw-w-6 tw-text-gray-700 ${iconOrientationCssClass}`, width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("polyline", { points: "9 6 15 12 9 18" })))));
  }
  get element() { return this; }
  static get style() { return panelCss; }
}, [4, "elsa-panel", {
    "position": [2],
    "isExpanded": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-panel"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-panel":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Panel);
      }
      break;
  } });
}

export { Panel as P, PanelPosition as a, defineCustomElement as d };

//# sourceMappingURL=panel.js.map