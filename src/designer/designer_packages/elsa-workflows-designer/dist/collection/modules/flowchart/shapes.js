import { Graph, Shape } from '@antv/x6';
import { Container } from 'typedi';
import { ActivityDriverRegistry } from '../../services';
export class ActivityNodeShape extends Shape.HTML {
  get text() {
    return this.store.get('text');
  }
  set text(value) {
    this.store.set('text', value);
  }
  get activity() {
    return this.store.get('activity');
  }
  set activity(value) {
    this.store.set('activity', value);
  }
  get activityDescriptor() {
    return this.store.get('activityDescriptor');
  }
  set activityDescriptor(value) {
    this.store.set('activityDescriptor', value);
  }
  init() {
    super.init();
    this.updateSize();
  }
  setup() {
    const self = this;
    super.setup();
    this.on('change:text', this.updateSize, this);
    this.on('change:activity', this.updateSize, this);
    this.html = {
      render() {
        return self.createHtml();
      },
      shouldComponentUpdate(node) {
        return node.hasChanged('text') || node.hasChanged('activity');
      },
    };
  }
  updateSize() {
    const activityDescriptor = this.activityDescriptor;
    if (!activityDescriptor)
      return;
    const wrapper = document.createElement('div');
    wrapper.className = 'tw-inline-block tw-flex tw-items-center tw-pl-10 tw-pr-2 tw-py-2 tw-absolute';
    wrapper.style.left = '-1000px';
    wrapper.style.top = '-1000px';
    wrapper.innerHTML = this.createHtml();
    // Append the temporary element to the DOM.
    // Important: this needs to be a child of the elsa-studio element, otherwise the tailwind CSS classes will not be applied due to the "important" rule in tailwind.config.js.
    const elsaStudioElement = document.getElementsByTagName('elsa-flowchart')[0];
    console.log(elsaStudioElement);
    elsaStudioElement.append(wrapper);
    // Wait for activity element to be completely rendered.
    // When using custom elements, they are rendered after they are mounted. Before then, they have a 0 width and height.
    const tryUpdateSize = () => {
      const activityElement = wrapper.getElementsByTagName('elsa-default-activity-template')[0];
      const activityElementRect = activityElement.getBoundingClientRect();
      // If the custom element has no width or height yet, it means it has not yet rendered.
      if (activityElementRect.width == 0 || activityElementRect.height == 0) {
        // Request an animation frame and call ourselves back immediately after.
        window.requestAnimationFrame(tryUpdateSize);
        return;
      }
      const rect = wrapper.firstElementChild.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      // Update size of the activity node.
      this.prop({ size: { width, height } });
      // Remove the temporary element (used only to calculate its size).
      wrapper.remove();
    };
    // Begin try to get our element size.
    tryUpdateSize();
  }
  createHtml() {
    const activityDescriptor = this.activityDescriptor;
    const activity = this.activity;
    const activityType = activityDescriptor.typeName;
    const driverRegistry = Container.get(ActivityDriverRegistry);
    const driver = driverRegistry.createDriver(activityType);
    const displayContext = {
      activity: activity,
      activityDescriptor: activityDescriptor,
      displayType: "designer"
    };
    return driver.display(displayContext);
  }
}
ActivityNodeShape.config({
  ports: {
    groups: {
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#3c82f6',
            strokeWidth: 2,
            fill: '#fff',
          },
          text: {
            fontSize: 12,
            fill: '#888',
          },
        },
        label: {
          position: {
            name: 'outside',
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#3c82f6',
            strokeWidth: 2,
            fill: '#fff',
          },
          text: {
            fontSize: 12,
            fill: '#888',
          },
        },
        label: {
          position: {
            name: 'outside',
          },
        },
      },
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#3c82f6',
            strokeWidth: 2,
            fill: '#fff',
          },
          text: {
            fontSize: 12,
            fill: '#888',
          },
        },
        label: {
          position: {
            name: 'outside',
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#3c82f6',
            strokeWidth: 2,
            fill: '#fff',
          },
          text: {
            fontSize: 12,
            fill: '#888',
          },
        },
        label: {
          position: {
            name: 'outside',
          },
        },
      },
    },
  },
});
Graph.registerNode('activity', ActivityNodeShape, true);
//# sourceMappingURL=shapes.js.map
