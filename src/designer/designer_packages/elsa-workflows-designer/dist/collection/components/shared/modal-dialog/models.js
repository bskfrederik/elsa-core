export var ModalActionType;
(function (ModalActionType) {
  ModalActionType[ModalActionType["Button"] = 0] = "Button";
  ModalActionType[ModalActionType["Submit"] = 1] = "Submit";
  ModalActionType[ModalActionType["Cancel"] = 2] = "Cancel";
})(ModalActionType || (ModalActionType = {}));
export class DefaultModalActions {
}
DefaultModalActions.Cancel = (handler) => ({
  text: 'Cancel',
  name: 'Cancel',
  type: ModalActionType.Cancel,
  onClick: handler
});
DefaultModalActions.Close = (handler) => ({
  text: 'Close',
  name: 'Close',
  type: ModalActionType.Cancel,
  onClick: handler
});
DefaultModalActions.Save = (handler) => ({
  text: 'Save',
  name: 'Save',
  type: ModalActionType.Submit,
  isPrimary: true,
  onClick: handler
});
DefaultModalActions.Delete = (handler) => ({
  text: 'Delete',
  name: 'Delete',
  type: ModalActionType.Button,
  isDangerous: true,
  onClick: handler
});
DefaultModalActions.Publish = (handler) => ({
  text: 'Publish',
  name: 'Publish',
  type: ModalActionType.Button,
  isDangerous: true,
  onClick: handler
});
DefaultModalActions.Unpublish = (handler) => ({
  text: 'Unpublish',
  name: 'Unpublish',
  type: ModalActionType.Button,
  isDangerous: true,
  onClick: handler
});
DefaultModalActions.New = (handler) => ({
  text: 'New',
  name: 'New',
  type: ModalActionType.Button,
  isPrimary: true,
  onClick: handler
});
DefaultModalActions.Yes = (handler) => ({
  text: 'Yes',
  name: 'Yes',
  type: ModalActionType.Button,
  isDangerous: true,
  onClick: handler
});
//# sourceMappingURL=models.js.map
