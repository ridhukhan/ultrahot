import { useRouter } from "next/navigation";
export default function Admin(){
    const router = useRouter()
const checkAdminStatus = async () => {
    try {
      const res = await fetch("/api/me");
      const data = await res.json();
      if(data.success){
        setIsadmin(true)
      }else{
        router.push("/login")
      }
    } catch (err) {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

    return(
        <div>
            hello admin how are are you
        </div>
    )
}