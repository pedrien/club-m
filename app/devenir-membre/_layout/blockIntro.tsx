import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
const BlockIntro = () => {
  return (
    <div className="block-intro lg:py-[70px] p-[50px]">
      <div className="container px-4 mx-auto">
        <div className="text-center lg:max-w-3xl mx-auto lg:mb-20">
          <h2 className="text-4xl lg:text-4xl font-[600] text-center text-black">
            + 200 femmes déjà membres au Congo et dans la diaspora
            entrepreneures, salariées en transition, étudiantes ambitieuses.
          </h2>
          <div className="flex justify-center -space-x-4 mt-6">
            <Avatar className="w-14 h-14 border-3 border-white">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="w-14 h-14 border-3 border-white">
              <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="w-14 h-14 border-3 border-white">
              <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-6">
            <div className="card-img relative lg:w-[90%] h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/images/banner4.jpg"
                alt="devenir membre"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <h3 className="text-2xl lg:text-2xl font-[500] text-black mb-3">
              Pourquoi le Club M ?
            </h3>
            <h4 className="text-2xl lg:text-5xl font-[500] text-black">
              Un réseau pensé <br /> pour vos réalités
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockIntro;
