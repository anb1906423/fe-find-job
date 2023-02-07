import React from 'react';
import { SyncLoader } from 'react-spinners';
import classNames from 'classnames/bind';

import styles from './loadingPending.module.scss';

const cx = classNames.bind(styles);

function LoadingPending() {
    return (
        <div className={cx('loading-pending-wp')}>
            <div className={cx('overlay')}></div>
            <SyncLoader color="#fff" />
        </div>
    );
}

export default LoadingPending;
