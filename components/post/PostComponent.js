import React, { useState } from 'react';
import classNames from 'classnames/bind';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import styles from './post.module.scss';
import Loading from '../../app/components/loading/loading';
import { Row, Col, Container } from 'react-bootstrap';

const cx = classNames.bind(styles);

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function PostComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const [dataPost, setDataPost] = useState({
        titleLoading: 'Đang tải ảnh lên',

        isPublic: true,
        contentHTML: '',
        contentMarkDown: '',
    });

    const HandleEditorStateChange = ({ html, text }) => {
        setDataPost((prev) => {
            return {
                ...prev,
                contentHTML: html,
                contentMarkDown: text,
            };
        });
    };

    const handleOnUploadImage = (file) => {
        return new Promise((resolve, reject) => {
            const url = URL.createObjectURL(file);

            resolve(url);
        });
    };

    console.log(dataPost);

    return (
        <div className={cx('wp')}>
            {isLoading && <Loading title={dataPost.titleLoading} />}
            <Container>
                <Row className="my-4">
                    <Col sm={4}>
                        <label className="my-2">Chế độ bài viết</label>
                        <select className="form-control" value={dataPost.isPublic}>
                            <option value={null}>-- chọn chế độ --</option>
                            <option value={true}>-- Công khai --</option>
                            <option value={false}>-- Không công khai --</option>
                        </select>
                    </Col>
                </Row>
            </Container>
            <MdEditor
                style={{ height: '70vh' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={HandleEditorStateChange}
                onImageUpload={handleOnUploadImage}
            />
            <div className="my-3 mx-4">
                <button className="btn btn-primary d-block ms-auto">Đăng bài tuyển dụng</button>
            </div>
        </div>
    );
}
