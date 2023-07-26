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
          <h3 className="mt-[20px] font-bold text-gray-500">
            Welcome to our PPT to URL conversion service! With this powerful tool, you can transform your PPT files into live URLs, making it easier than ever to share and access your documents online. Say goodbye to large file attachments and hello to seamless digital sharing.
          </h3>
          <FIleUpload />
        </div>
        <div className="px-3 max-w-5xl mx-auto">
          <p className="text-[22px] font-bold text-gray-800">Key Features:</p>
          <div className="mt-[30px]">
            <span className="text-[18px] font-bold text-gray-700">1. Swift Conversion:</span>
            <span className='pl-[5px] text-gray-900'>Our PPT to URL converter ensures rapid conversion, saving you valuable time.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">2. Retained Slide Design:</span>
            <span className='pl-[5px] text-gray-900'>The converted URL maintains the design and layout of your original PPT file.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">3. Protected Privacy:</span>
            <span className='pl-[5px] text-gray-900'>We take data security seriously, and your files are deleted once the conversion is complete.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">4. Universal Viewing:</span>
            <span className='pl-[5px] text-gray-900'>Share the live URL, and recipients can view the presentation on any device with internet access.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">5. User-Friendly Interface:</span>
            <span className='pl-[5px] text-gray-900'>Our intuitive interface guarantees a seamless PPT to URL conversion process.</span>
          </div>

          <p className="text-[22px] mt-[50px] font-bold text-gray-800">How to Convert PPT to URL:</p>
          <div className="mt-[30px]">
            <span className="text-[18px] font-bold text-gray-700">1. Upload:</span>
            <span className='pl-[5px] text-gray-900'>Choose the PPT file you want to convert or drag it onto the upload section.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">2. Convert:</span>
            <span className='pl-[5px] text-gray-900'>Our efficient conversion engine processes the file, and your live URL is ready in moments.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">3. Share:</span>
            <span className='pl-[5px] text-gray-900'>Copy the URL and share it with your audience for a captivating presentation experience.</span>
          </div>
          <div className="mt-[20px] text-center">
            <span className='font-bold text-[18px] text-gray-600'>Share your presentations as live URLs now and impress your viewers like never before!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
