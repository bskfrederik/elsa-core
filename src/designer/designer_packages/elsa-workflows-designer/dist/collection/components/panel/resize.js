import { PanelPosition } from './models';
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
export function applyResize({ position, isDefault, isHide, size }) {
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
//# sourceMappingURL=resize.js.map
