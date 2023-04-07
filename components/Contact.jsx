import React from 'react'

const Contact = (props) => {
    return (
        <div>
            <a href={props.contactHref + props.contactContent} className='d-flex align-items-center'>
                <div className="icon-box d-flex align-items-center">
                    {props.contactIcon}
                </div>
                <div className="content-box">
                    <span>{props.contactName}</span><br />
                    {props.contactContent}
                </div>
            </a>
        </div>
    )
}

export default Contact