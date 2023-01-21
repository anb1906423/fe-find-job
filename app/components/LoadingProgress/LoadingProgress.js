import React from 'react';
import classNames from 'classnames/bind';

import styles from './LoadingProgress.module.scss';

const cx = classNames.bind(styles);

function LoadingProgress(props) {
    return (
        <div className={cx('wp')}>
            <div></div>
        </div>
    );
}

export default LoadingProgress;
