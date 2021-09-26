import React from "react";
import { useSelector } from "react-redux";
import SelectCard from "../../components/SelectionCard/SelectionCard";

export default function ProfileSettings() {
  const auth = useSelector((state) => state.auth);
  const view = useSelector((state) => state.view);
  const { personal_info } = view;
  return (
    <div className="central-meta w-100">
      <div className="form-group mt-1">
        <label>Change Status</label>
        <div className="row">
          <SelectCard
            heading="I'm looking for"
            isSelected={personal_info.looking_for}
          />

          <SelectCard
            heading="I Have For Share"
            isSelected={!personal_info.looking_for}
          />
        </div>
      </div>
      <form></form>
    </div>
  );
}
