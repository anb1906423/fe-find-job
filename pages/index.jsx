import React, { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import Heading from '../components/Heading';
import CongViecComponent from '../components/CongViecComponent';
import axios from 'axios';
import { backendAPI } from '../config';
import { swalert, swtoast } from '../mixins/swal.mixin';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { Image } from 'antd';

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
                            companyState: company.state,
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

    const filteredJobs = jobs.filter((job) => job.state && job.companyState);
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
                                margin: "0",
                            }}
                        >
                            Chào mừng bạn đến với trang web tìm kiếm việc làm!

                            Chúng tôi là nền tảng tìm kiếm việc làm hàng đầu, mang đến cho bạn cơ hội tuyệt vời để khám phá và ứng tuyển vào các công việc hấp dẫn từ các ngành nghề và lĩnh vực đa
                            dạng. Với mục tiêu kết nối người tìm việc và nhà tuyển dụng một cách hiệu quả, chúng tôi mang đến sự thuận tiện và tin cậy cho cả ứng viên và nhà tuyển dụng.

                            Với hàng ngàn công việc đang chờ đón bạn, chúng tôi cung cấp một môi trường tìm kiếm việc làm đáng tin cậy, nhanh chóng và dễ dàng sử dụng. Bạn có thể duyệt qua danh
                            sách công việc, tìm kiếm theo từ khóa, ngành nghề hoặc địa điểm, và ứng tuyển vào các vị trí phù hợp với kỹ năng và mong muốn của mình.
                            <br />
                            Chúng tôi đặt sự hài lòng của bạn lên hàng đầu và cam kết mang đến trải nghiệm tuyệt vời và cơ hội việc làm tốt nhất cho bạn. Bên cạnh việc cung cấp các công việc mới
                            nhất và đa dạng, chúng tôi cũng cung cấp các tài liệu hữu ích, gợi ý nghề nghiệp và tư vấn để giúp bạn phát triển sự nghiệp và đạt được mục tiêu của mình.
                            <br />
                            Hãy khám phá ngay hôm nay và bắt đầu hành trình tìm kiếm việc làm mới của bạn. Dễ dàng tạo hồ sơ cá nhân, tìm kiếm công việc mơ ước và tham gia vào cộng đồng chuyên
                            nghiệp của chúng tôi. Cùng chúng tôi, bạn sẽ tìm thấy cơ hội và sự phát triển để xây dựng một tương lai tuyệt vời.

                            Hãy khám phá và tạo nên sự khác biệt trong sự nghiệp của bạn cùng trang web tìm kiếm việc làm của chúng tôi!
                        </p>
                    </Col>
                    <Col md={4} className="d-flex justify-content-center align-items-center">
                        <Image className="rounded" src="./img/findjob.jpg" alt="image" />
                    </Col>
                </Row>
            </div>
            <div className="my-3">
                <div>
                    <hr></hr>
                </div>
                <Row>
                    <Col md={4} className="d-flex justify-content-center align-items-center">
                        <iframe
                            className="rounded"
                            style={{
                                width: '100%',
                                height: 240,
                            }}
                            src="https://www.youtube.com/embed/y7tHZ3WeJAw?list=RDy7tHZ3WeJAw"
                            title="Ruth B. - Dandelions (Official Lyric Video)"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        ></iframe>
                    </Col>
                    <Col md={8}>
                        <p
                            style={{
                                textAlign: 'justify',
                                color: '#666',
                                fontSize: 14,
                                fontStyle: 'italic',
                                margin: "0",
                            }}
                        >
                            Tự hào được là một nền tảng tìm kiếm việc làm hàng đầu, chúng tôi đã xây dựng một cộng đồng mạnh mẽ và đa dạng, kết nối những người tài năng với các
                            công ty hàng đầu trên thị trường. Chúng tôi tự tin rằng với sự đa dạng về ngành nghề và quy mô công ty, bạn sẽ tìm thấy công việc mà mình đam mê và phát triển nghề nghiệp.
                            <br />
                            Với tầm nhìn trở thành người bạn đồng hành tin cậy của bạn trong hành trình tìm kiếm việc làm và xây dựng sự nghiệp. Chúng tôi không chỉ đơn thuần
                            cung cấp danh sách công việc, mà còn mang đến sự hỗ trợ và tư vấn chuyên sâu, giúp bạn tìm thấy công việc phù hợp nhất với kỹ năng, ưu điểm và mục tiêu của mình.
                            <br />
                            Chúng tôi không ngừng nâng cao trải nghiệm tìm kiếm việc làm, đưa ra những công nghệ và công cụ tiên tiến nhằm mang lại sự thuận tiện và hiệu quả tối đa cho cả người tìm việc và
                            nhà tuyển dụng. Chúng tôi cam kết đảm bảo quyền riêng tư, tính minh bạch và đảm bảo sự công bằng trong quá trình tuyển dụng.
                            <br />
                            Chúng tôi cam kết tạo ra một môi trường tìm kiếm việc làm dễ dàng, nhanh chóng và hiệu quả. Bằng cách sử dụng công nghệ tiên tiến và hợp tác chặt chẽ với các doanh
                            nghiệp, chúng tôi đảm bảo rằng bạn sẽ được tiếp cận với những cơ hội việc làm mới nhất và phù hợp nhất với nhu cầu và mong muốn của mình.
                        </p>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default index;
