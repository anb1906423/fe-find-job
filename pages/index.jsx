import React, { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import Heading from '../components/Heading';
import CongViecComponent from '../components/CongViecComponent';
import axios from 'axios';
import { backendAPI } from '../config';
import { swalert, swtoast } from '../mixins/swal.mixin';
import { DoubleRightOutlined } from '@ant-design/icons';

const index = () => {
    const [jobs, setJobs] = useState([]);
    const [jobsToShow, setJobsToShow] = useState(4);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobResponse = await axios.get(backendAPI + '/cong-viec');
                const companyResponse = await axios.get(backendAPI + '/nha-tuyen-dung');

                // Kiểm tra dữ liệu và gộp thông tin công việc và nhà tuyển dụng dựa trên emailCty
                const jobsWithCompanyInfo = jobResponse.data.map((job) => {
                    const company = companyResponse.data.find((company) => company.email === job.emailCty);
                    return company
                        ? {
                              ...job,
                              logoCty: company.logoCty,
                              soDienThoai: company.soDienThoai,
                              tenCty: company.tenCty,
                              diaChi: company.diaChi,
                              website: company.website,
                              idNhaTuyenDung: company.id,
                          }
                        : job;
                    });

                setJobs(jobsWithCompanyInfo);
            } catch (error) {
                console.log(error);
                swtoast.error({
                    text: error,
                });
            }
        };

        fetchJobs();
    }, []);


    const handleShowMore = () => {
        setJobsToShow((prevState) => prevState + 4);
    };

    const filteredJobs = jobs.filter((job) => job.state);
    const displayedJobs = filteredJobs.slice(0, jobsToShow).map((job, index) => {
        return (
            <CongViecComponent
                key={index}
                mucLuongMongMuon={job.mucLuong}
                created_at={job.created_at}
                {...job}
                col={6}
            />
        );
    });

    return (
        <div className="trang-chu">
            <div className="carousel-group">
                <Carousel />
            </div>
            <div className="chua-noi-dung">
                <Heading tieuDe="Việc làm tốt nhất" />
                <div className="the-best-job-wp row gutter">{displayedJobs}</div>
                {jobsToShow < filteredJobs.length && (
                    <div className="xem-them">
                        <button className="d-flex justify-content-between align-items-center" onClick={handleShowMore}>
                            {/* Xem thêm */}
                            <DoubleRightOutlined />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default index;
