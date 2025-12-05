import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Banner = () => {
    return (
        <div className='banner-devenir-membre relative z-10'>
            <div className="overlay absolute top-0 left-0 w-full h-full -z-10 bg-black opacity-30"></div>
            <div className="content-img absolute top-0 left-0 w-full h-full -z-20">
                <Image src="/images/banner3.jpg" alt="devenir membre" width={100} height={100} layout="responsive" className="w-[100%!important] h-[100%!important] object-cover" />
            </div>
            <div className="content-banner lg:min-h-[90vh] flex flex-col justify-center items-center lg:py-[100px]">
                <div className="container mt-auto px-4">
                    <div className="grid grid-cols-12 lg:gap-10 items-end">
                        <div className="col-span-12 lg:col-span-6">
                            <h1 className="text-4xl lg:text-5xl font-[600] text-white">
                            Le réseau premium qui aide les femmes entrepreneures du Congo et de la diaspora à financer et structurer leur business.
                            </h1>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <div className="flex lg:justify-end gap-3">
                                <Button className="bg-[#d7f75b] text-black h-12 hover:bg-[#d7f75b]/80 hover:text-black cursor-pointer transition-all duration-300 rounded-lg">
                                    Devenir membre
                                </Button>
                                <Button className="bg-[#fff] text-black h-12 hover:bg-[#000] cursor-pointer hover:text-white transition-all duration-300 rounded-lg">
                                    Découvrir les avantages
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
