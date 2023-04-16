import React, { useState, useEffect } from 'react'
import CongViecComponent from '../../components/CongViecComponent'
import axios from 'axios'
import { backendAPI } from '../../config'
import { DoubleRightOutlined } from "@ant-design/icons"
import { useRouter } from 'next/router';
import LocCongViec from '../../components/LocCongViec/LocCongViec'

import {
    getAllMucLuong,
    getAllViTriMongMuon,
    getAllLoaiHopDong,
    getAllKinhghiem,
    getAllBangCap
} from '../../services/siteServices'

const SearchResult = () => {
    const router = useRouter();
    const nganhNghe = router.query.nganhnghe;
    const diaDiemLamViec = router.query.diadiem;
    const [jobs, setJobs] = useState([]);
    const [jobsToShow, setJobsToShow] = useState(4);

    const [locTheoMucLuong, setLocTheoMucLuong] = useState([]);
    const [locTheoCapBac, setLocTheoCapBac] = useState([]);
    const [locTheoLoaiHopDong, setLocTheoLoaiHopDong] = useState([]);
    const [locTheoKinhNghiem, setLocTheoKinhNghiem] = useState([]);
    const [locTheoTrinhDo, setLocTheoTrinhDo] = useState([]);

    const locTheoMucLuongChecked = locTheoMucLuong.filter(item => item.checked === true);
    const locTheoCapBacChecked = locTheoCapBac.filter(item => item.checked === true);
    const locTheoLoaiHopDongChecked = locTheoLoaiHopDong.filter(item => item.checked === true);
    const locTheoKinhNghiemChecked = locTheoKinhNghiem.filter(item => item.checked === true);
    const locTheoTrinhDoChecked = locTheoTrinhDo.filter(item => item.checked === true);

    const handleLocTheoMucLuongChange = (checked) => {
        const index = locTheoMucLuong.findIndex(item => item.element === checked.element);
        if (index === -1) {
            // Nếu phần tử không tồn tại trong mảng, thêm vào mảng
            setLocTheoMucLuong(prevState => [...prevState, { element: checked.element, checked: checked.checked }]);
        } else {
            // Nếu phần tử đã tồn tại trong mảng, cập nhật giá trị
            setLocTheoMucLuong(prevState => {
                const newArray = [...prevState];
                newArray[index] = { element: checked.element, checked: checked.checked };
                return newArray;
            });
        }
    };

    const handleLocTheoCapBacChange = (checked) => {
        const index = locTheoCapBac.findIndex(item => item.element === checked.element);
        if (index === -1) {
            // Nếu phần tử không tồn tại trong mảng, thêm vào mảng
            setLocTheoCapBac(prevState => [...prevState, { element: checked.element, checked: checked.checked }]);
        } else {
            // Nếu phần tử đã tồn tại trong mảng, cập nhật giá trị
            setLocTheoCapBac(prevState => {
                const newArray = [...prevState];
                newArray[index] = { element: checked.element, checked: checked.checked };
                return newArray;
            });
        }
    };

    const handleLocTheoLoaiHopDongChange = (checked) => {
        const index = locTheoLoaiHopDong.findIndex(item => item.element === checked.element);
        if (index === -1) {
            // Nếu phần tử không tồn tại trong mảng, thêm vào mảng
            setLocTheoLoaiHopDong(prevState => [...prevState, { element: checked.element, checked: checked.checked }]);
        } else {
            // Nếu phần tử đã tồn tại trong mảng, cập nhật giá trị
            setLocTheoLoaiHopDong(prevState => {
                const newArray = [...prevState];
                newArray[index] = { element: checked.element, checked: checked.checked };
                return newArray;
            });
        }
    };

    const handleLocTheoKinhNghiemChange = (checked) => {
        const index = locTheoKinhNghiem.findIndex(item => item.element === checked.element);
        if (index === -1) {
            // Nếu phần tử không tồn tại trong mảng, thêm vào mảng
            setLocTheoKinhNghiem(prevState => [...prevState, { element: checked.element, checked: checked.checked }]);
        } else {
            // Nếu phần tử đã tồn tại trong mảng, cập nhật giá trị
            setLocTheoKinhNghiem(prevState => {
                const newArray = [...prevState];
                newArray[index] = { element: checked.element, checked: checked.checked };
                return newArray;
            });
        }
    };

    const handleLocTheoTrinhDoChange = (checked) => {
        const index = locTheoTrinhDo.findIndex(item => item.element === checked.element);
        if (index === -1) {
            // Nếu phần tử không tồn tại trong mảng, thêm vào mảng
            setLocTheoTrinhDo(prevState => [...prevState, { element: checked.element, checked: checked.checked }]);
        } else {
            // Nếu phần tử đã tồn tại trong mảng, cập nhật giá trị
            setLocTheoTrinhDo(prevState => {
                const newArray = [...prevState];
                newArray[index] = { element: checked.element, checked: checked.checked };
                return newArray;
            });
        }
    };

    const [dataFilter, setDataFilter] = useState({
        MucLuongRender: [],
        CapBacRender: [],
        HopDongRender: [],
        KinhNghiemRender: [],
        BangCapRender: []
    })

    useEffect(() => {
        const Fetch = async () => {
            const [ResMucLuong, ResCapBac, ResHopDong, ResKinhNghiem, ResBangCap] =
                await Promise.all([
                    getAllMucLuong(),
                    getAllViTriMongMuon(),
                    getAllLoaiHopDong(),
                    getAllKinhghiem(),
                    getAllBangCap(),
                ]);

            setDataFilter((prev) => {
                return {
                    ...prev,
                    MucLuongRender: ResMucLuong.data,
                    CapBacRender: ResCapBac.data,
                    HopDongRender: ResHopDong.data,
                    KinhNghiemRender: ResKinhNghiem.data,
                    BangCapRender: ResBangCap.data,
                };
            });
        };

        Fetch();
    }, []);

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
                        soDienThoai: company.soDienThoai,
                        tenCty: company.tenCty,
                        diaChi: company.diaChi,
                        website: company.website
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
        filteredJobs = jobs.filter(job =>
            job.state
            && job.linhVucNgheNghiep == nganhNghe
            && (locTheoMucLuongChecked.length === 0 || locTheoMucLuongChecked.some(item => item.element === job.mucLuong))
            && (locTheoCapBacChecked.length === 0 || locTheoCapBacChecked.some(item => item.element === job.capBac))
            && (locTheoLoaiHopDongChecked.length === 0 || locTheoLoaiHopDongChecked.some(item => item.element === job.loaiHopDong))
            && (locTheoKinhNghiemChecked.length === 0 || locTheoKinhNghiemChecked.some(item => item.element === job.kinhNghiem))
            && (locTheoTrinhDoChecked.length === 0 || locTheoTrinhDoChecked.some(item => item.element === job.bangCap))
        );
    } else if (nganhNghe == '' || nganhNghe == "-- Tất cả ngành nghề --") {
        filteredJobs = jobs.filter(job =>
            job.state
            && job.diaDiemLamViec == diaDiemLamViec
            && (locTheoMucLuongChecked.length === 0 || locTheoMucLuongChecked.some(item => item.element === job.mucLuong))
            && (locTheoCapBacChecked.length === 0 || locTheoCapBacChecked.some(item => item.element === job.capBac))
            && (locTheoLoaiHopDongChecked.length === 0 || locTheoLoaiHopDongChecked.some(item => item.element === job.loaiHopDong))
            && (locTheoKinhNghiemChecked.length === 0 || locTheoKinhNghiemChecked.some(item => item.element === job.kinhNghiem))
            && (locTheoTrinhDoChecked.length === 0 || locTheoTrinhDoChecked.some(item => item.element === job.bangCap))
        );
    } else {
        filteredJobs = jobs.filter(job =>
            job.state
            && (job.diaDiemLamViec == diaDiemLamViec && job.linhVucNgheNghiep == nganhNghe)
            && (locTheoMucLuongChecked.length === 0 || locTheoMucLuongChecked.some(item => item.element === job.mucLuong))
            && (locTheoCapBacChecked.length === 0 || locTheoCapBacChecked.some(item => item.element === job.capBac))
            && (locTheoLoaiHopDongChecked.length === 0 || locTheoLoaiHopDongChecked.some(item => item.element === job.loaiHopDong))
            && (locTheoKinhNghiemChecked.length === 0 || locTheoKinhNghiemChecked.some(item => item.element === job.kinhNghiem))
            && (locTheoTrinhDoChecked.length === 0 || locTheoTrinhDoChecked.some(item => item.element === job.bangCap))
        );
    }
    
    const displayedJobs = Array.from(filteredJobs).slice(0, jobsToShow).map((job, index) => {
        return (
            <CongViecComponent
                key={index}
                mucLuongMongMuon={job.mucLuong}
                created_at={job.created_at}
                {...job}
                col={12}
            />
        )
    }
    );

    return (
        <div className='search-jobs-page' style={{ marginTop: "10px" }}>
            <div className='cont'>
                <div className="the-best-job-wp row gutter">
                    <div className="col-9">
                        {
                            displayedJobs.length != 0 ? displayedJobs : <p className="fw-bold" style={{ margin: "32px 0 22px" }}>Không có kết quả tìm kiếm phù hợp</p>
                        }
                        {/* {displayedJobs || 'Không có kết quả tìm kiếm phù hợp'} */}
                    </div>
                    <div className="col-3">
                        <LocCongViec
                            title="LỌC THEO MỨC LƯƠNG"
                            listElement={dataFilter.MucLuongRender}
                            onCheckedChange={handleLocTheoMucLuongChange}
                        />
                        <LocCongViec
                            title="LỌC THEO CẤP BẬC"
                            listElement={dataFilter.CapBacRender}
                            onCheckedChange={handleLocTheoCapBacChange}
                        />
                        <LocCongViec
                            title="LỌC THEO LOẠI HÌNH"
                            listElement={dataFilter.HopDongRender}
                            onCheckedChange={handleLocTheoLoaiHopDongChange}
                        />
                        <LocCongViec
                            title="LỌC THEO KINH NGHIỆM"
                            listElement={dataFilter.KinhNghiemRender}
                            onCheckedChange={handleLocTheoKinhNghiemChange}
                        />
                        {/* <LocCongViec
                            title="LỌC THEO THỜI GIAN"
                            listElement={dataFilter.MucLuongRender}
                        /> */}
                        <LocCongViec
                            title="LỌC THEO TRÌNH ĐỘ"
                            listElement={dataFilter.BangCapRender}
                            onCheckedChange={handleLocTheoTrinhDoChange}
                        />
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