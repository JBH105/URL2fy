import FIleUpload from '@/components/FIleUpload';
import GlobalContext from '@/contexts/GlobalContext';
import Head from 'next/head';
import React, { useContext } from 'react'

export default function Pptx() {
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
            Welcome to our PPTX to URL conversion service! With this powerful tool, you can transform your PPTX files into live URLs, making it easier than ever to share and access your documents online. Say goodbye to large file attachments and hello to seamless digital sharing.
          </h3>
          <FIleUpload />
        </div>
        <div className="px-3 max-w-5xl mx-auto relative">
          <p className="text-[22px] font-bold text-gray-800">Key Features:</p>
          <div className="mt-[30px]">
            <span className="text-[18px] font-bold text-gray-700">1. Instant Results:</span>
            <span className='pl-[5px] text-gray-900'> Our PPTX to URL converter delivers fast results, saving you time and effort.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">2. Maintained Presentation Elements:</span>
            <span className='pl-[5px] text-gray-900'>The converted URL retains the slides, graphics, and formatting of your original PPTX file.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">3. Privacy and Security:</span>
            <span className='pl-[5px] text-gray-900'>We prioritize the security of your data and delete files after the conversion process.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">4. Accessible Anytime, Anywhere:</span>
            <span className='pl-[5px] text-gray-900'>Share the live URL, and recipients can view the presentation on any internet-enabled device.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">5. User-Friendly Interface:</span>
            <span className='pl-[5px] text-gray-900'>Our interface ensures a smooth and straightforward PPTX to URL conversion experience.</span>
          </div>

          <p className="text-[22px] mt-[50px] font-bold text-gray-800">How to Convert PPTX to URL:</p>
          <div className="mt-[30px]">
            <span className="text-[18px] font-bold text-gray-700">1. Upload:</span>
            <span className='pl-[5px] text-gray-900'>Choose the PPTX file you wish to convert, or drag it onto the upload area.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">2. Convert:</span>
            <span className='pl-[5px] text-gray-900'>Our efficient converter processes the PPTX file, and your live URL is generated swiftly.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">3. Share:</span>
            <span className='pl-[5px] text-gray-900'>Copy the URL and share it with your audience, colleagues, or clients for a seamless presentation experience.</span>
          </div>
          <div className="mt-[20px] text-center">
            <span className='font-bold text-[18px] text-gray-600'>Share modern presentations as live URLs now and elevate your presentation game!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
