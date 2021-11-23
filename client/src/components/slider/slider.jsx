import React from 'react';
import './slider.scss';

function Slider(props) {
    return (
        <div className="slider-wrapper">
            <div className="slider">
                <div className="slider__list">
                    <div className="slider-item">
                        
                    </div>
                </div>
                <div className="slider__control">
                    <span className="slider-control-next">
                        <i class="fas fa-chevron-right"></i>
                    </span>
                    <span className="slider-control-prev">
                        <i class="fas fa-chevron-left"></i>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Slider;