import React, { Suspense } from 'react'
import PageLoader from '../components/PageLoader'
import 'antd/dist/antd.css'
import '../theme.override.css'
import { Provider } from 'react-redux'
import store from '../redux/store/store'


import 'react-activity/dist/Spinner.css'
import 'react-activity/dist/Dots.css'
import '../social_assets/css/feather.css'
import '../social_assets/css/lightbox.css'
import '../social_assets/css//themify-icons.css'
import '../social_assets/css/style.css'

import '../assets/css/style.css';
import '../assets/css/boxicons.min.css';
import '../assets/css/responsive.css';

import 'react-quill/dist/quill.snow.css'
import 'react-image-viewer-zoom/dist/style.css' 
import '../App.css'


import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PageNotFound from '../pages/PageNotFound'
import UserFeedback from '../pages/Feedback/UserFeedback'
import FeedbackPopup from '../pages/Feedback/FeedbackPopup'
import PaymentPopup from '../components/Popups/PaymentPopup'
import ResetPasswordRequest from '../pages/ResetPassword/ResetPasswordRequest'
import MasterPopup from '../components/Popups/MasterPopup'
// import Home from '../pages/Home/Home'
import Notifications from '../pages/Notifications/Notifications'
import Match from '../pages/Match/Match'
import Profile2 from '../pages/Profile/Profile2'
// import RobotMessageContainer from '../components/Ads/RobotMessage/RobotMessageContainer'
import Messages from '../pages/Messages/Messages'
import MessageNew from '../pages/Messages/MessageNew'
import SocialHomePage from '../components/Social/SocialHomePage/SocialHomePage'
import Search from '../components/Search/Search'
import HowItWorks from '../pages/HowItWorks/HowItWorks'
import CreateJoinPaddy from '../pages/JoinPaddy/CreateJoinPaddy/CreateJoinPaddy'
import JoinPaddyDetails from '../pages/JoinPaddy/JoinPaddyDetails/JoinPaddyDetails'
import Agent from '../pages/Agent/Agent'
import AgentPending from '../pages/Agent/AgentPending';
import AgentSignup from '../pages/Agent/AgentSignup'
import Inspection from '../pages/Inspection/Inspection'
import BookInspection from '../pages/Inspection/BookInspection'
import InspectionDetails from '../pages/InspectionDetails/InspectionDetails'
import InspectionInvitation from '../pages/Inspection/InspectionInvitation'
// import AOS from 'aos';
// import 'aos/dist/aos.css'
import Home from '../pages/HomeNew/HomeNew';


// const HomeNew = React.lazy(() => import('../pages/HomeNew/HomeNew'))
const OurRules = React.lazy(() => import('../pages/OurRules/OurRules'))
const Properties = React.lazy(() => import('../pages/Properties/Properties'))
const Settings = React.lazy(() => import('../pages/Settings/Settings'))
// const Home = React.lazy(() => import('../pages/Home/Home'))
const PropertyDetails = React.lazy(() =>
	import('../pages/PropertyDetails/PropertyDetails')
)
const CreateRequest = React.lazy(() => import('../pages/Request/CreateRequest'))
const GetStarted = React.lazy(() => import('../pages/GetStarted/GetStarted'))
const Login = React.lazy(() => import('../pages/Login/Login'))
const Signup = React.lazy(() => import('../pages/Signup/Signup'))
const Pricing = React.lazy(() => import('../pages/Pricing/Pricing'))
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
const WhatNext = React.lazy(() => import('../pages/GetStarted/Steps/WhatNext'))
const Blog = React.lazy(() => import('../pages/Blog/Blog'))
const BlogDetails = React.lazy(() => import('../pages/Blog/BlogDetails'))
const Terms = React.lazy(() => import('../pages/Terms/Terms'))
const Services = React.lazy(() => import('../pages/Services/Services'));
const JoinPaddy = React.lazy(() => import('../pages/JoinPaddy/JoinPaddy'));

function App() {
	React.useEffect(() => {
	    // setTimeout(() => {
	    //   const msg = firebase.messaging();
	    //   msg.requestPermission()
	    //       .then(() => {
	    //           return msg.getToken();
	    //       })
	    //       .then((data) => {
	    //           console.log("========= NOTIFY ======================", data);
	    //       });
	    // }, 10000);
		// AOS.init({

		// 	duration: 2000,
		// })
	},[]);

	

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
							<Route exact path="/agents" component={Agent} />
							<Route exact path="/our-rules" component={OurRules} />
							<Route exact path="/agents/signup" component={AgentSignup} />
							<Route
								exact
								path="/agents/pending/:agent_id"
								component={AgentPending}
							/>
							<Route exact path="/flats" component={Properties} />
							{/* <Route path="/flats/for-share/:keyword_slug/:category_slug/:service_slug" component={Properties} />
							<Route path="/flats/for-share/:keyword_slug/:category_slug" component={Properties} />
							<Route path="/flats/for-share/:keyword_slug" component={Properties} /> */}
							<Route path="/flats/for-share" component={Properties} />
							<Route exact path="/how-it-works" component={HowItWorks} />
							<Route exact path="/start" component={GetStarted} />
							<Route exact path="/terms" component={Terms} />
							<Route exact path="/blog" component={Blog} />
							<Route exact path="/services" component={Services} />
							<Route exact path="/join-paddy" component={JoinPaddy} />
							<Route
								exact
								path="/join-paddy/create"
								component={CreateJoinPaddy}
							/>
							<Route
								exact
								path="/join-paddy/:uuid"
								component={JoinPaddyDetails}
							/>
							<Route exact path="/services/:service" component={Services} />
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
							<Route exact path="/inspections" component={Inspection} />
							<Route
								exact
								path="/inspection/:inspection_id"
								component={InspectionDetails}
							/>
							<Route
								exact
								path="/inspections/booking/:property_id"
								component={BookInspection}
							/>
							<Route
								exact
								path="/inspection/invitation/:inspection_id"
								component={InspectionInvitation}
							/>
							<Route exact path="/what-next" component={WhatNext} />
							<Route
								exact
								path="/blog/category/:category_slug/:category_id"
								component={Blog}
							/>
							<Route
								exact
								path="/blog/:category/:uuid/:id"
								component={BlogDetails}
							/>
							<Route exact path="/start/:step" component={GetStarted} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/about" component={About} />
							<Route
								exact
								path="/requests/edit/:request_id"
								component={CreateRequest}
							/>
							<Route exact path="/user/:username" component={Profile2} />
							<Route exact path="/flat/submit" component={CreateRequest} />

							<Route
								exact
								path="/flat/:service/:category/:property_id"
								component={PropertyDetails}
							/>
							<Route exact path="/signup" component={Signup} />
							<Route exact path="/signup/success" component={SignUpSuccess} />
							{/* <Route
								exact
								path="/requests/create/:service_id/:category_id/:is_searching"
								component={CreateRequest}
							/> */}
							<Route
								exact
								path="/request/:title/:id"
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
