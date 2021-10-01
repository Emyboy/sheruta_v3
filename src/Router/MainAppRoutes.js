import React, { Suspense } from 'react';
import PageLoader from '../components/PageLoader';
import 'antd/dist/antd.css';
import "../theme.override.css";
// import "../social_css/css/main.min.css";
import '../social_css/css/style.css';
import { Provider } from "react-redux";
import store from "../redux/store/store";
import '../assets/css/colors.css';
// import '../v4_css/style.css';
import '../assets/css/styles.css';
import '../App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Contact from '../pages/Contact/Contact';
import About from '../pages/About/About';
import PageNotFound from '../pages/PageNotFound';
import FeedbackPopup from '../pages/Feedback/FeedbackPopup';
import PropertyDetails from '../pages/PropertyDetails/PropertyDetails';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup'
import SignUpSuccess from '../pages/SignUpSuccess/SignUpSuccess';
import RequestDetails from '../pages/Request/RequestDetails';
import SearchResults from '../pages/SearchResults/SearchResults'
import UserFeedback from '../pages/Feedback/UserFeedback'
import PaymentPopup from '../components/Popups/PaymentPopup';
import VerifyEmail from '../pages/VerifyEmail/VerifyEmail';
import ResetPasswordRequest from '../pages/ResetPassword/ResetPasswordRequest'
import PasswordReset from '../pages/ResetPassword/PasswordReset';
import PropertySort from '../pages/Property/PropertySort'
import WhatNext from '../pages/GetStarted/Steps/WhatNext';
import MasterPopup from '../components/Popups/MasterPopup';
import Home from '../pages/Home/Home';
import CreateRequest from '../pages/Request/CreateRequest';
import AllRequests from '../pages/Request/AllRequests'


// const AllRequests = React.lazy(() => import("../pages/Request/AllRequests"));
// const CreateRequest = React.lazy(() => import("../pages/Request/CreateRequest"));
const GetStarted = React.lazy(() => import("../pages/GetStarted/GetStarted"));
const Request = React.lazy(() => import("../pages/Request/Request"));
const Pricing = React.lazy(() => import("../pages/Pricing/Pricing"));
const Profile2 = React.lazy(() => import("../pages/Profile/Profile2"));

function App() {
    return (
      <Suspense fallback={<PageLoader />}>
        <Provider store={store}>
          <div className="App green-skin">
            <div className="core-content">
              <div className="main-wrapper">
                <div className="clearfix"></div>
                <BrowserRouter>
                  <FeedbackPopup />
                  <PaymentPopup />
                  <MasterPopup />
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/start" component={GetStarted} />
                    {/* <Route exact path="/submit" component={Submit} /> */}
                    <Route exact path="/what-next" component={WhatNext} />
                    <Route exact path="/start/:step" component={GetStarted} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/requests" component={Request} />
                    <Route exact path="/requests/all" component={AllRequests} />
                    <Route exact path="/user/:username" component={Profile2} />
                    <Route
                      exact
                      path="/property/:name/:property_id"
                      component={PropertyDetails}
                    />
                    <Route exact path="/signup" component={Signup} />
                    <Route
                      exact
                      path="/signup/success"
                      component={SignUpSuccess}
                    />
                    <Route
                      exact
                      path="/requests/create/:service_id/:category_id/:is_searching"
                      component={CreateRequest}
                    />
                    <Route
                      exact
                      path="/request/:uid/:user_id"
                      component={RequestDetails}
                    />
                    <Route exact path="/search" component={SearchResults} />
                    <Route
                      exact
                      path="/search/:category/:location/:bedroom"
                      component={SearchResults}
                    />
                    <Route exact path="/pricing" component={Pricing} />
                    <Route exact path="/feedback" component={UserFeedback} />
                    <Route
                      exact
                      path="/email/activate/:token/:confirmationToken"
                      component={VerifyEmail}
                    />
                    <Route
                      exact
                      path="/password/reset/request"
                      component={ResetPasswordRequest}
                    />
                    <Route
                      exact
                      path="/password/reset/u/:token/:resetPasswordToken"
                      component={PasswordReset}
                    />
                    <Route
                      exact
                      path="/requests/create"
                      component={CreateRequest}
                    />
                    <Route exact path="/properties" component={PropertySort} />
                    {/* 

                                    <Route exact path="/share" component={Share} />

                                    */}
                    <Route component={PageNotFound} />
                  </Switch>
                </BrowserRouter>
              </div>
            </div>
          </div>
        </Provider>
      </Suspense>
    );
}

export default App;
