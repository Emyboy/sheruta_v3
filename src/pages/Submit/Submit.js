import React from "react";
import { connect } from "react-redux";
import Layout from "../../components/Layout/Layout";

export const Submit = (props) => {
  return (
    <Layout>
      <section className="our-dashbord dashbord bgc-f7 pb50 pt-3">
        <div className="container-fluid ovh p-0 m-0">
          <div className="">
            <div className="container mb-5">
              <div className="row">
                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">Add New Property</h2>
                    <p>We are glad to see you again!</p>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="my_dashboard_review bg-white shadow border rounded mt-4">
                    <div className="row justify-content-center">
                      <div className="col-lg-12">
                        <h4 className="mb30">Create Listing</h4>
                        <div className="my_profile_setting_input form-group">
                          <label for="propertyTitle">Property Title</label>
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="my_profile_setting_textarea">
                          <label for="propertyDescription">Description</label>
                          <textarea
                            className="form-control"
                            id="propertyDescription"
                            rows="7"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-6">
                        <div className="my_profile_setting_input ui_kit_select_search form-group">
                          <label>Type</label>
                          <div
                            className="dropdown bootstrap-select"
                            style={{ width: "100%" }}
                          >
                            <select
                              className="selectpicker"
                              data-live-search="true"
                              data-width="100%"
                              tabindex="-98"
                            >
                              <option data-tokens="type1">Type1</option>
                              <option data-tokens="Type2">Type2</option>
                              <option data-tokens="Type3">Type3</option>
                              <option data-tokens="Type4">Type4</option>
                              <option data-tokens="Type5">Type5</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-6">
                        <div className="my_profile_setting_input ui_kit_select_search form-group">
                          <label>Status</label>
                          <div
                            className="dropdown bootstrap-select"
                            style={{ width: "100%" }}
                          >
                            <select
                              className="selectpicker"
                              data-live-search="true"
                              data-width="100%"
                              tabindex="-98"
                            >
                              <option data-tokens="Status1">Status1</option>
                              <option data-tokens="Status2">Status2</option>
                              <option data-tokens="Status3">Status3</option>
                              <option data-tokens="Status4">Status4</option>
                              <option data-tokens="Status5">Status5</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="formGroupExamplePrice">Price</label>
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExamplePrice"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="formGroupExampleArea">Area</label>
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleArea"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="my_profile_setting_input ui_kit_select_search form-group">
                          <label>Rooms</label>
                          <div
                            className="dropdown bootstrap-select"
                            style={{ width: "100%" }}
                          >
                            <select
                              className="selectpicker"
                              data-live-search="true"
                              data-width="100%"
                              tabindex="-98"
                            >
                              <option data-tokens="Status1">1</option>
                              <option data-tokens="Status2">2</option>
                              <option data-tokens="Status3">3</option>
                              <option data-tokens="Status4">4</option>
                              <option data-tokens="Status5">5</option>
                              <option data-tokens="Status6">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="my_profile_setting_input">
                          <button className="btn btn1 float-left">Back</button>
                          <button className="btn btn2 float-right">Next</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my_dashboard_review bg-white shadow border rounded mt-4 mt30">
                    <div className="row">
                      <div className="col-lg-12">
                        <h4 className="mb30">Location</h4>
                        <div className="my_profile_setting_input form-group">
                          <label for="propertyAddress">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="propertyAddress"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-6">
                        <div className="my_profile_setting_input form-group">
                          <label for="propertyState">County / State</label>
                          <input
                            type="text"
                            className="form-control"
                            id="propertyState"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-6">
                        <div className="my_profile_setting_input form-group">
                          <label for="propertyCity">City</label>
                          <input
                            type="text"
                            className="form-control"
                            id="propertyCity"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="neighborHood">Neighborhood</label>
                          <input
                            type="text"
                            className="form-control"
                            id="neighborHood"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="zipCode">Zip</label>
                          <input
                            type="text"
                            className="form-control"
                            id="zipCode"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="my_profile_setting_input ui_kit_select_search form-group">
                          <label>Country</label>
                          <div
                            className="dropdown bootstrap-select"
                            style={{ width: "100%" }}
                          >
                            <select
                              className="selectpicker"
                              data-live-search="true"
                              data-width="100%"
                              tabindex="-98"
                            >
                              <option data-tokens="Turkey">Turkey</option>
                              <option data-tokens="Iran">Iran</option>
                              <option data-tokens="Iraq">Iraq</option>
                              <option data-tokens="Spain">Spain</option>
                              <option data-tokens="Greece">Greece</option>
                              <option data-tokens="Portugal">Portugal</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="googleMapLat">
                            Latitude (for Google Maps)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="googleMapLat"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="googleMapLong">
                            Longitude (for Google Maps)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="googleMapLong"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="my_profile_setting_input ui_kit_select_search form-group">
                          <label>Google Map Street View</label>
                          <div
                            className="dropdown bootstrap-select"
                            style={{ width: "100%" }}
                          >
                            <select
                              className="selectpicker"
                              data-live-search="true"
                              data-width="100%"
                              tabindex="-98"
                            >
                              <option data-tokens="Turkey">
                                Street View v1
                              </option>
                              <option data-tokens="Iran">Street View v2</option>
                              <option data-tokens="Iraq">Street View v3</option>
                              <option data-tokens="Spain">
                                Street View v4
                              </option>
                              <option data-tokens="Greece">
                                Street View v5
                              </option>
                              <option data-tokens="Portugal">
                                Street View v6
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="my_profile_setting_input">
                          <button className="btn btn1 float-left">Back</button>
                          <button className="btn btn2 float-right">Next</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my_dashboard_review bg-white shadow border rounded mt-4 mt30">
                    <div className="row">
                      <div className="col-lg-12">
                        <h4 className="mb30">Detailed Information</h4>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="propertyId">Property ID</label>
                          <input
                            type="text"
                            className="form-control"
                            id="propertyId"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="propertyASize">Area Size</label>
                          <input
                            type="text"
                            className="form-control"
                            id="propertyASize"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="sizePrefix">Size Prefix</label>
                          <input
                            type="text"
                            className="form-control"
                            id="sizePrefix"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="landArea">Land Area</label>
                          <input
                            type="text"
                            className="form-control"
                            id="landArea"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="LASPostfix">Land Area Size Postfix</label>
                          <input
                            type="text"
                            className="form-control"
                            id="LASPostfix"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="bedRooms">Bedrooms</label>
                          <input
                            type="text"
                            className="form-control"
                            id="bedRooms"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="bathRooms">Bathrooms</label>
                          <input
                            type="text"
                            className="form-control"
                            id="bathRooms"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="garages">Garages</label>
                          <input
                            type="text"
                            className="form-control"
                            id="garages"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="garagesSize">Garages Size</label>
                          <input
                            type="text"
                            className="form-control"
                            id="garagesSize"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="yearBuild">Year Built</label>
                          <input
                            type="text"
                            className="form-control"
                            id="yearBuild"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="videoUrl">Video URL</label>
                          <input
                            type="text"
                            className="form-control"
                            id="videoUrl"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="virtualTour">360° Virtual Tour</label>
                          <input
                            type="text"
                            className="form-control"
                            id="virtualTour"
                          />
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <h4>Amenities</h4>
                      </div>
                      <div className="col-sm-4 col-md-4 col-lg-4 col-xl-2">
                        <ul className="ui_kit_checkbox selectable-list">
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck1"
                              >
                                Air Conditioning
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck2"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck2"
                              >
                                Lawn
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck3"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck3"
                              >
                                Swimming Pool
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck4"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck4"
                              >
                                Barbeque
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck5"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck5"
                              >
                                Microwave
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-sm-4 col-md-4 col-lg-4 col-xl-2">
                        <ul className="ui_kit_checkbox selectable-list">
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck6"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck6"
                              >
                                TV Cable
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck7"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck7"
                              >
                                Dryer
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck8"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck8"
                              >
                                Outdoor Shower
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck9"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck9"
                              >
                                Washer
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck10"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck10"
                              >
                                Gym
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-sm-4 col-md-4 col-lg-4 col-xl-2">
                        <ul className="ui_kit_checkbox selectable-list">
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck11"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck11"
                              >
                                Refrigerator
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck12"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck12"
                              >
                                WiFi
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck13"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck13"
                              >
                                Laundry
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck14"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck14"
                              >
                                Sauna
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck15"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck15"
                              >
                                Window Coverings
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-xl-12">
                        <div className="my_profile_setting_input">
                          <button className="btn btn1 float-left">Back</button>
                          <button className="btn btn2 float-right">Next</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my_dashboard_review bg-white shadow border rounded mt-4 mt30">
                    <div className="row">
                      <div className="col-lg-12">
                        <h4 className="mb30">Property media</h4>
                      </div>
                      <div className="col-lg-12">
                        <ul className="mb0">
                          <li className="list-inline-item">
                            <div className="portfolio_item">
                              <img
                                className="img-fluid"
                                src="images/property/fp1.jpg"
                                alt="fp1.jpg"
                              />
                              <div
                                className="edu_stats_list"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Delete"
                              >
                                <a href="#">
                                  <span className="flaticon-garbage"></span>
                                </a>
                              </div>
                            </div>
                          </li>
                          <li className="list-inline-item">
                            <div className="portfolio_item">
                              <img
                                className="img-fluid"
                                src="images/property/fp2.jpg"
                                alt="fp2.jpg"
                              />
                              <div
                                className="edu_stats_list"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Delete"
                              >
                                <a href="#">
                                  <span className="flaticon-garbage"></span>
                                </a>
                              </div>
                            </div>
                          </li>
                          <li className="list-inline-item">
                            <div className="portfolio_item">
                              <img
                                className="img-fluid"
                                src="images/property/fp3.jpg"
                                alt="fp3.jpg"
                              />
                              <div
                                className="edu_stats_list"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Delete"
                              >
                                <a href="#">
                                  <span className="flaticon-garbage"></span>
                                </a>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-12">
                        <div className="portfolio_upload">
                          <input type="file" name="myfile" />
                          <div className="icon">
                            <span className="flaticon-download"></span>
                          </div>
                          <p>Drag and drop images here</p>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="resume_uploader mb30">
                          <h4>Attachments</h4>
                          <form className="form-inline">
                            <input className="upload-path" />
                            <label className="upload">
                              <input type="file" />
                              Select Attachment
                            </label>
                          </form>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="my_profile_setting_input">
                          <button className="btn btn1 float-left">Back</button>
                          <button className="btn btn2 float-right">Next</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my_dashboard_review bg-white shadow border rounded mt-4 mt30">
                    <div className="row">
                      <div className="col-lg-12">
                        <h4 className="mb30">Floor Plans</h4>
                        <button className="btn admore_btn mb30">
                          Add More
                        </button>
                      </div>
                      <div className="col-xl-12">
                        <div className="my_profile_setting_input form-group">
                          <label for="planDsecription">Plan Description</label>
                          <input
                            type="text"
                            className="form-control"
                            id="planDsecription"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="planBedrooms">Plan Bedrooms</label>
                          <input
                            type="text"
                            className="form-control"
                            id="planBedrooms"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="planBathrooms">Plan Bathrooms</label>
                          <input
                            type="text"
                            className="form-control"
                            id="planBathrooms"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="planPrice">Plan Price</label>
                          <input
                            type="text"
                            className="form-control"
                            id="planPrice"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="planPostfix">Price Postfix</label>
                          <input
                            type="text"
                            className="form-control"
                            id="planPostfix"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label for="planSize">Plan Size</label>
                          <input
                            type="text"
                            className="form-control"
                            id="planSize"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label>Plan Image</label>
                          <div className="avatar-upload">
                            <div className="avatar-edit">
                              <input
                                className="btn btn-thm"
                                type="file"
                                id="imageUpload"
                                accept=".png, .jpg, .jpeg"
                              />
                              <label for="imageUpload"></label>
                            </div>
                            <div className="avatar-preview">
                              <div id="imagePreview"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="my_profile_setting_textarea mt30-991">
                          <label for="planDescription">Plan Description</label>
                          <textarea
                            className="form-control"
                            id="planDescription"
                            rows="7"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="my_profile_setting_input">
                          <button className="btn btn1 float-left">Back</button>
                          <button className="btn btn2 float-right">Next</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
