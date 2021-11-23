import React from "react";

function Setting(props) {
  const { setting, state, toggleSectionSetting } = props;
  return (
    <li key={setting.id} className="Polaris-Stack__Item setting">
      <label
        className="Polaris-Choice"
        htmlFor={`section-setting-${setting.id}`}
      >
        <span className="Polaris-Choice__Control">
          <span className="Polaris-Checkbox">
            <input
              type="checkbox"
              className="Polaris-Checkbox__Input"
              id={`section-setting-${setting.id}`}
              checked={state?.section?.settings.some(
                (existingSetting) => existingSetting.id === setting.id
              )}
              onChange={(e) => toggleSectionSetting(e.target.checked, setting)}
            />
            <span className="Polaris-Checkbox__Backdrop Polaris-Checkbox--hover"></span>
            <span className="Polaris-Checkbox__Icon">
              <span className="Polaris-Icon">
                <span className="Polaris-VisuallyHidden"></span>
                <svg
                  viewBox="0 0 20 20"
                  className="Polaris-Icon__Svg"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path d="m8.315 13.859-3.182-3.417a.506.506 0 0 1 0-.684l.643-.683a.437.437 0 0 1 .642 0l2.22 2.393 4.942-5.327a.436.436 0 0 1 .643 0l.643.684a.504.504 0 0 1 0 .683l-5.91 6.35a.437.437 0 0 1-.642 0"></path>
                </svg>
              </span>
            </span>
          </span>
        </span>
        <span className="Polaris-Choice__Label">{setting.label}</span>
      </label>
      <div className="Polaris-Choice__Descriptions">
        <div className="Polaris-Choice__HelpText Polaris-Caption">
          {setting.description || "Section settings"}
        </div>
      </div>
    </li>
  );
}
export default Setting;
