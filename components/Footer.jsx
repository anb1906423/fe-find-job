import classNames from 'classnames/bind';
import Image from 'next/image';

import styles from '../styles/footer.module.scss';

const cx = classNames.bind(styles);

const FooterChuk = () => {
    return (
        <div className={cx('footer-wrapper-sell')}>
            <>
                {/* <img loading="lazy" src="./img/blur1.png" alt="Hinh anh blur" className={cx('blur-footer', 'blur-1')} />
                <img loading="lazy" src="./img/blur2.png" alt="Hinh anh blur" className={cx('blur-footer', 'blur-2')} />
                <img loading="lazy" src="./img/blur3.png" alt="Hinh anh blur" className={cx('blur-footer', 'blur-3')} />
                <img loading="lazy" src="./img/blur4.png" alt="Hinh anh blur" className={cx('blur-footer', 'blur-4')} /> */}
                <div className={cx('overlay')}></div>
            </>
            <div className={cx('content')}>
                <div className="container">
                    <div className={cx('d-flex', 'my-2')}>
                        <div>
                            <div className={cx('header-footer')}>
                                <img src="../img/logo.png" alt="Ảnh logo" className={cx('img-logo')} />
                                <div>
                                    <span>Your career we care!</span>
                                    {/* <span>với mọi người</span> */}
                                </div>
                            </div>
                        </div>
                        <div className={cx('flex-1')}>
                            <span className={cx('border')}></span>
                        </div>
                    </div>
                    <div className={cx('content-footer', 'mt-4', 'pt-3')}>
                        <div>
                            <h4>Liên hệ</h4>
                            <div className="mb-2">
                                <span>
                                    <i className="bi bi-telephone"></i>
                                </span>
                                <span className="mx-2">
                                    <a href="tel:0948487660">
                                        0948.487.660
                                    </a>
                                </span>
                            </div>
                            <div className="mb-2">
                                <span>
                                    <i className="bi bi-envelope-check"></i>
                                </span>
                                <span className="mx-2">
                                    <a href="mailto:dreamjobnotifi@gmail.com">
                                        dreamjobnotifi@gmail.com
                                    </a>
                                </span>
                            </div>
                            <div className="mb-2">
                                <span>
                                    <i className="bi bi-pin-map"></i>
                                </span>
                                <span className="mx-2">112b, Hưng Lợi, Ninh Kiều, Cần Thơ</span>
                            </div>
                        </div>
                        <div className={cx('center-content')}>
                            <h4>Hỗ trợ</h4>
                            <div className="mb-2">
                                <span>
                                    <i className="bi bi-shield-fill-check"></i>
                                </span>
                                <span className="mx-2">
                                    <a
                                        href="https://chinh-sach-bao-mat-unomo.vercel.app/index.html"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Chính sách bảo mật
                                    </a>
                                </span>
                            </div>
                            <div className="mb-2">
                                <span>
                                    <i className="bi bi-chat-right-quote"></i>
                                </span>
                                <span className="mx-2">
                                    <a href="/" target="_blank" rel="noreferrer">
                                        Hướng dẫn sử dụng
                                    </a>
                                </span>
                            </div>
                            <div className="mb-2">
                                <span>
                                    <i className="bi bi-facebook"></i>
                                </span>
                                <span className="mx-2">Facebook</span>
                            </div>
                        </div>
                        <div className={cx('right-content')}>
                            <h4>Dream Job Về Chúng Tôi</h4>
                            <div className="mb-2">
                                <span className="d-block mb-2">
                                    Website của chúng tôi cung cấp cho nhà tuyển tuyển dụng và và các bạn đang cần tìm
                                    việc làm một môi trường chung và có tính cạnh tranh giúp cho các ứng viên có thể lựa
                                    chọn được công việc ưng ý nhất và nhà tuyển dụng có được người họ cần nhất.
                                </span>
                                <span className="d-block">
                                    Chúng tôi cảm ơn bạn đã đồng hành cùng với chúng tôi, chúng tôi xin chúc bạn và nhà
                                    tuyển dụng có thể tìm được công việc và ứng viên phù hợp.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 mb-1">
                    <div className={cx('container', 'pbs')}>
                        <span className={cx('footer-icon')}>
                            <a href="/" className="me-3">
                                <span>
                                    <i className="bi bi-facebook"></i>
                                </span>
                            </a>
                            <a href="/" className="me-3">
                                <span>
                                    <i className="bi bi-instagram"></i>
                                </span>
                            </a>
                            <a href="/" className="me-3">
                                <span>
                                    <i className="bi bi-github"></i>
                                </span>
                            </a>
                            <a href="/" className="me-3">
                                <span>
                                    <i className="bi bi-youtube"></i>
                                </span>
                            </a>
                            <a href="/" className="me-3">
                                <span>
                                    <i className="bi bi-tiktok"></i>
                                </span>
                            </a>
                        </span>
                        <span className={cx('footer-end')}>
                            © 2018 - 2022 DREAM JOB. Nền tảng tìm kiếm công việc hàng đầu
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterChuk;
