import React from 'react'

const Heading = (props) => {
    return (
        <div
            className="heading"
            style={{
                margin: '12px 0',
            }}
        >
            <h3
                style={{
                    fontWeight: '650',
                    fontSize: '22px',
                }}
                className="text-uppercase text-center"
            >
                {props.tieuDe}
            </h3>
        </div>
    )
}

export default Heading