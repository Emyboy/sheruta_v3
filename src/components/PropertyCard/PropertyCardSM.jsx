import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const PropertyCardSM = ({
    val
}) => {
    console.log('val --', val)
    return (
        <div className="sides_list_property">
            <div className="sides_list_property_thumb">
                <img src={val.image_urls[0]} className="img-fluid" alt="" />
            </div>
            <div className="sides_list_property_detail">
                <h4 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Link to={{
                    pathname: `/property/${val.name}/${val.id}`,
                    state: val
                }}>{val.name.length > 10 ? val.name.slice(0, 22) + "..." : val.name}</Link></h4>
                <span><i className="ti-location-pin"></i>{val.location}</span>
                <div className="lists_property_price">
                    <div className="lists_property_types">
                        {
                            val.statu ?
                                <div className="property_types_vlix sale">{val.statu.name.toUpperCase()}</div> : null
                        }
                    </div>
                    <div className="lists_property_price_value">
                        <h4>₦ {window.formatedPrice.format(val.price)}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="container">
                        <small>Bedroom: <b>{val.bedroom}</b></small>{' '}
                        <small>Bathroom: <b>{val.bathroom}</b></small>{' '}
                        <small>Toilet: <b>{val.toilet}</b></small>{' '}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyCardSM)
