export var ActivityIconSize;
(function (ActivityIconSize) {
  ActivityIconSize[ActivityIconSize["Small"] = 0] = "Small";
  ActivityIconSize[ActivityIconSize["Medium"] = 1] = "Medium";
  ActivityIconSize[ActivityIconSize["Large"] = 2] = "Large";
})(ActivityIconSize || (ActivityIconSize = {}));
export function getActivityIconCssClass(settings) {
  const cssClasses = ['tw-text-white', sizeToClass(settings.size)];
  return cssClasses.join(' ');
}
function sizeToClass(size) {
  switch (size) {
    case ActivityIconSize.Small:
      return 'tw-h-4 tw-w-4';
    case ActivityIconSize.Medium:
      return 'tw-h-6 tw-w-6';
    case ActivityIconSize.Large:
      return 'tw-h-10 tw-w-10';
    default:
      return 'tw-h-6 tw-w-6';
  }
}
//# sourceMappingURL=models.js.map
