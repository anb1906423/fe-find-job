import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendAPI } from '../config';
import { swalert, swtoast } from '../mixins/swal.mixin';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { Image } from 'antd';
import { useGoogleOneTapLogin } from '@react-oauth/google';

import Carousel from '../components/Carousel';
import CongViecComponent from '../components/CongViecComponent';
import Heading from '../components/Heading';

const index = () => {
    const [jobs, setJobs] = useState([]);
    const [jobsToShow, setJobsToShow] = useState(4);

    useGoogleOneTapLogin({
        onSuccess: (credentialResponse) => {
            console.log(credentialResponse);
        },
        onError: () => {
            console.log('Login Failed');
        },
        promptMomentNotification: (res) => {
            console.log(res);
        },
    });

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
                tenCongty={job.tenCty}
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
            <div className="my-3">
                <div>
                    <hr></hr>
                </div>
                <Row>
                    <Col md={8}>
                        <p
                            style={{
                                textAlign: 'justify',
                                color: '#666',
                                fontSize: 14,
                                fontStyle: 'italic',
                            }}
                        >
                            Tôi rất vui được giới thiệu về trang web Find Job của bạn. Find Job là một trang web tìm
                            kiếm việc làm. Trang web của bạn có thể giúp người dùng tìm kiếm việc làm phù hợp với nhu
                            cầu của họ. Trang web Find Job được thiết kế để giúp người dùng tìm kiếm việc làm phù hợp
                            với nhu cầu của họ. Trang web của bạn có thể giúp người dùng tìm kiếm việc làm theo nhiều
                            tiêu chí khác nhau như địa điểm, lĩnh vực, mức lương và kinh nghiệm. Bạn có thể tìm kiếm
                            việc làm theo từ khóa hoặc theo tên công ty. Trang web của bạn cũng cung cấp thông tin chi
                            tiết về các công việc được đăng tải trên trang web của bạn. Ngoài ra, trang web Find Job
                            cũng cung cấp cho người dùng các công cụ để tạo hồ sơ cá nhân và quản lý hồ sơ cá nhân của
                            họ. Người dùng có thể tạo hồ sơ cá nhân của mình và đăng ký cho các công việc mà họ quan
                            tâm. Trang web của bạn cũng cung cấp cho người dùng các công cụ để quản lý các ứng viên và
                            các công việc đã đăng tải trên trang web của bạn. Tôi hy vọng trang web Find Job của bạn sẽ
                            giúp ích cho nhiều người tìm kiếm việc làm. 😊
                        </p>
                    </Col>
                    <Col md={4}>
                        <Image className="rounded" src="./img/findjob.jpg" alt="image" />
                    </Col>
                </Row>
            </div>
            <div className="my-3">
                <div>
                    <hr></hr>
                </div>
                <Row>
                    <Col md={4}>
                        <iframe
                            className="rounded"
                            style={{
                                width: '100%',
                                height: 240,
                            }}
                            src="https://www.youtube.com/embed/y7tHZ3WeJAw?list=RDy7tHZ3WeJAw"
                            title="Ruth B. - Dandelions (Official Lyric Video)"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        ></iframe>
                    </Col>
                    <Col md={8}>
                        <p
                            style={{
                                textAlign: 'justify',
                                color: '#666',
                                fontSize: 14,
                                fontStyle: 'italic',
                            }}
                        >
                            Chào mừng các bạn đến với trang web tìm việc làm của chúng tôi! Tại đây, chúng tôi cung cấp
                            cho các bạn công cụ tìm kiếm việc làm tiên tiến và chính xác nhất, giúp các bạn tìm được
                            công việc ưng ý và đáng mong chờ.
                            <br />
                            Với hàng ngàn công việc được cập nhật liên tục từ các đối tác uy tín, chúng tôi tin rằng các
                            bạn sẽ tìm được công việc phù hợp với nhu cầu và mong muốn của mình. Tất cả các công việc
                            được phân loại rõ ràng và dễ dàng tìm kiếm theo ngành nghề, vị trí, địa điểm, mức lương và
                            các tiêu chí khác.
                            <br />
                            Ngoài ra, trang web của chúng tôi được tối ưu hóa tốt cho các công cụ tìm kiếm như Google,
                            Yahoo và Bing. Điều này đảm bảo rằng công việc của bạn sẽ được hiển thị cao trong kết quả
                            tìm kiếm, giúp bạn tiếp cận với những công việc phù hợp nhất.
                            <br />
                            Chúng tôi cũng cung cấp các dịch vụ hỗ trợ tìm việc miễn phí, bao gồm cập nhật hồ sơ, chuẩn
                            bị tài liệu phỏng vấn và các khóa học liên quan đến nghề nghiệp. Đội ngũ nhân viên chăm sóc
                            khách hàng của chúng tôi sẵn sàng hỗ trợ các bạn mọi lúc, mọi nơi để giải đáp các thắc mắc
                            và giúp các bạn tìm được công việc ưng ý.
                        </p>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default index;
