import React from "react";
import Routes from "./pages/Routes/index.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
    return (
        <Provider store={store}>
            <Routes/>
        </Provider>
    );
}
export default App;
