import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames/bind';

import Wrapper from '../../components/Popper';
import MenuItem from './MenuItem';
import styles from './menu.module.scss';
import HeaderBack from './HeaderBack';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function TippyRender({ items = [], children, onChange = defaultFn, hdeOnClick = false }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const RenderItem =
        current.data &&
        current.data.length > 0 &&
        current.data.map((item) => {
            const isParent = !!item.children;

            const uuid = uuidv4();

            return (
                <MenuItem
                    key={uuid}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });

    const RenderResult = (attrs) => (
        <div className={cx('content')} tabIndex="-1" {...attrs}>
            <Wrapper custom>
                <div className={cx('menu-body')}>
                    {history.length > 1 && <HeaderBack onBack={handleResetToFirstPage} title={current.title} />}
                    {RenderItem}
                </div>
            </Wrapper>
        </div>
    );

    const handleResetToFirstPage = () => {
        setHistory((prev) => {
            if (history.length > 1) {
                return prev.slice(0, prev.length - 1);
            } else {
                return prev;
            }
        });
    };

    return (
        <div className="d-inline-block">
            <Tippy
                zIndex={99999999999}
                delay={[0, 700]}
                offset={[20, 8]}
                hideOnClick={hdeOnClick}
                interactive
                placement="bottom-end"
                render={RenderResult}
                onHide={handleResetToFirstPage}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default TippyRender;
