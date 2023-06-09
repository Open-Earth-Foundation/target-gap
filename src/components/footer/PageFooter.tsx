'use client';

import Container from '@mui/material/Container';
import Image from 'next/image';

const Footer = () => {
  return (
    <div
      className="
                h-[324px]
                w-full
                bg-[#00001F]
                p-16
            "
    >
      <Container maxWidth="xl">
        <div className="flex flex-col">
          <div className="flex h-1/2 items-center justify-between">
            <div className="space-y-2">
              <p className="text-white font-bold text-[20px]">TargetGapVisualizer</p>
              <a className="text-white text-[14px]" href="https://www.openearth.org/projects/openclimate">About Us</a>
            </div>
            <div>
              <a
                className="
                  h-12
                  w-40
                  border-2
                  border-[#5FE500]
                  text-[#5FE500]
                  px-5
                  rounded-full
                "
                href="mailto:info@openearth.org"
              >
                CONTACT US
              </a>
            </div>
          </div>
          <div className="flex mt-16 items-center justify-between">
            <div className="flex items-center">
              <p className="bg-[#D7D8FA] px-2 rounded-full mr-5">BETA</p>
              <p className='text-white text-[14px] mr-5'>This site is a beta version, we appreciate all feedback to improve the platform</p>
              <a className='text-white font-[500] text-[14px]' href="mailto:ux@openearth.org">Send Feedback</a>
            </div>
            <div>
              <a href="https://openearth.org">
                <Image
                  src="/images/OEFLogo.svg"
                  alt='OEF_Logo'
                  height={150}
                  width={150}
                />
              </a>
            </div>
          </div>
        </div>
      </Container>

    </div>
  )
}

export default Footer;
