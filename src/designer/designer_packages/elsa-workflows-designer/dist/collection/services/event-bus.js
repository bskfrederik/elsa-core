var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Service } from 'typedi';
import CustomEventBus from './custom-event-bus';
let EventBus = class EventBus {
  constructor() {
    this.eventBus = new CustomEventBus();
  }
  /**
   * Emit the event asynchronously.
   * @param {string} eventName - name of the event.
   * @param context
   * @param args
   */
  async emit(eventName, context, ...args) {
    await this.eventBus.emit(eventName, context, ...args);
  }
  /**
   * Attach a callback to an event.
   * @param {string} eventName - name of the event.
   * @param {function} callback - callback executed when this event is triggered
   */
  on(eventName, callback) {
    this.eventBus.on(eventName, callback);
  }
  /**
   * Kill an event with all it's callbacks.
   * @param {string} eventName - name of the event.
   */
  off(eventName) {
    this.eventBus.off(eventName);
  }
  /**
   * Remove the callback for the given event.
   * @param {string} eventName - name of the event.
   * @param {callback} callback - the callback to remove (undefined to remove all of them).
   */
  detach(eventName, callback) {
    this.eventBus.off(eventName);
  }
};
EventBus = __decorate([
  Service()
], EventBus);
export { EventBus };
//# sourceMappingURL=event-bus.js.map
