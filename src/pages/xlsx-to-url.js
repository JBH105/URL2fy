import FIleUpload from "@/components/FIleUpload";
import GlobalContext from "@/contexts/GlobalContext";
import Head from "next/head";
import React, { useContext } from "react";

export default function Xlsx() {
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
            Welcome to our XLSX to URL conversion service! With this powerful tool, you can transform your XLSX files into live URLs, making it easier than ever to share and access your documents online. Say goodbye to large file attachments and hello to seamless digital sharing.
          </h3>
          <FIleUpload />
        </div>
        <div className="px-3 max-w-5xl mx-auto">
          <p className="text-[22px] font-bold text-gray-800">Key Features:</p>
          <div className="mt-[30px]">
            <span className="text-[18px] font-bold text-gray-700">1. Instant Conversion:</span>
            <span className='pl-[5px] text-gray-900'>Our advanced XLSX to URL converter provides rapid results, ensuring minimal waiting time.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">2. Data Integrity:</span>
            <span className='pl-[5px] text-gray-900'>The converted URL will maintain all the data, formulas, and formatting of your original XLSX file.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">3. Privacy Guaranteed:</span>
            <span className='pl-[5px] text-gray-900'>Your files are treated with utmost confidentiality and deleted from our servers after conversion.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">4. Accessible Anywhere:</span>
            <span className='pl-[5px] text-gray-900'>Share the live URL, and recipients can view the spreadsheet from any device with internet access.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">5. User-Friendly Interface:</span>
            <span className='pl-[5px] text-gray-900'>Our simple interface makes the conversion process quick and easy.</span>
          </div>

          <p className="text-[22px] mt-[50px] font-bold text-gray-800">How to Convert XLSX to URL:</p>
          <div className="mt-[30px]">
            <span className="text-[18px] font-bold text-gray-700">1. Upload:</span>
            <span className='pl-[5px] text-gray-900'>Select your XLSX file, or drag and drop it into the designated area.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">2. Convert:</span>
            <span className='pl-[5px] text-gray-900'>Our system will process the file, and within seconds, you'll have a live URL ready.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">3. Share:</span>
            <span className='pl-[5px] text-gray-900'>Copy the URL and share it with colleagues, clients, or anyone you want to collaborate with.</span>
          </div>
          <div className="mt-[20px] text-center">
            <span className='font-bold text-[18px] text-gray-600'>Try our XLSX to URL converter now and revolutionize your spreadsheet sharing experience!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
