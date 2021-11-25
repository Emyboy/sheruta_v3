import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Global from "../../../Global";
import EachSocialRequest from "../EachSocialRequest";
import Sticky from "react-sticky-el";
import { PropertyCardSM } from "../../PropertyCard/PropertyCardSM";
import { Link } from "react-router-dom";
import Btn from "../../Btn/Btn";
import { getUser } from "../../../redux/strapi_actions/auth.actions";
import Heading from "../../Heading/Heading";
import { Spinner } from "react-activity";
import VerifiedBadge from "../../VerifiedBadge/VerifiedBadge";
import match from "../../../assets/img/match.jpeg";
import PostRequestAds from "../../Ads/RequestAds/PostRequestAds";
import Layout from "../../Layout/Layout";
import { Redirect } from "react-router";
import UserFeedCard from "./UserFeedCard";
// import FreeRequestAds from "../../Ads/RequestAds/FeeRequestAds";

export default (props) => {
  localStorage.setItem('after_login', '/feeds')
  const auth = useSelector((state) => state.auth);
  const view = useSelector((state) => state.view);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    properties: [],
    list: [],
  });
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    if (auth.user) {
      dispatch(getUser());
    }
  }, []);

  // useEffect(() => {
  //     if (state.properties.length === 0 && !Global.isMobile) {
  //         axios(
  //             process.env.REACT_APP_API_URL +
  //                 `/properties/recent/${Global.isMobile ? "4" : "5"}`,
  //         )
  //             .then((res) => {
  //                 setState({ ...state, properties: res.data });
  //             })
  //             .catch((err) => {});
  //     }
  // }, [state]);

  useEffect(() => {
    if (!Global.isMobile) {
      axios(
        process.env.REACT_APP_API_URL +
          `/users/?confirmed=true&is_verified=true&_limit=4&_sort=created_at:DESC`
      )
        .then((res) => {
          setNewUsers(res.data);
        })
        .catch((err) => {});
    }
  }, []);
  useEffect(() => {
    if (state.list.length === 0) {
      axios(
        process.env.REACT_APP_API_URL +
          `/property-requests/?_limit=25&_start=0&_sort=created_at:DESC`
      )
        .then((res) => {
          setState({ ...state, list: res.data });
          // console.log('FEED -----', res.data)
          dispatch({
            type: "SET_VIEW_STATE",
            payload: {
              feed: res.data,
            },
          });
        })
        .catch((err) => {});
    }
  }, [state, view.personal_info]);

  if(!auth.user){
    return <Redirect to='/login' />
  }

  if (!view.personal_info) {
    return null;
  }

  return (
		<div className="main-wrapper">
			<Layout currentPage="feed">
				<div className="container-fluid">
					<div className="row _feed-body">
						{!Global.isMobile && (
							<div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
								{/* <RecentUsers data={newUsers} /> */}
								<UserFeedCard />
							</div>
						)}
						<div className="col-xl-8 col-xxl-8 col-lg-8 pl-1 pr-1">
							{state.list.map((val, i) => {
								if (i == 5) {
									return <img src={match} className="rounded-3 mb-3" />
								} else if (i === 2) {
									return <PostRequestAds />
								}
								return <EachSocialRequest key={i + ' request'} data={val} />
							})}
							{state.list.length === 0 ? (
								<div className="central-meta item rounded border-gray text-center d-flex justify-content-center mt-5 pt-5">
									<Spinner />
								</div>
							) : null}
						</div>
					</div>
				</div>
			</Layout>
		</div>
	)
};
