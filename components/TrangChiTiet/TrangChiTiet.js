import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';

import styles from './trangChiTiet.module.scss';
import LazyImg from '../../app/components/LazyImg/LazyImg';

const cx = classNames.bind(styles);

function TrangChiTiet(props) {
    return (
        <div className={cx('trang-chi-tiet-wp')}>
            <div className="container">
                <Row>
                    <Col lg={9}>
                        <div className={cx('content-wp')}>
                            <div className={cx('banner-color')}></div>
                            <div className={cx('info-first')}>
                                <div className={cx('avatar')}>
                                    <LazyImg
                                        link="https://cdn.vieclamcantho.com.vn/public/upload/ungvien/66504162523111954383142.jpeg"
                                        alt="Hình ảnh của ứng viên"
                                    />
                                </div>
                                <div className={cx('info-basic')}>
                                    <h2 className={cx('title-cv')}>Lâm Ngọc Chúc</h2>
                                    <p className={cx('vi-tri')}>
                                        <span>Thực tập sinh</span>
                                    </p>
                                    <div className={cx('ve-ban-than')}>
                                        <div className={cx('ve-ban-than-left')}>
                                            <p>
                                                <i className="bi bi-calendar2-date"></i>
                                                <span>05/01/2002</span>
                                            </p>
                                            <p>
                                                <i className="bi bi-phone"></i>
                                                <span>0123456789</span>
                                            </p>
                                            <p>
                                                <i className="bi bi-pin-map"></i>
                                                <span>34 Láng Hạ Quận Đống Đa Thành Phố Hà Nội</span>
                                            </p>
                                        </div>
                                        <div className={cx('ve-ban-than-center')}>
                                            <p>
                                                <i className="bi bi-gender-ambiguous"></i>
                                                <span>Nữ</span>
                                            </p>
                                            <p>
                                                <i className="bi bi-wallet2"></i>
                                                <span>abcsdsds@gmail.com</span>
                                            </p>
                                        </div>
                                        <div className={cx('ve-ban-than-right')}>
                                            <p>
                                                <i className="bi bi-chat-heart-fill"></i>
                                                <span>Không Tiếp Lộ</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('next-body')}>
                                <div className={cx('next-body-left')}>
                                    <span className={cx('next-body-left-icon')}>
                                        <i className="bi bi-person-circle"></i>
                                    </span>
                                    <span>
                                        <strong> Thông tin hồ sơ</strong>
                                    </span>
                                </div>
                                <div className={cx('next-body-right')}></div>
                            </div>
                            <div className={cx('yeu-cua-va-tieu-chi')}>
                                <div className={cx('yeu-cua-va-tieu-chi-left')}>
                                    <p>
                                        <span className={cx('fw-500')}>Mức lương mong muốn:</span>
                                        <span>3 - 5 triệu</span>
                                    </p>
                                    <p>
                                        <span className={cx('fw-500')}>Số năm kinh nghiệm:</span>
                                        <span>3 - 5 kinh nghiệm</span>
                                    </p>
                                    <p>
                                        <span className={cx('fw-500')}>Ngành nghề:</span>
                                        <span>Dịch vụ khách hàng / Tư vấn / CSKH</span>
                                    </p>
                                </div>
                                <div className={cx('yeu-cua-va-tieu-chi-right')}>
                                    <p>
                                        <span className={cx('fw-500')}>Cấp bậc mong muốn:</span>
                                        <span> Nhân viên</span>
                                    </p>
                                    <p>
                                        <span className={cx('fw-500')}>Trình độ học vấn:</span>
                                        <span>Đại học</span>
                                    </p>
                                    <p>
                                        <span className={cx('fw-500')}>Nơi làm việc:</span>
                                        <span>Cần Thơ Sóc Trăng</span>
                                    </p>
                                </div>
                            </div>
                            <div className={cx('next-body')}>
                                <div className={cx('next-body-left')}>
                                    <span className={cx('next-body-left-icon')}>
                                        <i className="bi bi-file-earmark-person"></i>
                                    </span>
                                    <span>
                                        <strong> Giới thiệu chung</strong>
                                    </span>
                                </div>
                                <div className={cx('next-body-right')}></div>
                            </div>
                            <div className={cx('goi-thieu-va-muc-tieu-nghe-nghiep')}>
                                <div className={cx('gioi-thieu')}>
                                    <div className={cx('top-title')}>
                                        <i className="bi bi-check-circle-fill"></i>
                                        <span>Giới thiệu bản thân</span>
                                    </div>
                                    <p>
                                        Với kinh nghiệm nhiều năm làm việc từ làm các starup đến các công ty, tập đoàn
                                        lớn trong và ngoài nước. Với kinh nghiệm kinh doanh và quản lý có thể đáp ứng
                                        các yêu cầu mà quý công ty mong muốn.
                                    </p>
                                </div>
                                <div className={cx('muc-tieu-nghe-nghiep')}>
                                    <div className={cx('top-title')}>
                                        <i className="bi bi-check-circle-fill"></i>
                                        <span>Mục tiêu nghề nghiệp</span>
                                    </div>
                                    <p>
                                        Luôn muốn là chuyên gia trong lĩnh vực mình làm việc mà bản thân mình làm việc.
                                        Mong tạo ra giá trị cho bản thân ở công việc, muốn phát triển công ty cùng công
                                        ty họp tác lâu dài. Sẽ làm tốt nhất, hoành thành công việc nhanh nhất và hiệu
                                        quả nhất. Tìm công việc lương cao, chế độ tốt Công việc ổn định và lâu dài Môi
                                        trường & văn hóa công ty tốt Có thể học hỏi thêm kinh nghiệm, nâng cao trình độ
                                    </p>
                                </div>
                            </div>
                            <div className={cx('next-body')}>
                                <div className={cx('next-body-left')}>
                                    <span className={cx('next-body-left-icon')}>
                                        <i className="bi bi-filetype-csv"></i>
                                    </span>
                                    <span>
                                        <strong> Học vấn và bằng cấp</strong>
                                    </span>
                                </div>
                                <div className={cx('next-body-right')}></div>
                            </div>
                            <div className={cx('hoc-van')}>
                                <div className="mb-3">
                                    <ul>
                                        <li>
                                            <strong>Cử Nhân Quản Trị Kinh Doanh</strong>
                                        </li>
                                        <li>
                                            <span className={cx('fw-500', 'me-1')}>Đơn vị đào tạo:</span> Đại học Công
                                            Nghệ TP HCM - HUTECH
                                        </li>
                                        <li>
                                            <span className={cx('fw-500', 'me-1')}>Xếp loại:</span> Khá
                                        </li>
                                    </ul>
                                </div>
                                <div className="mb-3">
                                    <ul>
                                        <li>
                                            <strong>Cử Nhân Quản Trị Kinh Doanh</strong>
                                        </li>
                                        <li>
                                            <span className={cx('fw-500-title', 'me-1')}>Đơn vị đào tạo:</span> Đại học
                                            Công Nghệ TP HCM - HUTECH
                                        </li>
                                        <li>
                                            <span className={cx('fw-500-title', 'me-1')}>Xếp loại:</span> Khá
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={cx('next-body')}>
                                <div className={cx('next-body-left')}>
                                    <span className={cx('next-body-left-icon')}>
                                        <i className="bi bi-person-workspace"></i>
                                    </span>
                                    <span>
                                        <strong> Kinh nghiệm làm việc</strong>
                                    </span>
                                </div>
                                <div className={cx('next-body-right')}></div>
                            </div>
                            <div className={cx('hoc-van')}>
                                <div className="mb-3">
                                    <ul>
                                        <li>
                                            <strong>Trưởng phòng kinh doanh - phát triển đối tác</strong>
                                        </li>
                                        <li>
                                            <span className={cx('fw-500-title', 'me-1')}>Công ty:</span> Đại học Công
                                            Nghệ TP HCM - HUTECH
                                        </li>
                                        <li>
                                            <span className={cx('fw-500-title', 'me-1')}>Mô tả:</span> Xây dựng, triển
                                            khai kế hoạch kinh doanh theo định hướng của BGĐ Tìm kiếm đối tác, cơ hội
                                            hợp tác B2B chào bán các sản phẩm dịch vụ của công ty. Đề xuất cho BGĐ các
                                            mô hình, định hướng kinh doanh hiệu quả cho các mảng sản phẩm dịch vụ của
                                            công ty Đào tạo hướng dẫn, xây dựng và phát triển lực lượng nhân sự bán hàng
                                            Kiểm soát tiến độ thực hiện KPI của phòng, của cá nhân
                                        </li>
                                    </ul>
                                </div>
                                <div className="mb-3">
                                    <ul>
                                        <li>
                                            <strong>Trưởng phòng kinh doanh - phát triển đối tác</strong>
                                        </li>
                                        <li>
                                            <span className={cx('fw-600', 'me-1')}>Công ty:</span> Đại học Công Nghệ TP
                                            HCM - HUTECH
                                        </li>
                                        <li>
                                            <span className={cx('fw-500', 'me-1')}>Mô tả:</span> Xây dựng, triển khai kế
                                            hoạch kinh doanh theo định hướng của BGĐ Tìm kiếm đối tác, cơ hội hợp tác
                                            B2B chào bán các sản phẩm dịch vụ của công ty. Đề xuất cho BGĐ các mô hình,
                                            định hướng kinh doanh hiệu quả cho các mảng sản phẩm dịch vụ của công ty Đào
                                            tạo hướng dẫn, xây dựng và phát triển lực lượng nhân sự bán hàng Kiểm soát
                                            tiến độ thực hiện KPI của phòng, của cá nhân
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={cx('next-body')}>
                                <div className={cx('next-body-left')}>
                                    <span className={cx('next-body-left-icon')}>
                                        <i className="bi bi-filetype-csv"></i>
                                    </span>
                                    <span>
                                        <strong> Trình độ ngoại ngữ</strong>
                                    </span>
                                </div>
                                <div className={cx('next-body-right')}></div>
                            </div>
                            <div className={cx('trinh-do-tieng-anh')}>
                                <div className={cx('trinh-do-tieng-anh-top')}>
                                    <div className={cx('title-name')}>Tên Môn</div>
                                    <div className={cx('title-name')}>Nghe</div>
                                    <div className={cx('title-name')}>Nói</div>
                                    <div className={cx('title-name')}>Đọc</div>
                                    <div className={cx('title-name')}>Viết</div>
                                </div>
                                <div className={cx('trinh-do-tieng-anh-body')}>
                                    <div className={cx('item-result')}>
                                        <div className={cx('title-result--render')}>Tiếng anh</div>
                                        <div className={cx('title-result--render')}>Trung bình</div>
                                        <div className={cx('title-result--render')}>Trung bình</div>
                                        <div className={cx('title-result--render')}>Trung bình</div>
                                        <div className={cx('title-result--render')}>Trung bình</div>
                                    </div>
                                    <div className={cx('item-result')}>
                                        <div className={cx('title-result--render')}>Tiếng Pháp</div>
                                        <div className={cx('title-result--render')}>Trung bình</div>
                                        <div className={cx('title-result--render')}>Trung bình</div>
                                        <div className={cx('title-result--render')}>Trung bình</div>
                                        <div className={cx('title-result--render')}>Trung bình</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3} className={cx('de-xuat-ung-vien-wp')}>
                        <div className={cx('suggest-ung-vien')}>
                            <div className={cx('item-result-ung-vien')}>
                                <div className={cx('anh-ung-vien-de-xuat')}>
                                    <LazyImg
                                        link="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg"
                                        alt="Hình ảnh ứng viên"
                                    />
                                </div>
                                <div className={cx('thong-tin-ung-vien-de-xuat')}>
                                    <h5>Lập trình viên website lập trình không giới hạn</h5>
                                    <p className={cx('ten-ung-vien')}>Nguyễn Văn Tuấn</p>
                                    <p className={cx('trinh-do-va-kinh-nghiem')}>
                                        <span className={cx('trinh-do', 'chung-css')}>
                                            <i className="bi bi-folder2-open"></i>
                                            Trung Cấp
                                        </span>
                                        <span className={cx('kinh-nghiem', 'chung-css')}>
                                            <i className="bi bi-star"></i>5 năm kinh nghiệm làm việc
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className={cx('item-result-ung-vien')}>
                                <div className={cx('anh-ung-vien-de-xuat')}>
                                    <LazyImg
                                        link="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg"
                                        alt="Hình ảnh ứng viên"
                                    />
                                </div>
                                <div className={cx('thong-tin-ung-vien-de-xuat')}>
                                    <h5>Lập trình viên website lập trình không giới hạn</h5>
                                    <p className={cx('ten-ung-vien')}>Nguyễn Văn Tuấn</p>
                                    <p className={cx('trinh-do-va-kinh-nghiem')}>
                                        <span className={cx('trinh-do', 'chung-css')}>
                                            <i className="bi bi-folder2-open"></i>
                                            Trung Cấp
                                        </span>
                                        <span className={cx('kinh-nghiem', 'chung-css')}>
                                            <i className="bi bi-star"></i>5 năm kinh nghiệm làm việc
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className={cx('item-result-ung-vien')}>
                                <div className={cx('anh-ung-vien-de-xuat')}>
                                    <LazyImg
                                        link="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg"
                                        alt="Hình ảnh ứng viên"
                                    />
                                </div>
                                <div className={cx('thong-tin-ung-vien-de-xuat')}>
                                    <h5>Lập trình viên website lập trình không giới hạn</h5>
                                    <p className={cx('ten-ung-vien')}>Nguyễn Văn Tuấn</p>
                                    <p className={cx('trinh-do-va-kinh-nghiem')}>
                                        <span className={cx('trinh-do', 'chung-css')}>
                                            <i className="bi bi-folder2-open"></i>
                                            Trung Cấp
                                        </span>
                                        <span className={cx('kinh-nghiem', 'chung-css')}>
                                            <i className="bi bi-star"></i>5 năm kinh nghiệm làm việc
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className={cx('item-result-ung-vien')}>
                                <div className={cx('anh-ung-vien-de-xuat')}>
                                    <LazyImg
                                        link="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg"
                                        alt="Hình ảnh ứng viên"
                                    />
                                </div>
                                <div className={cx('thong-tin-ung-vien-de-xuat')}>
                                    <h5>Lập trình viên website lập trình không giới hạn</h5>
                                    <p className={cx('ten-ung-vien')}>Nguyễn Văn Tuấn</p>
                                    <p className={cx('trinh-do-va-kinh-nghiem')}>
                                        <span className={cx('trinh-do', 'chung-css')}>
                                            <i className="bi bi-folder2-open"></i>
                                            Trung Cấp
                                        </span>
                                        <span className={cx('kinh-nghiem', 'chung-css')}>
                                            <i className="bi bi-star"></i>5 năm kinh nghiệm làm việc
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className={cx('item-result-ung-vien')}>
                                <div className={cx('anh-ung-vien-de-xuat')}>
                                    <LazyImg
                                        link="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg"
                                        alt="Hình ảnh ứng viên"
                                    />
                                </div>
                                <div className={cx('thong-tin-ung-vien-de-xuat')}>
                                    <h5>Lập trình viên website lập trình không giới hạn</h5>
                                    <p className={cx('ten-ung-vien')}>Nguyễn Văn Tuấn</p>
                                    <p className={cx('trinh-do-va-kinh-nghiem')}>
                                        <span className={cx('trinh-do', 'chung-css')}>
                                            <i className="bi bi-folder2-open"></i>
                                            Trung Cấp
                                        </span>
                                        <span className={cx('kinh-nghiem', 'chung-css')}>
                                            <i className="bi bi-star"></i>5 năm kinh nghiệm làm việc
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className={cx('item-result-ung-vien')}>
                                <div className={cx('anh-ung-vien-de-xuat')}>
                                    <LazyImg
                                        link="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg"
                                        alt="Hình ảnh ứng viên"
                                    />
                                </div>
                                <div className={cx('thong-tin-ung-vien-de-xuat')}>
                                    <h5>Lập trình viên website lập trình không giới hạn</h5>
                                    <p className={cx('ten-ung-vien')}>Nguyễn Văn Tuấn</p>
                                    <p className={cx('trinh-do-va-kinh-nghiem')}>
                                        <span className={cx('trinh-do', 'chung-css')}>
                                            <i className="bi bi-folder2-open"></i>
                                            Trung Cấp
                                        </span>
                                        <span className={cx('kinh-nghiem', 'chung-css')}>
                                            <i className="bi bi-star"></i>5 năm kinh nghiệm làm việc
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

TrangChiTiet.propTypes = {};

export default TrangChiTiet;
