import MaxWidthWrapper from "../wrapper/MaxWidthWrapper";

export default function Footer() {
      return (<>
            <footer className="bg-gray-100 bg-white border-t-[1px] border-gray-300 mt-5">
                  <MaxWidthWrapper>
                        <div className=" py-6  md:flex md:items-center md:justify-center">
                              <span className="text-sm text-gray-700  sm:text-center">© 2024 <a href="https://flowbite.com/">Nirjala Shakya</a>. All Rights Reserved.
                              </span>
                            
                        </div>
                  </MaxWidthWrapper>

            </footer >
      </>)
}