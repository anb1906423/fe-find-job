import PropTypes from 'prop-types';
import { memo, useEffect, useRef, useState } from 'react';

const LazyImg = ({ link = '', alt = 'Hiển thị hình ảnh', className = '', onClick = () => {} }) => {
    const ref = useRef(null);

    useEffect(() => {
        const imgElement = ref.current;

        if (!imgElement) return;

        const loadImg = (img) => {
            const url = img.getAttribute('lazy-src');

            img.setAttribute('src', url);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadImg(entry.target);
                }
            });
        });

        observer.observe(imgElement);
    }, [ref.current, link]);

    return <img ref={ref} src="" onClick={onClick} className={className} lazy-src={link} alt={alt} />;
};

LazyImg.propTypes = {
    link: PropTypes.string.isRequired,
    alt: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default memo(LazyImg);
