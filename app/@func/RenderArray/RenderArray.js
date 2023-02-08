import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

function RenderArray({ data = [], keyObj = '', ...props }) {
    return (
        <>
            {data
                ? data && data.length > 0
                    ? data.map((item) => {
                          const id = uuidv4();

                          return (
                              <span key={id} className="mx-1">
                                  {keyObj ? item.keyObj : item}
                              </span>
                          );
                      })
                    : 'Đang cập nhật'
                : 'Đang cập nhật'}
        </>
    );
}

RenderArray.propTypes = {
    data: PropTypes.array.isRequired,
    keyObj: PropTypes.string,
};

export default RenderArray;
