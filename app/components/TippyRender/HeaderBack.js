import classNames from 'classnames/bind';

import styles from './menu.module.scss';

const cx = classNames.bind(styles);

function HeaderBack({ title, onBack }) {
    return (
        <div className={cx('header-back-wrapper')}>
            <i className="bi bi-chevron-left" onClick={onBack}></i>
            <span>{title}</span>
        </div>
    );
}

export default HeaderBack;
