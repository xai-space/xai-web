import { useRouter } from "next/router";
import { IoArrowBackSharp } from "react-icons/io5";

const PostDetailHead = () => {
    const { back } = useRouter()
    return (
        <div
            className="inline-flex px-4 h-[53px] text-black items-center cursor-pointer mb-3"
            onClick={() => back()}
        >
            <IoArrowBackSharp size={20}></IoArrowBackSharp>
            <span className="ml-8 text-[20px] font-bold text-[#0f1419]"> Post</span>
        </div>
    )
}

export default PostDetailHead;
