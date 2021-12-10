import React, { Suspense } from 'react'
import PageLoader from '../components/PageLoader'
import 'antd/dist/antd.css'
import '../theme.override.css'
// import "../social_css/css/main.min.css";
// import '../social_css/css/style.css';
// import '../assets/css/colors.css';
// import '../assets/css/styles.css'
// import '../v4_css/style.css'
import { Provider } from 'react-redux'
import store from '../redux/store/store'
import 'react-activity/dist/Spinner.css'
import 'react-activity/dist/Dots.css'
// import firebase from "../Firebase"
import '../social_assets/css/feather.css'
import '../social_assets/css/lightbox.css'
import '../social_assets/css//themify-icons.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../social_assets/css/style.css'
import '../App.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PageNotFound from '../pages/PageNotFound'
import UserFeedback from '../pages/Feedback/UserFeedback'
import FeedbackPopup from '../pages/Feedback/FeedbackPopup'
import PaymentPopup from '../components/Popups/PaymentPopup'
import ResetPasswordRequest from '../pages/ResetPassword/ResetPasswordRequest'
import MasterPopup from '../components/Popups/MasterPopup'
import Home from '../pages/Home/Home'
import Notifications from '../pages/Notifications/Notifications'
import Match from '../pages/Match/Match'
import Profile2 from '../pages/Profile/Profile2'
import RobotMessageContainer from '../components/Ads/RobotMessage/RobotMessageContainer'
import Messages from '../pages/Messages/Messages'
import MessageNew from '../pages/Messages/MessageNew'
import SocialHomePage from '../components/Social/SocialHomePage/SocialHomePage'
import Settings from '../pages/Settings/Settings'
import Search from '../components/Search/Search'

const PropertyDetails = React.lazy(() =>
	import('../pages/PropertyDetails/PropertyDetails')
)
const CreateRequest = React.lazy(() => import('../pages/Request/CreateRequest'))
const GetStarted = React.lazy(() => import('../pages/GetStarted/GetStarted'))
const Login = React.lazy(() => import('../pages/Login/Login'))
const Signup = React.lazy(() => import('../pages/Signup/Signup'))
const Pricing = React.lazy(() => import('../pages/Pricing/Pricing'))
const Contact = React.lazy(() => import('../pages/Contact/Contact'))
const About = React.lazy(() => import('../pages/About/About'))
const SignUpSuccess = React.lazy(() =>
	import('../pages/SignUpSuccess/SignUpSuccess')
)
const RequestDetails = React.lazy(() =>
	import('../pages/Request/RequestDetails')
)
const SearchResults = React.lazy(() =>
	import('../pages/SearchResult/SearchResults')
)
const VerifyEmail = React.lazy(() => import('../pages/VerifyEmail/VerifyEmail'))
const PasswordReset = React.lazy(() =>
	import('../pages/ResetPassword/PasswordReset')
)
const PropertySort = React.lazy(() => import('../pages/Property/PropertySort'))
const WhatNext = React.lazy(() => import('../pages/GetStarted/Steps/WhatNext'))
const AllRequests = React.lazy(() => import('../pages/Request/AllRequests'))
const Request = React.lazy(() => import('../pages/Request/Request'))
const Blog = React.lazy(() => import('../pages/Blog/Blog'))
const BlogDetails = React.lazy(() => import('../pages/Blog/BlogDetails'))
const Terms = React.lazy(() => import('../pages/Terms/Terms'))

function App() {
	// React.useEffect(() => {
	//     setTimeout(() => {
	//       const msg = firebase.messaging();
	//       msg.requestPermission()
	//           .then(() => {
	//               return msg.getToken();
	//           })
	//           .then((data) => {
	//               console.log("========= NOTIFY ======================", data);
	//           });
	//     }, 10000);
	// });

	return (
		<Suspense fallback={<PageLoader />}>
			<Provider store={store}>
				<div className="wrapper mm-page mm-slideout">
					<div className="clearfix"></div>
					<BrowserRouter>
						<FeedbackPopup />
						<PaymentPopup />
						<MasterPopup />
						{/* <RobotMessageContainer /> */}
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/feeds" component={SocialHomePage} />
							<Route exact path="/start" component={GetStarted} />
							<Route exact path="/terms" component={Terms} />
							<Route exact path="/blog" component={Blog} />
							<Route exact path="/messages" component={Messages} />
							<Route exact path="/settings" component={Settings} />
							<Route exact path="/settings/:type" component={Settings} />
							<Route
								exact
								path="/messages/new/:user_id"
								component={MessageNew}
							/>
							<Route
								exact
								path="/messages/:conversation_id"
								component={Messages}
							/>
							<Route exact path="/notifications" component={Notifications} />
							<Route exact path="/match" component={Match} />
							<Route exact path="/what-next" component={WhatNext} />
							<Route exact path="/blog/:uuid/:id" component={BlogDetails} />
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
							<Route exact path="/signup/success" component={SignUpSuccess} />
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
							<Route exact path="/search" component={Search} />
							<Route
								exact
								path="/search/results/:service/:category/:bedrooms"
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
							<Route exact path="/requests/create" component={CreateRequest} />
							<Route exact path="/properties" component={PropertySort} />
							<Route component={PageNotFound} />
							{/* 

                                    <Route exact path="/share" component={Share} />

                                    */}
						</Switch>
					</BrowserRouter>
				</div>
			</Provider>
		</Suspense>
	)
}

export default App
