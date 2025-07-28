import React from "react";

const StarRating = ({ name, value, onChange, label }) => {
  return (
    <div className="form-inline">
      <span className="label-text">{label}</span>{" "}
      <div className="rating star">
        {[5, 4, 3, 2, 1].map((starValue) => (
          <React.Fragment key={starValue}>
            <input
              type="radio"
              id={`${name}${starValue}`}
              name={name}
              value={starValue.toString()}
              style={{ display: "none" }}
              checked={value === starValue.toString()}
              onChange={onChange}
            />
            <label htmlFor={`${name}${starValue}`} title={`${starValue} stars`}>
              ★
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StarRating;