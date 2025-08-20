import React, { useState, useEffect } from "react";
import "./starRating.css"; 

const StarRating = ({ maxRating = 5, rating, onChange, name = "rating", readOnly = false }) => {
    return (
        <div className={`starability-slot ${readOnly ? "pointer-events-none" : ""}`}>
            {[...Array(maxRating)].map((_, index) => {
                const value = index + 1;
                return (
                    <React.Fragment key={value}>
                        <input
                            type="radio"
                            id={`${name}-${value}`}
                            name={name}
                            value={value}
                            checked={rating === value}
                            onChange={() => !readOnly && onChange(value)}
                        />
                        <label htmlFor={`${name}-${value}`}></label>
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default StarRating;
