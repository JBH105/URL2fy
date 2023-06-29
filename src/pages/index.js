import Tabs from "@/components/Tabs";
import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { BiCopy, BiSolidCopy } from "react-icons/bi";
import Head from "next/head";

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [convertURL, setConvertURL] = useState(false);
  const [selectTab, setSelectTab] = useState();
  const [loader, setLoader] = useState(false);
  const [url, setUrl] = useState("");
  const [copyurl, setCopyUrl] = useState(false);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    await handleUpload();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFile(file);
      console.log("Dropped file:", file);
    }
  };

  const handleSelect = useCallback(
    async (event) => {
      event.preventDefault();
      const file = event.target.files[0];
      const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
      if (file && file.size > maxSize) {
        alert("File size exceeds the maximum limit of 10 MB.");
        event.target.file = null;
        return;
      }
      await handleUpload();
      if (file) {
        setFile(file);
        console.log("Dropped file:", file);
        return;
      }
    },
    [setFile]
  );

  const handleUpload = () => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setConvertURL(true);
          return 0;
        }
        return prevProgress + 10;
      });
    }, 450);
  };

  const handleConvertURL = async () => {
    if (file) {
      setLoader(true);
      const fileData = new FormData();
      fileData.append("file", file);
      await axios
        .post("https://url-backend-lrk7.onrender.com/upload", fileData)
        .then((result) => {
          if (result?.status === 200) {
            setUrl(result?.data?.url);
            setTimeout(() => {
              setLoader(false);
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  useEffect(() => {
    setFile("");
    setProgress(0);
    setConvertURL(false);
    setIsDragging(false);
  }, [selectTab]);

  const copyToClipboard = () => {
    copy(url);
    setCopyUrl(true);
    // setTimeout(() => {
    //   setUrl('')
    //   setCopyUrl(false)
    //   setFile(null)
    // }, 2000);
  };

  return (
    <>
      <Head>
        <title>{selectTab?.name}</title>
      </Head>
      <div className="py-5 min-h-screen bg-gray-700">
        <div className="max-w-5xl mx-auto py-5 px-3 ">
          {/* <Image
            src="/assets/icons/next.svg"
            width={104}
            height={24}
            alt="logo"
          /> */}
          <span className="block text-gray-300 text-[20px]">URL Master</span>
        </div>
        <div className="px-3 text-center max-w-5xl mx-auto">
          <h1 className="mt-[30px] sm:mt-[56px] relative z-[3] text-[28px] sm:text-[32px] font-bold leading-[44px] md:text-[48px] lg:leading-[60px] text-white lg:mt-[76px] ">
            Online file converter: convert {selectTab?.name} within moments
          </h1>
          <div className='relative my-[40px] sm:my-[60px] after:absolute after:content-[" "] after:shadow-red after:right-0 after:top-0 after:block after:h-[288px] after:w-[288px] after:rounded-[50%]'>
            <div className="shadow-dark bg-white p-3 sm:p-5 z-[3] relative rounded-2xl">
              <div className="sm:mb-[-1px] sm:pl-3">
                <Tabs
                  setSelectTab={setSelectTab}
                  setUrl={setUrl}
                  setCopyUrl={setCopyUrl}
                />
              </div>
              <div
                className={`border px-4 border-slate-300 flex flex-col items-center justify-evenly min-h-[250px] sm:min-h-[332px]  rounded-lg ${
                  isDragging ? "border-blue-500" : ""
                }`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {progress > 0 && (
                  <div className="mt-4 h-2 max-w-md w-full bg-gray-300 rounded">
                    <div
                      className="h-full bg-green-500 rounded"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
                {/* Display dropped file name */}
                {url ? (
                  <>
                    <span>Congratulations URL created successfully</span>
                    <div className="flex text-center shadow-dark bg-white p-3 sm:p-5 z-[5] relative rounded-2xl break-all">
                      <span>{url}</span>
                      <button className="pr-2 pl-4" onClick={copyToClipboard}>
                        {!copyurl ? <BiCopy /> : <BiSolidCopy />}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {file ? (
                      <>
                        <p className="text-[14px] text-gray-600">
                          Dropped file: <strong>{file?.name}</strong>
                        </p>
                        {convertURL && (
                          <button
                            className="flex gap-4 bg-[#3661e3] hover:bg-[#4f79f9] transition focus:ring-2 outline-none focus:ring-[#3661e391] focus:ring-offset-2 text-white text-[14px] sm:text-[18px] rounded px-8 py-2.5"
                            onClick={handleConvertURL}
                          >
                            {loader ? (
                              <>
                                please wait a moment
                                <img
                                  src="/assets/icons/Infinity-1s-200px.svg"
                                  alt="loader"
                                />
                              </>
                            ) : (
                              "Convert to URL"
                            )}
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        <Image
                          src="/assets/icons/icons8-upload-document-96.png"
                          width={50}
                          height={80}
                          className="w-[40px] sm:w-[50px]"
                          alt="file"
                        />
                        <h3 className="md:hidden block text-[20px] text-[#171717] leading-[24px] font-bold">
                          Tap here to upload documents
                        </h3>

                        <h3 className="lg:text-[32px] hidden md:block sm:text-[28] text-[20px] text-[#171717] font-bold">
                          Drag and drop document here to upload
                        </h3>
                        <input
                          type="file"
                          id="image"
                          className="hidden"
                          onChange={(e) => handleSelect(e)}
                          accept={selectTab?.accept}
                          maxSize={10 * 1024 * 1024} // 10 MB in bytes
                        />

                        <label
                          htmlFor="image"
                          className="bg-[#3661e3] hover:bg-[#4f79f9] transition focus:ring-2 outline-none focus:ring-[#3661e391] focus:ring-offset-2 text-white text-[14px] sm:text-[18px] rounded px-8 py-2.5"
                        >
                          Select a document
                        </label>

                        <p className="text-[10px] sm:text-xs  text-gray-400">
                          Upload documents of up to 10 MB in PDF, DOC, DOCX,
                          RTF, PPT, PPTX, JPEG, PNG, or TXT
                        </p>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="absolute h-[241px] w-[241px] shadow-blue left-0 top-[39px] rounded-[50%]"></div>
          </div>
        </div>
        <div>
          <p className="block text-center text-gray-300 text-[14px]">
            © 2023 URL Master
          </p>
        </div>
      </div>
    </>
  );
}
