import { adminInfoState } from "@/Atoms/admin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRecoilValue } from "recoil";

// TODO :  Add css to the text to make it look good

function UserInfo() {

  // const [adminInfo, setAdminInfo] = useRecoilState(adminInfoState);
  const adminInfo = useRecoilValue(adminInfoState);

  return (
    <div className="flex items-center justify-start gap-2 border rounded-[8px] border-gray-300 p-2">
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>DP</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
            <p className="text-lg font-bold">{adminInfo ? adminInfo.name : "User Name"}</p> 
            <p className="text-sm capitalize"  >{adminInfo ?  adminInfo.location : "Location"}</p> 
        </div>
    </div>
  )
}

export default UserInfo