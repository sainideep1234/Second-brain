import Logo from '../icons/Logo'
import Search from '../icons/Search'
import Share from '../icons/Share'
import Plus from '../icons/Plus'
import Collapse from '../icons/Collapse'
import { useNavigate } from 'react-router-dom'

function AppBar({open , setopen  , setopenshare , openshare , opensidebar , setopensidebar}) {

    let navigate = useNavigate();
    function handleLogout(){
        localStorage.removeItem('token');
        navigate('/signin');
    }

  return (
    <div className=' fixed bg-white flex items-center w-full border-b-2 border-gray-200 pt-5 pb-2 px-10 w-full '>
                <div className ='hover:shadow-lg transition-all delay-30 duration-300 hover:px-1 hover:shadow-black' onClick={()=>setopensidebar(!opensidebar)}>
                    <Collapse></Collapse>
                </div>
                <div className='flex items-center px-5'>
                    <Logo></Logo>
                    <h2 className='text-2xl font-bold px-2'>Brainly</h2>
                </div>
                {/* <div className='border-2 rounded-xl border-gray-200 flex items-center  text-gray-500'>
                    <input  className='rounded-xl' type="text" placeholder='Search..' />
                    <Search />
                </div> */}
                <div className=' flex flex-1 justify-end'>
                    <div className=' hidden md:block md:flex md:gap-3'>
                        <div onClick={()=>setopen(!open)}  className='hover:shadow-lg transition-all delay-30 duration-300 hover:px-4 cursor-pointer flex items-center gap-1 px-2 py-1 rounded-md bg-btncolor hover:bg-btnhovercolor text-white'>
                            <Plus></Plus>
                            Create Content
                        </div>
                        <div onClick={()=>setopenshare(!openshare)}  className=' hover:shadow-lg transition-all delay-30 duration-300 hover:px-4 cursor-pointer flex items-center gap-1 px-2 py-1 rounded-md bg-btncolor hover:bg-btnhovercolor text-white'>
                            <Share  ></Share>
                            Share Content
                        </div>
                        <div onClick={handleLogout} className=' hover:shadow-lg transition-all delay-30 duration-300 hover:px-4 px-2 py-1 rounded-md bg-btncolor hover:bg-btnhovercolor text-white cursor-pointer'>
                        Logout
                        </div>      
                    </div>
                </div>
            </div>
  )
}

export default AppBar