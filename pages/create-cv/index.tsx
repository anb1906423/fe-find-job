import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { LeftNav } from '../../components/cv/core/containers/LeftNav';
import { Resume } from '../../components/cv/core/containers/Resume';
import { Sidebar } from '../../components/cv/core/containers/Sidebar';

const Editor: NextPage = () => {
    return (
        <div>
            <LeftNav />
            <Resume />
            <Sidebar />
        </div>
    );
};

export default Editor;
