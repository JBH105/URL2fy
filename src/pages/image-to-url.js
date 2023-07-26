import FIleUpload from '@/components/FIleUpload';
import GlobalContext from '@/contexts/GlobalContext';
import Head from 'next/head';
import React, { useContext } from 'react'

export default function Image() {
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
            Welcome to our IMAGE to URL conversion service! With this powerful tool, you can transform your IMAGE files into live URLs, making it easier than ever to share and access your documents online. Say goodbye to large file attachments and hello to seamless digital sharing.
          </h3>
          <FIleUpload />
        </div>
        <div className="px-3 max-w-5xl mx-auto">
          <p className="text-[22px] font-bold text-gray-800">Key Features:</p>
          <div className="mt-[30px]">
            <span className="text-[18px] font-bold text-gray-700">1. Rapid Conversion:</span>
            <span className='pl-[5px] text-gray-900'>Our IMAGE to URL converter quickly generates live URLs for your images.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">2. Maintained Image Quality:</span>
            <span className='pl-[5px] text-gray-900'>The converted URL preserves the quality and resolution of your original images.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">3. Privacy Assurance:</span>
            <span className='pl-[5px] text-gray-900'>Your files are treated with utmost confidentiality and deleted after the conversion.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">4. Universal Access:</span>
            <span className='pl-[5px] text-gray-900'>Share the live URL, and anyone can view the images on any device with internet access.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">5. User-Friendly Interface:</span>
            <span className='pl-[5px] text-gray-900'>Our intuitive interface ensures a smooth and easy IMAGE to URL conversion process.</span>
          </div>

          <p className="text-[22px] mt-[50px] font-bold text-gray-800">How to Convert IMAGE to URL:</p>
          <div className="mt-[30px]">
            <span className="text-[18px] font-bold text-gray-700">1. Upload:</span>
            <span className='pl-[5px] text-gray-900'>Select the image file you want to convert, or drag and drop it into the designated area.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">2. Convert:</span>
            <span className='pl-[5px] text-gray-900'>Our efficient conversion engine processes the image, providing you with a live URL swiftly.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">3. Share:</span>
            <span className='pl-[5px] text-gray-900'>Copy the URL and share it with your audience, friends, or clients to showcase your visuals.</span>
          </div>
          <div className="mt-[20px] text-center">
            <span className='font-bold text-[18px] text-gray-600'>Convert your images to live URLs now and let your pictures speak a thousand words!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
