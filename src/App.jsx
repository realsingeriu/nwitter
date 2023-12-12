import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './routes/Home';
import Profile from './routes/Profile';
import Login from './routes/Login';
import CreateAccount from './routes/CreateAccount';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { useEffect, useState } from 'react';
import LoadingScreen from './components/Loading-screen';
import { auth } from './firebase';
import ProtectedRoute from './components/ProtectedRoute';

const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing:border-box;
  }
  body {
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
  },
]);

function App() {
  const [isLoding, setIsLoding] = useState(true);
  const init = async () => {
    //파이어베이스 체크
    await auth.authStateReady();
    setIsLoding(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <Wrapper>
        <GlobalStyle />
        {isLoding ? <LoadingScreen /> : <RouterProvider router={router} />}
      </Wrapper>
    </>
  );
}

export default App;
