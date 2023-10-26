import { BrowserRouter } from 'react-router-dom';

import AllRoutes from '@/routes/AllRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
};

export default App;
