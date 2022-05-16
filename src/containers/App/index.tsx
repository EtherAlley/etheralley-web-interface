import { ReactChild, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router';
import { Box, Center, Container, Spinner } from '@chakra-ui/react';
import { Routes as RouteStrings } from '../../common/constants';
import NavBar from './NavBar';
import useToasts from './useToasts';
import ErrorBoundary from '../../components/ErrorBoundary';
import HomePage from '../HomePage'; // We don't lazy load home page for SEO. We won't want a second network call involved in loading the landing page.

const NotFound = lazy(() => import('../../components/NotFound'));
const ProfilePage = lazy(() => import('../ProfilePage'));
const TopProfilesPage = lazy(() => import('../TopProfilesPage'));
const ShopPage = lazy(() => import('../ShopPage'));
const AboutPage = lazy(() => import('../AboutPage'));

function App() {
  useToasts();

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path={RouteStrings.PROFILE}
          element={
            <Suspense
              fallback={
                <Center>
                  <Spinner />
                </Center>
              }
            >
              <ProfilePage />
            </Suspense>
          }
        />
        <Route
          path={RouteStrings.TRENDING}
          element={
            <PageWrapper>
              <TopProfilesPage />
            </PageWrapper>
          }
        />
        <Route
          path={RouteStrings.SHOP}
          element={
            <PageWrapper>
              <ShopPage />
            </PageWrapper>
          }
        />
        <Route
          path={RouteStrings.ABOUT}
          element={
            <PageWrapper>
              <AboutPage />
            </PageWrapper>
          }
        />
        <Route
          path={RouteStrings.HOME}
          element={
            <PageWrapper>
              <HomePage />
            </PageWrapper>
          }
        />
        <Route
          path="*"
          element={
            <PageWrapper>
              <NotFound />
            </PageWrapper>
          }
        />
      </Routes>
    </>
  );
}

function PageWrapper({ children }: { children: ReactChild }) {
  return (
    <Container maxW="container.lg">
      <Box mt="15vh" />
      <Center>
        <ErrorBoundary>
          <Suspense
            fallback={
              <Center>
                <Spinner />
              </Center>
            }
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      </Center>
    </Container>
  );
}

export default App;
