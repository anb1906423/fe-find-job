import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './SkeletonLoading.module.scss';

const cx = classNames.bind(styles);

const SkeletonLoading = ({ className = '', width = 100, height = 100, borderRadius = 0 }) => {
    return (
        <div
            className={cx('ske-loading-wp', className ? className : '')}
            style={{
                width: width,
                height: height,
                borderRadius: borderRadius,
            }}
        ></div>
    );
};

SkeletonLoading.propTypes = {
    className: PropTypes.string,
    width: PropTypes.string || PropTypes.number,
    height: PropTypes.string || PropTypes.number,
};

export default SkeletonLoading;
