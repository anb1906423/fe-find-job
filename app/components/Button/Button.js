import classNames from 'classnames/bind';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    custom: PropTypes.string,
};

function Button({ to, custom, href, children, className = '', onClick, ...propsAdd }) {
    let Component = 'button';

    const props = {
        onClick,
        ...propsAdd,
    };

    if (to) {
        props.href = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    return (
        <Component className={className} {...props}>
            <span className={cx(custom)}>{children}</span>
        </Component>
    );
}

export default Button;
