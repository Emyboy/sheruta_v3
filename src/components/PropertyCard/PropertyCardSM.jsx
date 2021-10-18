import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.article`
    img {
        border-radius: 10px;
    }
`;

export const PropertyCardSM = ({ val }) => {
    return (
        <Wrapper className="media border p-2 m-1 rounded bg-white">
            <img
                className="align-self-start mr-3"
                src={val.image_urls[0]}
                alt="fls1.jpg"
                height="130"
                width="100"
            />
            <div className="media-body">
                <Link
                    to={{
                        pathname: `/property/${val.name}/${val.id}`,
                        state: val,
                    }}
                >
                    <h5 className="mt-0 post_title">
                        {val.name.length > 10
                            ? val.name.slice(0, 22) + "..."
                            : val.name}
                    </h5>
                </Link>
                <a href="#">
                    ₦ {window.formatedPrice.format(val.price)}
                    {val.payment_type && (
                        <small>/{val.payment_type.name}</small>
                    )}
                </a>
                <ul className="mb0">
                    <li className="list-inline-item">Beds: {val.bedroom}</li>
                    <li className="list-inline-item">Baths: {val.bathroom}</li>
                    <li className="list-inline-item">Toilets: {val.toilet}</li>
                </ul>
            </div>
        </Wrapper>
    );
    // return (
    //     <div className="sides_list_property border-gray">
    //         <div className="sides_list_property_thumb">
    //             <img src={val.image_urls[0]} className="img-fluid" alt="" />
    //         </div>
    //         <div className="sides_list_property_detail">
    //             <h4 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    // <Link to={{
    //                 pathname: `/property/${val.name}/${val.id}`,
    //                 state: val
    //             }}>{val.name.length > 10 ? val.name.slice(0, 22) + "..." : val.name}</Link>
    // </h4>
    //             <span><i className="ti-location-pin"></i>{val.location}</span>
    //             <div className="lists_property_price">
    //                 <div className="lists_property_types">
    //                     {
    //                         val.statu ?
    //                             <div className="property_types_vlix sale">{val.statu.name.toUpperCase()}</div> : null
    //                     }
    //                 </div>
    //                 <div className="lists_property_price_value">
    //                     <h4>₦ {window.formatedPrice.format(val.price)}</h4>
    //                 </div>
    //             </div>
    //             <div className="row">
    //                 <div className="container">
    //                     <small>Bedroom: <b>{val.bedroom}</b></small>{' '}
    //                     <small>Bathroom: <b>{val.bathroom}</b></small>{' '}
    //                     <small>Toilet: <b>{val.toilet}</b></small>{' '}
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyCardSM);
