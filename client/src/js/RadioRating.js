import React from "react";

class RadioRating extends React.PureComponent {
  render() {
    const {
      label,
      name,
      value,
      onChange,
      minLabel,
      maxLabel,
      minValue,
      maxValue,
    } = this.props;
    const options = Array.from({ length: maxValue - minValue + 1 }, (_, i) =>
      String(minValue + i)
    );

    return (
      <div className="rating-block">
        <p className="rating-title">{label}</p>
        <div className="rating-row">
          {minLabel && <span className="label-left">{minLabel}</span>}
          <div className="rating circle">
            {options.map((optionValue) => (
              <React.Fragment key={optionValue}>
                <input
                  type="radio"
                  id={`${name}${optionValue}`}
                  name={name}
                  value={optionValue}
                  style={{ display: "none" }}
                  checked={value === optionValue}
                  onChange={onChange}
                />
                <label
                  htmlFor={`${name}${optionValue}`}
                  title={`${optionValue} stars`}
                >
                  〇
                </label>
              </React.Fragment>
            ))}
          </div>
          {maxLabel && <span className="label-right">{maxLabel}</span>}
        </div>
      </div>
    );
  }
}

// デフォルトプロパティを設定
RadioRating.defaultProps = {
  minLabel: "",
  maxLabel: "",
  minValue: 1, // デフォルトで1から5の範囲
  maxValue: 5,
};

export default RadioRating;
