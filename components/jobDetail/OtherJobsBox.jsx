import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendAPI } from '../../config'
import OtherJobItem from './OtherJobItem'

const OtherJobsBox = (props) => {
    const [otherJobList, setOtherJobList] = useState([])

    useEffect(() => {
        const getOtherJobList = async () => {
            try {
                const response = await axios.get(backendAPI +
                    `/cong-viec/bai-dang-cong-ty?emailcty=${props.emailCty}`
                );
                setOtherJobList(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getOtherJobList();
    }, [props.emailCty]);

    return (
        <div className="other-jobs-box">
            {
                otherJobList && otherJobList.map((item, index) => {
                    if (props.id != item.id) {
                        return (
                            <OtherJobItem
                                {...item}
                                mucLuongMongMuon={item.mucLuong}
                                tenCty={props.tenCty}
                                key={index}
                            />
                        )
                    }
                })
            }
        </div>
    )
}

export default OtherJobsBox