import React, { Suspense } from 'react';
import PageLoader from '../components/PageLoader';
import { Provider } from "react-redux";
import store from "../redux/store/store";
import '../assets/css/styles.css';
import '../App.css';
import '../assets/css/colors.css';
import 'antd/dist/antd.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Contact from '../pages/Contact/Contact';
import About from '../pages/About/About';
import Request from '../pages/Request/Request'
import PageNotFound from '../pages/PageNotFound';
import FeedbackPopup from '../pages/Feedback/FeedbackPopup';
import AllRequests from '../pages/Request/AllRequests'
import PropertyDetails from '../pages/PropertyDetails/PropertyDetails';
import Login from '../pages/Login/Login';
import Profile2 from '../pages/Profile/Profile2';
import Signup from '../pages/Signup/Signup'
import SignUpSuccess from '../pages/SignUpSuccess/SignUpSuccess';
import CreateRequest from '../pages/Request/CraeteRequest';
import RequestDetails from '../pages/Request/RequestDetails';
import SearchResults from '../pages/SearchResults/SearchResults'
import Pricing from '../pages/Pricing/Pricing';
import UserFeedback from '../pages/Feedback/UserFeedback'

function App() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Provider store={store}>
                <div className="App green-skin">
                    <div className='core-content'>
                        <div className='main-wrapper'>
                            <div className="clearfix"></div>
                            <BrowserRouter>
                                <FeedbackPopup />
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route exact path="/login" component={Login} />
                                    <Route exact path="/contact" component={Contact} />
                                    <Route exact path="/about" component={About} />
                                    <Route exact path="/requests" component={Request} />
                                    <Route exact path="/requests/all" component={AllRequests} />
                                    <Route exact path="/property/:name/:property_id" component={PropertyDetails} />
                                    <Route exact path="/profile" component={Profile2} />
                                    <Route exact path="/signup" component={Signup} />
                                    <Route exact path="/signup/success" component={SignUpSuccess} />
                                    <Route exact path="/requests/create/:service_id/:category_id/:is_searching" component={CreateRequest} />
                                    <Route exact path="/request/:uid/:user_id" component={RequestDetails} />
                                    <Route exact path="/search" component={SearchResults} /> 
                                    <Route exact path="/search/:category/:location/:bedroom" component={SearchResults} /> 
                                    <Route exact path="/pricing" component={Pricing} />
                                    <Route exact path="/feedback" component={UserFeedback} />
                                    {/* 
                                    <Route exact path="/requests/create" component={RequestCategory} />
                                    <Route exact path="/email/activate/:token/:confirmationToken" component={VerifyEmail} />
                                    <Route exact path="/properties" component={PropertySort} />

                                    <Route exact path="/share" component={Share} />

                                    <Route exact path="/password/reset/request" component={ResetPasswordRequest} />
                                    <Route exact path="/password/reset/u/:token/:resetPasswordToken" component={PasswordReset} />
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
