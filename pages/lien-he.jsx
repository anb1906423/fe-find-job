import React, { useState, useEFfect, useEffect } from 'react';
import Heading from '../components/Heading';
import Head from 'next/head';
import { ContactData } from '../data/ContactData';
import ContactComponent from '../components/Contact';

const Contact = () => {
    return (
        <div className="contact">
            <Head>
                <title>Liên hệ</title>
            </Head>
            <Heading tieuDe="Liên hệ" />
            <div className="contact-content">
                <div className="content-wrapper">
                    <div className="row" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        {ContactData &&
                            ContactData.map((item, index) => {
                                return (
                                    <div className="col-4" key={index}>
                                        <ContactComponent
                                            contactName={item.contactName}
                                            contactContent={item.contactContent}
                                            contactIcon={item.contactIcon}
                                            contactHref={item.contactHref}
                                        />
                                    </div>
                                );
                            })}
                    </div>

                    <div className="map">
                        {/* <Map /> */}
                        <div className="px-4">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.114232327323!2d105.79250601471162!3d10.00742219284605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0626326511777%3A0x45e4fadd9ddca041!2zOGEgVsO1IE5ndXnDqm4gR2nDoXAsIEjGsG5nIFBow7osIEPDoWkgUsSDbmcsIEPhuqduIFRoxqEgOTAwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1680882158742!5m2!1svi!2s"
                                width="600"
                                height="450"
                                style={{
                                    border: 0,
                                    width: '100%',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                }}
                                loading="lazy"
                            ></iframe>
                        </div>
                        {/* <img className="w-100 h-auto" src="https://xesuzukicantho.com/img/map.png" alt="" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
