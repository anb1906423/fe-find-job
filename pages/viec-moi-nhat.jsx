import React, { useState, useEffect } from 'react'
import Heading from '../components/Heading'
import CongViecComponent from '../components/CongViecComponent'
import { swtoast } from '../mixins/swal.mixin'
import axios from 'axios'
import { backendAPI } from '../config'
import { DoubleRightOutlined } from "@ant-design/icons"

const LatestJob = () => {
    const [jobs, setJobs] = useState([]);
    const [jobsToShow, setJobsToShow] = useState(4);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobResponse = await axios.get(backendAPI + '/cong-viec');
                const companyResponse = await axios.get(backendAPI + '/nha-tuyen-dung');

                // Kiểm tra dữ liệu và gộp thông tin công việc và nhà tuyển dụng dựa trên emailCty
                const jobsWithCompanyInfo = jobResponse.data.map(job => {
                    const company = companyResponse.data.find(company => company.email === job.emailCty);
                    return company ? {
                        ...job,
                        logoCty: company.logoCty,
                        tenCty: company.tenCty,
                    } : job;
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
        setJobsToShow(prevState => prevState + 4);
    };

    const displayedJobs = Array.from(jobs).reverse().slice(0, jobsToShow).map((job, index) => {
        if (job.state) {
            return (
                <CongViecComponent
                    key={index}
                    chucDanh={job.chucDanh}
                    logoCty={job.logoCty}
                    mucLuongMongMuon={job.mucLuong}
                    diaDiemLamViec={job.diaDiemLamViec}
                    created_at={job.created_at}
                    tenCty={job.tenCty}
                    col={12}
                />
            )
        }
    });

    return (
        <div className='latest-job-page'>
            <Heading tieuDe="Việc làm mới nhất" />
            <div className='cont'>
                <div className="the-best-job-wp row gutter">
                    <div className="col-9">
                        {displayedJobs}
                    </div>
                    <div className="col-3">
                        Lọc công việc
                    </div>
                </div>
                {jobsToShow < jobs.length && (
                    <div className="xem-them">
                        <button onClick={handleShowMore}>
                            <DoubleRightOutlined />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LatestJob