import React, { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import Heading from '../components/Heading';
import CongViecComponent from '../components/CongViecComponent';
import axios from 'axios'
import { backendAPI } from '../config'
import { swalert, swtoast } from '../mixins/swal.mixin'

const index = () => {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const handleGetJob = async () => {
            try {
                const res = await axios.get(backendAPI + '/cong-viec')
                setJobs(res.data)
                console.log(jobs);
            } catch (error) {
                console.log(error);
                swtoast.error({
                    text: error
                })
            }
        }

        handleGetJob()
    }, jobs)
    console.log(jobs);
    return (
        <div className="trang-chu">
            <div className="carousel-group">
                <Carousel />
            </div>
            <div className="chua-noi-dung">
                <Heading tieuDe="Việc làm tốt nhất" />
                <div className="the-best-job-wp">
                    {
                        jobs && jobs.map((job, index) => {
                            return (
                                <CongViecComponent
                                    key={index}
                                    chucDanh={job.chucDanh}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default index;
