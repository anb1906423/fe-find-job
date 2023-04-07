
import {
    FaMapMarkerAlt,
    FaPhoneSquareAlt,
    FaFacebookSquare,
    FaMailBulk,
    FaClipboardCheck,
    FaCity
} from 'react-icons/fa'

export const ContactData = [
    {
        contactName: "Số điện thoại",
        contactContent: "0819.2222.73",
        contactHref: "tel:",
        contactIcon: <FaPhoneSquareAlt />,
    },
    {
        contactName: "Email",
        contactContent: "contact@dreamjob.com",
        contactHref: "mailto:",
        contactIcon: <FaMailBulk />,
    },
    {
        contactName: "Đơn vị chủ quản",
        contactHref: "#",
        contactContent: "Công ty DreamSolution",
        contactIcon: <FaCity />,
    },
    {
        contactName: "Giáy phép ĐKKD",
        contactHref: "#",
        contactContent: "D1928880",
        contactIcon: <FaClipboardCheck />,
    },
    {
        contactName: "Địa chỉ",
        contactHref: "#",
        contactContent: "8A, Võ Nguyên Giáp, Tp.CT",
        contactIcon: <FaMapMarkerAlt />,
    }
]