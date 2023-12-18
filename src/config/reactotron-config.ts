// @ts-nocheck 
import { reactotronRedux } from "reactotron-redux";

import Reactotron, { overlay, networking } from "reactotron-react-native"

const reactotron = Reactotron.configure({
  name: "DemoApp",
  // host: "192.168.1.8",
})

  .useReactNative({
    asyncStorage: false, // there are more options to the async storage.
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    overlay: false, // just turning off overlay
  })
  .use(reactotronRedux())
  .use(overlay())
  .use(networking())

  .connect();

export default reactotron;
