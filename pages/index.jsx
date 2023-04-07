import React, { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import Heading from '../components/Heading';
import CongViecComponent from '../components/CongViecComponent';
import axios from 'axios'
import { backendAPI } from '../config'
import { swalert, swtoast } from '../mixins/swal.mixin'

const index = () => {
    const [jobs, setJobs] = useState([])
    const [nhaTuyenDung, setNhaTuyenDung] = useState([])

    useEffect(() => {
        const handleGetJob = async () => {
            try {
                const res = await axios.get(backendAPI + '/cong-viec')
                setJobs(res.data)
            } catch (error) {
                console.log(error);
                swtoast.error({
                    text: error
                })
            }
        }

        const getJobsWithLogo = async () => {
            const updatedJobs = [];
            for (const job of jobs) {
                console.log(job);
                const config = {
                    headers: { 'email': job.nhaTuyenDungEmail }
                }
                const nhaTuyenDung = await axios.get(backendAPI + "/nha-tuyen-dung/email", config);
                const logo = nhaTuyenDung?.logoCty;
                updatedJobs.push({ ...job, logo });
            }
            setJobs(updatedJobs);
        }

        getJobsWithLogo();
        handleGetJob()
    }, [])

    console.log(jobs, nhaTuyenDung);
    return (
        <div className="trang-chu">
            <div className="carousel-group">
                <Carousel />
            </div>
            <div className="chua-noi-dung">
                <Heading tieuDe="Việc làm tốt nhất" />
                <div className="the-best-job-wp row gutter">
                    {
                        jobs && jobs.map((job, index) => {
                            if (job.state) {
                                return (
                                    <CongViecComponent
                                        key={index}
                                        chucDanh={job.chucDanh}
                                        logoCty={job.logoCty}
                                        mucLuongMongMuon={job.mucLuong}
                                        diaDiemLamViec={job.diaDiemLamViec}
                                        created_at={job.created_at}
                                    />
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default index;
