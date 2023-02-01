import classNames from 'classnames/bind';

import styles from './loading.module.scss';

const cx = classNames.bind(styles);

function Loading({ title = 'Đang tải dữ liệu' }) {
    return (
        <div className={cx('loading-wrapper-PacmanLoaderLoading')}>
            <div className={cx('overlay')}></div>
            <div className={cx('loading')}>
                <span className={cx('loading-jax')}>
                    <span></span>
                    <p>{title}</p>
                </span>
            </div>
        </div>
    );
}

export default Loading;
