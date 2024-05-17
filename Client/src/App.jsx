import { store } from './store'
import { Provider } from 'react-redux'
import { RouterProvider } from "react-router-dom";

function App({ router }) {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
