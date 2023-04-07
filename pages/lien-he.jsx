import React, { useState, useEFfect, useEffect } from 'react'
import Heading from '../components/Heading'
import Head from 'next/head'
import { ContactData } from '../data/ContactData'
import ContactComponent from '../components/Contact'

const Contact = () => {

    return (
        <div className="contact">
            <Head>
                <title>Liên hệ</title>
            </Head>
            <Heading tieuDe="Liên hệ" />
            <div className="contact-content">
                <div className='content-wrapper'>
                    <div className='row' style={{ maxWidth: "1000px", margin: "0 auto" }}>
                        {
                            ContactData && ContactData.map((item, index) => {
                                return (
                                    <div className="col-4">
                                        <ContactComponent
                                            key={index}
                                            contactName={item.contactName}
                                            contactContent={item.contactContent}
                                            contactIcon={item.contactIcon}
                                            contactHref={item.contactHref}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="map">
                        {/* <Map /> */}
                        <img className="w-100 h-auto" src="https://xesuzukicantho.com/img/map.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact