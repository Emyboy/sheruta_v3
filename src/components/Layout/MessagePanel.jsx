import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllConversations } from "../../redux/strapi_actions/view.action";

export default function MessagePanel({ show }) {
  const dispatch = useDispatch();
  const { conversations } = useSelector((state) => state.view);
  const { user } = useSelector((state) => state.auth);
  const { accepted_suggestions } = useSelector((state) => state.alice);

  useEffect(() => {
    if (show) {
      dispatch(getAllConversations());
    }
  }, []);

  return (
    <div
      className={`right-chat nav-wrap mt-2 right-scroll-bar ${
        show && "active-sidebar"
      }`}
      style={{ zIndex: 1 }}
    >
      <div className="middle-sidebar-right-content bg-white shadow-xss rounded-xxl">
        {/* <div className="preloader-wrap p-3" style={{ display: 'none' }}>
					<div className="box shimmer">
						<div className="lines">
							<div className="line s_shimmer"></div>
							<div className="line s_shimmer"></div>
							<div className="line s_shimmer"></div>
							<div className="line s_shimmer"></div>
						</div>
					</div>
					<div className="box shimmer mb-3">
						<div className="lines">
							<div className="line s_shimmer"></div>
							<div className="line s_shimmer"></div>
							<div className="line s_shimmer"></div>
							<div className="line s_shimmer"></div>
						</div>
					</div>
					<div className="box shimmer">
						<div className="lines">
							<div className="line s_shimmer"></div>
							<div className="line s_shimmer"></div>
							<div className="line s_shimmer"></div>
							<div className="line s_shimmer"></div>
						</div>
					</div>
				</div> */}

        <div className="section full pe-3 ps-4 pt-4 position-relative _feed-body">
          <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">
            MESSAGES
          </h4>
          <ul className="list-group list-group-flush">
            {conversations &&
              conversations.map((val, i) => {
                const otherUser =
                  val.guest?.id === user?.id ? val?.owner : val.guest;
                return (
                  <li
                    className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center"
                    key={`conv-${i}`}
                  >
                    <figure className="avatar float-left mb-0 me-2">
                      <img
                        src={otherUser?.avatar_url}
                        alt="image"
                        className="w35 rounded-3"
                      />
                    </figure>
                    <h3 className="fw-700 mb-0 mt-0">
                      <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat">
                        {otherUser?.first_name}
                      </a>
                    </h3>
                    <span className="badge badge-primary text-white badge-pill fw-500 mt-0">
                      2
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="section full pe-3 ps-4 pt-4 pb-4 position-relative _feed-body">
          <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">
            CONTACTS
          </h4>
          <ul className="list-group list-group-flush">
            {accepted_suggestions &&
              accepted_suggestions.map((val, i) => {
                const otherUser = val?.users_permissions_user;
                return (
                  <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                    <span className="btn-round-sm me-3 ls-3 text-white font-xssss fw-700">
                      <img
                        src={otherUser?.avatar_url}
                        alt="image"
                        className="w35 rounded-3"
                      />
                    </span>
                    <h3 className="fw-700 mb-0 mt-0">
                      <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat">
                        {otherUser?.first_name}
                      </a>
                    </h3>
                    <span class="bg-danger ms-auto btn-round-xss"></span>
                  </li>
                );
              })}
          </ul>
        </div>
        {/* <div className="section full pe-3 ps-4 pt-0 pb-4 position-relative _feed-body">
					<h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">
						Pages
					</h4>
					<ul className="list-group list-group-flush">
						<li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
							<span className="btn-round-sm bg-primary-gradiant me-3 ls-3 text-white font-xssss fw-700">
								UD
							</span>
							<h3 className="fw-700 mb-0 mt-0">
								<a
									className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
									href="#"
								>
									Armany Seary
								</a>
							</h3>
							<span className="bg-success ms-auto btn-round-xss"></span>
						</li>
						<li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
							<span className="btn-round-sm bg-gold-gradiant me-3 ls-3 text-white font-xssss fw-700">
								UD
							</span>
							<h3 className="fw-700 mb-0 mt-0">
								<a
									className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
									href="#"
								>
									Entropio Inc
								</a>
							</h3>
							<span className="bg-success ms-auto btn-round-xss"></span>
						</li>
					</ul>
				</div> */}
      </div>
    </div>
  );
}
