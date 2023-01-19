import React, { useState, useEffect } from 'react'
import Heading from '../components/Heading'
import UngVien from '../components/UngVien'
import { backendAPI } from '../config'

const TrangUngVien = () => {
  const [danhSachUngVien, datDanhSachUngVien] = useState([])
  
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUngVien = async () => {
      fetch(backendAPI + '/ung-vien')
        .then((res) => res.json())
        .then((danhSachUngVien) => {
          datDanhSachUngVien(danhSachUngVien)
        })
    }
    getUngVien()
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [danhSachUngVien])

  return (
    <div className="trang-ung-vien">
      <Heading tieuDe="Tất cả ứng viên" />
      <div className="danh-sach-ung-vien">
        {
          danhSachUngVien.length == 0 ? <p>Danh sách ứng viên đang được cập nhật</p> :
            danhSachUngVien.map((item, index) => {
              return (
                <UngVien />
              )
            })
        }
      </div>
    </div>
  )
}

export default TrangUngVien