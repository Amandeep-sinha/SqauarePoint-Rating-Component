import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Rating.css';

const Rating = ({ value, emptyIcon, filledIcon, halfFilledIcon, steps }) => {
    const [rating, setRating] = useState(value);
    const [hoverRating, setHoverRating] = useState(undefined);

    useEffect(() => {
        setRating(value);
    }, [value]);

    const handleClick = (index, event) => {
        const half = steps === 0.5 && isLessThanHalf(event);
        const newRating = half ? index + 0.5 : index + 1;
        if (rating === newRating) {
            setRating(undefined);
        } else {
            setRating(newRating);
        }
    };

    const handleMouseMove = (index, event) => {
        if (steps === 0.5) {
            const isHalf = isLessThanHalf(event);
            setHoverRating(isHalf ? index + 0.5 : index + 1);
        } else {
            setHoverRating(index + 1);
        }
    };

    const handleMouseLeave = () => {
        setHoverRating(undefined);
    };

    const handleKeyDown = (event) => {
        let newRating;
        if (event.key === 'ArrowRight') {
            newRating = rating + steps > 5 ? 5 : rating + steps;
        } else if (event.key === 'ArrowLeft') {
            newRating = rating - steps < 0.5 ? 0.5 : rating - steps;
        } else if (!isNaN(event.key) && event.key >= 1 && event.key <= 5) {
            newRating = Number(event.key);
        }
        if (newRating !== undefined) {
            setRating(newRating);
        }
    };

    const isLessThanHalf = (event) => {
        const { target } = event;
        const boundingClientRect = target.getBoundingClientRect();
        let mouseAt = event.clientX - boundingClientRect.left;
        mouseAt = Math.round(Math.abs(mouseAt));
        return mouseAt <= boundingClientRect.width / 2;
    };

    const renderSymbol = (index) => {
        let icon;
        if (hoverRating !== undefined) {
            if (hoverRating > index) {
                icon = hoverRating === index + 0.5 ? halfFilledIcon : filledIcon;
            } else {
                icon = emptyIcon;
            }
        } else {
            if (rating > index) {
                icon = rating === index + 0.5 ? halfFilledIcon : filledIcon;
            } else {
                icon = emptyIcon;
            }
        }

        return (
            <img
                key={index}
                src={icon}
                className="rating-image"
                data-testid="rating-icon"
                alt="Rate"
                onMouseMove={(event) => handleMouseMove(index, event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(index, event)}
            />
        );
    };

    return (
        <div
            tabIndex="0"
            className="star-rating"
            data-testid="star-rating-container"
            onKeyDown={handleKeyDown}
        >
            {[...Array(5)].map((_, index) => renderSymbol(index))}
        </div>
    );
};

Rating.propTypes = {
    value: PropTypes.number,
    emptyIcon: PropTypes.string,
    filledIcon: PropTypes.string,
    halfFilledIcon: PropTypes.string,
    steps: PropTypes.number,
};

Rating.defaultProps = {
    value: undefined,
    emptyIcon: '/icons/stars/empty.svg',
    filledIcon: '/icons/stars/filled.svg',
    halfFilledIcon: '/icons/stars/half.svg',
    steps: 1,
};

export default Rating;
