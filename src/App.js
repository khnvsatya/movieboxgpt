import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore} className="scrollbar-hide">
      <Body />
    </Provider>
  );
}

export default App;
