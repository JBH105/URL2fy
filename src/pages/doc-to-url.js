import FIleUpload from "@/components/FIleUpload";
import Header from "@/components/Header";
import GlobalContext from "@/contexts/GlobalContext";
import Head from "next/head";
import React, { useContext, useState } from "react";

export default function Doc() {
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
            Welcome to our DOC to URL conversion service! With this powerful tool, you can transform your DOC files into live URLs, making it easier than ever to share and access your documents online. Say goodbye to large file attachments and hello to seamless digital sharing.
          </h3>
          <FIleUpload />
        </div>
        <div className="px-3 max-w-5xl mx-auto">
          <p className="text-[22px] font-bold text-gray-800">Key Features:</p>
          <div className="mt-[30px]">
            <span className="text-[18px] font-bold text-gray-700">1. Quick Conversion:</span>
            <span className='pl-[5px] text-gray-900'>Our DOC to URL converter works swiftly to generate live URLs in no time.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">2. Preserved Text and Layout:</span>
            <span className='pl-[5px] text-gray-900'>The converted URL retains all the text, fonts, and formatting of your original DOC document.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">3. Secure Handling:</span>
            <span className='pl-[5px] text-gray-900'>We prioritize your data security and delete files after the conversion process.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">4. Cross-Platform Accessibility:</span>
            <span className='pl-[5px] text-gray-900'>Recipients can access the document on any device with an internet connection.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">5. User-Friendly Interface:</span>
            <span className='pl-[5px] text-gray-900'>Our intuitive interface makes converting DOC files to URLs a walk in the park.</span>
          </div>

          <p className="text-[22px] mt-[50px] font-bold text-gray-800">How to Convert XLSX to URL:</p>
          <div className="mt-[30px]">
            <span className="text-[18px] font-bold text-gray-700">1. Upload:</span>
            <span className='pl-[5px] text-gray-900'>Choose the DOC file you wish to convert, or drag it onto the upload section.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">2. Convert:</span>
            <span className='pl-[5px] text-gray-900'>Our efficient converter processes the DOC file, and your live URL is ready shortly after.</span>
          </div>
          <div className="mt-[20px]">
            <span className="text-[18px] font-bold text-gray-700">3. Share:</span>
            <span className='pl-[5px] text-gray-900'>Copy the URL and share it with colleagues, clients, or friends for effortless collaboration.</span>
          </div>
          <div className="mt-[20px] text-center">
            <span className='font-bold text-[18px] text-gray-600'>Convert your DOC files to URLs now and experience a new level of document sharing convenience!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
