import React from 'react';
import Carousel from '../components/Carousel';
import Heading from '../components/Heading';

const index = () => {
    return (
        <div className="trang-chu">
            <div className="carousel-group">
                <Carousel />
            </div>
            <div className="chua-noi-dung">
                <Heading tieuDe="Việc làm tốt nhất" />
            </div>
        </div>
    );
};

export default index;
