import React from 'react'

const HeadingInDetailJob = (props) => {

    const style = {
        marginBottom: "16px",
        paddingBottom: "8px",
        fontSize: "1.15rem",
    }
    return (
        <div style={style} className='header-in-detail-job position-relative'>
            <h5 style={{ fontWeight: '700' }}>
                {props.title}
            </h5>
        </div>
    )
}

export default HeadingInDetailJob