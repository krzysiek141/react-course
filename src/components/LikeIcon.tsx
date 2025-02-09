import { IoMdHeart, IoIosHeartEmpty } from "react-icons/io"
import { useState } from "react";

interface LikeIconProps {
    onClick: () => void;
}

export function LikeIcon(props: LikeIconProps) {
    const { onClick } = props;
    const [status, setStatus] = useState(false);
    const toggleIcon = () => {
        setStatus(!status);
        onClick()
    }
    if (status) {
        return (
            <IoMdHeart color='#bb6c3f' size='40' onClick={toggleIcon} />
        )
    } else {
        return (
            <IoIosHeartEmpty size='40' onClick={toggleIcon} />
        )
    }
}