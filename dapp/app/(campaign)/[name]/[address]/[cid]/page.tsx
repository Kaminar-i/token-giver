"use client";

import CampaignLoader from "@/app/components/loading/CampaignLoader";
import { fetchContentFromIPFS } from "@/app/utils/helper";
import CalenderIcon from "@/svgs/CalenderIcon";
import DonateIcon from "@/svgs/DonateIcon";
import ProfileIcon from "@/svgs/ProfileIcon";
import ShareIcon from "@/svgs/ShareIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = ({
  params,
}: {
  params: { name: string; address: string; cid: string };
}) => {
  const router = useRouter();
  console.log(params);

  const donateNow = () => {
    if (params.address && params.cid) {
      const campaignAddress = params.address;
      const campaignName = params.name;
      const cid = params.cid;
      router.push(`/${campaignName}/${campaignAddress}/${cid}/donate`);
    }
  };

  const [campaignDetails, setCampaignDetails] = useState({
    name: "",
    image: "/default-image.webp",
    description: "",
    date: "",
    organizer: "",
    beneficiary: "",
    location: "",
    target: "",
  });

  useEffect(() => {
    if (params.address && params.cid) {
      const fetchNFT = async () => {
        try {
          const data = await fetchContentFromIPFS(params.cid);
          console.log(data);
          if (data) {
            const timestamp = data.createdAt || "12 July 2024";
            const date = new Date(timestamp * 1000);
            const day = date.getDate();
            const month = date.toLocaleString("default", { month: "long" });
            const year = date.getFullYear();
            const formattedDate = `Created ${day} ${month} ${year}`;
            const imageUrl = data.image.slice(7, -1);
            setCampaignDetails({
              name: data.name || "",
              description: data.description || "",
              image:
                `https://ipfs.io/ipfs/${imageUrl}` || "/default-image.webp",
              date: formattedDate,
              organizer: data.organizer,
              beneficiary: data.beneficiary,
              location: data.location,
              target: data.target,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchNFT();
    }
  }, []);

  return (
    <>
      {campaignDetails.name ? (
        <section className=" mt-[4rem] mx-auto py-10 md:py-16 px-4 md:max-w-none md:px-10 bg-off-white lg:px-[10vw]">
          <div className="lg:flex gap-8  max-w-[500px] mx-auto md:mx-0  md:max-w-none relative">
            <div className="lg:w-[60%] mx-auto flex flex-col gap-12">
              <h2 className="font-bold">{campaignDetails.name}</h2>
              <div className="rounded-[10px] h-[400px] relative w-full object-contain md:w-[80%] mx-auto">
                <Image
                  className="rounded-[10px] h-full w-full"
                  loader={() => campaignDetails.image}
                  src={campaignDetails.image}
                  unoptimized
                  priority
                  fill
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-8 w-full md:w-[85%] md:mx-auto  lg:hidden">
                <div className="flex flex-col gap-4">
                  <p>
                    <span className="text-[2rem]">$20</span> raised of $
                    {campaignDetails.target || 4000}
                    target
                  </p>
                  <div className="">
                    <div className="w-full h-[.25rem] mb-2 relative">
                      <div className="w-full h-[1vw] max-h-[.25rem] bg-[#127c5548] rounded-full mb-4"></div>
                      <div
                        style={{
                          width: `5%`,
                        }}
                        className={`h-[1vw] max-h-[.25rem] bg-[#127C56] rounded-full mb-4 top-0 absolute`}
                      ></div>
                    </div>
                    <p>2 donations</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 text-white md:flex-row   ">
                  <button
                    onClick={donateNow}
                    className="w-full md:w-1/2 bg-theme-green p-3 rounded-[5px] flex justify-center items-center gap-2 "
                  >
                    <span>Donate now</span>{" "}
                    <span className="text-amber-300">
                      <DonateIcon />
                    </span>
                  </button>
                  <button className="w-full md:w-1/2 bg-theme-green p-3 rounded-[5px]  flex justify-center items-center gap-2">
                    <span>Share</span>
                    <span className="text-amber-300">
                      <ShareIcon />
                    </span>
                  </button>
                </div>
              </div>

              <div className="w-full md:w-[85%] md:mx-auto lg:w-full">
                <p>{campaignDetails.description}</p>
              </div>
              <div className="flex flex-col w-full md:w-[85%] md:mx-auto md:flex-row gap-4 lg:w-full">
                <button
                  onClick={donateNow}
                  className=" w-full md:w-1/2 border-[1px] border-solid border-theme-green p-3 rounded-[5px] font-bold"
                >
                  Donate
                </button>
                <button className="w-full md:w-1/2 border-[1px] border-solid border-theme-green p-3 rounded-[5px] font-bold">
                  Share
                </button>
              </div>

              <div>
                <h4>Organizer and beneficiary</h4>
                <div className="flex flex-col items-center  w-fit md:items-start md:w-full md:flex-row gap-8 md:gap-12 py-8">
                  <div className="flex gap-4">
                    <div className="bg-gray-100 h-[50px] w-[50px] rounded-full flex items-center justify-center">
                      <ProfileIcon />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold">{campaignDetails.organizer}</p>
                      <p>Organizer</p>
                      <p>{campaignDetails.location}</p>
                    </div>
                  </div>
                  <p className="text-[1.5em] font-extralight hidden md:block">
                    &rarr;
                  </p>
                  <p className="text-[1.5em] font-extralight md:hidden  w-fit">
                    &darr;
                  </p>
                  <div className="flex gap-4">
                    <div className="bg-gray-100 h-[50px] w-[50px] rounded-full flex items-center justify-center">
                      <ProfileIcon />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold">{campaignDetails.beneficiary}</p>
                      <p>Beneficiary</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-solid border-t-[1px] border-gray-400 py-6 flex gap-4 items-center">
                <span className="bg-gray-100 h-[50px] w-[50px] rounded-full flex items-center justify-center">
                  <CalenderIcon />
                </span>{" "}
                <p>{campaignDetails.date}</p>
              </div>
            </div>
            <div className="hidden sticky top-8 bg-off-white p-8  rounded-[10px] w-[35%] h-fit lg:flex flex-col gap-8 shadow-small ">
              <div className="flex flex-col gap-4">
                <p>
                  <span className="text-[2rem]">$20</span> raised of $
                  {campaignDetails.target || "4000"} target
                </p>
                <div className="">
                  <div className="w-full h-[.25rem] mb-2 relative">
                    <div className="w-full h-[1vw] max-h-[.25rem] bg-[#127c5548] rounded-full mb-4"></div>
                    <div
                      style={{
                        width: `5%`,
                      }}
                      className={`h-[1vw] max-h-[.25rem] bg-[#127C56] rounded-full mb-4 top-0 absolute`}
                    ></div>
                  </div>
                  <p>2 donations</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 text-white  ">
                <button
                  onClick={donateNow}
                  className="w-full bg-theme-green p-2 rounded-[5px] flex justify-center items-center gap-2 "
                >
                  <span>Donate now</span>{" "}
                  <span className="text-amber-300">
                    <DonateIcon />
                  </span>
                </button>
                <button className="w-full bg-theme-green p-2 rounded-[5px]  flex justify-center items-center gap-2">
                  <span>Share</span>
                  <span className="text-amber-300">
                    <ShareIcon />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <CampaignLoader />
      )}
    </>
  );
};

export default page;