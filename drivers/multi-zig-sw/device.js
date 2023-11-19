'use strict';

const { ZigBeeDevice } = require('homey-zigbeedriver');
const { debug, CLUSTER } = require('zigbee-clusters');

// Enable debug logging of all relevant Zigbee communication
debug(true);

class MyDevice extends ZigBeeDevice {

  /**
   * onInit is called when the device is initialized.
   */
  async onNodeInit({ zclNode }) {
    this.printNode();
    // Register measure_battery capability and configure attribute reporting
    this.batteryThreshold = 20;
    this.registerCapability('alarm_battery', CLUSTER.POWER_CONFIGURATION, {
      getOpts: {
        getOnStart: true,
      },
      reportOpts: {
        configureAttributeReporting: {
          minInterval: 0, // No minimum reporting interval
          maxInterval: 60000, // Maximally every ~16 hours
          minChange: 5, // Report when value changed by 5
        },
      },
    });

    // measure_battery
    this.registerCapability('measure_battery', CLUSTER.POWER_CONFIGURATION, {
      getOpts: {
      getOnStart: true,
      },
      reportOpts: {
        configureAttributeReporting: {
          minInterval: 0,
          maxInterval: 60000,
          minChange: 1,
        },
      },
    });

    // Click handler Virker men sender kun on off   
    // 1 click (on)(off)
    // 2 click (on)(off)(on)(off)
    // hold    (on)
    // release (off)

    // https://github.com/JohanBendz/com.tuya.zigbee/blob/SDK3/drivers/smart_remote_1_button_2/device.js

    //let debounce = 0;
//
    //const node = await this.homey.zigbee.getNode(this);
    //node.handleFrame = (endpointId, clusterId, frame, meta) => {
    //  //if (clusterId === 6) {
    //    this.log(
    //      "endpointId:",
    //      endpointId,
    //      ", clusterId:",
    //      clusterId,
    //      ", frame:",
    //      frame,
    //      ", meta:",
    //      meta
    //    );
    //    this.log("Frame JSON data:", frame.toJSON());
    //    debounce = debounce + 1;
    //    //if (debounce === 1) {
    //    //  this.buttonCommandParser(frame);
    //    //} else {
    //    //  debounce = 0;
    //    //}
    //  //}
    //};


  }

}

module.exports = MyDevice;
