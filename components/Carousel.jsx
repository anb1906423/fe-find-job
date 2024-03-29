import React from 'react';
const slides = [
    {
        id: 1,
        src: './img/Bạn cần.png',
        alt: 'Slide 2',
    },
    {
        id: 2,
        src: './img/2.png',
        alt: 'Slide 3',
    },
    {
        id: 3,
        src: './img/3.png',
        alt: 'Slide 4',
    },
];

const Carousel = () => {
    return (
        <div className="carousel">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                <div className="carousel-indicators">
                    {slides.map((item, index) =>
                        index === 0 ? (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to={item.id}
                                className="active"
                                aria-current="true"
                                aria-label={item.alt}
                            ></button>
                        ) : (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to={item.id}
                                aria-label={item.alt}
                            ></button>
                        ),
                    )}
                </div>
                <div className="carousel-inner">
                    {slides.map((item, index) =>
                        index === 0 ? (
                            <div key={index} className="carousel-item active">
                                <img src={item.src} className="d-block w-100" alt={item.alt} />
                            </div>
                        ) : (
                            <div key={index} className="carousel-item">
                                <img src={item.src} className="d-block w-100" alt={item.alt} />
                            </div>
                        ),
                    )}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Carousel;
