import React from 'react';
import {BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';

import {WelcomePage,  LoginPage, SigninPage, CatListPage, DogListPage, ShelterListPage,  WalkListPage, CatDetailPage,  DogDetailPage, ShelterDetailPage, WalkDetailPage, InformationPage,  WalkConfirmationPage, AdoptConfirmationPage, AdoptCalendarPage, WalkCalendarPage, ContactPage, HomePage, NotFoundPage, SignInPage, PostsPage, PostDetailPage   } from './pages';
import { AdminPage } from './admin/pages';
import { StartLayout, ListLayout, DetailLayout, InformationLayout, ConfirmationLayout, CalendarLayout, BackofficeLayout, PageLayout, ErrorLayout, AuthLayout } from './layouts';
import { AuthRouteWithLayout, RouteWithLayout } from './utilities';
import * as Routes from './routes';
import { ApiProvider, AuthProvider } from './services';

import './app.scss';

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <ApiProvider>
          <Router basename='/'>
            <Switch>

              //START
              <RouteWithLayout exact path={Routes.LANDING} component={WelcomePage} layout={StartLayout} />
              <RouteWithLayout exact path={Routes.LOGIN} component={LoginPage} layout={StartLayout} />
              <RouteWithLayout exact path={Routes.SIGNIN} component={SigninPage} layout={StartLayout} />

              //LISTS
              <RouteWithLayout exact path={Routes.CAT_LIST} component={CatListPage} layout={ListLayout} />
              <RouteWithLayout exact path={Routes.DOG_LIST} component={DogListPage} layout={ListLayout} />
              <RouteWithLayout exact path={Routes.SHELTER_LIST} component={ShelterListPage} layout={ListLayout} />
              <RouteWithLayout exact path={Routes.WALK_LIST} component={WalkListPage} layout={ListLayout} />


              //DETAIL
              <RouteWithLayout exact path={Routes.CAT_DETAIL} component={CatDetailPage} layout={DetailLayout} />
              <RouteWithLayout exact path={Routes.DOG_DETAIL} component={DogDetailPage} layout={DetailLayout} />
              <RouteWithLayout exact path={Routes.SHELTER_DETAIL} component={ShelterDetailPage} layout={DetailLayout} />
              <RouteWithLayout exact path={Routes.WALK_DETAIL} component={WalkDetailPage} layout={DetailLayout} />


              //OTHER
              <RouteWithLayout exact path={Routes.INFORMATION} component={InformationPage} layout={InformationLayout} />


              //APPOINTMENT
              <RouteWithLayout exact path={Routes.WALK_CONFIRMATION} component={WalkConfirmationPage} layout={ConfirmationLayout} />
              <RouteWithLayout exact path={Routes.ADOPT_CONFIRMATION} component={AdoptConfirmationPage} layout={ConfirmationLayout} />
              <RouteWithLayout exact path={Routes.ADOPT_CALENDAR} component={AdoptCalendarPage} layout={CalendarLayout} />
              <RouteWithLayout exact path={Routes.WALK_CALENDAR} component={WalkCalendarPage} layout={CalendarLayout} />



              {/* <RouteWithLayout exact path={Routes.LANDING} component={HomePage} layout={PageLayout} /> */}
              <Redirect from={Routes.HOME} to={Routes.LANDING} />
              <RouteWithLayout exact path={Routes.CONTACT} component={ContactPage} layout={PageLayout} />
              <RouteWithLayout exact path={Routes.POSTS} component={PostsPage} layout={PageLayout} />
              <RouteWithLayout exact path={Routes.POST_DETAIL} component={PostDetailPage} layout={PageLayout} />
              <RouteWithLayout exact path={Routes.AUTH_SIGN_IN} component={SignInPage} layout={AuthLayout} />
              <AuthRouteWithLayout path={Routes.BACKOFFICE_LANDING} component={AdminPage} layout={BackofficeLayout} />
              <RouteWithLayout component={NotFoundPage} layout={ErrorLayout} />
            </Switch>
          </Router>
        </ApiProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
