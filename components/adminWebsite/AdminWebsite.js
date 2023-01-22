import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../styles/adminWebsite.module.scss';

const cx = classNames.bind(styles);

function AdminWebsite() {
    return (
        <div className={cx('admin-website-wp')}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12"></div>
                </div>
            </div>
        </div>
    );
}

export default AdminWebsite;
