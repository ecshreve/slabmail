// /index.tsx
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initClientInstrumentation } from './otel';
initClientInstrumentation();

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  // <React.StrictMode>
  <>
    <App />
  </>
  // </React.StrictMode>
);

reportWebVitals();
