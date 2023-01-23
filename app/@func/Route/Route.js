import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useRouter } from 'next/router';

/* 

    !_.isEmpty(params) && !_.isEmpty(params.query)

    - _.isEmpty check xem một object nó có bị rỗng hay không do đó
    nếu nó không rỗng nó sẽ trả về là false do đó phải !_.isEmpty()

    docs : https://lodash.com/

*/

function Route({ element, path = '', nameQueryParam }) {
    const params = useRouter();

    return (
        <>{!_.isEmpty(params) && !_.isEmpty(params.query) && params.query[nameQueryParam] === path ? element : <></>}</>
    );
}

Route.propTypes = {
    element: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired,
};

export default Route;
