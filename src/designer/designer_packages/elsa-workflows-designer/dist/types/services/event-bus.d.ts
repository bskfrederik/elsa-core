import { EventCallback } from './custom-event-bus';
export declare class EventBus {
  private eventBus;
  /**
   * Emit the event asynchronously.
   * @param {string} eventName - name of the event.
   * @param context
   * @param args
   */
  emit<C = null>(eventName: string, context?: C, ...args: any[]): Promise<void>;
  /**
   * Attach a callback to an event.
   * @param {string} eventName - name of the event.
   * @param {function} callback - callback executed when this event is triggered
   */
  on(eventName: string, callback: EventCallback): void;
  /**
   * Kill an event with all it's callbacks.
   * @param {string} eventName - name of the event.
   */
  off(eventName: string): void;
  /**
   * Remove the callback for the given event.
   * @param {string} eventName - name of the event.
   * @param {callback} callback - the callback to remove (undefined to remove all of them).
   */
  detach(eventName: string, callback?: EventCallback): void;
}
