import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import ConfigViewPopup from "./ConfigViewPopup";
import GetStartedPopup from "./GetStartedPopup";
import {
    getAllStates,
    getAllCategories,
    getAllServices,
    getAllPaymentTypes,
    getAllWorkIndustries,
    getAppDetail,
    getAllNotifications
} from "../../redux/strapi_actions/view.action";
import {
    getAllSuggestionsByStatus,
    getAllMySuggestion,
    suggestThemForMe,
} from "../../redux/strapi_actions/alice.actions";
import NotificationPopup from "./NotificationPopup";

const MasterPopup = (props) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllStates());
        dispatch(getAllCategories());
        dispatch(getAllServices());
        dispatch(getAllPaymentTypes());
        dispatch(getAllWorkIndustries());
        dispatch(getAppDetail());
        if (user) {
            dispatch(getAllMySuggestion());
            dispatch(suggestThemForMe());
             dispatch(getAllNotifications());
        }
    }, []);

    useEffect(() => {
        if (user) {
            dispatch(getAllSuggestionsByStatus("accepted"));
            setInterval(() => {
                if (user) {
                    dispatch(getAllMySuggestion());
                    dispatch(suggestThemForMe());
                    dispatch(getAllNotifications());
                }
            }, 40000);
        }
    }, [user]);

    if (user) {
        return (
            <>
                <ConfigViewPopup />
                <GetStartedPopup />
                <NotificationPopup />
            </>
        );
    } else {
        return null;
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MasterPopup);
