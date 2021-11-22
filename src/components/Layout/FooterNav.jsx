import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RiAddCircleLine, RiUser2Line } from "react-icons/ri";

const BadgeCount = ({ count }) => {
  if (count === 0) {
    return null;
  }
  return (
    <small
      className="badge badge-danger position-absolute z-index-1"
      style={{ bottom: "19px", left: "35px" }}
    >
      {count}
    </small>
  );
};

export default function FooterNav({ pageName }) {
  const { notifications } = useSelector((state) => state.view);
  const { user_suggestions } = useSelector((state) => state.alice);
  const { user } = useSelector((state) => state.auth);

  return (
		<div className="_app-footer fixed-bottom p-3 d-flex justify-content-between border-0 shadow-lg bg-white border border-gray">
			<Link to={`/feeds`}>
				<a className="position-relative nav-content-bttn nav-center active">
					<i
						className={`text-${
							pageName === 'feed' ? 'theme' : 'dark'
						} feather-home`}
					></i>
				</a>
			</Link>
			<Link to={`/match`}>
				<a className="position-relative nav-content-bttn">
					<BadgeCount count={user_suggestions && user_suggestions.length} />
					<i
						className={`text-${
							pageName === 'match' ? 'theme' : 'dark'
						} feather-users`}
					></i>
				</a>
			</Link>
			<Link to={`/requests/create`}>
				<a className="position-relative nav-content-bttn" data-tab="chats">
					{/* <i className="text-dark feather-plus"></i> */}
					<RiAddCircleLine
						className={`text-${pageName === 'requests' ? 'theme' : 'dark'}`}
						size={30}
					/>
				</a>
			</Link>
			<Link to="/notifications">
				<a className="position-relative nav-content-bttn">
					<BadgeCount
						count={notifications && notifications.filter((x) => !x.seen).length}
					/>

					<i
						className={`text-${
							pageName === 'notifications' ? 'theme' : 'dark'
						} feather-bell`}
					></i>
				</a>
			</Link>
			<Link
				to={`/user/${user.user.username}`}
				className="position-relative nav-content-bttn"
			>
				{/* <RiUser2Line size={30} /> */}
				<img
					src={user.user.avatar_url}
					alt="user"
					className={`w30 shadow-xss rounded-circle ${
						pageName === 'profile'
							? 'border border-2 shadow border-success'
							: ''
					}`}
				/>
			</Link>
		</div>
	)
}
