import React, { useState, useEffect } from 'react'
import CongViecComponent from '../../components/CongViecComponent'
import axios from 'axios'
import { backendAPI } from '../../config'
import { DoubleRightOutlined } from "@ant-design/icons"
import { useRouter } from 'next/router';

const SearchResult = () => {
    const router = useRouter();
    const nganhNghe = router.query.nganhnghe;
    const diaDiemLamViec = router.query.diadiem;
    const [jobs, setJobs] = useState([]);
    const [jobsToShow, setJobsToShow] = useState(4);

    console.log(jobs);

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
                        // linhVucNgheNghiep: company.linhVucNgheNghiep,
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

    var filteredJobs
    if (diaDiemLamViec == '' || diaDiemLamViec == '-- Tất cả địa điểm --') {
        filteredJobs = jobs.filter(job => job.state && job.linhVucNgheNghiep == nganhNghe);
    } else if (nganhNghe == '' || nganhNghe == "-- Tất cả ngành nghề --") {
        filteredJobs = jobs.filter(job => job.state && job.diaDiemLamViec == diaDiemLamViec);
    } else filteredJobs = jobs.filter(job => job.state && (job.diaDiemLamViec == diaDiemLamViec && job.linhVucNgheNghiep == nganhNghe));

    const displayedJobs = Array.from(filteredJobs).slice(0, jobsToShow).map((job, index) => {
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
    );

    return (
        <div className='all-jobs-page'>
            <div className='cont'>
                <div className="the-best-job-wp row gutter">
                    <div className="col-9">
                        {
                            displayedJobs.length != 0 ? displayedJobs : <p className="fw-bold" style={{ margin: "32px 0 22px" }}>Không có kết quả tìm kiếm phù hợp</p>
                        }
                        {/* {displayedJobs || 'Không có kết quả tìm kiếm phù hợp'} */}
                    </div>
                    <div className="col-3">
                        Lọc công việc
                    </div>
                </div>
                {jobsToShow < filteredJobs.length && (
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

export default SearchResult