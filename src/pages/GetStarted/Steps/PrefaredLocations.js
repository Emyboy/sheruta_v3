import React from 'react'
import { connect } from 'react-redux';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Btn from '../../../components/Btn/Btn';

export const PrefaredLocations = (props) => {
    const [data, setData] = React.useState({
        location: null,
        google_location: null,
    });

    const [locaitons, setLocations] = React.useState([]);

    const handleAddLocation = () => {
        console.log('adding ---', data.location)
        setLocations([...locaitons, data.location])
    };

    return (
        <div>
            <div className="sec-heading center">
                <h2 className='animated animate__bounceIn'>What are your prefared locations?</h2>
                <p>Add multiple locations of your choice</p>
            </div>
            <div className='container'>
                {
                    locaitons.map((val, i) => {
                        return <div className='card shadow border border-success mb-2' key={i}>
                            <div className='pl-2 d-flex justify-content-between'>
                                <p className='mb-0' style={{ fontSize: '20px' }}>{val}</p>
                                <button className='btn btn-sm btn-danger'>X</button>
                            </div>
                        </div>
                    })
                }
                <hr />
                <div className="">
                    <div className="form-group text-center">
                        <label className='display-6'>Location</label>
                        <GooglePlacesAutocomplete
                            apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}
                            apiOptions={{ language: 'en', region: 'ng' }}
                            selectProps={{
                                // props.state.location,
                                className: 'border',
                                onChange: e => {
                                    setData({ ...data, google_location: e, location: e.label })
                                },
                                placeholder:
                                    'Type in any location here.',
                            }}
                            autocompletionRequest={{
                                componentRestrictions: {
                                    country: ['ng'],
                                },
                            }}
                        />
                        <button className='btn text-success mt-3' onClick={handleAddLocation}>Add+</button><br />
                        <hr />
                        <Btn
                            text='Next'
                            className='mt-3'
                            style={{ backgroundColor: null }}
                            onClick={handleAddLocation}
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(PrefaredLocations)
