import React from 'react'
import { connect } from 'react-redux'
import Btn from '../../../components/Btn/Btn'
import TextInput from '../../../components/TextInput/TextInput'

const PersonalInfoForm = (props) => {
    return (
        <form>
            <div className='text-center'>
                <h4>Personal Information</h4>
            </div>
            <div className="row">

                <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                        <div className="input-with-icon">
                            <TextInput
                                label='Name'
                                placeholder='hhi'
                            />
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                        <div className="input-with-icon">
                            <TextInput />
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                        <div className="input-with-icon">
                            <TextInput />
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                        <div className="input-with-icon">
                            <TextInput />
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                        <div className="input-with-icon">
                            <TextInput />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                        <div className="input-with-icon">
                            <TextInput />
                        </div>
                    </div>
                </div>


            </div>

            <div className="form-group text-center">
                {/* <button type="submit" className="btn btn-md full-width pop-login">Sign Up</button> */}
                <Btn 
                    text='Submit'
                    className='w-50'
                    loading={true}
                />
            </div>

        </form>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoForm)
