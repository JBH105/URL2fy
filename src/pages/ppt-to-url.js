import FIleUpload from '@/components/FIleUpload';
import GlobalContext from '@/contexts/GlobalContext';
import Head from 'next/head';
import React, { useContext } from 'react'

export default function Ppt() {
  const { selectTab, setSelectTab } = useContext(GlobalContext);
  return (
    <div>
      <Head>
        <title>{selectTab?.name}</title>
      </Head>
      <div className="py-5 min-h-[90vh]">
        <div className="px-3 text-center max-w-5xl mx-auto">
          <h1 className="mt-[30px] sm:mt-[56px] relative z-[3] text-[28px] sm:text-[32px] font-bold leading-[44px] md:text-[48px] lg:leading-[60px] text-gray-600 lg:mt-[76px] ">
            Online file converter: convert {selectTab?.name} within moments
          </h1>
          <FIleUpload />
        </div>
      </div>
    </div>
  );
}
