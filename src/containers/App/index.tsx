import { Route, Routes } from 'react-router';
import Home from '../HomePage';
import Profile from '../ProfilePage';
import { Routes as RouteStrings, Toasts } from '../../common/constants';
import NavBar from './NavBar';
import useAppSelector from '../../hooks/useAppSelector';
import { selectApp } from './slice';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

function App() {
  useToasts();

  return (
    <>
      <NavBar />
      <Routes>
        <Route path={RouteStrings.PROFILE} element={<Profile />} />
        <Route path={RouteStrings.HOME} element={<Home />} />
      </Routes>
    </>
  );
}

function useToasts() {
  const intl = useIntl();
  const { toastId, toast, status } = useAppSelector(selectApp);
  const showToast = useToast();

  useEffect(() => {
    if (toastId) {
      let description = '';
      switch (toast) {
        case Toasts.ADDING_BADGE:
          description = intl.formatMessage({ id: 'adding-badge-description', defaultMessage: 'Error adding badge' });
          break;
      }
      showToast({
        description,
        status,
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toastId, toast, status, showToast]);
}

export default App;
